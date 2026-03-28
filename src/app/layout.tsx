import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Popsicle Registry',
  description: 'Browse and discover Popsicle modules and tools',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/" className="logo">
              🍦 Popsicle Registry
            </a>
            <span className="tagline">Discover modules &amp; tools for spec-driven development</span>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>
            <a href="https://github.com/popsicle-lab/popsicle">Popsicle CLI</a>
            {' · '}
            <a href="https://github.com/popsicle-lab/popsicle-registry">Registry Index</a>
            {' · '}
            Apache-2.0
          </p>
        </footer>
      </body>
    </html>
  );
}
