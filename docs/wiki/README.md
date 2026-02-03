# GitHub Wiki Documentation

This folder contains documentation for the RC-ARC website, intended to be published to the GitHub Wiki.

## Publishing to GitHub Wiki

Since the GitHub Wiki needs to be initialized first through the web interface, follow these steps:

### Step 1: Initialize the Wiki

1. Go to https://github.com/mrbell-dev/RC-ARC/wiki
2. Click "Create the first page"
3. Copy the content from `Home.md` in this folder
4. Click "Save Page"

### Step 2: Add Remaining Pages

For each `.md` file in this folder (except README.md):

1. Click "New Page" in the wiki sidebar
2. Name the page exactly as the filename (without `.md`), e.g., `Getting-Started-with-GitHub`
3. Copy the content from the corresponding file
4. Click "Save Page"

### Wiki Pages to Create

Create pages in this order:
1. Home (start page)
2. Getting-Started-with-GitHub
3. Editing-Content
4. Creating-New-Posts
5. Adding-Images
6. Understanding-the-Site-Structure
7. Previewing-Changes
8. Submitting-Changes

### Alternative: Clone and Push

If you're comfortable with Git, you can also:

1. Initialize the wiki first (create Home page via web)
2. Clone the wiki repo:
   ```bash
   git clone git@github.com:mrbell-dev/RC-ARC.wiki.git
   ```
3. Copy all `.md` files from this folder (except README.md) to the wiki repo
4. Commit and push:
   ```bash
   cd RC-ARC.wiki
   git add .
   git commit -m "Add documentation pages"
   git push
   ```

## Maintaining Documentation

When making updates to the wiki:
1. Edit the files in this `docs/wiki/` folder first
2. Commit changes to the main repo
3. Update the actual GitHub wiki to match

This keeps a backup of all documentation in the main repository.
