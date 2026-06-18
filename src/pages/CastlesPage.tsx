import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import { Castle, MapPin, X, Shield, Users } from "lucide-react";

export default function CastlesPage() {
  const { t } = useTranslation();
  const { data: castles, isLoading } = trpc.castle.list.useQuery();
  const [selectedCastle, setSelectedCastle] = useState<NonNullable<typeof castles>[number] | null>(null);

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
          <Castle className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
          <h1 className="section-title text-4xl">{t("sections.castles")}</h1>
          <p className="text-[#262626]/60 mt-3 max-w-2xl mx-auto">
            Замки и крепости Великого Княжества Литовского на территории Беларуси.
            Мощные твердыни, хранившие границы государства от врагов.
          </p>
        </div>

        {/* Castles Grid */}
        <div className="space-y-8">
          {castles?.map((castle, idx) => (
            <button
              key={castle.id}
              onClick={() => setSelectedCastle(castle)}
              className={`card-medieval overflow-hidden text-left group cursor-pointer w-full flex flex-col ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="md:w-1/2 frame-ornate m-3 md:m-4">
                <div className="frame-ornate-inner">
                  <img
                    src={castle.imageUrl || "/images/castle-mir.jpg"}
                    alt={castle.name}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="md:w-1/2 p-5 flex flex-col justify-center">
                {castle.yearBuilt && (
                  <span className="text-[#c93e3e] font-['MedievalSharp'] text-sm">{castle.yearBuilt}</span>
                )}
                <h3 className="font-['MedievalSharp'] text-2xl text-[#262626] mt-1 group-hover:text-[#c93e3e] transition-colors">
                  {castle.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#262626]/60 mt-1">
                  <MapPin className="w-4 h-4" />
                  {castle.location}
                </div>
                <p className="text-[#262626]/80 mt-4 leading-relaxed">{castle.description}</p>
                {castle.owners && (
                  <div className="flex items-center gap-2 text-sm text-[#b8860b] mt-3">
                    <Users className="w-4 h-4" />
                    Владельцы: {castle.owners}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Castle Detail Modal */}
        {selectedCastle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCastle(null as any)}>
            <div
              className="bg-[#f5ecd9] border-2 border-[#b8860b] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-medieval"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-56 md:h-72">
                <img
                  src={selectedCastle.imageUrl || "/images/castle-mir.jpg"}
                  alt={selectedCastle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] to-transparent" />
                <button
                  onClick={() => setSelectedCastle(null as any)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#262626]/80 rounded-full flex items-center justify-center text-[#f5ecd9] hover:bg-[#c93e3e] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  {selectedCastle.yearBuilt && (
                    <span className="text-[#b8860b] font-['MedievalSharp']">{selectedCastle.yearBuilt}</span>
                  )}
                  <h2 className="font-['MedievalSharp'] text-3xl text-[#f5ecd9]">{selectedCastle.name}</h2>
                  <div className="flex items-center gap-2 text-[#f5ecd9]/70 text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedCastle.location}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] mb-2">Описание</h3>
                  <p className="text-[#262626]/80 leading-relaxed">{selectedCastle.description}</p>
                </div>

                {selectedCastle.owners && (
                  <div>
                    <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5" /> Владельцы
                    </h3>
                    <p className="text-[#262626]/80">{selectedCastle.owners}</p>
                  </div>
                )}

                {selectedCastle.defenseSystem && (
                  <div>
                    <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5" /> Оборонительная система
                    </h3>
                    <p className="text-[#262626]/80 leading-relaxed">{selectedCastle.defenseSystem}</p>
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
