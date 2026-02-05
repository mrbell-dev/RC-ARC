# Creating New Posts

This guide walks you through adding new articles, announcements, and events to the website.

## Before You Start

Decide what kind of content you're creating:

| Type | Use For | Location |
|------|---------|----------|
| **Post** | News, announcements, articles | `content/posts/your-post-name.md` |
| **Event** | Club events (field days, hamfests) | `content/events/your-event-name.md` |
| **Page** | Permanent informational pages (rare) | `content/pages/your-page-name.md` |

Most new content should be a **post**.

## Step-by-Step: Creating a New Post

### Step 1: Navigate to the Posts Folder
1. Go to the [RC-ARC repository](https://github.com/mrbell-dev/RC-ARC)
2. Click on `content`
3. Click on `posts`

### Step 2: Create a New File
1. Click **Add file** > **Create new file**
2. In the filename box, type: `your-post-name.md`
   - Use lowercase letters and hyphens (no spaces)
   - Examples: `winter-field-day.md`, `december-meeting-recap.md`

### Step 3: Add the Front Matter
Start your file with this template:

```yaml
---
title: "Your Post Title"
date: 2026-02-04
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
title: "Winter Field Day 2026"
date: 2026-01-15
description: "Join RARS for Winter Field Day operating event"
categories: [Activities]
tags: [field day, winter, operating]
---

## About Winter Field Day

Winter Field Day is an annual amateur radio operating event...

## When and Where

- **Date:** January 25-26, 2026
- **Time:** Setup starts at 10 AM
- **Location:** Rowan County Rescue Squad

## What to Bring

- Your radio equipment
- Warm clothes
- A positive attitude!

## Contact

Questions? [Contact us](/pages/contact/) or ask on the repeater.
```

### Step 5: Save Your Post
1. Scroll down to "Commit new file"
2. Write a commit message like "Add Winter Field Day 2026 post"
3. Click **Commit new file**

The post will appear on the home page under "Recent Posts" and in the archives.

## Categories and Tags

### Available Categories
Use these existing categories to keep content organized:

| Category | Use For |
|----------|---------|
| `Club Info` | Meeting info, membership, general club news |
| `Activities` | Events, hamfests, operating events |
| `Resources` | Helpful info, guides, reference material |

### Tag Guidelines
- Use lowercase
- Be specific but not too narrow
- 2-4 tags per post is ideal
- Check existing posts for commonly used tags

## Special Post Types

### Event Posts
For events that should appear on the Activities page, add special tags:

```yaml
tags: [event-general]  # For recurring annual events
# OR
tags: [event-cal]      # For specific dated events
event_date: "July 4, 2026 - 8:00 AM to 2:00 PM"  # Required for event-cal
```

Events tagged `event-cal` will also show up on the home page under "Upcoming Events."

### Pinned Posts
To pin a post to the top of listings:
```yaml
pin: true
```

## Post Naming Best Practices

| Good Name | Bad Name |
|-----------|----------|
| `field-day-2026.md` | `Field Day 2026.md` |
| `december-meeting.md` | `dec_meeting.md` |
| `repeater-upgrade.md` | `repeater upgrade news.md` |

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
