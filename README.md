# Deploy to GitHub Pages

Steps to build and deploy this Vite site to GitHub Pages:

1. Install dependencies:

```bash
npm install
```

2. Ensure your repository has a remote `origin` pointing to GitHub.

3. Deploy (this runs `vite build`, then pushes `dist` to `gh-pages`):

```bash
npm run deploy
```

Notes:
- The Vite `base` is set to a relative path so the site works when served from GitHub Pages.
- If you prefer a repository-root path (e.g. `/your-repo/`), update `base` in `vite.config.ts` accordingly.
- To preview changes before publishing to gh-pages run: 

```bash
npm run dev
```
