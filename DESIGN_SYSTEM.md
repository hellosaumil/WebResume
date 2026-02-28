# Typography Standardization Plan

## Goal
Enforce a strict, simplified typography hierarchy across the resume to ensure consistency and clean aesthetics.

## Typography Rules
| Level | Font Size | Weight | Style | Usage Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Heading-1** | `38pt` | `300`/`100` | Normal | Main Name (Header: First/Last)    |
| **Heading-2** | `12pt` | `700` | Normal | Section Titles (Education, Projects) |
| **Title-1** | `9pt` | `500` | Normal | Degree, Skill Label, Job Title, Project Title |
| **Title-2** | `8pt` | `400` | Normal | School Name, Headers inside items |
| **Color-Title-2** | `8pt` | `400` | Normal | Company Name (Accent Color), GPA |
| **Italic-Title-3** | `8pt` | `300` | Italic | Tech Stack, Metadata |
| **Body (Default)** | `8pt` | `300` | Normal | Bullet points, General text, Dates |

## Layout Rules
- **Header Structure**:
    - **Name**: Left-aligned, Heading-1.
    - **Contact Grid**: Two-column layout with split alignment.
        - **Column 1 (Phone, Location)**: Left-aligned (`justify-self: start`).
        - **Column 2 (Email, LinkedIn)**: Right-aligned (`justify-self: end`).
- **Section Spacing**:
    - **Global Section Gap**: `6px` gap in main content + `2px` section margin-bottom.
    - **Internal Rhythym**: Section items (Education, Projects, etc.) use a `4px` margin-bottom for internal spacing.
- **Summary Consistency**:
    - Summary section must follow standard section formatting (no unique borders or extra padding).
    - Summary text uses a `0px` margin-bottom as it is a single cohesive block.
- **Major Transitions**:
    - **Projects Section**: Uses a `border-top` and `padding-top: 8px` to clearly mark the transition to technical projects in the lower half of the resume.

## Implementation Notes
- **Start Date Removal**: The "Start Date" field is permanently removed to decrease header height and focus on core contact info.
- **Header Alignment**: Implemented split-alignment in contact grid (left for phone/location, right for links).
- **Media Query Cleanup**: Consolidated mobile typography overrides within the `max-width: 480px` breakpoint.

## Verification
- Use the **Element Inspector** to verify that hover states match exact pt/weight values.
- Visual check of School vs Degree vs Company.
