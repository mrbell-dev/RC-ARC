# Submitting Changes

This guide covers how to save (commit) your changes and what happens after.

## Understanding Commits

A **commit** is like a save point in a video game. It:
- Saves your changes permanently
- Records who made the change and when
- Includes a message describing what changed
- Can be undone if needed

Every time you save changes on GitHub, you're creating a commit.

## How to Commit Changes

### When Editing an Existing File

1. Make your changes in the file editor
2. Scroll down to find "Commit changes"
3. Fill in the commit form:
   - **Commit message** (required): Brief description of what you changed
   - **Extended description** (optional): More details if needed
4. Keep "Commit directly to the `main` branch" selected
5. Click **Commit changes**

### When Creating a New File

1. After adding your content, scroll down
2. Fill in the commit form as above
3. Click **Commit new file**

### When Uploading Files

1. After selecting files to upload
2. Write a commit message
3. Click **Commit changes**

## Writing Good Commit Messages

### Do's
- Be brief but descriptive (under 50 characters is ideal)
- Use present tense ("Add" not "Added")
- Explain what and why, not how

### Examples

| Good | Bad |
|------|-----|
| `Update meeting time to 7:30 PM` | `changes` |
| `Add Field Day 2025 photos` | `added stuff` |
| `Fix typo in repeater frequency` | `fixed it` |
| `Add Winter Field Day event post` | `new file` |

### Templates
- `Add [thing]` - When creating new content
- `Update [thing]` - When modifying existing content
- `Fix [thing]` - When correcting errors
- `Remove [thing]` - When deleting content

## What Happens After You Commit

### 1. GitHub Receives Your Changes
Your commit is saved to the repository immediately.

### 2. GitHub Actions Triggers
An automated build process starts within seconds.

### 3. Site Rebuilds
Hugo processes all the content and generates the website (1-2 minutes).

### 4. Deployment
The new site is deployed to GitHub Pages.

### 5. Changes Go Live
Your updates are visible on the website!

**Total time:** Usually 2-3 minutes from commit to live.

## Checking Your Commit

### View Recent Commits
1. Go to the repository main page
2. Click on "commits" (shows the number of commits)
3. Find your commit in the list
4. Click on it to see exactly what changed

### Check Build Status
1. Go to the **Actions** tab
2. Find the workflow run for your commit
3. Green checkmark = success
4. Click to see build details if needed

## If Something Goes Wrong

### Build Fails
1. Check the Actions tab for error details
2. Common causes:
   - Typo in front matter YAML
   - Missing `---` delimiter
   - Invalid date format
3. Make a new commit to fix the issue

### Content Looks Wrong
1. Check your Markdown syntax
2. Preview on GitHub
3. Make corrections and commit again

### Need to Undo Changes
Contact the webmaster - they can help revert changes if needed.

## Best Practices

### Commit Often
- Make small, focused commits
- Don't wait until you've made many changes
- Easier to find and fix problems

### Review Before Committing
- Read through your changes
- Check the preview
- Make sure everything looks right

### Communicate
- Use clear commit messages
- Let others know if you're making big changes
- Ask for help if unsure

## Working with Others

### Avoiding Conflicts
- Don't edit the same file as someone else at the same time
- Communicate about who's working on what
- Make smaller, more frequent commits

### If You See Someone Else's Changes
- Review what they changed
- Make sure your edits don't conflict
- Reach out if there's any overlap

## Quick Reference

### Commit Workflow
1. Make changes
2. Preview (optional but recommended)
3. Write commit message
4. Click Commit
5. Wait for build
6. Check live site

### Commit Message Formula
```
[Action] [What] [Why if not obvious]

Examples:
Add December meeting announcement
Update repeater offset for 70cm
Fix broken link to ARRL page
Remove outdated hamfest info
```

## Summary

| Step | Action |
|------|--------|
| 1 | Make your changes |
| 2 | Write clear commit message |
| 3 | Click "Commit changes" |
| 4 | Wait 2-3 minutes |
| 5 | Check the live website |

## Getting Help

If you run into problems:
1. Check this wiki for answers
2. Look at the Actions tab for error messages
3. Ask a fellow club member
4. Contact the webmaster

Remember: It's hard to break anything permanently! All changes are tracked and can be undone.

---

**Congratulations!** You now know how to contribute to the RARS website. Happy editing, and 73!
