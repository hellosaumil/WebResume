# Deployment Guide

All deployments go to the `gh-pages` branch, organized into subfolders:

| URL | Source |
|-----|--------|
| `/` | Latest `main` branch |
| `/demo/` | Latest `demo` branch |
| `/v1/`, `/v2/`, ... | Frozen snapshots on each version tag |
| `/pr-{N}/` | Live PR preview (auto-removed on close) |

## Production Deploy

Automatically triggered on every push to `main`. The site at `https://hellosaumil.github.io/WebResume` is always up to date.

## Demo Deploy

Pushing to the `demo` branch auto-deploys to `https://hellosaumil.github.io/WebResume/demo/`. Use this for sharing a sandbox version with sample/anonymized data.

## Versioned Deployments

Push a tag to create a permanent frozen snapshot:
```bash
git tag -a v2 -m "Version 2"
git push origin v2
```
This deploys to `https://hellosaumil.github.io/WebResume/v2/` automatically.

> **Tip**: Update the "Latest Version" badge in `README.md` to point to the new version when releasing. Search for `Latest-/v` and update the URL.
> Example: `[![Latest Version](https://img.shields.io/badge/📌_Latest-/v3-purple)](https://hellosaumil.github.io/WebResume/v3/)`

To manually deploy an existing tag:
- Go to **Actions → Deploy to GitHub Pages → Run workflow**
- Enter the tag name in the `version_tag` field (e.g. `v1`)

## PR Previews

Every pull request automatically gets a preview deployment:
- Opens at `https://hellosaumil.github.io/WebResume/pr-{N}/`
- A bot comments the preview URL directly on the PR
- Preview is removed automatically when the PR is closed or merged
