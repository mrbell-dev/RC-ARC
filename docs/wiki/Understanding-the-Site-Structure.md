# Understanding the Site Structure

This guide explains how the RARS website is organized and how different pieces fit together.

## How the Website Works

The RARS website uses **Hugo**, a static site generator. Here's what that means:

1. **Content** is written in simple text files (Markdown)
2. **Hugo** combines content with templates to create HTML pages
3. **GitHub Pages** hosts the final website
4. When you commit changes, the site automatically rebuilds

You don't need to understand the technical details - just know that editing text files updates the website!

## Folder Structure Overview

```
RC-ARC/
├── content/              # All website content
│   ├── _index.md         # Home page
│   ├── submission.md     # Form thank you page
│   ├── pages/            # Static informational pages
│   │   ├── about.md
│   │   ├── meetings.md
│   │   ├── repeaters.md
│   │   ├── contact.md
│   │   └── ...
│   ├── events/           # Event pages
│   │   ├── field-day.md
│   │   └── firecracker-hamfest-2026.md
│   └── posts/            # News and announcements
├── layouts/              # Custom layout overrides
├── config/               # Site configuration
│   └── _default/
│       ├── hugo.toml     # Main settings
│       ├── params.toml   # Theme settings
│       └── languages.toml
├── assets/               # Images and resources
│   └── img/
│       └── commons/      # Shared images
├── static/               # Static files (favicons, etc.)
└── docs/                 # Documentation (this wiki)
```

## Content Folder Details

### The `content/` Folder

This is where all the website text lives. Content is organized into sections:

| Section | Purpose | URL Pattern |
|---------|---------|-------------|
| `pages/` | Static informational pages | `/pages/about/`, `/pages/meetings/` |
| `events/` | Event pages | `/events/field-day/` |
| `posts/` | News and announcements | `/posts/my-post/` |
| `_index.md` | Home page | `/` |

### The `pages/` Folder

Most of the site content lives here as flat `.md` files:

```
pages/
├── about.md              # /pages/about/
├── activities.md         # /pages/activities/
├── ares-net.md           # /pages/ares-net/
├── contact.md            # /pages/contact/
├── elmer.md              # /pages/elmer/
├── join-us.md            # /pages/join-us/
├── links.md              # /pages/links/
├── live-feed.md          # /pages/live-feed/
├── local-repeaters.md    # /pages/local-repeaters/
├── meetings.md           # /pages/meetings/
├── membership.md         # /pages/membership/
├── nets.md               # /pages/nets/
├── privacy-policy.md     # /pages/privacy-policy/
├── repeaters.md          # /pages/repeaters/
└── silent-keys.md        # /pages/silent-keys/
```

### The `events/` Folder

Event pages that appear on the Activities page:

```
events/
├── field-day.md                  # Recurring event (tag: event-general)
└── firecracker-hamfest-2026.md   # Dated event (tag: event-cal)
```

### The `posts/` Folder

News and announcements go here. Each post is a single `.md` file:

```
posts/
└── discord-quick-start-guide.md    # /posts/discord-quick-start-guide/
```

## Content File Anatomy

Every content file (e.g., `about.md`) has two parts:

### 1. Front Matter
The section between `---` marks at the top:

```yaml
---
title: "Page Title"
date: 2026-02-04
description: "Page description"
categories: [Club Info]
tags: [tag1, tag2]
---
```

This controls how the page appears in menus, search results, etc.

### 2. Body Content
Everything after the front matter is the actual page content, written in Markdown.

## Configuration Files

Located in `config/_default/`:

| File | Controls |
|------|----------|
| `hugo.toml` | Site URL, title, basic settings |
| `params.toml` | Theme options, social links |
| `languages.toml` | Language settings |

**Note:** Most users won't need to edit these files.

## Menu System

The sidebar navigation menu is controlled by front matter in content files:

```yaml
menu:
  main:
    name: Contact        # Menu label
    weight: 6            # Order (lower = earlier)
    pre: fa-envelope     # Icon (Font Awesome)
```

Not all pages need to be in the menu - only key pages have this. Pages without a `menu` entry won't appear in the sidebar but can still be linked to from other pages.

## Categories and Tags

### Categories
Broad groupings for content:
- `Club Info` - General club information
- `Activities` - Events and activities
- `Resources` - Helpful resources and guides

### Tags
More specific keywords. Examples:
- `meetings`, `repeaters`, `field-day`
- `event-general`, `event-cal` (special tags for the Activities page)

## Special Content Types

### Pinned Posts
Posts with `pin: true` appear at the top of listings:
```yaml
pin: true
```

### Event Posts
Posts tagged for the Activities page:
```yaml
tags: [event-general]    # Annual/recurring events
# OR
tags: [event-cal]        # Specific dated events
event_date: "July 4, 2025 - 8:00 AM to 2:00 PM"  # For event-cal posts
```

Events tagged `event-cal` also appear in the "Upcoming Events" section on the home page.

## Assets and Static Files

### Assets (`assets/` folder)
Processed files like images that may need optimization:
```
assets/
└── img/
    └── commons/
        └── rars_logo.png
```

Reference in content: `![Logo](/img/commons/rars_logo.png)`

### Static (`static/` folder)
Files that are copied as-is:
```
static/
└── img/
    └── favicons/
        └── favicon.ico
```

## URL Structure

URLs are based on the content section and filename:

| Content Location | URL |
|-----------------|-----|
| `content/_index.md` | `/` |
| `content/pages/about.md` | `/pages/about/` |
| `content/pages/meetings.md` | `/pages/meetings/` |
| `content/events/field-day.md` | `/events/field-day/` |
| `content/posts/my-post.md` | `/posts/my-post/` |

## Making Changes

Most changes you'll make:
1. **Edit existing pages** - Change text in `.md` files
2. **Add new posts** - Create new `.md` files in `content/posts/`
3. **Add images** - Upload to `assets/img/`

Things to avoid changing:
- Configuration files (unless you know what you're doing)
- Layout files in `layouts/`
- The basic folder structure

## Next Steps

- [Editing Content](Editing-Content) - Start making changes
- [Creating New Posts](Creating-New-Posts) - Add new content
- [Submitting Changes](Submitting-Changes) - Save your work
