# 🍦 Popsicle Registry Website

A static website for browsing and discovering [Popsicle](https://github.com/popsicle-lab/popsicle) modules and tools.

**Live**: [popsicle-lab.github.io/popsicle-registry-website](https://popsicle-lab.github.io/popsicle-registry-website)

## Features

- 🔍 **Search** — Find modules and tools by name, description, or keywords
- 🏷️ **Filter** — Filter by package type (module / tool)
- 📦 **Package details** — View skills, pipelines, versions, and install commands
- 🌙 **Dark theme** — Easy on the eyes

## How it works

1. A build-time script (`scripts/generate-index.mjs`) reads the [popsicle-registry](https://github.com/popsicle-lab/popsicle-registry) git index
2. It produces a single `public/registry-data.json` containing all package metadata
3. The Next.js app (static export) renders a browsable catalog from that JSON

## Development

```bash
# Generate the registry data (requires ../popsicle-registry to exist)
REGISTRY_PATH=../popsicle-registry npm run generate-index

# Start dev server
npm run dev

# Build static site
npm run build
```

## Deployment

The site is designed to be deployed as a static site on GitHub Pages:

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [registry-updated]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/checkout@v4
        with:
          repository: popsicle-lab/popsicle-registry
          path: popsicle-registry
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: REGISTRY_PATH=popsicle-registry npm run generate-index
      - run: npm run build
      - uses: actions/deploy-pages@v4
        with:
          artifact_name: github-pages
```

## License

Apache-2.0
