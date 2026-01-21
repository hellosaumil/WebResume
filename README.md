# WebResume 🌐 💻 📄

A modern, interactive web-based resume with dynamic content loading, dark mode, and customizable layout.

- 🔗 Live Site - **[https://hellosaumil.github.io/WebResume](https://hellosaumil.github.io/WebResume)**
- 💻 Local Site - **[http://localhost:3000/index.html](http://localhost:3000/index.html)**

## ✨ Features

### Core Functionality
- **Dynamic Content Loading**: Resume data loaded from easy-to-edit Markdown files in the `data/` directory
- **Live Editing**: All content is directly editable in the browser
- **Print Ready**: Optimized for PDF export and printing with US Letter page constraints

### Interactive Features
- **Dark Mode**: Automatic device theme detection with manual toggle support
- **Section Reordering**: Drag section titles to customize your resume layout
- **CSS Inspector**: Hover over elements to see font properties (enabled by default)
- **Page Preview Toggle**: Show/hide page boundaries and constraints (enabled by default)
- **Interactive Links**: Clickable email, phone, and LinkedIn with smart tooltips

### UI/UX Enhancements
- **Persistent Settings**: Theme, layout, and section order saved to localStorage
- **Device Theme Detection**: Automatically matches your system's light/dark preference
- **Link Tooltips**: Hover over any link to see the URL with a quick-open button
- **Inspector Tooltips**: Real-time CSS property inspection with color-coded highlights
- **Drag & Drop Feedback**: Visual indicators during section reordering

## 🚀 Getting Started

### View Live
Simply visit **[https://hellosaumil.github.io/WebResume](https://hellosaumil.github.io/WebResume)**

### Local Development

1. **Start the local server**:
   ```bash
   python3 -m http.server 3000
   ```

2. **Open in browser**:
   Navigate to [http://127.0.0.1:3000](http://127.0.0.1:3000)

3. **Edit content**:
   - Modify any `.md` file in the `data/` directory
   - Refresh the browser to see changes

## 📁 Project Structure

```
WebResume/
├── index.html          # Main HTML structure (renamed from resume.html)
├── styles.css          # Styling with dark mode support
├── script.js           # Dynamic loading and interactive features
├── _config.yml         # Jekyll configuration for GitHub Pages
├── data/               # Resume content in Markdown
│   ├── header.md
│   ├── education.md
│   ├── experience.md
│   ├── projects.md
│   ├── skills.md
│   ├── publications.md
│   ├── leadership.md
│   └── certificates.md
└── .github/
    └── workflows/
        └── jekyll-gh-pages.yml  # Automated deployment
```

## 📝 Data Format

### Header (`header.md`)
```markdown
FirstName: Your
LastName: Name
Phone: (123) 456-7890
Email: your.email@example.com
Location: City, State
LinkedIn: linkedin.com/in/yourprofile
StartDate: Available Date
```

### Experience & Projects (`experience.md`, `projects.md`)
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

### Education (`education.md`)
```markdown
Degree: Master of Science, Computer Science
School: University Name
Date: 2020
GPA: GPA 4.0
---
Degree: Bachelor of Technology...
...
```

### Skills (`skills.md`)
```markdown
- **Programming:** Python, JavaScript, TypeScript
- **Tools & Frameworks:** React, Node.js, Docker
```

### Lists (`publications.md`, `leadership.md`, `certificates.md`)
```markdown
- `[Publication Title](https://doi.org/example)` — Conference Name
- **Role** — Organization/Event Details
```

## 🎮 Controls

The floating control panel (bottom-right) includes:

- **🌙 Dark Mode** (moon/sun icon): Toggle dark mode or auto-detect device theme
- **🧊 CSS Inspector** (cube icon): Toggle CSS property inspection on hover (default: ON)
- **📄 Page Preview** (document icon): Toggle US Letter page constraints and guides (default: ON)
- **✖️ Reset** (X icon): Reload all content from Markdown files and clear edits

### Keyboard Shortcuts
- Drag section titles to reorder sections
- Click any editable content to modify in place
- Toggle controls to customize your viewing experience

## 🛠️ Technologies

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **Content**: Markdown for structured data
- **Fonts**: Google Fonts (Google Sans Flex, Space Grotesk)
- **Hosting**: GitHub Pages with Jekyll
- **CI/CD**: GitHub Actions for automated deployment
- **Storage**: localStorage for persistent user preferences

## 🎨 Customization

### Theme Colors
Dark mode colors are defined in CSS custom properties in `styles.css`:
- Automatically adapts to device theme on first visit
- Manual toggle persists preference in localStorage

### Section Order
- Drag any section title to reorder
- Order is saved automatically to localStorage
- Reset to default using the Reset button

### Content Updates
Edit any `.md` file in the `data/` directory and commit changes. GitHub Actions will automatically rebuild and deploy your site.

## 📦 Deployment

This project uses a dual-branch deployment strategy:

- **`main` branch**: Private development branch for working on new features and content updates
- **`publish` branch**: Public deployment branch that triggers GitHub Actions

### Deployment Workflow

1. Make changes and commit to the `main` branch
2. When ready to deploy, merge `main` into `publish`:
   ```bash
   git checkout publish
   git merge main
   git push origin publish
   ```
3. GitHub Actions automatically builds and deploys to `https://hellosaumil.github.io/WebResume`

### Manual Repository Setup

After cloning, set up the `publish` branch:
```bash
# Create publish branch from main
git checkout -b publish
git push -u origin publish

# Return to main for development
git checkout main
```

Configure GitHub Pages to deploy from the `publish` branch in repository Settings → Pages.

## 🔧 Advanced Features

### CSS Inspector
- **Default**: Enabled on page load
- **Tooltip Types**: Shows class names, font size, and font weight
- **Color Coding**: Different highlight colors for headers, lists, and links

### Section Reordering
- **Drag Handle**: Section titles act as drag handles
- **Visual Feedback**: Inspector-style borders during drag
- **Persistence**: Order saved to localStorage
- **Reset**: Clear order with Reset button

### Link Intelligence
- **Auto-formatting**: Email, phone, and LinkedIn auto-linked
- **Tooltips**: Hover to preview full URL
- **Quick Open**: Click tooltip button to open in new tab

## 📄 License

MIT License - feel free to use this template for your own resume!
