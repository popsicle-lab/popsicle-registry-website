export interface PackageVersion {
  version: string;
  source: string;
  yanked: boolean;
  publishedAt: string | null;
}

export interface PackageDep {
  name: string;
  /**
   * Semver requirement string. The popsicle registry emits JSON `null`
   * (from Rust `Option::None`) when a dep has no pinned version, so we
   * explicitly allow `null` here in addition to absence.
   */
  req?: string | null;
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

export interface RegistryStats {
  totalPackages: number;
  totalModules: number;
  totalTools: number;
  totalSkills: number;
  totalPipelines: number;
}

export interface RegistryData {
  packages: Package[];
  stats: RegistryStats;
  generatedAt: string;
}
