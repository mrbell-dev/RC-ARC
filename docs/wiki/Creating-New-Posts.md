# Creating New Posts

This guide walks you through adding new articles, announcements, and events to the website.

## Before You Start

Decide what kind of content you're creating:

| Type | Use For | Location |
|------|---------|----------|
| **Post** | Articles, announcements, event info | `content/post/your-post-name/` |
| **Page** | Standalone pages (rare) | `content/your-page-name/` |

Most new content should be a **post**.

## Step-by-Step: Creating a New Post

### Step 1: Navigate to the Posts Folder
1. Go to the [RC-ARC repository](https://github.com/mrbell-dev/RC-ARC)
2. Click on `content`
3. Click on `post`

### Step 2: Create a New Folder
1. Click **Add file** > **Create new file**
2. In the filename box, type: `your-post-name/index.en.md`
   - Replace `your-post-name` with a short, descriptive name
   - Use lowercase letters and hyphens (no spaces)
   - Examples: `winter-field-day/index.en.md`, `december-meeting/index.en.md`

### Step 3: Add the Front Matter
Start your file with this template:

```yaml
---
title: "Your Post Title"
date: 2025-01-15
description: "A brief description of your post (shows in search results)"
categories: [Club Info]
tags: [tag1, tag2]
---
```

**Fill in each field:**
- `title`: The main heading visitors will see
- `date`: Today's date in YYYY-MM-DD format
- `description`: 1-2 sentence summary
- `categories`: Choose from existing categories (see below)
- `tags`: 2-4 relevant keywords

### Step 4: Write Your Content
Below the front matter (after the second `---`), write your post using Markdown:

```markdown
---
title: "Winter Field Day 2025"
date: 2025-01-15
description: "Join RARS for Winter Field Day operating event"
categories: [Events]
tags: [field day, winter, operating]
---

## About Winter Field Day

Winter Field Day is an annual amateur radio operating event...

## When and Where

- **Date:** January 25-26, 2025
- **Time:** Setup starts at 10 AM
- **Location:** Rowan County Rescue Squad

## What to Bring

- Your radio equipment
- Warm clothes
- A positive attitude!

## Contact

Questions? [Contact us](/post/contact/) or ask on the repeater.
```

### Step 5: Save Your Post
1. Scroll down to "Commit new file"
2. Write a commit message like "Add Winter Field Day 2025 post"
3. Click **Commit new file**

## Categories and Tags

### Available Categories
Use these existing categories to keep content organized:

| Category | Use For |
|----------|---------|
| `Club Info` | Meeting info, membership, general club news |
| `Events` | Special events, hamfests, operating events |
| `Resources` | Helpful info, guides, reference material |
| `Technical` | Technical articles, how-tos |

### Tag Guidelines
- Use lowercase
- Be specific but not too narrow
- 2-4 tags per post is ideal
- Check existing posts for commonly used tags

## Special Post Types

### Event Posts
For events that should appear on the Activities page, add these to front matter:

```yaml
tags: [event-general]  # For recurring annual events
# OR
tags: [event-cal]      # For specific dated events
event_date: 2025-07-04 # Required for event-cal
```

### Pinned Posts
To pin a post to the top of listings:
```yaml
pin: true
```

## Post Naming Best Practices

| Good Name | Bad Name |
|-----------|----------|
| `field-day-2025` | `Field Day 2025` |
| `december-meeting` | `dec_meeting` |
| `repeater-upgrade` | `repeater upgrade news` |

**Rules:**
- All lowercase
- Use hyphens between words
- Keep it short but descriptive
- No spaces or special characters

## Adding Images to Your Post

See [Adding Images](Adding-Images) for details on including pictures in your post.

## Troubleshooting

### My post doesn't appear on the site
- Wait a few minutes for the site to rebuild
- Check that your front matter is correct (no typos)
- Make sure the date isn't in the future

### The formatting looks wrong
- Check your Markdown syntax
- Make sure there's a blank line before and after headings
- Verify front matter is between `---` marks

### I made a mistake!
Don't worry! You can:
1. Edit the file and commit a fix
2. Ask the webmaster to help if needed

## Next Steps

- [Adding Images](Adding-Images) - Include photos in your posts
- [Previewing Changes](Previewing-Changes) - Check your work before publishing
