import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import {
  Shield, Sword, Scroll, Castle, Crown, Clock,
  ChevronRight, BookOpen, Coins
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const { data: heroes } = trpc.hero.list.useQuery();
  const { data: battles } = trpc.battle.list.useQuery();
  const { data: timeline } = trpc.timeline.list.useQuery();
  const { data: manuscripts } = trpc.manuscript.list.useQuery();
  const { data: castles } = trpc.castle.list.useQuery();
  const { data: mediaItems } = trpc.media.list.useQuery();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      // Section animations
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.from(section.querySelectorAll(".animate-in"), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, [heroes, battles, timeline, manuscripts, castles, mediaItems]);

  const addSectionRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const categoryIcons: Record<string, typeof Sword> = {
    battle: Sword,
    diplomacy: Crown,
    law: Scroll,
    culture: BookOpen,
  };

  return (
    <div className="overflow-hidden">
      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/scroll-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5ecd9]/60 via-transparent to-[#f5ecd9]/90" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Shield className="w-20 h-20 text-[#b8860b] mx-auto mb-6 opacity-80" />
          <h1 className="hero-title font-['MedievalSharp'] text-5xl md:text-7xl lg:text-8xl text-[#262626] mb-4"
            style={{ textShadow: "2px 2px 0px rgba(184,134,11,0.3)" }}>
            {t("hero.title")}
          </h1>
          <p className="hero-subtitle font-['PT_Serif'] text-lg md:text-xl text-[#c93e3e] mb-8 italic">
            {t("hero.subtitle")}
          </p>
          <Link to="/battles" className="hero-cta inline-block">
            <button className="btn-medieval">
              {t("hero.cta")}
            </button>
          </Link>
        </div>
      </section>

      {/* ─── TIMELINE SECTION ─── */}
      <section ref={addSectionRef} className="py-20 px-4 bg-[#f5ecd9]/95">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in">
            <Clock className="w-10 h-10 text-[#b8860b] mx-auto mb-3" />
            <h2 className="section-title">{t("sections.timeline")}</h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#b8860b]" />
            <div className="space-y-8">
              {timeline?.slice(0, 6).map((event, i) => {
                const Icon = categoryIcons[event.category] || Clock;
                const isLeft = i % 2 === 0;
                return (
                  <div key={event.id} className={`animate-in flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`w-1/2 ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <span className="text-[#c93e3e] font-['MedievalSharp'] text-lg">{event.year}</span>
                      <h3 className="font-['MedievalSharp'] text-[#262626] mt-1">{event.title}</h3>
                      <p className="text-sm text-[#262626]/70 mt-1 line-clamp-2">{event.description}</p>
                    </div>
                    <div className="relative z-10 w-10 h-10 bg-[#b8860b] rounded-full flex items-center justify-center border-4 border-[#f5ecd9]">
                      <Icon className="w-4 h-4 text-[#f5ecd9]" />
                    </div>
                    <div className="w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center mt-10 animate-in">
            <Link to="/battles" className="text-[#c93e3e] hover:text-[#a83232] font-semibold inline-flex items-center gap-1 transition-colors">
              Вся хронология <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HEROES SECTION ─── */}
      <section ref={addSectionRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in">
            <Crown className="w-10 h-10 text-[#b8860b] mx-auto mb-3" />
            <h2 className="section-title">{t("sections.heroes")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {heroes?.slice(0, 3).map((hero) => (
              <Link to={`/heroes`} key={hero.id} className="animate-in group">
                <div className="card-medieval overflow-hidden">
                  <div className="frame-ornate m-3">
                    <div className="frame-ornate-inner">
                      <img
                        src={hero.imageUrl || "/images/hero-vitovt.jpg"}
                        alt={hero.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-['MedievalSharp'] text-lg text-[#262626] group-hover:text-[#c93e3e] transition-colors">
                      {hero.name}
                    </h3>
                    <p className="text-sm text-[#262626]/60 mt-1">{hero.title}</p>
                    <p className="text-xs text-[#c93e3e] mt-1">{hero.years}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BATTLES SECTION ─── */}
      <section ref={addSectionRef} className="py-20 px-4 bg-[#f5ecd9]/95">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in">
            <Sword className="w-10 h-10 text-[#b8860b] mx-auto mb-3" />
            <h2 className="section-title">{t("sections.battles")}</h2>
          </div>
          <div className="space-y-6">
            {battles?.slice(0, 3).map((battle) => (
              <Link to={`/battles`} key={battle.id} className="animate-in block group">
                <div className="card-medieval overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/3 frame-ornate m-3 md:m-4">
                    <div className="frame-ornate-inner">
                      <img
                        src={battle.imageUrl || "/images/battle-grunwald.jpg"}
                        alt={battle.name}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-5">
                    <span className="text-[#c93e3e] font-['MedievalSharp']">{battle.year} г.</span>
                    <h3 className="font-['MedievalSharp'] text-xl text-[#262626] mt-1 group-hover:text-[#c93e3e] transition-colors">
                      {battle.name}
                    </h3>
                    <p className="text-sm text-[#262626]/60 mt-1">{battle.location}</p>
                    <p className="text-sm text-[#262626]/80 mt-3 line-clamp-3">{battle.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MANUSCRIPTS SECTION ─── */}
      <section ref={addSectionRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in">
            <Scroll className="w-10 h-10 text-[#b8860b] mx-auto mb-3" />
            <h2 className="section-title">{t("sections.manuscripts")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {manuscripts?.slice(0, 2).map((ms) => (
              <Link to={`/manuscripts`} key={ms.id} className="animate-in group">
                <div className="card-medieval overflow-hidden">
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
                    <span className="text-[#c93e3e] text-xs font-bold uppercase tracking-wider">
                      {ms.year} г. {ms.category}
                    </span>
                    <h3 className="font-['MedievalSharp'] text-lg text-[#262626] mt-1 group-hover:text-[#c93e3e] transition-colors">
                      {ms.title}
                    </h3>
                    <p className="text-sm text-[#262626]/70 mt-2 line-clamp-3">{ms.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASTLES SECTION ─── */}
      <section ref={addSectionRef} className="py-20 px-4 bg-[#f5ecd9]/95">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in">
            <Castle className="w-10 h-10 text-[#b8860b] mx-auto mb-3" />
            <h2 className="section-title">{t("sections.castles")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {castles?.slice(0, 3).map((castle) => (
              <Link to={`/castles`} key={castle.id} className="animate-in group">
                <div className="card-medieval overflow-hidden">
                  <div className="frame-ornate m-3">
                    <div className="frame-ornate-inner">
                      <img
                        src={castle.imageUrl || "/images/castle-mir.jpg"}
                        alt={castle.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-['MedievalSharp'] text-lg text-[#262626] group-hover:text-[#c93e3e] transition-colors">
                      {castle.name}
                    </h3>
                    <p className="text-sm text-[#262626]/60 mt-1">{castle.location}</p>
                    <p className="text-xs text-[#b8860b] mt-1">{castle.yearBuilt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MEDIA/ARTIFACTS SECTION ─── */}
      <section ref={addSectionRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in">
            <Coins className="w-10 h-10 text-[#b8860b] mx-auto mb-3" />
            <h2 className="section-title">{t("sections.media")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mediaItems?.slice(0, 4).map((item) => (
              <Link to={`/media`} key={item.id} className="animate-in group">
                <div className="card-medieval overflow-hidden p-2">
                  <div className="frame-ornate m-1">
                    <div className="frame-ornate-inner">
                      <img
                        src={item.url || item.thumbnailUrl || "/images/armor-full.jpg"}
                        alt={item.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-center mt-2 text-[#262626]/80 font-medium px-1 line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
