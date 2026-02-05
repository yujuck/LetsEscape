export default function StoresPage() {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">매장 목록</h2>
      <p className="text-gray-600 mb-8">전국의 방탈출 카페를 찾아보세요.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold mb-2">매장 로딩 중...</h3>
          <p className="text-sm text-gray-500">API 연동 예정</p>
        </div>
      </div>
    </div>
  );
}
