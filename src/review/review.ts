class Review {
  content: string; // 후기 내용
  isPrivate: boolean; // 리뷰 공개 여부
  clear: boolean; // 성공여부
  rating: number; // 평점
  difficulty: number; // 난이도 평가
  clearTime: string; // 성공 시간
  usedHint: number; // 사용 힌트 개수

  title?: string; // 후기 제목
  tags?: string[]; // 리뷰 키워드
  likes?: number; // 좋아요 수
}
