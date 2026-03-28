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
