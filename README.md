# antonio.md

Personal blog powered by [Hugo](https://gohugo.io/) with the [Terminal theme](https://github.com/panr/hugo-theme-terminal).

## Local Development

```bash
# Install Hugo (macOS)
brew install hugo

# Run local server
hugo server -D

# Build for production
hugo
```

## Deployment

Deployed via Cloudflare Pages. Push to `main` triggers automatic build and deploy.

**Build settings:**
- Build command: `hugo`
- Build output directory: `public`
- Hugo version: Set `HUGO_VERSION` environment variable to `0.158.0`

## Writing Posts

```bash
# Create a new post
hugo new posts/my-post-title.md
```

Posts go in `content/posts/`. Use `draft: true` in frontmatter to hide from production.
