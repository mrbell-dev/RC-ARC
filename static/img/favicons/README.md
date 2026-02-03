# Favicon Files

This directory should contain the following favicon files for the RC-ARC website:

## Required Files

Generate these using [RealFaviconGenerator](https://realfavicongenerator.net/) with a ham radio themed icon:

- `favicon.ico` - Traditional favicon (16x16, 32x32, 48x48 combined)
- `favicon-16x16.png` - 16x16 PNG favicon
- `favicon-32x32.png` - 32x32 PNG favicon
- `apple-touch-icon.png` - 180x180 PNG for iOS devices
- `android-chrome-192x192.png` - 192x192 PNG for Android
- `android-chrome-512x512.png` - 512x512 PNG for Android
- `browserconfig.xml` - Microsoft tile configuration
- `site.webmanifest` - Web app manifest

## How to Generate

1. Find or create a ham radio themed icon (antenna, radio, etc.)
2. Go to https://realfavicongenerator.net/
3. Upload your icon image
4. Configure settings for each platform
5. Download the generated package
6. Extract all files to this directory

## Suggested Icon Ideas

- Amateur radio antenna tower
- Radio with microphone
- Morse code key
- Ham radio logo/symbol
- Club logo (RARS)

## Theme Integration

The Hugo Chirpy theme should automatically detect favicons in `/static/img/favicons/`.
