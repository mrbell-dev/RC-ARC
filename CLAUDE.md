# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website for the **Rowan Amateur Radio Society (RARS)**, a ham radio club in Rowan County, Salisbury, NC. The club operates under call sign **N4UH**. It is built as a Hugo static site using the [Chirpy theme](https://github.com/geekifan/hugo-theme-chirpy) and deployed to GitHub Pages.

## RARS Information

- **Club Name:** Rowan Amateur Radio Society
- **Call Sign:** N4UH
- **Meeting:** 2nd Monday, 7 PM, Rowan County Rescue Squad, 1140 Julian Rd, Salisbury, NC 28146
- **Repeaters:**
  - 2m: 145.410 MHz, -0.600 offset, 136.5 PL
  - 70cm: 443.250 MHz, +5.000 offset, 136.5 PL
- **Officers:** David Jackman N7WOY (Pres), Steven Snider KJ6FWQ (VP), Richard Paschall AJ4UX (Sec), Robert Gresham N4DNC (Treas)
- **Contact:** rustyutahn@yahoo.com, (704) 433-7371
- **Website:** www.rowanars.net

## Build and Run Commands

```bash
# Local dev server with live reload
~/go/bin/hugo serve

# Production build (output to public/)
~/go/bin/hugo --minify --gc
```

Note: Go must be in PATH for Hugo modules to work. If `hugo serve` fails with a module error, ensure `/usr/local/go/bin` is in your PATH.

## Content Structure

```
content/
├── _index.md                 # Home page (static content + upcoming events/recent posts)
├── submission.md             # Form thank you page
├── categories/_index.md      # Category listing
├── tags/_index.md            # Tag listing
├── archives/index.html       # Archive listing
│
├── pages/                    # Static informational pages
│   ├── about.md
│   ├── activities.md         # Google Calendar + event listings (custom layout)
│   ├── links.md
│   ├── contact.md            # Contact form (SheetMonkey)
│   ├── membership.md         # Membership application form
│   ├── meetings.md
│   ├── repeaters.md          # Links to local-repeaters.md
│   ├── local-repeaters.md    # Not in sidebar nav, linked from repeaters
│   ├── join-us.md
│   ├── live-feed.md          # Broadcastify embed (2m only)
│   ├── ares-net.md
│   ├── privacy-policy.md
│   └── silent-keys.md
│
├── events/                   # Event pages
│   ├── field-day.md          # tag: event-general (recurring)
│   └── firecracker-hamfest.md # tag: event-cal (dated, has event_date)
│
└── posts/                    # News/announcements (date-based)
    └── (empty, ready for future posts)
```

### File Naming
- `_index.md` = List/section pages (home, categories, tags)
- `name.md` = Single content pages (flat files, no subdirectories)
- No `.en.` suffix needed (English is default language)

### Event Tags
- `event-general` - Annual/recurring events (displayed in Activities page)
- `event-cal` - Specific dated events (supports `event_date` front matter, also shown on home page)

### Categories
- `Club Info` - General club information (meetings, membership, contact, etc.)
- `Activities` - Events and activities (field day, hamfests, ARES)
- `Resources` - Helpful links and reference material

### Custom Layout Overrides

The Chirpy theme filters many templates by `"Type" "post"`. Since content lives in `pages/`, `events/`, and `posts/`, the following layouts override the theme to include all content types:

- `layouts/home.html` - Home page with static content, upcoming events feed, and recent posts feed
- `layouts/_default/activities.html` - Activities page with event listings by tag
- `layouts/_default/archives.html` - Archives page (all content, not just "post" type)
- `layouts/taxonomy/category.terms.html` - Categories page (all content, not just "post" type)

### Assets
- `assets/img/commons/rars_logo.png` - Club logo
- `assets/img/irl.xyz.blog/` - Source favicon files (CC-BY licensed from irl.xyz)

### Static Files
- `static/favicon.ico` - Site favicon (ham radio tower icon)
- `static/apple-touch-icon.png` - iOS icon
- `static/img/favicons/` - Full favicon set with manifest

### Config
- `config/_default/hugo.toml` - Site settings
- `config/_default/params.toml` - Theme params (includes SEO settings)
- `config/_default/languages.toml` - Language settings

### Documentation
- `docs/wiki/` - Source files for GitHub Wiki (documentation for non-technical users)
- GitHub Wiki at https://github.com/mrbell-dev/RC-ARC/wiki

## Sidebar Navigation

Pages appear in the sidebar only if they have a `menu: main` entry in front matter. Not all pages are in the sidebar (e.g., local-repeaters is linked from the repeaters page instead).

## Pinned Posts

Three pages have `pin: true`: Join Us, Repeaters, Meetings.

## Forms

Both contact and membership forms use SheetMonkey for backend:
- Contact form: `content/pages/contact.md`
- Membership form: `content/pages/membership.md`

Forms include JavaScript validation for email fields.

## SEO

SEO settings are configured in `config/_default/params.toml`:
- Site description and keywords
- Open Graph settings for social sharing
- Schema.org structured data (Organization)

## TODOs

See `todo.md` for current items:
- Obsidian Sync integration for content management

## Notes

- Broadcastify feed only streams the 2m repeater (145.410 MHz), not the 70cm repeater
- Favicon icons are CC-BY licensed from [irl.xyz](https://irl.xyz/blog/2021/2021w127/) - attribution in About page
- Internal links use `/pages/` for static pages and `/events/` for event pages
- `.claude/` is in `.gitignore` — local Claude Code settings are not committed
