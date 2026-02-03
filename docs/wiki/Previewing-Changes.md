# Previewing Changes

Before publishing changes to the live website, it's important to preview how they'll look. This guide covers different ways to check your work.

## Method 1: GitHub's Built-in Preview

GitHub has a simple preview for Markdown files.

### How to Use It

1. When editing a file on GitHub, click the **Preview** tab above the editor
2. This shows your Markdown rendered as formatted text
3. Click **Edit file** to switch back to editing

### Limitations
- Only shows basic Markdown rendering
- Doesn't show how it looks on the actual website
- Images may not display correctly
- No custom styling from the theme

**Best for:** Checking basic formatting and catching typos

## Method 2: Wait for Build

After committing changes, GitHub Actions automatically rebuilds the site.

### Timeline
1. You commit changes
2. GitHub Actions starts building (about 1-2 minutes)
3. New site is deployed to GitHub Pages
4. Changes are live!

### Checking Build Status
1. Go to the repository page
2. Click the **Actions** tab
3. Look for your recent commit
4. Green checkmark = success, Red X = problem

### If Something Goes Wrong
- Check the build log for error messages
- Common issues:
  - Typo in front matter
  - Missing closing `---`
  - Invalid YAML syntax

## Method 3: Local Development (Advanced)

For larger changes, you can run the website locally on your computer.

### Requirements
- Git installed on your computer
- Hugo installed ([installation guide](https://gohugo.io/installation/))
- Basic command line knowledge

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrbell-dev/RC-ARC.git
   cd RC-ARC
   ```

2. **Start the local server**
   ```bash
   hugo serve
   ```

3. **View in browser**
   Open `http://localhost:1313` in your web browser

4. **Make changes**
   Edit files - the page refreshes automatically!

5. **When satisfied, commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

**Best for:** Major changes, testing new features, debugging problems

## What to Check

When previewing, look for:

### Content
- [ ] Text displays correctly
- [ ] Headings are the right level
- [ ] Links work
- [ ] Lists render properly

### Formatting
- [ ] Bold and italic text shows correctly
- [ ] Tables are properly aligned
- [ ] Code blocks are formatted

### Images
- [ ] Images display
- [ ] Alt text is descriptive
- [ ] Images are appropriately sized

### Front Matter
- [ ] Title appears correctly
- [ ] Page is in the right category
- [ ] Date is correct

## Common Preview Issues

### Text runs together
**Problem:** No blank lines between paragraphs
**Fix:** Add a blank line between paragraphs in Markdown

### Heading doesn't work
**Problem:** No space after `#`
**Fix:** Change `#Heading` to `# Heading`

### List doesn't render
**Problem:** Missing blank line before list
**Fix:** Add blank line before the list starts

### Link doesn't work
**Problem:** Wrong syntax
**Fix:** Use `[text](url)` - make sure no space between `]` and `(`

### Image doesn't show
**Problem:** Wrong path or filename
**Fix:** Check filename matches exactly, including case

## Tips for Better Previews

1. **Preview early, preview often** - Don't wait until you've made many changes
2. **Check on mobile** - If possible, view the live site on your phone
3. **Ask someone else to look** - Fresh eyes catch things you might miss
4. **Keep commits small** - Easier to find problems with smaller changes

## Quick Reference: Markdown Preview Checklist

```markdown
# Check these render correctly:

## Heading (level 2)

**Bold text** and *italic text*

- Bullet point
- Another bullet

1. Numbered item
2. Another item

[A link](https://example.com)

| Table | Headers |
|-------|---------|
| Cell  | Cell    |

> A blockquote
```

## After Previewing

Once you're happy with how everything looks:
1. If you haven't already, commit your changes
2. Write a clear commit message
3. Wait for the build to complete
4. Check the live site one more time

## Next Steps

- [Submitting Changes](Submitting-Changes) - Finalize and publish
- [Editing Content](Editing-Content) - Make more changes
