const sampleThemes = [
  {
    district: '강남',
    title: '코드네임: 블랙아웃',
    mood: '잠입, 스릴러',
    players: '2-4인',
    fear: '낮음',
    time: '70분',
  },
  {
    district: '홍대',
    title: '네온 골목의 증인',
    mood: '추리, 스토리',
    players: '2-5인',
    fear: '중간',
    time: '75분',
  },
  {
    district: '건대',
    title: '지하 실험실 13호',
    mood: 'SF, 퍼즐',
    players: '3-5인',
    fear: '중간',
    time: '80분',
  },
  {
    district: '신촌',
    title: '라스트 라디오',
    mood: '감성, 미스터리',
    players: '2-4인',
    fear: '낮음',
    time: '65분',
  },
];

export default function ThemesPage() {
  return (
    <div className="page-shell">
      <section className="hero-panel">
        <span className="hero-badge">THEME TERMINAL</span>
        <h2 className="hero-title">서울 테마 탐색</h2>
        <p className="hero-copy">
          권역, 인원, 공포도, 플레이 타임 기준으로 서울 테마를 빠르게 좁힐 수 있게 구성합니다.
          아래 카드는 API 연동 전 샘플 UI입니다.
        </p>
      </section>

      <section className="section-panel">
        <h3 className="section-title">오늘의 후보 미션</h3>
        <p className="section-copy">서울 데이터 API가 연결되면 실제 테마 데이터로 대체됩니다.</p>
        <div className="list-stack">
          {sampleThemes.map((theme) => (
            <article key={theme.title} className="list-card">
              <span className="card-tag">{theme.district}</span>
              <h4 className="card-title">{theme.title}</h4>
              <p className="card-copy">{theme.mood}</p>
              <div className="stat-row">
                <div className="stat-box">
                  <p className="stat-label">추천 인원</p>
                  <p className="stat-value">{theme.players}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label">공포도</p>
                  <p className="stat-value">{theme.fear}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label">플레이 타임</p>
                  <p className="stat-value">{theme.time}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
