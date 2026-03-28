import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Popsicle Registry — Modules & Tools for Spec-Driven Development',
  description:
    'Discover and install modules, skills, pipelines, and tools for the Popsicle spec-driven development engine.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="navbar">
          <div className="nav-inner">
            <a href="/" className="nav-brand">
              <span className="nav-icon">🍦</span>
              <span className="nav-title">Popsicle</span>
              <span className="nav-registry">Registry</span>
            </a>
            <div className="nav-links">
              <a href="https://github.com/popsicle-lab/popsicle" target="_blank" rel="noopener">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://github.com/popsicle-lab/popsicle-registry"
                target="_blank"
                rel="noopener"
                className="nav-link-text"
              >
                Index
              </a>
            </div>
          </div>
        </nav>
        <div className="page-content">{children}</div>
        <footer className="site-footer">
          <div className="footer-inner">
            <p className="footer-brand">
              Built with 🍦 by{' '}
              <a href="https://github.com/popsicle-lab">popsicle-lab</a>
            </p>
            <p className="footer-links">
              <a href="https://github.com/popsicle-lab/popsicle">CLI</a>
              <span className="dot">·</span>
              <a href="https://github.com/popsicle-lab/popsicle-registry">Registry</a>
              <span className="dot">·</span>
              <span>Apache-2.0</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
