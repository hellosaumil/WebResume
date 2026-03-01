# Data Format Reference

Resume content lives in Markdown files under the `data/` directory. Each file follows a specific format that the parser expects.

## Header (`header.md`)
```markdown
FirstName: Your
LastName: Name
Phone: (123) 456-7890
Email: your.email@example.com
Location: City, State
LinkedIn: linkedin.com/in/yourprofile
```

## Summary (`summary.md`)
```markdown
One or two sentence professional summary paragraph.
```

## Experience & Projects (`experience.md`, `projects.md`)
```markdown
## Job Title
### [Company Name](https://example.com) — Location
#### Date Range
##### *Tech Stack: Python, JavaScript, AWS*
- Bullet point with `code formatting`
- Another bullet with **bold text**

---
## Next Job Title
...
```

## Education (`education.md`)
```markdown
Degree: Master of Science, Computer Science
School: University Name
Date: 2020
GPA: GPA 4.0
---
Degree: Bachelor of Technology...
...
```

## Skills (`skills.md`)
```markdown
- **Programming:** Python, JavaScript, TypeScript
- **Tools & Frameworks:** React, Node.js, Docker
```

## Lists (`publications.md`, `leadership.md`, `certificates.md`)
```markdown
- `[Publication Title](https://doi.org/example)` — Conference Name
- **Role** — Organization/Event Details
```
