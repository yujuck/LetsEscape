export default function ThemesPage() {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">테마 목록</h2>
      <p className="text-gray-600 mb-8">다양한 방탈출 테마를 둘러보세요.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
          <h3 className="font-semibold mb-2">테마 로딩 중...</h3>
          <p className="text-sm text-gray-500">API 연동 예정</p>
        </div>
      </div>
    </div>
  );
}
