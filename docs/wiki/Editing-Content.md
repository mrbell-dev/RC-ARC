# Editing Content

This guide shows you how to make changes to existing pages on the website.

## Finding the File to Edit

1. Go to the [RC-ARC repository](https://github.com/mrbell-dev/RC-ARC)
2. Navigate to the `content/` folder
3. Find the page you want to edit:
   - **Home page:** `_index.md`
   - **Static pages:** Look in `pages/` folder (e.g., `pages/meetings.md`)
   - **Events:** Look in `events/` folder (e.g., `events/field-day.md`)
   - **Posts:** Look in `posts/` folder

## Using GitHub's Web Editor

### Step 1: Open the File
1. Click on the file you want to edit
2. You'll see the file contents displayed

### Step 2: Enter Edit Mode
1. Click the **pencil icon** (top right of the file content)
2. The file will now be editable

### Step 3: Make Your Changes
- Edit the text directly
- Use Markdown formatting (see below)
- Be careful not to change the section at the top between `---` marks (that's the "front matter")

### Step 4: Preview Your Changes
1. Click the **Preview** tab above the editor
2. Check that your formatting looks correct
3. Click **Edit file** tab to continue editing if needed

### Step 5: Save Your Changes
1. Scroll down to "Commit changes"
2. Write a short description of what you changed (e.g., "Updated meeting time")
3. Keep "Commit directly to main branch" selected
4. Click **Commit changes**

Your changes will go live within a few minutes!

## Understanding Front Matter

Every page starts with a section between `---` marks called "front matter." This controls page settings:

```yaml
---
title: "Page Title"
date: 2026-02-04
description: "A short description for search engines"
categories: [Club Info]
tags: [meetings, schedule]
---
```

**What each field means:**

| Field | Purpose | Example |
|-------|---------|---------|
| `title` | The page heading | `"Club Meetings"` |
| `date` | When the post was created/updated | `2026-02-04` |
| `description` | Shows in search results | `"Monthly meeting info"` |
| `categories` | Groups similar content | `[Club Info]`, `[Activities]` |
| `tags` | Keywords for finding content | `[meetings, schedule]` |

**Tip:** Only change front matter if you know what you're doing. The main content is below the second `---`.

## Markdown Quick Reference

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
```

### Headings
```markdown
# Main Heading
## Section Heading
### Subsection Heading
```

### Links
```markdown
[Link text](https://example.com)
[Link to another page](/pages/meetings/)
```

### Lists
```markdown
- Bullet point
- Another bullet

1. Numbered item
2. Another numbered item
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Common Edits

### Updating Meeting Information
1. Go to `content/pages/meetings.md`
2. Edit the meeting time, location, or other details
3. Commit your changes

### Updating Contact Information
1. Go to `content/pages/contact.md`
2. Update email, phone, or address as needed
3. Commit your changes

### Updating Repeater Information
1. Go to `content/pages/repeaters.md`
2. Update frequencies, tones, or other details
3. Commit your changes

## Tips for Editing

- **Make small changes:** It's easier to fix mistakes if you change a little at a time
- **Preview first:** Always check the Preview tab before committing
- **Write clear commit messages:** Describe what you changed so others know what happened
- **Don't panic:** If you make a mistake, all previous versions are saved in GitHub's history

## Next Steps

- [Creating New Posts](Creating-New-Posts) - Add new articles
- [Adding Images](Adding-Images) - Include pictures in your posts
