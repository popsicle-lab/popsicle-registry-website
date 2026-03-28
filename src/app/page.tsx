'use client';

import { useEffect, useState, useMemo } from 'react';
import type { Package, RegistryData } from './registry';

type Filter = 'all' | 'module' | 'tool';

export default function HomePage() {
  const [data, setData] = useState<RegistryData | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    fetch('/registry-data.json')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData({ packages: [], generatedAt: '' }));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let pkgs = data.packages;

    if (filter !== 'all') {
      pkgs = pkgs.filter((p) => p.type === filter);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      pkgs = pkgs.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q)) ||
          p.skills.some((s) => s.toLowerCase().includes(q)) ||
          p.pipelines.some((s) => s.toLowerCase().includes(q))
      );
    }

    return pkgs;
  }, [data, query, filter]);

  const stats = useMemo(() => {
    if (!data) return { total: 0, modules: 0, tools: 0 };
    return {
      total: data.packages.length,
      modules: data.packages.filter((p) => p.type === 'module').length,
      tools: data.packages.filter((p) => p.type === 'tool').length,
    };
  }, [data]);

  if (!data) {
    return <div className="empty-state">Loading registry...</div>;
  }

  return (
    <>
      <div className="stat-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="number">{stats.total}</div>
          <div className="label">Packages</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.modules}</div>
          <div className="label">Modules</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.tools}</div>
          <div className="label">Tools</div>
        </div>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search packages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="filters">
          {(['all', 'module', 'tool'] as Filter[]).map((f) => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'module' ? 'Modules' : 'Tools'}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No packages found.</p>
        </div>
      ) : (
        <div className="package-grid">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
      )}
    </>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <a href={`/package?name=${pkg.name}`} className="package-card">
      <h3>
        <span className="name">{pkg.name}</span>
        <span className={`badge ${pkg.type}`}>{pkg.type}</span>
        <span className="version">v{pkg.latestVersion}</span>
      </h3>
      <p className="desc">{pkg.description}</p>

      {(pkg.skills.length > 0 || pkg.pipelines.length > 0 || pkg.keywords.length > 0) && (
        <div className="meta">
          {pkg.keywords.map((k) => (
            <span key={k} className="tag">
              {k}
            </span>
          ))}
          {pkg.skills.slice(0, 4).map((s) => (
            <span key={s} className="tag">
              skill:{s}
            </span>
          ))}
          {pkg.skills.length > 4 && (
            <span className="tag">+{pkg.skills.length - 4} skills</span>
          )}
        </div>
      )}
    </a>
  );
}
