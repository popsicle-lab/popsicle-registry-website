'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Package, RegistryData } from '../registry';

export default function PackageDetailPage() {
  return (
    <Suspense fallback={<div className="empty-state">Loading...</div>}>
      <PackageDetailInner />
    </Suspense>
  );
}

function PackageDetailInner() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;
    fetch('/registry-data.json')
      .then((r) => r.json())
      .then((data: RegistryData) => {
        const found = data.packages.find((p) => p.name === name) || null;
        setPkg(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [name]);

  if (loading) return <div className="empty-state">Loading...</div>;
  if (!pkg) return <div className="empty-state">Package &quot;{name}&quot; not found.</div>;

  const installCmd =
    pkg.type === 'module'
      ? `popsicle module install ${pkg.name}`
      : `popsicle tool install ${pkg.name}`;

  return (
    <div className="package-detail">
      <h1>
        <span>{pkg.name}</span>
        <span className={`badge ${pkg.type}`}>{pkg.type}</span>
      </h1>
      <p className="desc">{pkg.description}</p>

      <div className="detail-section">
        <h2>Install</h2>
        <div className="install-cmd">{installCmd}</div>
      </div>

      {pkg.author && (
        <div className="detail-section">
          <h2>Author</h2>
          <p>{pkg.author}</p>
        </div>
      )}

      {pkg.repository && (
        <div className="detail-section">
          <h2>Repository</h2>
          <p>
            <a href={pkg.repository} style={{ color: 'var(--accent)' }}>
              {pkg.repository}
            </a>
          </p>
        </div>
      )}

      {pkg.skills.length > 0 && (
        <div className="detail-section">
          <h2>Skills ({pkg.skills.length})</h2>
          <div className="contents-list">
            {pkg.skills.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {pkg.pipelines.length > 0 && (
        <div className="detail-section">
          <h2>Pipelines ({pkg.pipelines.length})</h2>
          <div className="contents-list">
            {pkg.pipelines.map((p) => (
              <span key={p} className="tag">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {pkg.deps.length > 0 && (
        <div className="detail-section">
          <h2>Dependencies</h2>
          <div className="contents-list">
            {pkg.deps.map((d) => (
              <span key={d.name} className="tag">
                {d.name} ({d.kind})
              </span>
            ))}
          </div>
        </div>
      )}

      {pkg.keywords.length > 0 && (
        <div className="detail-section">
          <h2>Keywords</h2>
          <div className="contents-list">
            {pkg.keywords.map((k) => (
              <span key={k} className="tag">
                {k}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="detail-section">
        <h2>Versions ({pkg.versions.length})</h2>
        <ul className="version-list">
          {[...pkg.versions].reverse().map((v) => (
            <li key={v.version}>
              <span>
                v{v.version}
                {v.yanked && <span className="yanked"> (yanked)</span>}
              </span>
              <span style={{ color: 'var(--fg-muted)', fontSize: '0.85rem' }}>
                {v.publishedAt ? new Date(v.publishedAt).toLocaleDateString() : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ color: 'var(--accent)' }}>
          ← Back to all packages
        </a>
      </div>
    </div>
  );
}
