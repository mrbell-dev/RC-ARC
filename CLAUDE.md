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
- `content/about/index.en.md` - About RARS
- `content/activities/index.en.md` - Activities & Events (with Google Calendar embed)
- `content/post/join-us/` - How to join
- `content/post/repeaters/` - N4UH repeater info
- `content/post/meetings/` - Meeting schedule
- `content/post/field-day/` - Field Day event (tag: event-general)
- `content/post/firecracker-hamfest/` - Firecracker Hamfest (tag: event-cal)
- `content/post/ares-net/` - ARES/emergency comms
- `content/post/live-feed/` - Broadcastify embed
- `content/post/contact/` - Contact form (SheetMonkey)
- `content/post/silent-keys/` - Memorial page (placeholder)
- `content/post/privacy-policy/` - Privacy policy

### Event Tags
- `event-general` - Annual/recurring events (displayed in Activities page)
- `event-cal` - Specific dated events (displayed in Activities page, supports `event_date` front matter)

### Assets
- `assets/img/commons/rars_logo.png` - Club logo

### Config
- `config/_default/hugo.toml` - Site settings
- `config/_default/params.toml` - Theme params
- `config/_default/languages.toml` - Language settings

## Pinned Posts

Three posts have `pin: true`: Join Us, Repeaters, Meetings.

## TODOs

- [ ] Replace US Holidays calendar with RARS club Google Calendar (in `content/activities/index.en.md`)
- [ ] Switch contact form from SheetMonkey to RARS Google account (same account as calendar)
- [ ] Create webhook to watch Google Form submissions and send to Discord bot

## Future Additions

When ready to expand the site, consider adding:
- VEC/License testing info
- Educational content (equipment guides, propagation, etc.)
- Community involvement / public service
- Technical articles and resources
- Links page
