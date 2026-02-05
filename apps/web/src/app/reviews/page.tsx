export default function ReviewsPage() {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">리뷰</h2>
      <p className="text-gray-600 mb-8">방탈출 후기를 확인하고 작성하세요.</p>

      <div className="mb-8">
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
          후기 작성하기
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">리뷰 로딩 중...</h3>
          <p className="text-sm text-gray-500">API 연동 예정</p>
        </div>
      </div>
    </div>
  );
}
