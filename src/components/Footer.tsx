import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Shield, BookOpen, Sword, Scroll, Castle, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { to: "/heroes", label: t("nav.heroes"), icon: BookOpen },
    { to: "/battles", label: t("nav.battles"), icon: Sword },
    { to: "/manuscripts", label: t("nav.manuscripts"), icon: Scroll },
    { to: "/castles", label: t("nav.castles"), icon: Castle },
    { to: "/contact", label: t("nav.contact"), icon: Mail },
  ];

  return (
    <footer className="bg-[#262626] text-[#f5ecd9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-[#b8860b]" />
              <span className="font-['MedievalSharp'] text-xl">Архонт ВКЛ</span>
            </div>
            <p className="text-[#f5ecd9]/70 text-sm leading-relaxed">
              Образовательный портал, посвященный истории рыцарства на территории Беларуси в период
              Великого Княжества Литовского (XIII–XVI вв.)
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-['MedievalSharp'] text-lg mb-4 text-[#b8860b]">
              Разделы
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#f5ecd9]/70 hover:text-[#b8860b] transition-colors text-sm flex items-center gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-['MedievalSharp'] text-lg mb-4 text-[#b8860b]">
              О проекте
            </h4>
            <p className="text-[#f5ecd9]/70 text-sm leading-relaxed">
              Проект создан для образовательных и исследовательских целей. Все материалы основаны
              на академических источниках и исторических документах. При использовании материалов
              ссылка на источник обязательна.
            </p>
            <div className="mt-4 pt-4 border-t border-[#f5ecd9]/20">
              <p className="text-[#f5ecd9]/50 text-xs">
                &copy; {new Date().getFullYear()} Архонт ВКЛ. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
