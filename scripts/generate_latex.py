#!/usr/bin/env python3
"""Dynamic LaTeX Resume Generator.

Generates a modern, ATS-friendly LaTeX equivalent (resume.tex) of the
WebResume directly from markdown data in the data/ directory.
Adheres strictly to DESIGN_SYSTEM.md typography hierarchy and 1-page constraints.
"""

import argparse
import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path


def escape_latex(text: str) -> str:
    """Escape LaTeX special characters while preserving intentional syntax."""
    chars = {
        "\\": r"\textbackslash{}",
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"$\sim$",
        "^": r"\textasciicircum{}",
        "<": r"\textless{}",
        ">": r"\textgreater{}",
    }
    # Escape backslash first to avoid double-escaping
    pattern = re.compile(r"([\\&%$#_{}~^<>])")
    return pattern.sub(lambda m: chars[m.group(1)], text)


def md_to_latex(text: str, underline_links: bool = True) -> str:
    """Convert inline Markdown syntax (links, backticks, bold, italics) to LaTeX."""
    if not text:
        return ""

    # Pre-normalize unicode dashes (safe before character escaping)
    text = text.replace("—", "---").replace("–", "--")

    # Token storage to protect already-converted LaTeX macros from character escaping
    tokens = []

    def save_token(val: str) -> str:
        idx = len(tokens)
        tokens.append(val)
        return f"@@TOK{idx}@@"

    # 1. Backticked links: `[text](url)`
    def replace_backtick_link(match):
        label, url = match.group(1), match.group(2)
        escaped_label = escape_latex(label)
        inner = rf"\underline{{\tech{{{escaped_label}}}}}" if underline_links else rf"\tech{{{escaped_label}}}"
        return save_token(rf"\href{{{url}}}{{{inner}}}")

    text = re.sub(r"`\[([^\]]+)\]\(([^)]+)\)`", replace_backtick_link, text)

    # 2. Markdown links: [text](url)
    def replace_link(match):
        label, url = match.group(1), match.group(2)
        escaped_label = escape_latex(label)
        inner = rf"\underline{{{escaped_label}}}" if underline_links else escaped_label
        return save_token(rf"\href{{{url}}}{{{inner}}}")

    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", replace_link, text)

    # 3. Inline code / highlights: `code`
    def replace_code(match):
        code_str = escape_latex(match.group(1))
        return save_token(r"\tech{" + code_str + r"}")

    text = re.sub(r"`([^`]+)`", replace_code, text)

    # 4. Bold text: **text**
    def replace_bold(match):
        bold_str = escape_latex(match.group(1))
        return save_token(r"\textbf{" + bold_str + r"}")

    text = re.sub(r"\*\*([^*]+)\*\*", replace_bold, text)

    # 5. Italic text: *text*
    def replace_italic(match):
        italic_str = escape_latex(match.group(1))
        return save_token(r"\textit{" + italic_str + r"}")

    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", replace_italic, text)

    # 6. Escape remaining raw text
    text = escape_latex(text)

    # 7. Convert math symbols and restore tokens
    text = text.replace("→", r"$\to$").replace("·", r"$\cdot$")

    for i, tok in enumerate(tokens):
        text = text.replace(f"@@TOK{i}@@", tok)

    return text


def parse_key_value(content: str) -> dict:
    """Parse Key: Value formatted text into a dictionary."""
    data = {}
    for line in content.splitlines():
        match = re.match(r"^([^:]+):\s*(.*)$", line)
        if match:
            data[match.group(1).strip().lower()] = match.group(2).strip()
    return data


def parse_sections(content: str) -> list:
    """Parse text blocks separated by '---' into individual dictionaries."""
    sections = []
    for raw in content.split("---"):
        section_data = {}
        for line in raw.strip().splitlines():
            match = re.match(r"^([^:]+):\s*(.*)$", line)
            if match:
                section_data[match.group(1).strip().lower()] = match.group(2).strip()
        if section_data:
            sections.append(section_data)
    return sections


