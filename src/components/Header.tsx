import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import {
  Shield,
  Menu,
  X,
  LogIn,
  LogOut,
  Settings,
  Globe,
} from "lucide-react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/heroes", label: t("nav.heroes") },
    { to: "/battles", label: t("nav.battles") },
    { to: "/manuscripts", label: t("nav.manuscripts") },
    { to: "/castles", label: t("nav.castles") },
    { to: "/media", label: t("nav.media") },
  ];

  const languages = [
    { code: "ru", label: "RU" },
    { code: "be", label: "BY" },
    { code: "en", label: "EN" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#262626]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield
              className={`w-8 h-8 transition-colors ${
                scrolled ? "text-[#b8860b]" : "text-[#b8860b]"
              } group-hover:text-[#c93e3e]`}
            />
            <span
              className={`font-['MedievalSharp'] text-lg hidden sm:block transition-colors ${
                scrolled ? "text-[#f5ecd9]" : "text-[#262626]"
              }`}
            >
              Архонт ВКЛ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-sm ${
                  scrolled ? "text-[#f5ecd9]" : "text-[#262626]"
                } ${location.pathname === link.to ? "text-[#c93e3e]" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`p-2 rounded-full transition-colors ${
                  scrolled
                    ? "text-[#f5ecd9] hover:text-[#b8860b]"
                    : "text-[#262626] hover:text-[#c93e3e]"
                }`}
              >
                <Globe className="w-5 h-5" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 bg-[#262626] rounded-lg shadow-xl py-1 min-w-[80px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        i18n.language === lang.code
                          ? "text-[#b8860b] bg-white/10"
                          : "text-[#f5ecd9] hover:bg-white/10"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin link */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`p-2 rounded-full transition-colors ${
                  scrolled
                    ? "text-[#f5ecd9] hover:text-[#b8860b]"
                    : "text-[#262626] hover:text-[#c93e3e]"
                }`}
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span
                  className={`hidden sm:block text-sm ${
                    scrolled ? "text-[#f5ecd9]" : "text-[#262626]"
                  }`}
                >
                  {user?.name}
                </span>
                <button
                  onClick={logout}
                  className={`p-2 rounded-full transition-colors ${
                    scrolled
                      ? "text-[#f5ecd9] hover:text-[#c93e3e]"
                      : "text-[#262626] hover:text-[#c93e3e]"
                  }`}
                  title={t("nav.logout")}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  scrolled
                    ? "bg-[#c93e3e] text-white hover:bg-[#a83232]"
                    : "bg-[#c93e3e] text-white hover:bg-[#a83232]"
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.login")}</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                scrolled
                  ? "text-[#f5ecd9]"
                  : "text-[#262626]"
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#262626]/95 backdrop-blur-md border-t border-[#b8860b]/20">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-2 px-3 text-[#f5ecd9] hover:text-[#b8860b] hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
