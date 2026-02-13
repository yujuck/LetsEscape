'use client';

import { useThemes } from '@/hooks';
import { getDifficultyLabel } from '@lets-escape/shared';

export default function ThemesPage() {
  const { data: themes, isLoading, isError } = useThemes();

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <span className="hero-badge">THEME TERMINAL</span>
        <h2 className="hero-title">서울 테마 탐색</h2>
        <p className="hero-copy">
          권역, 인원, 공포도, 플레이 타임 기준으로 서울 테마를 빠르게 좁힐 수 있게 구성합니다.
          현재는 API 실데이터를 우선 렌더링합니다.
        </p>
      </section>

      <section className="section-panel">
        <h3 className="section-title">테마 목록</h3>
        <p className="section-copy">API 실데이터를 기준으로 테마를 조회합니다.</p>

        {isLoading && <p className="section-copy">테마 데이터를 불러오는 중...</p>}
        {isError && (
          <p className="section-copy">테마 데이터를 가져오지 못했습니다. API 서버를 확인해주세요.</p>
        )}
        {!isLoading && !isError && (!themes || themes.length === 0) && (
          <p className="section-copy">표시할 테마 데이터가 없습니다.</p>
        )}

        {!isLoading && !isError && themes && themes.length > 0 && (
          <div className="list-stack">
            {themes.map((theme) => (
              <article key={theme.id ?? `${theme.storeId}-${theme.name}`} className="list-card">
                <span className="card-tag">스토어 #{theme.storeId}</span>
                <h4 className="card-title">{theme.name}</h4>
                <p className="card-copy">{theme.description ?? theme.genre ?? '설명 없음'}</p>
                <div className="stat-row">
                  <div className="stat-box">
                    <p className="stat-label">난이도</p>
                    <p className="stat-value">
                      {theme.difficulty ? getDifficultyLabel(theme.difficulty) : '-'}
                    </p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">공포도</p>
                    <p className="stat-value">{theme.fear ?? '-'}</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">플레이 타임</p>
                    <p className="stat-value">
                      {theme.playTimeMinutes ? `${theme.playTimeMinutes}분` : '-'}
                    </p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">가격</p>
                    <p className="stat-value">
                      {typeof theme.priceKrw === 'number'
                        ? new Intl.NumberFormat('ko-KR').format(theme.priceKrw)
                        : '-'}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
