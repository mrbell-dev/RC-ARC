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
- **Website:** gettinhammered.com

## Build and Run Commands

```bash
# Local dev server with live reload
~/go/bin/hugo serve

# Production build (output to public/)
~/go/bin/hugo --minify --gc
```

## Site Structure

### Pages
- `content/_index.en.md` - Home page
- `content/about/index.en.md` - About RARS (includes CC-BY credits)
- `content/activities/index.en.md` - Activities & Events (with Google Calendar embed)
- `content/links/index.en.md` - Helpful links and resources
- `content/post/join-us/` - How to join
- `content/post/membership/` - Digital membership application form
- `content/post/repeaters/` - N4UH repeater info
- `content/post/local-repeaters/` - Quick reference for nearby repeaters
- `content/post/meetings/` - Meeting schedule
- `content/post/field-day/` - Field Day event (tag: event-general)
- `content/post/firecracker-hamfest/` - Firecracker Hamfest (tag: event-cal)
- `content/post/ares-net/` - ARES/emergency comms
- `content/post/live-feed/` - Broadcastify embed (2m repeater only)
- `content/post/contact/` - Contact form (SheetMonkey, with JS email validation)
- `content/post/silent-keys/` - Memorial page (placeholder)
- `content/post/privacy-policy/` - Privacy policy

### Event Tags
- `event-general` - Annual/recurring events (displayed in Activities page)
- `event-cal` - Specific dated events (displayed in Activities page, supports `event_date` front matter)

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

## Pinned Posts

Three posts have `pin: true`: Join Us, Repeaters, Meetings.

## Forms

Both contact and membership forms use SheetMonkey for backend:
- Contact form: `/content/post/contact/index.en.md`
- Membership form: `/content/post/membership/index.en.md`

Forms include JavaScript validation for email fields.

## SEO

SEO settings are configured in `config/_default/params.toml`:
- Site description and keywords
- Open Graph settings for social sharing
- Schema.org structured data (Organization)

## TODOs

See `todo.md` for current items. Deferred items include:
- Content reorganization (posts vs static pages)
- Better file naming for yearly events
- Obsidian Sync integration for content management

## Notes

- Broadcastify feed only streams the 2m repeater (145.410 MHz), not the 70cm repeater
- Favicon icons are CC-BY licensed from [irl.xyz](https://irl.xyz/blog/2021/2021w127/) - attribution in About page
