export interface PackageVersion {
  version: string;
  source: string;
  yanked: boolean;
  publishedAt: string | null;
}

export interface PackageDep {
  name: string;
  req?: string;
  kind: 'module' | 'tool';
}

export interface Package {
  name: string;
  type: 'module' | 'tool';
  description: string;
  author: string;
  repository: string;
  keywords: string[];
  latestVersion: string;
  skills: string[];
  pipelines: string[];
  tools: string[];
  deps: PackageDep[];
  versions: PackageVersion[];
}

export interface RegistryData {
  packages: Package[];
  generatedAt: string;
}

let _cache: RegistryData | null = null;

export async function getRegistryData(): Promise<RegistryData> {
  if (_cache) return _cache;

  // In static export mode, this file is generated at build time
  // by scripts/generate-index.mjs and placed in public/
  const res = await fetch('/registry-data.json');
  _cache = (await res.json()) as RegistryData;
  return _cache;
}
