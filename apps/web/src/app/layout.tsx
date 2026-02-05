import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: "Let's Escape - 방탈출 정보 & 후기",
  description: '방탈출 테마 정보 제공 및 후기 기록 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <header className="bg-primary-600 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Let&apos;s Escape</h1>
              <ul className="flex gap-4">
                <li>
                  <a href="/" className="hover:text-primary-200">
                    홈
                  </a>
                </li>
                <li>
                  <a href="/themes" className="hover:text-primary-200">
                    테마
                  </a>
                </li>
                <li>
                  <a href="/stores" className="hover:text-primary-200">
                    매장
                  </a>
                </li>
                <li>
                  <a href="/reviews" className="hover:text-primary-200">
                    리뷰
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <main className="container mx-auto p-4">{children}</main>
          <footer className="bg-gray-100 text-gray-600 p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Let&apos;s Escape. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
