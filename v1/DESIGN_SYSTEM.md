# Typography Standardization Plan

## Goal
Enforce a strict, simplified typography hierarchy across the resume to ensure consistency and clean aesthetics.

## Typography Rules
| Level | Font Size | Weight | Style | Usage Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Heading-1** | `30pt` | `300`/`100` | Normal | Main Name (Header: First/Last) |
| **Heading-2** | `12pt` | `700` | Normal | Section Titles (Education, Projects) |
| **Title-1** | `9pt` | `500` | Normal | Degree, Skill Label, Job Title, Project Title |
| **Title-2** | `8pt` | `400` | Normal | School Name, Headers inside items |
| **Color-Title-2** | `8pt` | `400` | Normal | Company Name (Accent Color), GPA |
| **Italic-Title-3** | `8pt` | `300` | Italic | Tech Stack, Metadata |
| **Body (Default)** | `8pt` | `300` | Normal | Bullet points, General text, Dates |

## Proposed Changes
### `styles.css`
- **Root Variables:** Update variables if necessary, or just hardcode the standardized values to prevent drift.
- **Global Reset:** Set `body` to `8pt`, `300`.
- **Level Classes:**
    - Update `.degree`, `.skill-label`, `.job-title`, `.project-title` to `9pt`, `500`.
    - Update `.school` to `8pt`, `400`.
    - Update `.company` to `8pt`, `400` (plus accent color).
    - Update `.tech-stack`, `.thesis` to `8pt`, `300`, `italic`.
    - Ensure `.date` elements adapt to the `8pt` default or specific level if needed (likely Body or Italic).
- **Cleanup:** Remove `9.5pt`, `8.5pt`, or other "in-between" sizes.

## Verification
- Use the **Element Inspector** to verify that hover states match exact pt/weight values.
- Visual check of School vs Degree vs Company.
