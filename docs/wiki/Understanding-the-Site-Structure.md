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
│   ├── _index.en.md      # Home page
│   ├── about/            # About page
│   ├── activities/       # Activities & calendar
│   ├── links/            # Helpful links
│   └── post/             # Blog posts and articles
│       ├── meetings/
│       ├── repeaters/
│       ├── join-us/
│       ├── contact/
│       ├── field-day/
│       └── ...
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

This is where all the website text lives. Each page has its own folder:

| Folder | Purpose | URL |
|--------|---------|-----|
| `_index.en.md` | Home page | `/` |
| `about/` | About RARS | `/about/` |
| `activities/` | Events calendar | `/activities/` |
| `links/` | Helpful links | `/links/` |
| `post/` | All posts/articles | `/post/` |

### The `post/` Folder

Most content lives in the `post/` folder. Each post has its own subfolder:

```
post/
├── meetings/
│   └── index.en.md       # /post/meetings/
├── repeaters/
│   └── index.en.md       # /post/repeaters/
├── field-day/
│   ├── index.en.md       # /post/field-day/
│   └── field-day.jpg     # Image for this post
├── contact/
│   └── index.en.md       # /post/contact/
└── ...
```

**Why folders instead of single files?**
- Keeps images with their posts
- Makes URLs cleaner (`/post/meetings/` instead of `/post/meetings.html`)
- Easier to organize related content

## Content File Anatomy

Every content file (`index.en.md`) has two parts:

### 1. Front Matter
The section between `---` marks at the top:

```yaml
---
title: "Page Title"
date: 2025-01-15
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
| `markup.toml` | How Markdown is processed |

**Note:** Most users won't need to edit these files.

## Menu System

The main navigation menu is controlled by front matter in content files:

```yaml
menu:
  main:
    name: Contact        # Menu label
    weight: 6            # Order (lower = earlier)
    pre: fa-envelope     # Icon (Font Awesome)
```

Not all pages need to be in the menu - only key pages have this.

## Categories and Tags

### Categories
Broad groupings for content:
- `Club Info` - General club information
- `Events` - Special events and activities
- `Resources` - Helpful resources and guides
- `Technical` - Technical articles

### Tags
More specific keywords. Examples:
- `meetings`, `repeaters`, `field-day`
- `event-general`, `event-cal` (special tags for calendar)

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
event_date: 2025-07-04   # For event-cal posts
```

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

URLs are based on folder structure:

| Content Location | URL |
|-----------------|-----|
| `content/_index.en.md` | `/` |
| `content/about/index.en.md` | `/about/` |
| `content/post/meetings/index.en.md` | `/post/meetings/` |
| `content/links/index.en.md` | `/links/` |

## Making Changes

Most changes you'll make:
1. **Edit existing posts** - Change text in `index.en.md` files
2. **Add new posts** - Create new folders in `content/post/`
3. **Add images** - Upload to post folders or `assets/img/`

Things to avoid changing:
- Configuration files (unless you know what you're doing)
- Theme files
- The basic folder structure

## Next Steps

- [Editing Content](Editing-Content) - Start making changes
- [Creating New Posts](Creating-New-Posts) - Add new content
- [Submitting Changes](Submitting-Changes) - Save your work
