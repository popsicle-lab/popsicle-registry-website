#!/usr/bin/env node
/**
 * generate-index.mjs
 *
 * Reads the popsicle-registry git index and produces a single JSON file
 * (public/registry-data.json) that the website can fetch at runtime.
 *
 * Usage:
 *   REGISTRY_PATH=../popsicle-registry node scripts/generate-index.mjs
 *
 * This is run as part of the build pipeline. In CI it clones the registry
 * repo first, then runs this script.
 */

import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { join, resolve } from 'path';

const REGISTRY_PATH = process.env.REGISTRY_PATH || resolve('..', 'popsicle-registry');
const OUTPUT_PATH = resolve('public', 'registry-data.json');

/** Skip these top-level entries when walking the index */
const SKIP = new Set(['.git', 'config.json', 'README.md', 'LICENSE', '.gitignore']);

function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry) || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function parseNdjson(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  return content
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line));
}

// ── Main ──────────────────────────────────────────────────────────────────

console.log(`Reading registry index from: ${REGISTRY_PATH}`);

const packageFiles = walkDir(REGISTRY_PATH);
console.log(`Found ${packageFiles.length} package file(s)`);

const packages = [];
for (const file of packageFiles) {
  try {
    const versions = parseNdjson(file);
    if (versions.length === 0) continue;

    const latest = versions.filter((v) => !v.yanked).at(-1) || versions.at(-1);
    packages.push({
      name: latest.name,
      type: latest.type,
      description: latest.description || '',
      author: latest.author || '',
      repository: latest.repository || '',
      keywords: latest.keywords || [],
      latestVersion: latest.vers,
      skills: latest.skills || [],
      pipelines: latest.pipelines || [],
      tools: latest.tools || [],
      deps: latest.deps || [],
      versions: versions.map((v) => ({
        version: v.vers,
        source: v.source,
        yanked: v.yanked || false,
        publishedAt: v.published_at || null,
      })),
    });
  } catch (err) {
    console.warn(`Skipping ${file}: ${err.message}`);
  }
}

packages.sort((a, b) => a.name.localeCompare(b.name));

mkdirSync('public', { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify({ packages, generatedAt: new Date().toISOString() }, null, 2));
console.log(`Wrote ${packages.length} packages to ${OUTPUT_PATH}`);
