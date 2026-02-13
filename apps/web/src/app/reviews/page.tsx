const mockReviews = [
  {
    theme: '코드네임: 블랙아웃',
    district: '강남',
    note: '퍼즐 연결이 깔끔하고 2인 진행도 답답하지 않았어요.',
    success: '성공',
    minutes: '62분',
  },
  {
    theme: '네온 골목의 증인',
    district: '홍대',
    note: '스토리 몰입감이 좋아서 엔딩이 인상적이었습니다.',
    success: '실패',
    minutes: '75분',
  },
  {
    theme: '지하 실험실 13호',
    district: '건대',
    note: '중반 난이도 상승 구간이 강해서 힌트 관리가 중요해요.',
    success: '성공',
    minutes: '78분',
  },
];

export default function ReviewsPage() {
  return (
    <div className="page-shell">
      <section className="hero-panel">
        <span className="hero-badge">REVIEW LOGBOOK</span>
        <h2 className="hero-title">플레이 기록 보관소</h2>
        <p className="hero-copy">
          플레이 직후 기록을 남기면 다음 미션 선택 정확도가 올라갑니다.
          공개/비공개를 분리하고, 테마별 한줄평을 축적하는 구조로 설계합니다.
        </p>
      </section>

      <section className="section-panel">
        <h3 className="section-title">최근 기록 샘플</h3>
        <p className="section-copy">
          API 연동 후 개인 리뷰 데이터와 전체 한줄평 피드를 함께 제공합니다.
        </p>
        <div className="list-stack">
          {mockReviews.map((review) => (
            <article key={`${review.theme}-${review.minutes}`} className="list-card">
              <span className="card-tag">{review.district}</span>
              <h4 className="card-title">{review.theme}</h4>
              <p className="card-copy">{review.note}</p>
              <div className="stat-row">
                <div className="stat-box">
                  <p className="stat-label">결과</p>
                  <p className="stat-value">{review.success}</p>
                </div>
                <div className="stat-box">
                  <p className="stat-label">소요 시간</p>
                  <p className="stat-value">{review.minutes}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
