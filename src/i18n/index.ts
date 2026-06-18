import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  ru: {
    translation: {
      nav: {
        home: "Главная",
        heroes: "Герои",
        battles: "Сражения",
        manuscripts: "Рукописи",
        castles: "Замки",
        media: "Артефакты",
        contact: "Контакты",
        admin: "Панель управления",
        login: "Войти",
        logout: "Выйти",
      },
      hero: {
        title: "Рыцарство Беларуси",
        subtitle: "Эпоха Великого Княжества Литовского (XIII–XVI вв.)",
        cta: "Открыть Хронику",
      },
      sections: {
        timeline: "Хронология событий",
        heroes: "Деяния Героев",
        battles: "Поле Брани",
        manuscripts: "Трактаты и Грамоты",
        castles: "Твердыни",
        media: "Оружейная",
        contact: "Связаться с нами",
      },
      common: {
        readMore: "Подробнее",
        back: "Назад",
        loading: "Загрузка...",
        search: "Поиск",
        filter: "Фильтр",
        century: "век",
        year: "год",
        close: "Закрыть",
        send: "Отправить",
        name: "Имя",
        email: "Email",
        subject: "Тема",
        message: "Сообщение",
        original: "Оригинал",
        translation: "Перевод",
      },
    },
  },
  be: {
    translation: {
      nav: {
        home: "Галоўная",
        heroes: "Героі",
        battles: "Бітвы",
        manuscripts: "Рукапісы",
        castles: "Замкі",
        media: "Артэфакты",
        contact: "Кантакты",
        admin: "Панэль кіравання",
        login: "Увайсці",
        logout: "Выйсці",
      },
      hero: {
        title: "Рыцарства Беларусі",
        subtitle: "Эпоха Вялікага Княства Літоўскага (XIII–XVI стст.)",
        cta: "Адкрыць Хроніку",
      },
      sections: {
        timeline: "Храналогія падзей",
        heroes: "Подзвігі Гeroяў",
        battles: "Поле Брані",
        manuscripts: "Трактаты і Граматы",
        castles: "Твердыні",
        media: "Зброевая",
        contact: "Звязацца з намі",
      },
      common: {
        readMore: "Падрабязней",
        back: "Назад",
        loading: "Загрузка...",
        search: "Пошук",
        filter: "Фільтр",
        century: "стагоддзе",
        year: "год",
        close: "Зачыніць",
        send: "Адправіць",
        name: "Імя",
        email: "Email",
        subject: "Тэма",
        message: "Паведамленне",
        original: "Арыгінал",
        translation: "Пераклад",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        heroes: "Heroes",
        battles: "Battles",
        manuscripts: "Manuscripts",
        castles: "Castles",
        media: "Artifacts",
        contact: "Contact",
        admin: "Dashboard",
        login: "Login",
        logout: "Logout",
      },
      hero: {
        title: "Belarusian Chivalry",
        subtitle: "The Grand Duchy of Lithuania (13th–16th centuries)",
        cta: "Open the Chronicle",
      },
      sections: {
        timeline: "Timeline of Events",
        heroes: "Heroes & Deeds",
        battles: "Battlefield",
        manuscripts: "Treaties & Charters",
        castles: "Fortresses",
        media: "Armory",
        contact: "Contact Us",
      },
      common: {
        readMore: "Read More",
        back: "Back",
        loading: "Loading...",
        search: "Search",
        filter: "Filter",
        century: "century",
        year: "year",
        close: "Close",
        send: "Send",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        original: "Original",
        translation: "Translation",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