def parse_list(content: str) -> list:
    """Parse bulleted list into lines."""
    return [
        line.strip()[2:].strip()
        for line in content.splitlines()
        if line.strip().startswith("- ")
    ]


def parse_experience(content: str) -> list:
    """Parse experience.md into structured entries."""
    entries = []
    raw_sections = content.split("---")
    for sec in raw_sections:
        lines = sec.strip().splitlines()
        entry = {"companies": [], "content": []}
        for line in lines:
            t = line.strip()
            if t.startswith("## "):
                entry["title"] = t[3:].strip()
            elif t.startswith("### "):
                val = t[4:].strip()
                if val.startswith("Master's Thesis:"):
                    entry["thesis"] = val
                else:
                    entry["companies"].append(val)
            elif t.startswith("#### "):
                entry["date"] = t[5:].strip()
            elif t.startswith("##### "):
                entry["tech"] = t[6:].strip().strip("*")
            elif t.startswith("- "):
                entry["content"].append(t[2:].strip())

        if entry.get("title"):
            entries.append(entry)
    return entries


def parse_projects(content: str) -> list:
    """Parse projects.md into structured entries."""
    entries = []
    raw_sections = content.split("---")
    for sec in raw_sections:
        lines = sec.strip().splitlines()
        entry = {"content": []}
        for line in lines:
            t = line.strip()
            if t.startswith("### "):
                entry["title"] = t[4:].strip()
            elif t.startswith("##### "):
                entry["tech"] = t[6:].strip().strip("*")
            elif t.startswith("- "):
                entry["content"].append(t[2:].strip())

        if entry.get("title"):
            entries.append(entry)
    return entries


def read_file(filepath: Path) -> str:
    """Safely read text from path if it exists."""
    if filepath.is_file():
        return filepath.read_text(encoding="utf-8").strip()
    return ""


