import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import { Scroll, BookOpen, X, User, Calendar } from "lucide-react";

export default function ManuscriptsPage() {
  const { t } = useTranslation();
  const { data: manuscripts, isLoading } = trpc.manuscript.list.useQuery();
  const [selectedMs, setSelectedMs] = useState<NonNullable<typeof manuscripts>[number] | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = [
    { key: "statute", label: "Статуты" },
    { key: "metric", label: "Метрика" },
    { key: "chronicle", label: "Летописи" },
    { key: "privilege", label: "Грамоты" },
  ];

  const filtered = manuscripts?.filter((m) => {
    if (!categoryFilter) return true;
    return m.category === categoryFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-[#b8860b] border-t-[#c93e3e] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Scroll className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
          <h1 className="section-title text-4xl">{t("sections.manuscripts")}</h1>
          <p className="text-[#262626]/60 mt-3 max-w-2xl mx-auto">
            Оцифрованные рукописи, грамоты и законодательные акты Великого Княжества Литовского.
            Сравнение оригинальных текстов с современными переводами.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              categoryFilter === null
                ? "bg-[#c93e3e] text-white"
                : "bg-[#e8dec5] text-[#262626] hover:bg-[#b8860b] hover:text-white"
            }`}
          >
            Все
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategoryFilter(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                categoryFilter === c.key
                  ? "bg-[#c93e3e] text-white"
                  : "bg-[#e8dec5] text-[#262626] hover:bg-[#b8860b] hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Manuscripts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered?.map((ms) => (
            <button
              key={ms.id}
              onClick={() => { setSelectedMs(ms); setCompareMode(false); setSliderPos(50); }}
              className="card-medieval overflow-hidden text-left group cursor-pointer w-full"
            >
              <div className="frame-ornate m-3">
                <div className="frame-ornate-inner">
                  <img
                    src={ms.imageUrl || "/images/manuscript-statut.jpg"}
                    alt={ms.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-[#c93e3e] font-bold uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  {ms.year}
                  <BookOpen className="w-3 h-3" />
                  {ms.category}
                </div>
                <h3 className="font-['MedievalSharp'] text-lg text-[#262626] mt-2 group-hover:text-[#c93e3e] transition-colors">
                  {ms.title}
                </h3>
                {ms.author && (
                  <div className="flex items-center gap-2 text-sm text-[#262626]/60 mt-1">
                    <User className="w-3 h-3" />
                    {ms.author}
                  </div>
                )}
                <p className="text-sm text-[#262626]/70 mt-3 line-clamp-3">{ms.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Manuscript Detail Modal */}
        {selectedMs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMs(null as any)}>
            <div
              className="bg-[#f5ecd9] border-2 border-[#b8860b] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-medieval"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-48">
                <img
                  src={selectedMs.imageUrl || "/images/manuscript-statut.jpg"}
                  alt={selectedMs.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] to-transparent" />
                <button
                  onClick={() => setSelectedMs(null as any)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#262626]/80 rounded-full flex items-center justify-center text-[#f5ecd9] hover:bg-[#c93e3e] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 text-[#b8860b] text-sm">
                    <Calendar className="w-4 h-4" />
                    {selectedMs.year}
                    <BookOpen className="w-4 h-4 ml-2" />
                    {selectedMs.category}
                  </div>
                  <h2 className="font-['MedievalSharp'] text-2xl text-[#f5ecd9]">{selectedMs.title}</h2>
                  {selectedMs.author && (
                    <div className="flex items-center gap-2 text-[#f5ecd9]/70 text-sm mt-1">
                      <User className="w-4 h-4" />
                      {selectedMs.author}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Toggle compare mode */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setCompareMode(false)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      !compareMode ? "bg-[#c93e3e] text-white" : "bg-[#e8dec5] text-[#262626]"
                    }`}
                  >
                    Перевод
                  </button>
                  <button
                    onClick={() => setCompareMode(true)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      compareMode ? "bg-[#c93e3e] text-white" : "bg-[#e8dec5] text-[#262626]"
                    }`}
                  >
                    Оригинал / Перевод
                  </button>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] mb-2">Описание</h3>
                  <p className="text-[#262626]/80 leading-relaxed">{selectedMs.description}</p>
                </div>

                {compareMode && selectedMs.originalText ? (
                  /* Compare Mode with slider */
                  <div>
                    <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] mb-3">Сравнение</h3>
                    <div
                      className="relative border-2 border-[#b8860b]/30 rounded-lg overflow-hidden"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        setSliderPos(Math.max(10, Math.min(90, x)));
                      }}
                    >
                      {/* Translation (bottom layer) */}
                      <div className="p-5 bg-[#f5ecd9]">
                        <div className="text-xs font-bold text-[#c93e3e] mb-2 uppercase">Перевод</div>
                        <p className="text-[#262626]/90 leading-relaxed whitespace-pre-line">
                          {selectedMs.translatedText}
                        </p>
                      </div>
                      {/* Original (top layer, clipped) */}
                      <div
                        className="absolute top-0 left-0 h-full bg-[#e8dec5] border-r-2 border-[#b8860b] overflow-hidden"
                        style={{ width: `${sliderPos}%` }}
                      >
                        <div className="p-5" style={{ width: `${100 / (sliderPos / 100)}%` }}>
                          <div className="text-xs font-bold text-[#b8860b] mb-2 uppercase">Оригинал</div>
                          <p className="text-[#262626]/90 leading-relaxed whitespace-pre-line">
                            {selectedMs.originalText}
                          </p>
                        </div>
                      </div>
                      {/* Slider handle */}
                      <div
                        className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-10"
                        style={{ left: `${sliderPos}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#b8860b] rounded-full flex items-center justify-center shadow-lg">
                          <div className="flex gap-0.5">
                            <div className="w-0.5 h-3 bg-[#f5ecd9]" />
                            <div className="w-0.5 h-3 bg-[#f5ecd9]" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#262626]/50 mt-2 text-center">
                      Перемещайте ползунок для сравнения оригинала и перевода
                    </p>
                  </div>
                ) : (
                  /* Translation only */
                  <div>
                    <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] mb-2">
                      {selectedMs.originalText ? "Перевод" : "Текст"}
                    </h3>
                    <div className="p-5 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg">
                      <p className="text-[#262626]/90 leading-relaxed whitespace-pre-line">
                        {selectedMs.translatedText}
                      </p>
                    </div>
                    {selectedMs.originalText && (
                      <div className="mt-4">
                        <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] mb-2">Оригинал</h3>
                        <div className="p-5 bg-[#e8dec5] border-2 border-[#b8860b]/30 rounded-lg">
                          <p className="text-[#262626]/90 leading-relaxed whitespace-pre-line font-serif italic">
                            {selectedMs.originalText}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
