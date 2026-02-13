const seoulStores = [
  {
    name: '미션하우스 강남점',
    district: '강남',
    feature: '입문자 친화 퍼즐 라인업',
    hours: '11:00 - 23:00',
  },
  {
    name: '이스케이프 스테이션 홍대',
    district: '홍대',
    feature: '스토리 몰입형 시그니처 테마',
    hours: '10:30 - 22:30',
  },
  {
    name: '도어브레이커 건대',
    district: '건대',
    feature: '중고난도 협동형 테마',
    hours: '12:00 - 24:00',
  },
  {
    name: '룸퍼즐 신촌',
    district: '신촌',
    feature: '2인 전용 라이트 테마 강화',
    hours: '11:00 - 22:00',
  },
];

export default function StoresPage() {
  return (
    <div className="page-shell">
      <section className="hero-panel">
        <span className="hero-badge">STORE RADAR</span>
        <h2 className="hero-title">서울 매장 레이더</h2>
        <p className="hero-copy">
          크롤링으로 수집한 매장 데이터를 권역 중심으로 정리합니다.
          운영시간, 예약 오픈 시간, 연락처를 빠르게 확인할 수 있는 구조로 확장합니다.
        </p>
      </section>

      <section className="section-panel">
        <h3 className="section-title">우선 수집 매장 샘플</h3>
        <p className="section-copy">
          현재는 UI 샘플이며, API 연동 후 실시간 데이터로 교체됩니다.
        </p>
        <div className="list-stack">
          {seoulStores.map((store) => (
            <article key={store.name} className="list-card">
              <span className="card-tag">{store.district}</span>
              <h4 className="card-title">{store.name}</h4>
              <p className="card-copy">{store.feature}</p>
              <div className="stat-row">
                <div className="stat-box">
                  <p className="stat-label">운영시간</p>
                  <p className="stat-value">{store.hours}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label">데이터 상태</p>
                  <p className="stat-value">수집 대기</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
