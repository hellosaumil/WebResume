# Customization

## Style Guide

Typography hierarchy, spacing, and layout conventions are documented in [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md).

## Theme Colors

Dark mode colors are defined in CSS custom properties in `styles.css`:
- Automatically adapts to device theme on first visit
- Manual toggle persists preference in localStorage

## Section Order

- Drag any section title to reorder
- Order is saved automatically to localStorage
- Reset to default using the Reset button

## Content Updates

Edit any `.md` file in the `data/` directory and commit changes. GitHub Actions will automatically rebuild and deploy your site.
