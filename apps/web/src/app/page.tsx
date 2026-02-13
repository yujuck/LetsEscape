import Link from 'next/link';

const missionCards = [
  {
    tag: '실시간 큐레이션',
    title: '서울 인기 테마 탐색',
    copy: '강남, 홍대, 건대, 신촌 등 주요 권역의 신규/인기 테마를 한 화면에서 확인합니다.',
  },
  {
    tag: '플레이 로그',
    title: '내 탈출 기록 보관',
    copy: '난이도, 공포도, 인원 구성, 성공 여부를 저장해 다음 플레이 결정을 빠르게 만듭니다.',
  },
  {
    tag: '추천 엔진',
    title: '취향 기반 미션 추천',
    copy: '“2인, 공포 낮음, 70분”처럼 조건을 넣으면 맞는 테마 후보를 우선 정렬합니다.',
  },
];

const seoulQuickStats = [
  { label: '우선 수집 지역', value: '강남 / 홍대 / 건대' },
  { label: '오늘 크롤링 상태', value: '준비 중' },
  { label: '핵심 목표', value: '서울 데이터 MVP' },
  { label: '다음 단계', value: '리뷰 연동' },
];

export default function Home() {
  return (
    <div className="page-shell">
      <section className="hero-panel">
        <span className="hero-badge">SEOUL MISSION BOARD</span>
        <h2 className="hero-title">서울 방탈출 작전 본부</h2>
        <p className="hero-copy">
          Let&apos;s Escape는 서울 방탈출 플레이어를 위한 탐색/기록 웹앱입니다.
          매장과 테마를 빠르게 비교하고, 플레이 로그를 누적해 다음 미션을 더 정확하게 고르세요.
        </p>
        <div className="action-row">
          <Link href="/themes" className="cta-main">
            서울 테마 보기
          </Link>
          <Link href="/stores" className="cta-sub">
            권역별 매장 탐색
          </Link>
        </div>
      </section>

      <section className="section-panel">
        <h3 className="section-title">핵심 플레이 루프</h3>
        <p className="section-copy">
          탐색 → 예약 → 플레이 → 기록 흐름을 한 곳에서 이어지는 경험으로 구성합니다.
        </p>
        <div className="grid-3">
          {missionCards.map((card) => (
            <article key={card.title} className="info-card">
              <span className="card-tag">{card.tag}</span>
              <h4 className="card-title">{card.title}</h4>
              <p className="card-copy">{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-panel">
        <h3 className="section-title">서울 MVP 진행 현황</h3>
        <p className="section-copy">
          먼저 서울권 데이터를 안정적으로 쌓고, 이후 추천/랭킹 정확도를 높이는 순서로 진행합니다.
        </p>
        <div className="stat-row">
          {seoulQuickStats.map((stat) => (
            <div key={stat.label} className="stat-box">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
