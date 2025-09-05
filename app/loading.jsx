export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-pink-3s00 z-50">
      <div className="relative">
        <div className="h-16 w-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-pink-700 font-bold">Loading</span>
        </div>
      </div>
    </div>
  );
}
