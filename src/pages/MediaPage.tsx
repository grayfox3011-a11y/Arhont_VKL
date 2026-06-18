import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function MediaPage() {
  const { t } = useTranslation();
  const { data: mediaItems, isLoading } = trpc.media.list.useQuery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = [
    { key: "armor", label: "Доспехи" },
    { key: "weapon", label: "Оружие" },
    { key: "coin", label: "Монеты" },
    { key: "artifact", label: "Артефакты" },
    { key: "reconstruction", label: "Реконструкции" },
  ];

  const filtered = mediaItems?.filter((m) => {
    if (!categoryFilter) return true;
    return m.category === categoryFilter;
  });

  const currentItem = lightboxIndex !== null ? filtered?.[lightboxIndex] : null;

  const goNext = () => {
    if (lightboxIndex !== null && filtered && lightboxIndex < filtered.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

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
          <Image className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
          <h1 className="section-title text-4xl">{t("sections.media")}</h1>
          <p className="text-[#262626]/60 mt-3 max-w-2xl mx-auto">
            Артефакты, доспехи, оружие и другие материальные свидетельства эпохи
            рыцарства Великого Княжества Литовского.
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered?.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="card-medieval overflow-hidden p-2 group cursor-pointer text-left"
            >
              <div className="frame-ornate m-1">
                <div className="frame-ornate-inner">
                  <img
                    src={item.url || item.thumbnailUrl || "/images/armor-full.jpg"}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <p className="text-xs text-center mt-2 text-[#262626]/80 font-medium line-clamp-2 px-1">
                {item.title}
              </p>
              {item.description && (
                <p className="text-xs text-center text-[#262626]/50 line-clamp-2 px-1 mt-0.5">
                  {item.description}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {currentItem && lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightboxIndex(null)}>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 w-10 h-10 bg-[#262626]/80 rounded-full flex items-center justify-center text-[#f5ecd9] hover:bg-[#c93e3e] transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation */}
              {lightboxIndex > 0 && (
                <button
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 bg-[#262626]/80 rounded-full flex items-center justify-center text-[#f5ecd9] hover:bg-[#b8860b] transition-colors z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {filtered && lightboxIndex < filtered.length - 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 bg-[#262626]/80 rounded-full flex items-center justify-center text-[#f5ecd9] hover:bg-[#b8860b] transition-colors z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Image */}
              <div className="frame-ornate">
                <div className="frame-ornate-inner">
                  <img
                    src={currentItem.url || currentItem.thumbnailUrl || ""}
                    alt={currentItem.title}
                    className="w-full max-h-[70vh] object-contain bg-[#262626]"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <h3 className="font-['MedievalSharp'] text-xl text-[#f5ecd9]">{currentItem.title}</h3>
                {currentItem.description && (
                  <p className="text-sm text-[#f5ecd9]/70 mt-1">{currentItem.description}</p>
                )}
                <p className="text-xs text-[#f5ecd9]/50 mt-2">
                  {lightboxIndex + 1} / {filtered?.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
