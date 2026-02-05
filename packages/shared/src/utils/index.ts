export function formatClearTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${mins}분`;
  }
  return `${mins}분`;
}

export function parseClearTime(timeString: string): number {
  const hourMatch = timeString.match(/(\d+)시간/);
  const minMatch = timeString.match(/(\d+)분/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);
}

export function getDifficultyLabel(difficulty: number): string {
  const labels: Record<number, string> = {
    1: '쉬움',
    2: '보통',
    3: '어려움',
    4: '매우 어려움',
    5: '극악',
  };
  return labels[difficulty] || '알 수 없음';
}

export function calculateSuccessRate(
  successCount: number,
  totalCount: number,
): number {
  if (totalCount === 0) return 0;
  return Math.round((successCount / totalCount) * 100);
}
