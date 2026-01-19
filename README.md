# Web Resume

A modern, interactive web-based resume built with dynamic data loading from Markdown files.

## 🔗 Links

- **Live Resume**: [http://127.0.0.1:3000/resume.html](http://127.0.0.1:3000/resume.html)

## Features

- **Dynamic Content Loading**: Resume data is loaded from easy-to-edit Markdown files
- **Live Editing**: Content is editable directly in the browser
- **Print Ready**: Optimized for PDF export and printing
- **Page Layout Toggle**: Toggle between fluid and constrained page layouts
- **CSS Inspector**: Built-in development tool to inspect font sizes, weights, and classes
- **Clickable Contact Info**: Email, phone, and LinkedIn links are interactive

## Project Structure

```
WebResume/
├── resume.html         # Main HTML structure
├── styles.css          # Styling and print layout
├── script.js           # Dynamic data loading and interactions
└── data/               # Resume content in Markdown
    ├── header.md
    ├── education.md
    ├── experience.md
    ├── projects.md
    ├── skills.md
    ├── publications.md
    ├── leadership.md
    └── certificates.md
```

## Getting Started

1. **Start the local server**:
   ```bash
   python3 -m http.server 3000
   ```

2. **Open in browser**:
   Navigate to [http://127.0.0.1:3000/resume.html](http://127.0.0.1:3000/resume.html)

3. **Edit content**:
   - Modify any `.md` file in the `data/` directory
   - Refresh the browser to see changes

## Data Format

### Header (`header.md`)
```markdown
Name: Your Name
Phone: +1-XXX-XXX-XXXX
Email: your.email@example.com
Location: City, State
LinkedIn: linkedin.com/in/yourprofile
StartDate: Available Date
```

### Experience & Projects (`experience.md`, `projects.md`)
```markdown
## Job Title
### Company Name — Location
#### Date Range
##### *Tech Stack*
- Bullet point 1
- Bullet point 2

---
## Next Job Title
...
```

### Education (`education.md`)
```markdown
Degree: Master of Science, Computer Science
School: University Name
Date: 2020
GPA: GPA 3.8
---
Degree: Bachelor of Technology...
...
```

### Skills (`skills.md`)
```markdown
- **Category:** Skill1, Skill2, Skill3
- **Another Category:** More skills
```

### Lists (`publications.md`, `leadership.md`, `certificates.md`)
```markdown
- **Title:** Description or details
- Another item
```

## Controls

- **CSS Inspector** (cube icon): Toggle to inspect font properties on hover
- **Page Layout** (layout icon): Toggle A4/Letter page constraints and guides
- **Reset** (refresh icon): Reload all content from Markdown files

## Technologies

- Pure HTML/CSS/JavaScript (no frameworks)
- Markdown for content management
- Google Fonts (Google Sans Flex, Space Grotesk)
- Local HTTP server for development