def generate_latex(
    data_dir: Path,
    accent_hex: str = "0066CC",
    paper: str = "letter",
    ats_mode: bool = False,
) -> str:
    """Assemble complete LaTeX resume matching classic Jake's Resume LaTeX template."""
    clean_hex = accent_hex.lstrip("#").upper()
    if ats_mode:
        clean_hex = "000000"

    header_data = parse_key_value(read_file(data_dir / "header.md"))
    summary_text = read_file(data_dir / "summary.md")
    skills_lines = parse_list(read_file(data_dir / "skills.md"))
    experience_entries = parse_experience(read_file(data_dir / "experience.md"))
    project_entries = parse_projects(read_file(data_dir / "projects.md"))
    education_entries = parse_sections(read_file(data_dir / "education.md"))
    publications_lines = parse_list(read_file(data_dir / "publications.md"))
    leadership_lines = parse_list(read_file(data_dir / "leadership.md"))
    certificates_lines = parse_list(read_file(data_dir / "certificates.md"))

    firstname = header_data.get("firstname", "")
    lastname = header_data.get("lastname", "")
    fullname = f"{firstname} {lastname}".strip().upper()
    phone = header_data.get("phone", "")
    clean_phone = re.sub(r"[^\d+]", "", phone)
    email = header_data.get("email", "")
    location = header_data.get("location", "")
    linkedin = header_data.get("linkedin", "")
    linkedin_url = linkedin if linkedin.startswith("http") else f"https://{linkedin}"
    website = header_data.get("website", "")
    website_url = website if website.startswith("http") else f"https://{website}"

    paper_spec = "letterpaper" if paper == "letter" else "a4paper"

    lines = []
    lines.append(r"% !TEX root = resume.tex")
    lines.append(r"% ============================================================================")
    lines.append(r"% DYNAMICALLY GENERATED FROM data/*.md - DO NOT EDIT THIS FILE MANUALLY!")
    lines.append(r"% Single Source of Truth: data/ directory")
    lines.append(r"% Template: Classic Academic / Jake's Resume (Computer Modern Default LaTeX)")
    lines.append(rf"% Generated at: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append(r"% ============================================================================")
    lines.append(rf"\documentclass[{paper_spec},10pt]{{article}}")
    lines.append(r"")
    lines.append(r"\usepackage{latexsym}")
    lines.append(r"\usepackage{titlesec}")
    lines.append(r"\usepackage{xcolor}")
    lines.append(r"\usepackage{enumitem}")
    lines.append(r"\usepackage{hyperref}")
    lines.append(r"\usepackage{fancyhdr}")
    lines.append(r"\usepackage{tabularx}")
    lines.append(r"\usepackage{textcomp}")
    lines.append(r"\usepackage{geometry}")
    lines.append(r"")
    lines.append(r"% --- Geometry (Precise 1-page fit with Jake's Resume 10pt/9pt font sizes) ---")
    lines.append(r"\geometry{")
    lines.append(rf"  {paper_spec},")
    lines.append(r"  top=0.22in,")
    lines.append(r"  bottom=0.22in,")
    lines.append(r"  left=0.30in,")
    lines.append(r"  right=0.30in")
    lines.append(r"}")
    lines.append(r"\pagestyle{empty}")
    lines.append(r"\urlstyle{same}")
    lines.append(r"\raggedbottom")
    lines.append(r"\raggedright")
    lines.append(r"\setlength{\tabcolsep}{0in}")
    lines.append(r"\renewcommand{\arraystretch}{0.92}")
    lines.append(r"")
    lines.append(r"% --- Color Setup ---")
    lines.append(r"\definecolor{textdark}{RGB}{0,0,0}")
    lines.append(rf"\definecolor{{accentcolor}}{{HTML}}{{{clean_hex}}}")
    lines.append(r"")
    lines.append(r"% --- Section Formatting (True Small Caps 12pt \large matching Jake's Resume) ---")
    lines.append(r"\titleformat{\section}{")
    lines.append(r"  \scshape\raggedright\large")
    lines.append(r"}{}{0em}{}[\color{black}\titlerule]")
    lines.append(r"\titlespacing*{\section}{0pt}{3pt}{1.5pt}")
    lines.append(r"")
    lines.append(r"% --- Custom Commands (Jake's Resume Macros) ---")
    lines.append(r"\newcommand{\tech}[1]{\textbf{#1}}")
    lines.append(r"\newcommand{\resumeItem}[1]{")
    lines.append(r"  \item\fontsize{8.5pt}{9.4pt}\selectfont{#1}")
    lines.append(r"}")
    lines.append(r"")
    lines.append(r"\newcommand{\resumeSubheading}[4]{")
    lines.append(r"  \item")
    lines.append(r"    \begin{tabular*}{\linewidth}{@{\extracolsep{\fill}}lr}")
    lines.append(r"      \textbf{\textcolor{accentcolor}{#1}} & #2 \\")
    lines.append(r"      \textbf{\textit{#3}} & \textit{#4} \\")
    lines.append(r"    \end{tabular*}\vspace{-1.5pt}")
    lines.append(r"}")
    lines.append(r"")
    lines.append(r"\newcommand{\resumeProjectHeading}[2]{")
    lines.append(r"  \item")
    lines.append(r"    \begin{tabular*}{\linewidth}{@{\extracolsep{\fill}}lr}")
    lines.append(r"      \textbf{#1} & \\")
    lines.append(r"      \textit{\small #2} & \\")
    lines.append(r"    \end{tabular*}\vspace{-1.5pt}")
    lines.append(r"}")
    lines.append(r"")
    lines.append(
        r"\newcommand{\resumeSubHeadingListStart}{"
        r"\begin{itemize}[leftmargin=0in, label={}, "
        r"topsep=1pt, itemsep=1.5pt, parsep=0pt, partopsep=0pt]}"
    )
    lines.append(r"\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}")
    lines.append(
        r"\newcommand{\resumeItemListStart}{"
        r"\begin{itemize}[leftmargin=10pt, label=\small$\bullet$, "
        r"topsep=1pt, itemsep=-0.8pt, parsep=0pt, partopsep=0pt]}"
    )
    lines.append(r"\newcommand{\resumeItemListEnd}{\end{itemize}}")
    lines.append(r"")
    lines.append(r"\begin{document}")
    lines.append(r"")

    # Header
    lines.append(r"% --- HEADER ---")
    lines.append(r"\begin{center}")
    lines.append(rf"    \textbf{{\Huge {fullname}}} \\[2pt]")
    header_items = []
    if location:
        header_items.append(escape_latex(location))
    if phone:
        header_items.append(rf"\href{{tel:{clean_phone}}}{{{escape_latex(phone)}}}")
    if email:
        header_items.append(rf"\href{{mailto:{email}}}{{\underline{{{escape_latex(email)}}}}}")
    if linkedin:
        header_items.append(rf"\href{{{linkedin_url}}}{{\underline{{{escape_latex(linkedin)}}}}}")
    if website:
        header_items.append(rf"\href{{{website_url}}}{{\underline{{{escape_latex(website)}}}}}")
    lines.append(r"    \small " + r" \textopenbullet\ ".join(header_items))
    lines.append(r"\end{center}")
    lines.append(r"\hypersetup{pdfborder={0 0 0}}")
    lines.append(r"\vspace{-11pt}")
    lines.append(r"")

    # Summary
    if summary_text:
        lines.append(r"% --- SUMMARY ---")
        lines.append(r"\section{Summary}")
        lines.append(
            r"\begin{itemize}[leftmargin=0in, label={}, "
            r"topsep=1pt, itemsep=0pt, parsep=0pt, partopsep=0pt]"
        )
        lines.append(rf"  \item\fontsize{{8.5pt}}{{9.4pt}}\selectfont{{{md_to_latex(summary_text)}}}")
        lines.append(r"\end{itemize}")
        lines.append(r"")

    # Technical Skills
    if skills_lines:
        lines.append(r"% --- TECHNICAL SKILLS ---")
        lines.append(r"\section{Technical Skills}")
        lines.append(r"\resumeSubHeadingListStart")
        for s_line in skills_lines:
            lines.append(rf"  \item\fontsize{{8.5pt}}{{9.4pt}}\selectfont{{{md_to_latex(s_line)}}}")
        lines.append(r"\resumeSubHeadingListEnd")
        lines.append(r"")

    # Experience
    if experience_entries:
        lines.append(r"% --- PROFESSIONAL EXPERIENCE ---")
        lines.append(r"\section{Professional Experience}")
        lines.append(r"\resumeSubHeadingListStart")
        for exp in experience_entries:
            title_tex = md_to_latex(exp.get("title", ""), underline_links=False)
            date_tex = md_to_latex(exp.get("date", ""), underline_links=False)
            company_raw = " --- ".join(exp.get("companies", []))

            # Split company and location
            if " — " in company_raw:
                parts = company_raw.split(" — ", 1)
                co_tex = md_to_latex(parts[0].strip(), underline_links=False)
                loc_tex = md_to_latex(parts[1].strip(), underline_links=False)
            elif "---" in company_raw:
                parts = company_raw.split("---", 1)
                co_tex = md_to_latex(parts[0].strip(), underline_links=False)
                loc_tex = md_to_latex(parts[1].strip(), underline_links=False)
            else:
                co_tex = md_to_latex(company_raw, underline_links=False)
                loc_tex = ""

            lines.append(
                rf"  \resumeSubheading{{{co_tex}}}{{{loc_tex}}}"
                rf"{{{title_tex}}}{{{date_tex}}}"
            )
            if exp.get("thesis"):
                lines.append(
                    rf"  \vspace{{-5pt}}\par\noindent\fontsize{{8.5pt}}{{9.4pt}}\selectfont{{\textit{{{md_to_latex(exp['thesis'])}}}}}\vspace{{-1.5pt}}"
                )
            if exp.get("tech") or exp.get("content"):
                lines.append(r"  \resumeItemListStart")
                if exp.get("tech"):
                    lines.append(rf"    \resumeItem{{\textit{{{md_to_latex(exp['tech'])}}}}}")
                for bullet in exp.get("content", []):
                    lines.append(rf"    \resumeItem{{{md_to_latex(bullet)}}}")
                lines.append(r"  \resumeItemListEnd")
        lines.append(r"\resumeSubHeadingListEnd")
        lines.append(r"")

    # Projects
    if project_entries:
        lines.append(r"% --- RESEARCH AND PROJECTS ---")
        lines.append(r"\section{Research and Projects}")
        lines.append(r"\resumeSubHeadingListStart")
        for proj in project_entries:
            title_tex = md_to_latex(proj.get("title", ""))
            tech_tex = md_to_latex(proj.get("tech", ""))

            lines.append(rf"  \resumeProjectHeading{{{title_tex}}}{{{tech_tex}}}")
            if proj.get("content"):
                lines.append(r"  \resumeItemListStart")
                for bullet in proj["content"]:
                    lines.append(rf"    \resumeItem{{{md_to_latex(bullet)}}}")
                lines.append(r"  \resumeItemListEnd")
        lines.append(r"\resumeSubHeadingListEnd")
        lines.append(r"")

    # Education
    if education_entries:
        lines.append(r"% --- EDUCATION ---")
        lines.append(r"\section{Education}")
        lines.append(r"\resumeSubHeadingListStart")
        for edu in education_entries:
            deg = md_to_latex(edu.get("degree", ""))
            sch = md_to_latex(edu.get("school", ""))
            lines.append(r"  \item")
            lines.append(
                rf"    \begin{{tabular*}}{{\linewidth}}{{@{{\extracolsep{{\fill}}}}lr}}"
                rf"\textbf{{{sch}}} & \textit{{{deg}}} \\"
                rf"\end{{tabular*}}"
            )
        lines.append(r"\resumeSubHeadingListEnd")
        lines.append(r"")

    # Publications & Awards
    if publications_lines:
        lines.append(r"% --- PUBLICATIONS & AWARDS ---")
        lines.append(r"\section{Publications \& Awards}")
        lines.append(r"\resumeItemListStart")
        for pub in publications_lines:
            lines.append(rf"  \resumeItem{{{md_to_latex(pub)}}}")
        lines.append(r"\resumeItemListEnd")
        lines.append(r"")

    # Leadership & Certificates
    if leadership_lines:
        lines.append(r"% --- LEADERSHIP ---")
        lines.append(r"\section{Leadership}")
        lines.append(r"\resumeSubHeadingListStart")
        for lead in leadership_lines:
            lines.append(rf"  \item\fontsize{{9pt}}{{9.8pt}}\selectfont{{{md_to_latex(lead)}}}")
        lines.append(r"\resumeSubHeadingListEnd")
        lines.append(r"")

    if certificates_lines:
        lines.append(r"% --- CERTIFICATES ---")
        lines.append(r"\section{Certificates}")
        lines.append(r"\resumeSubHeadingListStart")
        for cert in certificates_lines:
            lines.append(rf"  \item\fontsize{{9pt}}{{9.8pt}}\selectfont{{{md_to_latex(cert)}}}")
        lines.append(r"\resumeSubHeadingListEnd")
        lines.append(r"")

    lines.append(r"\end{document}")
    lines.append(r"")

    return "\n".join(lines)


def compile_latex(tex_path: Path) -> bool:
    """Attempt compilation with local pdflatex, tectonic, xelatex, or lualatex."""
    local_pdflatex = Path.home() / ".local" / "bin" / "pdflatex"
    local_tectonic = Path.home() / ".local" / "bin" / "tectonic"
    engine = None
    if local_pdflatex.is_file() and os.access(str(local_pdflatex), os.X_OK):
        engine = str(local_pdflatex)
    elif shutil.which("pdflatex"):
        engine = shutil.which("pdflatex")
    elif local_tectonic.is_file() and os.access(str(local_tectonic), os.X_OK):
        engine = str(local_tectonic)
    else:
        engine = (
            shutil.which("tectonic")
            or shutil.which("xelatex")
            or shutil.which("lualatex")
        )

    if not engine:
        print("Note: No local TeX engine (tectonic, pdflatex, xelatex) found in PATH.")
        print(f"You can compile '{tex_path.name}' instantly on Overleaf or with Docker.")
        return False

    cmd = [engine, "-interaction=nonstopmode", tex_path.name]
    if "tectonic" in Path(engine).name:
        cmd = [engine, tex_path.name]

    print(f"Compiling with {Path(engine).name}...")
    res = subprocess.run(cmd, cwd=tex_path.parent, capture_output=True, text=True)
    if res.returncode == 0:
        pdf_path = tex_path.with_suffix(".pdf")
        print(f"✓ Compilation successful: {pdf_path}")
        return True
    else:
        print(f"Compilation error:\n{res.stdout[-500:]}\n{res.stderr[-500:]}")
        return False


def watch_data_dir(data_dir: Path, output_path: Path, compile_pdf: bool = True, **kwargs):
    """Watch data/ directory and regenerate resume.tex and PDF on any file modification."""
    print(f"Watching {data_dir} for changes... (Press Ctrl+C to stop)")
    last_mtimes = {}

    def get_mtimes():
        mtimes = {}
        for p in data_dir.glob("*.md"):
            mtimes[p] = p.stat().st_mtime
        return mtimes

    last_mtimes = get_mtimes()
    try:
        while True:
            time.sleep(1.0)
            current_mtimes = get_mtimes()
            if current_mtimes != last_mtimes:
                print(f"[{time.strftime('%H:%M:%S')}] Detected change in data/. Regenerating...")
                tex_code = generate_latex(data_dir, **kwargs)
                output_path.parent.mkdir(parents=True, exist_ok=True)
                output_path.write_text(tex_code, encoding="utf-8")
                print(f"Regenerated {output_path}")
                if compile_pdf:
                    compile_latex(output_path)
                last_mtimes = current_mtimes
    except KeyboardInterrupt:
        print("\nStopped watching.")


def main():
    parser = argparse.ArgumentParser(
        description="Dynamic LaTeX Resume Generator from Markdown",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "--data-dir",
        type=Path,
        default=Path("data"),
        help="Path to resume data markdown directory",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=Path("test/exports/resume.tex"),
        help="Output .tex file path (defaults to gitignored test/exports/resume.tex)",
    )
    parser.add_argument(
        "--accent",
        type=str,
        default="0066CC",
        help="Hex color code for company links and highlights (e.g. 0066CC)",
    )
    parser.add_argument(
        "--paper",
        choices=["letter", "a4"],
        default="letter",
        help="Target paper size",
    )
    parser.add_argument(
        "--ats",
        action="store_true",
        help="Generate pure monochrome ATS-compliant LaTeX (no colors)",
    )
    parser.add_argument(
        "--no-pdf",
        action="store_true",
        help="Skip automatic compilation to PDF",
    )
    parser.add_argument(
        "-w",
        "--watch",
        action="store_true",
        help="Watch data/ directory and regenerate automatically on changes",
    )

    args = parser.parse_args()

    if not args.data_dir.exists():
        print(f"Error: Data directory '{args.data_dir}' does not exist.", file=sys.stderr)
        sys.exit(1)

    tex_code = generate_latex(
        data_dir=args.data_dir,
        accent_hex=args.accent,
        paper=args.paper,
        ats_mode=args.ats,
    )

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(tex_code, encoding="utf-8")
    print(f"Generated dynamic LaTeX resume: {args.output} ({len(tex_code)} bytes)")

    compile_pdf = not args.no_pdf
    if compile_pdf:
        compile_latex(args.output)

    if args.watch:
        watch_data_dir(
            data_dir=args.data_dir,
            output_path=args.output,
            compile_pdf=compile_pdf,
            accent_hex=args.accent,
            paper=args.paper,
            ats_mode=args.ats,
        )


if __name__ == "__main__":
    main()
