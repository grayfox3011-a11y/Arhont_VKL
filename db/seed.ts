import { getDb } from "../api/queries/connection";
import {
  heroes,
  battles,
  timelineEvents,
  manuscripts,
  castles,
  media,
} from "./schema";
import { sql } from "drizzle-orm";

async function seed() {
  const db = getDb();

  // ─── Seed Heroes ────────────────────────────────────────────────
  const heroesCount = await db.select({ count: sql<number>`count(*)` }).from(heroes);
  if (heroesCount[0].count === 0) {
    await db.insert(heroes).values([
      {
        name: "Витовт (Витаутас) Великий",
        nameBe: "Вітаўт Вялікі",
        nameEn: "Vytautas the Great",
        title: "Великий князь Литовский",
        titleBe: "Вялікі князь літоўскі",
        titleEn: "Grand Duke of Lithuania",
        years: "1350–1430",
        bio: `Витовт — один из самых выдающихся правителей Великого Княжества Литовского. Князь Гродненский (1370–1382), Луцкий (1387–1389), Великий князь Литовский (1392–1430). Сын Кейстута, племянник Ягайло. Организатор и фактический руководитель Грюнвальдской битвы 1410 года. При нем ВКЛ достигло максимального территориального расширения — от Балтийского до Черного моря.`,
        bioBe: "Вітаўт — адзін з найвыдатнейшых праўнікоў Вялікага Княства Літоўскага. Арганізатар і фактычны кіраўнік Грунвальдскай бітвы 1410 года.",
        bioEn: "Vytautas the Great was one of the most distinguished rulers of the Grand Duchy of Lithuania. Under his rule, the GDL reached its maximum territorial expansion from the Baltic to the Black Sea.",
        achievements: `Расширение границ ВКЛ до максимума. Организация победы в Грюнвальдской битве 1410 года. Укрепление южных границ системой замков. Получение титула короля от императора Сигизмунда (не коронован).`,
        achievementsBe: "Пашырэнне межаў ВКЛ да максімуму. Арганізацыя перамогі ў Грунвальдскай бітве 1410 года.",
        achievementsEn: "Maximum territorial expansion of the GDL. Victory at the Battle of Grunwald 1410. Strengthening southern borders with a system of castles.",
        battles: "[1, 5]",
        heraldry: "На гербе Витовта изображался всадник (Погоня) с поднятым мечом на красном щите.",
        imageUrl: "/images/hero-vitovt.jpg",
        orderIdx: 1,
      },
      {
        name: "Константин Иванович Острожский",
        nameBe: "Канстантын Іванавіч Астроскі",
        nameEn: "Konstanty Ostrogski",
        title: "Гетман великий литовский",
        titleBe: "Вялікі гетман літоўскі",
        titleEn: "Grand Hetman of Lithuania",
        years: "1460–1530",
        bio: `Константин Острожский — выдающийся полководец и государственный деятель Великого Княжества Литовского. Великий гетман литовский с 1497 года. Считается одним из величайших полководцев в истории ВКЛ. Его победа в Оршанской битве 1514 года стала символом военного искусства белорусско-литовских рыцарей.`,
        bioBe: "Канстантын Астроскі — выдатны палкаводзец і дзяржаўны дзеяч Вялікага Княства Літоўскага. Перамога ў Аршанскай бітве 1514 года стала сімвалам вайсковага майстэрства.",
        bioEn: "Konstanty Ostrogski was an outstanding military commander and statesman of the Grand Duchy of Lithuania. His victory at the Battle of Orsha in 1514 became a symbol of military excellence.",
        achievements: `Победа в Оршанской битве 1514 года — 30-тысячное войско Острожского разгромило 80-тысячную московскую армию. Кавалер ордена Золотого Руна. Защита Смоленска.`,
        achievementsBe: "Перамога ў Аршанскай бітве 1514 года. Кавалер ордэна Залатога Руна.",
        achievementsEn: "Victory at the Battle of Orsha 1514 — defeated a numerically superior Moscow army. Knight of the Golden Fleece.",
        battles: "[2, 4, 5]",
        heraldry: "Герб Острожских — на золотом щите изображена пустая колесница, символизирующая военную мощь рода.",
        imageUrl: "/images/hero-ostrogski.jpg",
        orderIdx: 2,
      },
      {
        name: "Ольгерд (Альгирдас)",
        nameBe: "Альгерд (Альгірдас)",
        nameEn: "Algirdas (Olgierd)",
        title: "Великий князь Литовский",
        titleBe: "Вялікі князь літоўскі",
        titleEn: "Grand Duke of Lithuania",
        years: "1296–1377",
        bio: `Ольгерд — великий князь Литовский (1345–1377), один из самых могущественных правителей ВКЛ XIV века. Сын Гедимина, брат Кейстута. При нем территория ВКЛ простиралась от Балтики до Черного моря.`,
        bioBe: "Альгерд — вялікі князь літоўскі (1345–1377), адзін з наймагутнейшых праўнікоў ВКЛ XIV стагоддзя.",
        bioEn: "Algirdas was Grand Duke of Lithuania (1345–1377), one of the most powerful rulers of the 14th century GDL.",
        achievements: `Присоединение к ВКЛ Волыни, Подолии, Киевщины, Черниговщины. Четыре похода на Москву. Победа на реке Стрей в 1348 году.`,
        achievementsBe: "Далучэнне да ВКЛ Валыні, Падолля, Кіеўшчыны, Чарнігаўшчыны. Чатыры паходы на Маскву.",
        achievementsEn: "Annexation of Volhynia, Podolia, Kiev region, Chernihiv region to the GDL. Four campaigns against Moscow.",
        battles: "[5]",
        heraldry: "Как великий князь Ольгерд использовал государственный герб ВКЛ — серебряную Погоню в красном поле.",
        imageUrl: "/images/hero-olgerd.jpg",
        orderIdx: 3,
      },
      {
        name: "Кейстут (Кęстутис)",
        nameBe: "Кейстут (Кейстут)",
        nameEn: "Kęstutis (Keistut)",
        title: "Князь Трокский и Великий князь Литовский",
        titleBe: "Князь троцкі і вялікі князь літоўскі",
        titleEn: "Prince of Trakai and Grand Duke of Lithuania",
        years: "1297–1382",
        bio: `Кейстут — сын Гедимина, князь Трокский (1342–1382), великий князь Литовский (1381–1382). Знаменитый полководец и защитник западных границ ВКЛ от Тевтонского ордена. Вел более чем 40 войн с Тевтонским орденом.`,
        bioBe: "Кейстут — сын Гедзіміна, князь троцкі (1342–1382), вялікі князь літоўскі. Знакаміты палкаводзец і абаронца заходніх межаў ВКЛ ад Тэўтонскага ордэна.",
        bioEn: "Kęstutis was son of Gediminas, Prince of Trakai (1342–1382), Grand Duke of Lithuania. Famous commander and defender of the western borders against the Teutonic Order.",
        achievements: `Успешная оборона западных границ ВКЛ более 40 лет. Построение мощной системы замков (Трокский, Виленский, Кревский, Лидский). Победа над крестоносцами у Берестья в 1378 году.`,
        achievementsBe: "Паспяховая абарона заходніх межаў ВКЛ больш за 40 гадоў. Пабудова магутнай сістэмы замкаў.",
        achievementsEn: "Successful defense of the GDL's western borders for over 40 years. Construction of a powerful castle system.",
        battles: "[3, 5]",
        heraldry: "Кейстут использовал государственный герб ВКЛ — Погоню. На личном знамени изображался серебряный медведь на красном поле.",
        imageUrl: "/images/hero-keistut.jpg",
        orderIdx: 4,
      },
      {
        name: "Михаил Глинский",
        nameBe: "Міхал Глінскі",
        nameEn: "Mikhail Glinski",
        title: "Князь, воевода Смоленский",
        titleBe: "Князь, ваявода смаленскі",
        titleEn: "Prince, Voivode of Smolensk",
        years: "1460s–1534",
        bio: `Михаил Глинский — князь из рода Глинских, воевода Смоленский, герой Оршанской битвы 1514 года. В 1500 году предпринял знаменитый побег из московского плена, проехав 900 верст верхом за три дня.`,
        bioBe: "Міхал Глінскі — князь з роду Глінскіх, ваявода смаленскі, герой Аршанскай бітвы 1514 года.",
        bioEn: "Mikhail Glinski was a prince from the Glinski family, Voivode of Smolensk, hero of the Battle of Orsha 1514.",
        achievements: `Участие в Оршанской битве 1514 года. Знаменитый побег из московского плена в 1500 году (900 верст за 3 дня). Командование правым крылом в решающих сражениях.`,
        achievementsBe: "Удзел у Аршанскай бітве 1514 года. Знакаміты ўцёк з маскоўскага палону ў 1500 годзе.",
        achievementsEn: "Participation in the Battle of Orsha 1514. Famous escape from Moscow captivity in 1500 (900 versts in 3 days).",
        battles: "[2, 4]",
        heraldry: "Герб Глинских — серебряная восьмиконечная звезда (роза) на красном щите, с золотым крестом в центре.",
        imageUrl: "/images/hero-glinski.jpg",
        orderIdx: 5,
      },
    ]);
    console.log("Heroes seeded");
  } else {
    console.log("Heroes already exist, skipping");
  }

  // ─── Seed Battles ───────────────────────────────────────────────
  const battlesCount = await db.select({ count: sql<number>`count(*)` }).from(battles);
  if (battlesCount[0].count === 0) {
    await db.insert(battles).values([
      {
        name: "Грюнвальдская битва",
        nameBe: "Грунвальдская бітва",
        nameEn: "Battle of Grunwald",
        year: 1410,
        date: "15 июля 1410",
        location: "Грюнвальд (Жальгирис), Пруссия",
        locationBe: "Грунвальд (Жальгірыс), Прусія",
        locationEn: "Grunwald (Zalgiris), Prussia",
        description: `Грюнвальдская битва — крупнейшее сражение Средневековья в Европе. Объединенное войско Великого Княжества Литовского и Польши под командованием Витовта и Ягайло разгромило армию Тевтонского ордена. В сражении участвовало более 50 000 воинов с обеих сторон. Великий магистр ордена Ульрих фон Юнгинген погиб на поле боя.`,
        descriptionBe: "Грунвальдская бітва — буйнейшая бітва Сярэднявечча ў Еўропе. Аб'яднанае войска ВКЛ і Польшчы пад камандаваннем Вітаўта і Ягайлы разграміла армію Тэўтонскага ордэна.",
        descriptionEn: "The Battle of Grunwald was the largest battle of the Middle Ages in Europe. The combined army of the GDL and Poland defeated the Teutonic Order.",
        tactics: `Витовт построил войска в две линии. Первую линию составляли литовские и русские полки, которые совершили имитацию отступления, втягивая орденское войско в ловушку. Вторую линию — польские полки, которые нанесли решающий удар по растянутым силам ордена.`,
        tacticsBe: "Вітаўт пабудаваў войска ў два рады. Першы рад складаўся з літоўскіх і рускіх палкоў.",
        tacticsEn: "Vytautas arranged troops in two lines. The first line performed a feigned retreat, drawing the Order's forces into a trap.",
        result: "Полная победа войск ВКЛ и Польши. Тевтонский орден потерял около 20 000 воинов, включая великого магистра.",
        resultBe: "Поўная перамога войскаў ВКЛ і Польшчы. Тэўтонскі ордэн страціў каля 20 000 воінаў.",
        resultEn: "Complete victory for the GDL and Polish forces. The Teutonic Order lost about 20,000 warriors, including the Grand Master.",
        belligerents: "Великое Княжество Литовское + Королевство Польское vs Тевтонский Орден",
        belligerentsBe: "Вялікае Княства Літоўскае + Каралеўства Польскае vs Тэўтонскі Ордэн",
        belligerentsEn: "Grand Duchy of Lithuania + Kingdom of Poland vs Teutonic Order",
        imageUrl: "/images/battle-grunwald.jpg",
        orderIdx: 1,
      },
      {
        name: "Оршанская битва",
        nameBe: "Аршанская бітва",
        nameEn: "Battle of Orsha",
        year: 1514,
        date: "8 сентября 1514",
        location: "Под Оршей, современная Беларусь",
        locationBe: "Пад Оршай, сучасная Беларусь",
        locationEn: "Near Orsha, modern Belarus",
        description: `Оршанская битва — одно из величайших сражений в истории ВКЛ. 30-тысячная армия под командованием гетмана Константина Острожского разгромила 80-тысячное московское войско. Эта битва стала символом военного искусства литовско-белорусских рыцарей.`,
        descriptionBe: "Аршанская бітва — адна з найвялікшых бітваў у гісторыі ВКЛ. 30-тысячная армія пад камандаваннем Канстантына Астроскага разграміла 80-тысячнае маскоўскае войска.",
        descriptionEn: "The Battle of Orsha was one of the greatest battles in GDL history. A 30,000-strong army commanded by Konstanty Ostrogski defeated an 80,000-strong Moscow army.",
        tactics: `Острожский построил армию в традиционную систему — центр и два крыла. Ключевым элементом была артиллерия, которая нанесла серьезный урон московским полкам еще до начала рукопашного боя.`,
        tacticsBe: "Астроскі пабудаваў армію ў традыцыйную сістэму — цэнтр і два крылы. Ключавым элементам была артылерыя.",
        tacticsEn: "Ostrogski arranged the army in the traditional GDL system — center and two wings. Artillery dealt serious damage before hand-to-hand combat began.",
        result: "Решающая победа ВКЛ. Московская армия потерпела полное поражение, потеряв до 40 000 человек.",
        resultBe: "Вырашальная перамога ВКЛ. Маскоўская армія пацярпела поўнае паражэнне, страціўшы да 40 000 чалавек.",
        resultEn: "Decisive victory for the GDL. The Moscow army suffered a complete defeat, losing up to 40,000 men.",
        belligerents: "Великое Княжество Литовское vs Московское государство",
        belligerentsBe: "Вялікае Княства Літоўскае vs Маскоўская дзяржава",
        belligerentsEn: "Grand Duchy of Lithuania vs Moscow State",
        imageUrl: "/images/battle-orsha.jpg",
        orderIdx: 2,
      },
      {
        name: "Битва под Ведрошью",
        nameBe: "Бітва пад Ведрашам",
        nameEn: "Battle of Vedrosha",
        year: 1500,
        date: "14 июля 1500",
        location: "Река Ведроша, близ Дорогобужа",
        locationBe: "Рака Ведраша, каля Дарагабужа",
        locationEn: "Vedrosha River, near Dorogobuzh",
        description: `Битва под Ведрошью — сражение между войсками ВКЛ под командованием Константина Острожского и московской армией. Единственное крупное поражение Острожского за всю его военную карьеру.`,
        descriptionBe: "Бітва пад Ведрашам — адзінае буйное паражэнне Астроскага за ўсю яго вайсковую кар'еру.",
        descriptionEn: "The Battle of Vedrosha was the only major defeat of Ostrogski in his entire military career.",
        tactics: `Московские войска заняли выгодную позицию на возвышенности. Острожский, имея численное преимущество, принял решение атаковать вверх по склону, что привело к утомлению его войск.`,
        tacticsBe: "Маскоўскія войскі займелі выгадную пазіцыю на ўзвышшы. Астроскі атакаваў уверх па схіле.",
        tacticsEn: "Moscow forces took advantageous positions on high ground. Ostrogski attacked uphill, which led to the exhaustion of his troops.",
        result: "Поражение войск ВКЛ. Несмотря на поражение, Острожский сохранил пост гетмана.",
        resultBe: "Паражэнне войскаў ВКЛ. Нягледзячы на гэта, Астроскі захаваў пасаду гетмана.",
        resultEn: "Defeat of the GDL forces. Despite this, Ostrogski retained his post as Hetman.",
        belligerents: "Великое Княжество Литовское vs Московское государство",
        belligerentsBe: "Вялікае Княства Літоўскае vs Маскоўская дзяржава",
        belligerentsEn: "Grand Duchy of Lithuania vs Moscow State",
        imageUrl: "/images/battle-orsha.jpg",
        orderIdx: 3,
      },
    ]);
    console.log("Battles seeded");
  } else {
    console.log("Battles already exist, skipping");
  }

  // ─── Seed Timeline Events ───────────────────────────────────────
  const eventsCount = await db.select({ count: sql<number>`count(*)` }).from(timelineEvents);
  if (eventsCount[0].count === 0) {
    await db.insert(timelineEvents).values([
      { year: 1253, title: "Коронация Миндовга", titleBe: "Каранацыя Міндоўга", titleEn: "Coronation of Mindaugas", description: "Первый и единственный коронованный король Литвы. Объединение литовских земель.", descriptionBe: "Першы і адзіны каранаваны кароль Літвы.", descriptionEn: "First and only crowned King of Lithuania.", category: "diplomacy", icon: "crown" },
      { year: 1316, title: "Начало правления Гедимина", titleBe: "Пачатак кіравання Гедзіміна", titleEn: "Beginning of Gediminas' reign", description: "Гедимин начинает правление, заложившее основу могущества ВКЛ.", descriptionBe: "Гедзімін пачынае кіраванне, якое залажыла аснову магутнасці ВКЛ.", descriptionEn: "Gediminas begins his reign, laying the foundation for the GDL's power.", category: "diplomacy", icon: "crown" },
      { year: 1341, title: "Смерть Гедимина", titleBe: "Смерць Гедзіміна", titleEn: "Death of Gediminas", description: "После смерти Гедимина власть перешла к сыновьям — Ольгерду и Кейстуту.", descriptionBe: "Пасля смерці Гедзіміна ўлада перайшла да сыноў.", descriptionEn: "After Gediminas' death, power passed to his sons.", category: "culture", icon: "crown" },
      { year: 1385, title: "Кревская уния", titleBe: "Крэўская унія", titleEn: "Krewo Union", description: "Соглашение между Польшей и ВКЛ о династическом союзе через брак Ягайло и Ядвиги.", descriptionBe: "Пагадненне паміж Польшчай і ВКЛ пра дынастычны саюз.", descriptionEn: "Agreement between Poland and the GDL on a dynastic union.", category: "diplomacy", icon: "scroll" },
      { year: 1392, title: "Островское соглашение", titleBe: "Астоўскае пагадненне", titleEn: "Ostrów Agreement", description: "Соглашение между Ягайло и Витовтом. Витовт становится великим князем Литовским.", descriptionBe: "Пагадненне паміж Ягайлам і Вітаўтам.", descriptionEn: "Agreement between Jogaila and Vytautas.", category: "diplomacy", icon: "scroll" },
      { year: 1410, title: "Грюнвальдская битва", titleBe: "Грунвальдская бітва", titleEn: "Battle of Grunwald", description: "Крупнейшее сражение Средневековья. Победа войск ВКЛ и Польши над Тевтонским орденом.", descriptionBe: "Буйнейшая бітва Сярэднявечча. Перамога войскаў ВКЛ і Польшчы.", descriptionEn: "The largest battle of the Middle Ages in Europe. Victory over the Teutonic Order.", category: "battle", relatedBattleId: 1, icon: "sword" },
      { year: 1468, title: "Третий Статут ВКЛ", titleBe: "Трэці Статут ВКЛ", titleEn: "Third Statute of the GDL", description: "Кодекс законов ВКЛ, один из самых прогрессивных правовых документов средневековой Европы.", descriptionBe: "Кадэкс законаў ВКЛ, адзін з найпрагрэсіўнейшых прававых дакументаў.", descriptionEn: "Code of laws of the GDL, one of the most progressive legal documents of medieval Europe.", category: "law", icon: "scroll" },
      { year: 1514, title: "Оршанская битва", titleBe: "Аршанская бітва", titleEn: "Battle of Orsha", description: "30-тысячная армия Острожского разгромила 80-тысячное московское войско.", descriptionBe: "30-тысячная армія Астроскага разграміла 80-тысячнае маскоўскае войска.", descriptionEn: "A 30,000-strong army of Ostrogski defeated an 80,000-strong Moscow army.", category: "battle", relatedBattleId: 2, icon: "sword" },
      { year: 1569, title: "Люблинская уния", titleBe: "Люблінская унія", titleEn: "Union of Lublin", description: "Создание Речи Посполитой — объединенного государства Польши и ВКЛ.", descriptionBe: "Стварэнне Рэчы Паспалітай.", descriptionEn: "Creation of the Polish-Lithuanian Commonwealth.", category: "diplomacy", icon: "scroll" },
    ]);
    console.log("Timeline events seeded");
  } else {
    console.log("Timeline events already exist, skipping");
  }

  // ─── Seed Manuscripts ───────────────────────────────────────────
  const manuscriptsCount = await db.select({ count: sql<number>`count(*)` }).from(manuscripts);
  if (manuscriptsCount[0].count === 0) {
    await db.insert(manuscripts).values([
      {
        title: "Статут Великого Княжества Литовского 1529 г.",
        titleBe: "Статут Вялікага Княства Літоўскага 1529 г.",
        titleEn: "First Statute of the GDL 1529",
        description: "Первый кодекс законов ВКЛ, составленный канцлером Альбрехтом Гаштольдом. 243 статьи.",
        descriptionBe: "Першы кадэкс законаў ВКЛ, складзены канцлерам Альбрэхтам Гаштольдам. 243 артыкулы.",
        descriptionEn: "First code of laws of the GDL, compiled by Chancellor Albertas Goštautas. 243 articles.",
        originalText: "Мы, Александр, з Божьей Милости Король Польский, Великий Князь Литовский... дали сей статут...",
        translatedText: `Статут 1529 года — первый систематизированный свод законов ВКЛ. Он состоял из 13 разделов и 243 статей. Документ закреплял правовое положение шляхты, порядок землевладения, уголовные преступления, судопроизводство и воинские повинности. Статут был написан на старобелорусском языке — языке канцелярии ВКЛ.`,
        translatedTextBe: "Статут 1529 года — першы сістэматызаваны звод законаў ВКЛ.",
        translatedTextEn: "The 1529 Statute was the first codified set of laws of the GDL.",
        imageUrl: "/images/manuscript-statut.jpg",
        year: 1529,
        author: "Альбрехт Гаштольд (канцлер)",
        category: "statute",
      },
      {
        title: "Литовская метрика",
        titleBe: "Літоўская метрыка",
        titleEn: "Lithuanian Metrica",
        description: "Канцелярская книга ВКЛ — сборник официальных документов, законов, привилегий.",
        descriptionBe: "Канцылярская кніга ВКЛ.",
        descriptionEn: "Chancellery book of the GDL.",
        originalText: "В имя Отца и Сына и Святого Духа. Аминь. Божиею милостию мы...",
        translatedText: `Литовская метрика — собрание канцелярских книг ВКЛ, в которых регистрировались все важные государственные документы: дипломатические грамоты, привилеи шляхте, судебные решения, указы великих князей, акты о землевладении. Метрика велась с XIV века.`,
        translatedTextBe: "Літоўская метрыка — гэта збранне канцылярскіх кніг ВКЛ.",
        translatedTextEn: "The Lithuanian Metrica is a collection of chancellery books of the GDL.",
        imageUrl: "/images/manuscript-statut.jpg",
        year: 1387,
        author: "Великокняжеская канцелярия",
        category: "metric",
      },
    ]);
    console.log("Manuscripts seeded");
  } else {
    console.log("Manuscripts already exist, skipping");
  }

  // ─── Seed Castles ───────────────────────────────────────────────
  const castlesCount = await db.select({ count: sql<number>`count(*)` }).from(castles);
  if (castlesCount[0].count === 0) {
    await db.insert(castles).values([
      {
        name: "Мирский замок", nameBe: "Мірскі замак", nameEn: "Mir Castle",
        location: "г. Мир, Гродненская область, Беларусь", locationBe: "г. Мір, Гродзенская вобласць", locationEn: "Mir, Grodno Region, Belarus",
        description: "Мирский замок — выдающийся памятник белорусского оборонного зодчества XVI-XVII веков, внесенный в список Всемирного наследия ЮНЕСКО.",
        descriptionBe: "Мірскі замак — выдатны помнік беларускага абарончага дойлідства XVI-XVII стагоддзяў, унесены ў спіс Сусветнай спадчыны ЮНЕСКА.",
        descriptionEn: "Mir Castle is an outstanding monument of Belarusian defensive architecture, a UNESCO World Heritage Site.",
        yearBuilt: "Начало XVI в. (ок. 1520-х)",
        owners: "Ильиничи, Радзивиллы, Витгенштейны", ownersBe: "Ільінічы, Радзівілы, Вітгенштэйны", ownersEn: "Ilyinichy, Radziwills, Wittgensteins",
        defenseSystem: "Пятистенная башенная конструкция со стенами высотой 13 м, земляными бастионами, рвом с водой.",
        defenseSystemBe: "Пяцібашэнная канструкцыя са сценамі вышынёй 13 м.", defenseSystemEn: "Five-tower structure with walls 13m high.",
        imageUrl: "/images/castle-mir.jpg", gallery: "[]", orderIdx: 1,
      },
      {
        name: "Несвижский замок", nameBe: "Нясвіжскі замак", nameEn: "Nesvizh Castle",
        location: "г. Несвиж, Минская область, Беларусь", locationBe: "г. Нясвіж, Мінская вобласць", locationEn: "Nesvizh, Minsk Region, Belarus",
        description: "Несвижский замок — один из самых красивых дворцово-замковых комплексов Восточной Европы, резиденция рода Радзивиллов.",
        descriptionBe: "Нясвіжскі замак — адзін з найпрыгажэйшых палацава-замкавых комплексаў Усходняй Еўропы.",
        descriptionEn: "Nesvizh Castle is one of the most beautiful palace and castle complexes in Eastern Europe.",
        yearBuilt: "1583–1604",
        owners: "Радзивиллы (с 1533 по 1939)", ownersBe: "Радзівілы (з 1533 па 1939)", ownersEn: "Radziwills (from 1533 to 1939)",
        defenseSystem: "Высокие каменные стены с башнями, земляные бастионы в итальянском стиле, ров с водой.",
        defenseSystemBe: "Высокія каменныя сцены з вежамі, зямляныя бастыёны.", defenseSystemEn: "High stone walls with towers, earth bastions.",
        imageUrl: "/images/castle-nesvizh.jpg", gallery: "[]", orderIdx: 2,
      },
      {
        name: "Лидский замок", nameBe: "Лідскі замак", nameEn: "Lida Castle",
        location: "г. Лида, Гродненская область, Беларусь", locationBe: "г. Ліда, Гродзенская вобласць", locationEn: "Lida, Grodno Region, Belarus",
        description: "Лидский замок — один из старейших каменных замков на территории Беларуси, построенный по приказу Гедимина в 1323-1330 годах.",
        descriptionBe: "Лідскі замак — адзін з найстарэйшых каменных замкаў Беларусі, пабудаваны па загадзе Гедзіміна.",
        descriptionEn: "Lida Castle is one of the oldest stone castles in Belarus, built by order of Grand Duke Gediminas.",
        yearBuilt: "1323–1330",
        owners: "Гедиминовичи, Ольгерд, Витовт", ownersBe: "Гедзімінавічы, Альгерд, Вітаўт", ownersEn: "Gediminids, Algirdas, Vytautas",
        defenseSystem: "Прямоугольная башня-донжон (30x30 м), стены до 2,5 м, земляной вал и ров.",
        defenseSystemBe: "Прамавугольная вежа-донжон (30x30 м), сцены да 2,5 м.", defenseSystemEn: "Rectangular donjon tower (30x30 m), walls up to 2.5m.",
        imageUrl: "/images/castle-lida.jpg", gallery: "[]", orderIdx: 3,
      },
    ]);
    console.log("Castles seeded");
  } else {
    console.log("Castles already exist, skipping");
  }

  // ─── Seed Media ─────────────────────────────────────────────────
  const mediaCount = await db.select({ count: sql<number>`count(*)` }).from(media);
  if (mediaCount[0].count === 0) {
    await db.insert(media).values([
      { title: "Рыцарские доспехи XV века", titleBe: "Рыцарскія даспехі XV стагоддзя", titleEn: "15th Century Knight Armor", description: "Полный комплект латных доспехов рыцаря ВКЛ XV века.", descriptionBe: "Поўны камплект латных даспехаў рыцара ВКЛ XV стагоддзя.", descriptionEn: "Full set of plate armor of a GDL knight from the 15th century.", type: "image", url: "/images/armor-full.jpg", thumbnailUrl: "/images/armor-full.jpg", category: "armor" },
      { title: "Кованый меч XIV века", titleBe: "Каваны меч XIV стагоддзя", titleEn: "14th Century Forged Sword", description: "Средневековый крестовый меч с орнаментированной рукоятью.", descriptionBe: "Сярэднявечны крыжавы меч.", descriptionEn: "Medieval cross sword.", type: "image", url: "/images/artifact-sword.jpg", thumbnailUrl: "/images/artifact-sword.jpg", category: "weapon" },
      { title: "Рыцарский шлем бацинет", titleBe: "Рыцарскі шлем бацынет", titleEn: "Knight Bascinet Helmet", description: "Шлем бацинет с забралом, сталь с золотыми гравированными узорами.", descriptionBe: "Шлем бацынет з забралам.", descriptionEn: "Bascinet helmet with visor.", type: "image", url: "/images/artifact-helmet.jpg", thumbnailUrl: "/images/artifact-helmet.jpg", category: "armor" },
      { title: "Серебряные монеты ВКЛ XIV-XV вв.", titleBe: "Срэбныя манеты ВКЛ XIV-XV стст.", titleEn: "GDL Silver Coins 14th-15th centuries", description: "Серебряные монеты ВКЛ с изображением Погони.", descriptionBe: "Срэбныя манеты ВКЛ.", descriptionEn: "Silver coins of the GDL.", type: "image", url: "/images/artifact-coins.jpg", thumbnailUrl: "/images/artifact-coins.jpg", category: "coin" },
    ]);
    console.log("Media seeded");
  } else {
    console.log("Media already exist, skipping");
  }

  console.log("Seed completed successfully!");
}

seed().catch(console.error);