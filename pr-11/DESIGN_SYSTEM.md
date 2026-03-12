# Typography Standardization Plan

## Goal
Enforce a strict, simplified typography hierarchy across the resume to ensure consistency and clean aesthetics, optimized for a high-impact 1-page Senior Engineer layout.

## Typography Rules
| Level | Font Size | Weight | Style | Usage Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Heading-1** | `38pt` | `300`/`100` | Normal | Main Name (Header: First/Last)    |
| **Heading-2** | `12pt` | `700` | Normal | Section Titles (Summary, Experience, Projects) |
| **Title-1** | `9pt` | `500` | Normal | Degree, Skill Label, Job Title, Project Title |
| **Title-2** | `8pt` (School: `8.5pt`) | `400` | Normal | School Name (increased by 0.5pt), Headers inside items |
| **Color-Title-2** | `8pt` | `400` | Normal | Company Name (Accent Color), GPA |
| **Italic-Title-3** | `8pt` | `300` | Italic | Tech Stack, Metadata |
| **Body (Default)** | `8pt` | `300` | Normal | Bullet points, General text, Dates |

## Layout Rules & 1-Pager Formatting
- **1-Page Architecture**:
    - Focus heavily on Senior-level experience (Aether, Qualcomm, MBARCO) and high-signal ML projects.
    - Omitted "Leadership" and "Certificates" sections entirely to recover vertical real estate.
    - Reordered structure: Summary → Technical Skills → Experience → Projects → Education → Publications & Awards.
- **Header Structure**:
    - **Name**: Left-aligned, Heading-1.
    - **Contact Grid**: Two-column layout with split alignment. Column 1 (Left-aligned), Column 2 (Right-aligned). Start Date field permanently removed.
- **Education Structure**:
    - Condensed to single lines per degree using flex layout (`.edu-header` and `.edu-right`).
    - Graduation years explicitly omitted. GPA omitted.
    - Commas added for formal presentation (e.g., `M.S., Computer Science`).
- **Section Spacing**:
    - **Global Section Gap**: Consistently `10px` gap in the main content flex container, with `0px` section margin-bottoms for uniform vertical flow. Mobile gap is `12px`.
    - **Internal Rhythm**: Tightened spacing; Education items use a `2px` margin-bottom (reduced from 4px).
- **PDF Rendering Fixes**:
    - Implemented `hyphens: none` and `word-break: keep-all` globally on `.resume-page`, `.summary-text`, and `.bullet-list li` to prevent awkward splitting of hyphenated compound words (e.g., "high-performance", "pinch-to-select") during PDF export and page scaling.
- **Visual Dividers**:
    - Removed arbitrary top borders and negative margin hacks (e.g., Projects border, Publications negative margin) to ensure the 10px flex gap handles all spacing naturally.

## Implementation Notes
- **Header Alignment**: Implemented split-alignment in contact grid (left for phone/location, right for links).
- **Media Query Cleanup**: Consolidated mobile typography overrides within the `max-width: 480px` breakpoint, using flex `gap` instead of margin-bottoms.

## Verification
- Use the **Element Inspector** to verify that hover states match exact pt/weight values.
- Validate PDF export visually to ensure compound words wrap intact without hyphen-breaks.
