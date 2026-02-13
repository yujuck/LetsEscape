import type { Metadata } from 'next';
import Link from 'next/link';
import { Providers } from './providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: "Let's Escape - 서울 방탈출 미션보드",
  description: '서울 방탈출 테마 탐색, 매장 정보, 후기 기록 서비스',
};

const navItems = [
  { href: '/', label: '홈' },
  { href: '/themes', label: '테마' },
  { href: '/stores', label: '매장' },
  { href: '/reviews', label: '리뷰' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="background-glow" aria-hidden="true" />
          <header className="site-header">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <Link href="/" className="brand-mark">
                Let&apos;s Escape
              </Link>
              <nav>
                <ul className="flex items-center gap-2 sm:gap-3">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="nav-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6">
            {children}
          </main>
          <footer className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
            <div className="footer-panel">
              <p>서울 방탈출 플레이어를 위한 미션 아카이브</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
