#!/usr/bin/env python3
"""Tests for Dynamic LaTeX Resume Generator."""

import unittest
from pathlib import Path
from scripts.generate_latex import (
    escape_latex,
    generate_latex,
    md_to_latex,
    parse_experience,
    parse_key_value,
    parse_list,
    parse_projects,
    parse_sections,
)


class TestLatexGenerator(unittest.TestCase):
    def setUp(self):
        self.data_dir = Path("data")

    def test_escape_latex(self):
        raw = r"100% test & $50 #1 _foo_ {bar} ^top ~home \path <$0.20 >90%"
        escaped = escape_latex(raw)
        self.assertIn(r"\%", escaped)
        self.assertIn(r"\&", escaped)
        self.assertIn(r"\$", escaped)
        self.assertIn(r"\#", escaped)
        self.assertIn(r"\_", escaped)
        self.assertIn(r"\{", escaped)
        self.assertIn(r"\}", escaped)
        self.assertIn(r"\textasciicircum{}", escaped)
        self.assertIn(r"$\sim$", escaped)
        self.assertIn(r"\textless{}", escaped)
        self.assertIn(r"\textgreater{}", escaped)

    def test_md_to_latex_formatting(self):
        text = "Built `API` with **Python** and *FastAPI* for [Qualcomm](https://example.com) — 99% uptime."
        result = md_to_latex(text)
        self.assertIn(r"\tech{API}", result)
        self.assertIn(r"\textbf{Python}", result)
        self.assertIn(r"\textit{FastAPI}", result)
        self.assertIn(r"\href{https://example.com}{\underline{Qualcomm}}", result)
        self.assertIn(r"---", result)
        self.assertIn(r"99\%", result)

    def test_md_to_latex_backtick_link(self):
        text = "Master's Thesis: `[Learning to Detect Odontocete Whistles](https://example.com)`, Advisor: Dr. Roch"
        result = md_to_latex(text)
        self.assertIn(
            r"\href{https://example.com}{\underline{\tech{Learning to Detect Odontocete Whistles}}}",
            result,
        )

    def test_md_to_latex_arrow_and_dot(self):
        text = "Pipeline: extract → score · evaluation"
        result = md_to_latex(text)
        self.assertIn(r"$\to$", result)
        self.assertIn(r"$\cdot$", result)

    def test_parse_key_value(self):
        raw = "FirstName: Saumil\nLastName: Shah\nPhone: (858)-324-4496"
        data = parse_key_value(raw)
        self.assertEqual(data["firstname"], "Saumil")
        self.assertEqual(data["lastname"], "Shah")
        self.assertEqual(data["phone"], "(858)-324-4496")

    def test_parse_sections(self):
        raw = "Degree: M.S.\nSchool: SDSU\n---\nDegree: B.Tech.\nSchool: AU"
        secs = parse_sections(raw)
        self.assertEqual(len(secs), 2)
        self.assertEqual(secs[0]["degree"], "M.S.")
        self.assertEqual(secs[1]["school"], "AU")

    def test_parse_list(self):
        raw = "- Item 1\n- Item 2\n"
        items = parse_list(raw)
        self.assertEqual(items, ["Item 1", "Item 2"])

    def test_parse_experience(self):
        raw = (
            "## Senior Engineer\n"
            "### [Company](http://co.com) — City, ST\n"
            "#### 2021 - Present\n"
            "**Core Platform**\n"
            "- Did amazing things\n"
        )
        entries = parse_experience(raw)
        self.assertEqual(len(entries), 1)
        self.assertEqual(entries[0]["title"], "Senior Engineer")
        self.assertEqual(entries[0]["date"], "2021 - Present")
        self.assertEqual(entries[0]["companies"], ["[Company](http://co.com) — City, ST"])
        self.assertEqual(entries[0]["content"], ["Did amazing things"])
        self.assertEqual(entries[0]["items"], [
            {"type": "subheading", "text": "**Core Platform**"},
            {"type": "bullet", "text": "Did amazing things"},
        ])

    def test_parse_projects(self):
        raw = (
            "### [Project 1](http://proj.com)\n"
            "##### Python, Docker\n"
            "- Shipped v1\n"
        )
        entries = parse_projects(raw)
        self.assertEqual(len(entries), 1)
        self.assertEqual(entries[0]["title"], "[Project 1](http://proj.com)")
        self.assertEqual(entries[0]["tech"], "Python, Docker")
        self.assertEqual(entries[0]["content"], ["Shipped v1"])

    def test_generate_latex_default(self):
        tex = generate_latex(self.data_dir)
        self.assertIn(r"\documentclass[letterpaper,10pt]{article}", tex)
        self.assertIn("SAUMIL SHAH", tex)
        self.assertIn("Qualcomm", tex)
        self.assertIn("San Diego State University", tex)
        self.assertIn("Satellite Terrain Classification", tex)
        self.assertIn(r"\definecolor{accentcolor}{HTML}{0066CC}", tex)
        self.assertIn(r"\end{document}", tex)

    def test_generate_latex_ats_mode(self):
        tex = generate_latex(self.data_dir, ats_mode=True)
        self.assertIn(r"\definecolor{accentcolor}{HTML}{000000}", tex)

    def test_generate_latex_a4_paper(self):
        tex = generate_latex(self.data_dir, paper="a4")
        self.assertIn(r"\documentclass[a4paper,10pt]{article}", tex)

    def test_braces_balance(self):
        tex = generate_latex(self.data_dir)
        # Verify opening and closing braces balance in non-escaped context
        cleaned = tex.replace(r"\{", "").replace(r"\}", "")
        open_count = cleaned.count("{")
        close_count = cleaned.count("}")
        self.assertEqual(open_count, close_count, "LaTeX braces are not balanced!")


if __name__ == "__main__":
    unittest.main()
