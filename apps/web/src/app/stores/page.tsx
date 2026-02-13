'use client';

import { useStores } from '@/hooks';

export default function StoresPage() {
  const { data: stores, isLoading, isError } = useStores();

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <span className="hero-badge">STORE RADAR</span>
        <h2 className="hero-title">서울 매장 레이더</h2>
        <p className="hero-copy">
          크롤링으로 수집한 매장 데이터를 권역 중심으로 정리합니다.
          운영시간, 예약 오픈 정보, 링크를 빠르게 확인할 수 있게 구성합니다.
        </p>
      </section>

      <section className="section-panel">
        <h3 className="section-title">서울 매장 목록</h3>
        <p className="section-copy">API 실데이터를 기준으로 매장을 조회합니다.</p>

        {isLoading && <p className="section-copy">매장 데이터를 불러오는 중...</p>}
        {isError && (
          <p className="section-copy">매장 데이터를 가져오지 못했습니다. API 서버를 확인해주세요.</p>
        )}
        {!isLoading && !isError && (!stores || stores.length === 0) && (
          <p className="section-copy">표시할 매장 데이터가 없습니다.</p>
        )}

        {!isLoading && !isError && stores && stores.length > 0 && (
          <div className="list-stack">
            {stores.map((store) => (
              <article key={store.id ?? `${store.name}-${store.address}`} className="list-card">
                <span className="card-tag">{store.district}</span>
                <h4 className="card-title">{store.name}</h4>
                <p className="card-copy">{store.address}</p>
                <div className="stat-row">
                  <div className="stat-box">
                    <p className="stat-label">연락처</p>
                    <p className="stat-value">{store.phone ?? '-'}</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-label">예약 오픈</p>
                    <p className="stat-value">{store.reservationOpenNote ?? '-'}</p>
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
