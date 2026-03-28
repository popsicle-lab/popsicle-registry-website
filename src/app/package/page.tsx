'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { registryData } from '../../data/registry-data';

export default function PackageDetailPage() {
  return (
    <Suspense fallback={<div className="empty-state">Loading…</div>}>
      <PackageDetailInner />
    </Suspense>
  );
}

function PackageDetailInner() {
  const name = useSearchParams().get('name');
  const pkg = registryData.packages.find((p) => p.name === name);

  if (!pkg) {
    return (
      <div className="content">
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <p>Package &ldquo;{name}&rdquo; not found.</p>
        </div>
      </div>
    );
  }

  const installCmd =
    pkg.type === 'module'
      ? `popsicle module install ${pkg.name}`
      : `popsicle tool install ${pkg.name}`;

  return (
    <div className="content">
      <a href="/" className="detail-back">
        ← Back to registry
      </a>

      <div className="detail-layout">
        {/* ── Main column ─────────────────────────────────────── */}
        <div className="detail-main">
          <div className="detail-title">
            <h1>{pkg.name}</h1>
            <span className={`badge badge-${pkg.type}`}>{pkg.type}</span>
          </div>
          <p className="detail-desc">{pkg.description}</p>

          <div className="install-box">{installCmd}</div>

          {pkg.skills.length > 0 && (
            <div className="detail-section">
              <div className="detail-section-title">
                ✦ Skills <span className="count">({pkg.skills.length})</span>
              </div>
              <div className="detail-grid">
                {pkg.skills.map((s) => (
                  <span key={s} className="skill-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pkg.pipelines.length > 0 && (
            <div className="detail-section">
              <div className="detail-section-title">
                ⟶ Pipelines <span className="count">({pkg.pipelines.length})</span>
              </div>
              <div className="detail-grid">
                {pkg.pipelines.map((p) => (
                  <span key={p} className="pipeline-tag">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pkg.deps.length > 0 && (
            <div className="detail-section">
              <div className="detail-section-title">
                Dependencies <span className="count">({pkg.deps.length})</span>
              </div>
              <div className="detail-grid">
                {pkg.deps.map((d) => (
                  <span key={d.name} className="tag">
                    {d.name}
                    <span style={{ opacity: 0.6, marginLeft: '0.3rem' }}>({d.kind})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="detail-section">
            <div className="detail-section-title">
              Versions <span className="count">({pkg.versions.length})</span>
            </div>
            <ul className="version-list">
              {[...pkg.versions].reverse().map((v) => (
                <li key={v.version} className="version-item">
                  <span>
                    <span className="version-num">v{v.version}</span>
                    {v.yanked && <span className="version-yanked">yanked</span>}
                  </span>
                  <span className="version-date">
                    {v.publishedAt
                      ? new Date(v.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────── */}
        <aside className="detail-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-section">
              <div className="sidebar-label">Version</div>
              <div className="sidebar-value" style={{ fontFamily: 'var(--mono)' }}>
                v{pkg.latestVersion}
              </div>
            </div>

            {pkg.author && (
              <div className="sidebar-section">
                <div className="sidebar-label">Author</div>
                <div className="sidebar-value">{pkg.author}</div>
              </div>
            )}

            {pkg.repository && (
              <div className="sidebar-section">
                <div className="sidebar-label">Repository</div>
                <div className="sidebar-value">
                  <a href={pkg.repository} target="_blank" rel="noopener">
                    {pkg.repository.replace('https://github.com/', '')}
                  </a>
                </div>
              </div>
            )}

            <div className="sidebar-section">
              <div className="sidebar-label">Install</div>
              <div
                className="sidebar-value"
                style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--green)' }}
              >
                {installCmd}
              </div>
            </div>

            {pkg.keywords.length > 0 && (
              <div className="sidebar-section">
                <div className="sidebar-label">Keywords</div>
                <div className="detail-grid" style={{ marginTop: '0.25rem' }}>
                  {pkg.keywords.map((k) => (
                    <span key={k} className="tag">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
