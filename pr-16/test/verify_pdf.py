#!/usr/bin/env python3
import argparse
import sys
import unicodedata
from pathlib import Path
from pypdf import PdfReader

TYPOGRAPHIC_REPLACEMENTS = str.maketrans({
    "‘": "'", "’": "'",
    "“": '"', "”": '"',
    "—": "-", "–": "-",
    "\u00a0": " ",
})


def normalize(text):
    return " ".join(unicodedata.normalize("NFC", text).translate(TYPOGRAPHIC_REPLACEMENTS).split())


def extract_text(pdf_path):
    reader = PdfReader(str(pdf_path))
    pages = len(reader.pages)
    layout_pages, flat_pages = [], []

    for page in reader.pages:
        try:
            raw_layout = page.extract_text(
                extraction_mode="layout",
                layout_mode_font_height_weight=0.9,
            ) or ""
            layout_pages.append("\n".join(line.rstrip() for line in raw_layout.split("\n")))
        except Exception:
            layout_pages.append(page.extract_text() or "")

        runs = []
        page.extract_text(visitor_text=lambda t, cm, tm, font, sz: runs.append((t, tm[4], tm[5])))
        raw_parts, prev_y = [], None
        for text, x, y in runs:
            if y != 0 and prev_y is not None and (y - prev_y) >= 28.0:
                raw_parts.append("\n")
            if y != 0:
                prev_y = y
            raw_parts.append(text)
        flat_pages.append("".join(raw_parts).replace("→  ", "→ "))

    return "\n\n".join(layout_pages), "\n".join(flat_pages), pages


def dump_file(path, content):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    if not content.endswith("\n"):
        content += "\n"
    path.write_text(content, encoding="utf-8")


def verify_pdf(
    pdf_path,
    expected_pages=None,
    min_chars=1,
    contains=(),
    dump_text=None,
    dump_raw=None,
    dump_both=True,
    layout=True,
):
    pdf = Path(pdf_path)
    if not pdf.is_file():
        sys.exit(f"Error: {pdf} does not exist")

    layout_text, flat_text, pages = extract_text(pdf)
    primary_text = layout_text if layout else flat_text

    if dump_text:
        dump_file(dump_text, primary_text)
        if dump_both and not dump_raw:
            dump_file(Path(dump_text).with_stem(f"{Path(dump_text).stem}_raw"), flat_text)

    if dump_raw:
        dump_file(dump_raw, flat_text)

    if expected_pages and pages != expected_pages:
        sys.exit(f"Error: expected {expected_pages} page(s), found {pages}")

    text = normalize(primary_text)
    if len(text) < min_chars:
        sys.exit(f"Error: text layer has {len(text)} chars; expected at least {min_chars}")

    for phrase in contains:
        if normalize(phrase) not in text:
            sys.exit(f"Error: missing required text: {phrase!r}")

    print(f"✓ Verified {pdf} ({pages} page(s), {len(text)} chars)")


def parse_args(argv=None):
    parser = argparse.ArgumentParser(description="Verify PDF page count and ATS readability.")
    parser.add_argument("pdf", type=Path, help="PDF file to verify")
    parser.add_argument("--pages", type=int, help="expected page count")
    parser.add_argument("--min-chars", type=int, default=1, help="minimum text characters")
    parser.add_argument("--contains", action="append", default=[], help="required phrase (repeatable)")
    parser.add_argument("--dump-text", type=Path, help="save extracted layout text")
    parser.add_argument("--dump-raw", type=Path, help="save linear raw text")
    parser.add_argument(
        "--dump-both",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="auto dump companion _raw.txt",
    )
    parser.add_argument(
        "--layout",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="preserve layout spacing",
    )
    return parser.parse_args(argv)


def main():
    args = parse_args()
    verify_pdf(
        args.pdf,
        expected_pages=args.pages,
        min_chars=args.min_chars,
        contains=args.contains,
        dump_text=args.dump_text,
        dump_raw=args.dump_raw,
        dump_both=args.dump_both,
        layout=args.layout,
    )


if __name__ == "__main__":
    main()
