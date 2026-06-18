export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#b8860b] border-t-[#c93e3e] rounded-full animate-spin mx-auto mb-4" />
        <p className="font-['MedievalSharp'] text-xl text-[#262626]">Загрузка...</p>
      </div>
    </div>
  );
}
