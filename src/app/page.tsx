'use client';

import { useState, useMemo } from 'react';
import { registryData } from '../data/registry-data';
import type { Package } from './registry';

type Filter = 'all' | 'module' | 'tool';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const { packages, stats } = registryData;

  const filtered = useMemo(() => {
    let pkgs = packages;
    if (filter !== 'all') pkgs = pkgs.filter((p) => p.type === filter);
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
  }, [packages, query, filter]);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Popsicle Registry</h1>
          <p>
            Discover modules, skills, pipelines &amp; tools for spec-driven development.
            Install with a single command.
          </p>

          <div className="search-wrapper">
            <svg
              className="search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search packages, skills, pipelines…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number accent">{stats.totalPackages}</div>
              <div className="stat-label">Packages</div>
            </div>
            <div className="stat-item">
              <div className="stat-number pink">{stats.totalModules}</div>
              <div className="stat-label">Modules</div>
            </div>
            <div className="stat-item">
              <div className="stat-number orange">{stats.totalTools}</div>
              <div className="stat-label">Tools</div>
            </div>
            <div className="stat-item">
              <div className="stat-number green">{stats.totalSkills}</div>
              <div className="stat-label">Skills</div>
            </div>
            <div className="stat-item">
              <div className="stat-number purple">{stats.totalPipelines}</div>
              <div className="stat-label">Pipelines</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="content">
        <div className="filter-bar">
          {(['all', 'module', 'tool'] as Filter[]).map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '✦ All' : f === 'module' ? '📦 Modules' : '🔧 Tools'}
            </button>
          ))}
          <span className="filter-count">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>No packages match your search.</p>
          </div>
        ) : (
          <div className="pkg-grid">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <a href={`/package?name=${pkg.name}`} className="pkg-card">
      <div className="pkg-header">
        <span className="pkg-name">{pkg.name}</span>
        <span className={`badge badge-${pkg.type}`}>{pkg.type}</span>
        <span className="pkg-version">v{pkg.latestVersion}</span>
      </div>
      <p className="pkg-desc">{pkg.description}</p>
      <div className="pkg-meta">
        {pkg.skills.length > 0 && (
          <span className="pkg-stat">
            <span className="pkg-stat-icon">✦</span> {pkg.skills.length} skills
          </span>
        )}
        {pkg.pipelines.length > 0 && (
          <span className="pkg-stat">
            <span className="pkg-stat-icon">⟶</span> {pkg.pipelines.length} pipelines
          </span>
        )}
        {pkg.author && (
          <span className="pkg-stat">
            <span className="pkg-stat-icon">by</span> {pkg.author}
          </span>
        )}
      </div>
      {pkg.keywords.length > 0 && (
        <div className="pkg-tags">
          {pkg.keywords.slice(0, 6).map((k) => (
            <span key={k} className="tag">
              {k}
            </span>
          ))}
          {pkg.keywords.length > 6 && (
            <span className="tag">+{pkg.keywords.length - 6}</span>
          )}
        </div>
      )}
    </a>
  );
}
