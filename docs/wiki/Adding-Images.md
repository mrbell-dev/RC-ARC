# Adding Images

This guide shows you how to add images to your posts and pages.

## Image Location Options

Images can be stored in two places:

| Location | Best For |
|----------|----------|
| **Post folder** | Images used only in that specific post |
| **assets/img/** | Shared images used across multiple pages |

## Method 1: Adding Images to a Post Folder

This is the easiest method for most posts.

### Step 1: Navigate to Your Post Folder
1. Go to `content/post/your-post-name/`
2. You should see `index.en.md` already there

### Step 2: Upload the Image
1. Click **Add file** > **Upload files**
2. Drag your image file or click "choose your files"
3. Write a commit message like "Add photos to Field Day post"
4. Click **Commit changes**

### Step 3: Reference the Image in Your Post
In your `index.en.md` file, add:

```markdown
![Description of image](image-filename.jpg)
```

**Example:**
```markdown
![Club members at Field Day 2024](field-day-group.jpg)
```

## Method 2: Adding Shared Images

For images used on multiple pages (like logos).

### Step 1: Navigate to Assets Folder
1. Go to `assets/img/commons/`

### Step 2: Upload the Image
1. Click **Add file** > **Upload files**
2. Upload your image
3. Commit the changes

### Step 3: Reference the Image
Use the full path from assets:

```markdown
![Description](/img/commons/your-image.jpg)
```

## Image Formatting Options

### Basic Image
```markdown
![Alt text](image.jpg)
```

### Image with Caption (using HTML)
```html
<figure>
  <img src="image.jpg" alt="Description">
  <figcaption>Your caption here</figcaption>
</figure>
```

### Centered Image
```html
<div class="text-center">
  <img src="image.jpg" alt="Description" class="img-fluid">
</div>
```

### Image with Custom Size
```html
<img src="image.jpg" alt="Description" width="400">
```

## Image Best Practices

### File Names
| Good | Bad |
|------|-----|
| `field-day-2024.jpg` | `IMG_1234.JPG` |
| `antenna-setup.png` | `photo (1).png` |
| `club-meeting.jpg` | `Picture from meeting.jpeg` |

**Rules:**
- Use lowercase letters
- Use hyphens instead of spaces
- Keep names descriptive but short
- Include year for dated content

### File Size and Format
- **Format:** Use `.jpg` for photos, `.png` for graphics/logos
- **Size:** Keep images under 1MB for faster loading
- **Dimensions:** Resize large images before uploading (1200px wide is usually plenty)

### Optimizing Images Before Upload

**Free online tools:**
- [TinyPNG](https://tinypng.com/) - Compresses images without quality loss
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [iLoveIMG](https://www.iloveimg.com/resize-image) - Resize and compress

**Recommended workflow:**
1. Take/select your photo
2. Resize to max 1200px wide
3. Compress with TinyPNG
4. Rename with a descriptive filename
5. Upload to GitHub

### Alt Text
Always include alt text (the text in brackets). This:
- Helps visually impaired visitors
- Improves search engine rankings
- Shows when images don't load

**Good alt text describes the image:**
```markdown
![Club members operating radios during Field Day](field-day-operators.jpg)
```

**Bad alt text:**
```markdown
![image](photo.jpg)
```

## Common Image Scenarios

### Photo Gallery
```markdown
## Event Photos

![Setup begins in the morning](setup.jpg)

![Operating the HF station](hf-operation.jpg)

![Group photo at the end of the event](group-final.jpg)
```

### QSL Cards or Awards
```markdown
<div class="text-center">
  <img src="special-event-qsl.jpg" alt="N4UH Special Event QSL Card" class="img-fluid" width="500">
</div>
```

### Equipment Photos
```markdown
| Equipment | Photo |
|-----------|-------|
| HF Station | ![Icom IC-7300](hf-station.jpg) |
| VHF/UHF | ![Yaesu FT-991A](vhf-station.jpg) |
```

## Troubleshooting

### Image doesn't appear
- Check the filename matches exactly (including case)
- Make sure the image file was uploaded to the correct folder
- Verify the path in your Markdown is correct

### Image is too large on the page
- Resize the source image before uploading
- Use HTML with a `width` attribute
- Use CSS classes like `w-50` or `w-75`

### Image loads slowly
- Compress the image with TinyPNG
- Resize to no more than 1200px wide
- Convert large PNGs to JPG format

## Next Steps

- [Previewing Changes](Previewing-Changes) - See how your images look before publishing
- [Submitting Changes](Submitting-Changes) - Finalize your edits
