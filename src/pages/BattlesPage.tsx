import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import { Sword, MapPin, Calendar, Trophy, Target, X, Users } from "lucide-react";

export default function BattlesPage() {
  const { t } = useTranslation();
  const { data: battles, isLoading } = trpc.battle.list.useQuery();
  const { data: timeline } = trpc.timeline.list.useQuery();
  const [selectedBattle, setSelectedBattle] = useState<NonNullable<typeof battles>[number] | null>(null);
  const [centuryFilter, setCenturyFilter] = useState<number | null>(null);

  const centuries = [13, 14, 15, 16];

  const filteredBattles = battles?.filter((b) => {
    if (!centuryFilter) return true;
    const century = Math.ceil(b.year / 100);
    return century === centuryFilter;
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
          <Sword className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
          <h1 className="section-title text-4xl">{t("sections.battles")}</h1>
          <p className="text-[#262626]/60 mt-3 max-w-2xl mx-auto">
            Ключевые сражения эпохи Великого Княжества Литовского:
            Грюнвальд, Орша, Ведроша и другие битвы, определившие судьбу белорусских земель.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex items-center justify-center gap-2 min-w-max">
            <button
              onClick={() => setCenturyFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                centuryFilter === null
                  ? "bg-[#c93e3e] text-white"
                  : "bg-[#e8dec5] text-[#262626] hover:bg-[#b8860b] hover:text-white"
              }`}
            >
              Все
            </button>
            {centuries.map((c) => (
              <button
                key={c}
                onClick={() => setCenturyFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  centuryFilter === c
                    ? "bg-[#c93e3e] text-white"
                    : "bg-[#e8dec5] text-[#262626] hover:bg-[#b8860b] hover:text-white"
                }`}
              >
                {c} {t("common.century")}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Events */}
        <div className="mb-12 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#b8860b] md:-translate-x-1/2" />
          <div className="space-y-6">
            {timeline?.filter((e) => e.category === "battle").map((event, i) => (
              <div key={event.id} className={`flex items-start gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} pl-12 md:pl-0`}>
                  <span className="text-[#c93e3e] font-['MedievalSharp'] text-lg">{event.year}</span>
                  <h3 className="font-['MedievalSharp'] text-[#262626]">{event.title}</h3>
                  <p className="text-sm text-[#262626]/70">{event.description}</p>
                </div>
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-[#c93e3e] rounded-full flex items-center justify-center border-4 border-[#f5ecd9] z-10 -translate-x-1/2 md:-translate-x-1/2">
                  <Sword className="w-3 h-3 text-[#f5ecd9]" />
                </div>
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="divider-ornate" />

        {/* Battles Grid */}
        <div className="space-y-6">
          {filteredBattles?.map((battle) => (
            <button
              key={battle.id}
              onClick={() => setSelectedBattle(battle)}
              className="card-medieval overflow-hidden text-left group cursor-pointer w-full flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 frame-ornate m-3 md:m-4">
                <div className="frame-ornate-inner">
                  <img
                    src={battle.imageUrl || "/images/battle-grunwald.jpg"}
                    alt={battle.name}
                    className="w-full h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="md:w-3/5 p-5">
                <div className="flex items-center gap-3 text-sm text-[#c93e3e]">
                  <Calendar className="w-4 h-4" />
                  <span>{battle.date}, {battle.year} г.</span>
                </div>
                <h3 className="font-['MedievalSharp'] text-2xl text-[#262626] mt-2 group-hover:text-[#c93e3e] transition-colors">
                  {battle.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#262626]/60 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{battle.location}</span>
                </div>
                <p className="text-sm text-[#262626]/80 mt-3 line-clamp-3">{battle.description}</p>
                <div className="flex items-center gap-2 text-sm text-[#b8860b] mt-3">
                  <Users className="w-4 h-4" />
                  <span>{battle.belligerents}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Battle Detail Modal */}
        {selectedBattle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedBattle(null as any)}>
            <div
              className="bg-[#f5ecd9] border-2 border-[#b8860b] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-medieval"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-56 md:h-72">
                <img
                  src={selectedBattle.imageUrl || "/images/battle-grunwald.jpg"}
                  alt={selectedBattle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] to-transparent" />
                <button
                  onClick={() => setSelectedBattle(null as any)}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#262626]/80 rounded-full flex items-center justify-center text-[#f5ecd9] hover:bg-[#c93e3e] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 text-[#b8860b] text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    {selectedBattle.date}, {selectedBattle.year}
                  </div>
                  <h2 className="font-['MedievalSharp'] text-3xl text-[#f5ecd9]">{selectedBattle.name}</h2>
                  <div className="flex items-center gap-2 text-[#f5ecd9]/70 text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    {selectedBattle.location}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5" /> Стороны конфликта
                  </h3>
                  <p className="text-[#262626]/80">{selectedBattle.belligerents}</p>
                </div>

                <div>
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5" /> Описание
                  </h3>
                  <p className="text-[#262626]/80 leading-relaxed">{selectedBattle.description}</p>
                </div>

                <div>
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                    <Sword className="w-5 h-5" /> Тактика
                  </h3>
                  <p className="text-[#262626]/80 leading-relaxed">{selectedBattle.tactics}</p>
                </div>

                <div>
                  <h3 className="font-['MedievalSharp'] text-lg text-[#b8860b] flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5" /> Итог
                  </h3>
                  <p className="text-[#262626]/80 leading-relaxed">{selectedBattle.result}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
