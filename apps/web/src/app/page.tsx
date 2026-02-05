import Link from 'next/link';

export default function Home() {
  return (
    <div className="py-8">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">방탈출의 모든 것</h2>
        <p className="text-gray-600 text-lg mb-8">
          테마 정보부터 후기 기록까지, Let&apos;s Escape와 함께하세요
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/themes"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            테마 둘러보기
          </Link>
          <Link
            href="/reviews"
            className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition"
          >
            후기 작성하기
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">테마 정보</h3>
          <p className="text-gray-600">
            전국 방탈출 카페의 테마 정보를 한눈에 확인하세요.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">후기 기록</h3>
          <p className="text-gray-600">
            나만의 방탈출 기록을 남기고 관리하세요.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">인기 순위</h3>
          <p className="text-gray-600">
            가장 인기 있는 테마와 매장을 확인하세요.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">주요 기능</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex items-start gap-2">
            <span className="text-primary-600">✓</span>
            <span>후기 CRUD 및 개인 기록 관리</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600">✓</span>
            <span>테마 모아보기 및 카테고리화</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600">✓</span>
            <span>업체/테마 정보 제공</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600">✓</span>
            <span>리뷰 모아보기 및 인기 순위</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600">✓</span>
            <span>탈출 성공률 통계</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600">✓</span>
            <span>예약 관리</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
