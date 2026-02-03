# Getting Started with GitHub

GitHub is where our website's files are stored. Think of it like a shared folder that keeps track of every change ever made.

## Creating a GitHub Account

1. Go to [github.com](https://github.com)
2. Click **Sign Up** in the top right
3. Enter your email address
4. Create a password
5. Choose a username (your callsign works great!)
6. Complete the verification
7. **Important:** Let the webmaster know your GitHub username so they can give you access to edit the website

## Navigating the Repository

A "repository" (or "repo") is like a project folder. Our website repo is at:
**https://github.com/mrbell-dev/RC-ARC**

### Key Areas of the Repository

When you visit the repository page, you'll see:

| Section | What It Does |
|---------|--------------|
| **Code** tab | Browse all the files |
| **content/** folder | Where all the website pages and posts live |
| **config/** folder | Site settings (usually don't need to edit) |
| **assets/** folder | Images and other media |

### Understanding the File Structure

```
RC-ARC/
├── content/              # Website content lives here
│   ├── _index.en.md      # Home page
│   ├── about/            # About page folder
│   ├── activities/       # Activities page folder
│   ├── links/            # Links page folder
│   └── post/             # All posts/articles
│       ├── meetings/
│       ├── repeaters/
│       ├── field-day/
│       └── (other posts...)
├── config/               # Site settings
├── assets/               # Images and resources
│   └── img/
│       └── commons/      # Shared images
└── static/               # Static files
```

## Accessing Files to Edit

1. Navigate to the repository
2. Click on folders to open them (like browsing files on your computer)
3. Click on a `.md` file to view its contents
4. Click the **pencil icon** to edit (more on this in [Editing Content](Editing-Content))

## What is Markdown?

All our content files end in `.md` which stands for **Markdown**. Markdown is a simple way to format text:

| What You Type | What You Get |
|---------------|--------------|
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `# Heading` | Big heading |
| `## Smaller Heading` | Smaller heading |
| `[Link Text](https://url.com)` | Clickable link |
| `- Item` | Bullet point |

You'll learn more about Markdown as you edit pages!

## Next Steps

Now that you know the basics of GitHub, continue to:
- [Editing Content](Editing-Content) - Make your first edit
- [Creating New Posts](Creating-New-Posts) - Add new content
