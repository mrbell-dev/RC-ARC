# Rowan Amateur Radio Society (RARS) Website

Website for the **Rowan Amateur Radio Society (RARS)**, call sign **N4UH**, located in Salisbury, Rowan County, North Carolina.

**Live site:** [gettinhammered.com](https://gettinhammered.com)

## About RARS

- **Meeting:** 2nd Monday of each month at 7:00 PM
- **Location:** Rowan County Rescue Squad, 1140 Julian Rd, Salisbury, NC 28146
- **Repeaters:**
  - 2m: 145.410 MHz, -0.600 offset, 136.5 PL
  - 70cm: 443.250 MHz, +5.000 offset, 136.5 PL

## Technology Stack

- **Static Site Generator:** [Hugo](https://gohugo.io/)
- **Theme:** [Hugo Theme Chirpy](https://github.com/geekifan/hugo-theme-chirpy)
- **Hosting:** GitHub Pages
- **Deployment:** GitHub Actions (automatic on push)

## Local Development

Prerequisites: Git, Go, and Hugo extended installed locally.

```bash
# Clone the repository
git clone git@github.com:mrbell-dev/RC-ARC.git
cd RC-ARC

# Start local dev server with live reload
~/go/bin/hugo serve

# Production build
~/go/bin/hugo --minify --gc
```

## Documentation

For non-technical users wanting to edit the website, see the [GitHub Wiki](https://github.com/mrbell-dev/RC-ARC/wiki) which includes guides for:
- Getting started with GitHub
- Editing existing content
- Creating new posts
- Adding images
- Understanding the site structure

## Update Theme

```bash
hugo mod get -u github.com/geekifan/hugo-theme-chirpy
hugo mod tidy
```

## Credits

- **Theme:** [Hugo Theme Chirpy](https://github.com/geekifan/hugo-theme-chirpy)
- **Favicon:** Ham radio icons by [IRL](https://irl.xyz/blog/2021/2021w127/), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## License

Content is copyright Rowan Amateur Radio Society. Theme is subject to its own license.
