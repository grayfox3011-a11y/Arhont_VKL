import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import { Crown, Shield, Swords, X } from "lucide-react";

export default function HeroesPage() {
  const { t } = useTranslation();
  const { data: heroes, isLoading } = trpc.hero.list.useQuery();
  const [selectedHero, setSelectedHero] = useState<NonNullable<typeof heroes>[number] | null>(null);

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
        <div className="text-center mb-12">
          <Crown className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
          <h1 className="section-title text-4xl">{t("sections.heroes")}</h1>
          <p className="text-[#262626]/60 mt-3 max-w-2xl mx-auto">
            Выдающиеся полководцы, правители и рыцари Великого Княжества Литовского,
            чьи подвиги вошли в историю белорусских земель.
          </p>
        </div>

        {/* Hero Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes?.map((hero) => (
            <button
              key={hero.id}
              onClick={() => setSelectedHero(hero)}
              className="card-medieval overflow-hidden text-left group cursor-pointer w-full"
            >
              <div className="frame-ornate m-3">
                <div className="frame-ornate-inner">
                  <img
                    src={hero.imageUrl || "/images/hero-vitovt.jpg"}
                    alt={hero.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="p-4">
                <span className="text-[#c93e3e] font-['MedievalSharp']">{hero.years}</span>
                <h3 className="font-['MedievalSharp'] text-xl text-[#262626] mt-1 group-hover:text-[#c93e3e] transition-colors">
                  {hero.name}
                </h3>
                <p className="text-sm text-[#262626]/60 mt-1">{hero.title}</p>
                <p className="text-sm text-[#262626]/70 mt-3 line-clamp-3">{hero.bio}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Hero Detail Modal */}
        {selectedHero && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedHero(null as any)}>
            <div
              className="bg-[#f5ecd9] border-2 border-[#b8860b] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-medieval"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <div className="h-48 md:h-64 overflow-hidden">
                  <img
                    src={selectedHero.imageUrl || "/images/hero-vitovt.jpg"}
                    alt={selectedHero.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262626] to-transparent" />
                </div>
                <button
                  onClick={() => setSelectedHero(null as any)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#262626]/80 rounded-full flex items-center justify-center text-[#f5ecd9] hover:bg-[#c93e3e] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-[#b8860b] font-['MedievalSharp']">{selectedHero.years}</span>
                  <h2 className="font-['MedievalSharp'] text-3xl text-[#f5ecd9]">{selectedHero.name}</h2>
                  <p className="text-[#f5ecd9]/80 text-sm">{selectedHero.title}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5" /> Биография
                  </h3>
                  <p className="text-[#262626]/80 leading-relaxed">{selectedHero.bio}</p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                    <Swords className="w-5 h-5" /> Достижения
                  </h3>
                  <p className="text-[#262626]/80 leading-relaxed">{selectedHero.achievements}</p>
                </div>

                {/* Heraldry */}
                {selectedHero.heraldry && (
                  <div>
                    <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                      <Crown className="w-5 h-5" /> Геральдика
                    </h3>
                    <p className="text-[#262626]/80 leading-relaxed">{selectedHero.heraldry}</p>
                  </div>
                )}

                {/* Battles */}
                {selectedHero.battles && (
                  <div>
                    <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                      <Swords className="w-5 h-5" /> Участие в сражениях
                    </h3>
                    <p className="text-[#262626]/80 leading-relaxed">Связанные битвы: {selectedHero.battles}</p>
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
