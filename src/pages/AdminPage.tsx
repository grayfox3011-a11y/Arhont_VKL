import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import {
  Shield, Sword, Scroll, Castle, Image, Users, Mail,
  Clock, BarChart3, Trash2, Eye, CheckCircle, Plus, Pencil, X,
} from "lucide-react";

type EntityType = "hero" | "battle" | "timeline" | "manuscript" | "castle" | "media";

export default function AdminPage() {
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EntityType | "stats" | "messages" | "users">("stats");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingItem, setEditingItem] = useState<Record<string, any> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const utils = trpc.useUtils();

  const { data: stats } = trpc.admin.stats.useQuery(undefined, { enabled: isAdmin });
  const { data: contactData } = trpc.contact.list.useQuery(undefined, { enabled: isAdmin });
  const { data: usersData } = trpc.admin.users.useQuery(undefined, { enabled: isAdmin });
  const { data: heroes } = trpc.hero.list.useQuery(undefined, { enabled: isAdmin });
  const { data: battles } = trpc.battle.list.useQuery(undefined, { enabled: isAdmin });
  const { data: timeline } = trpc.timeline.list.useQuery(undefined, { enabled: isAdmin });
  const { data: manuscripts } = trpc.manuscript.list.useQuery(undefined, { enabled: isAdmin });
  const { data: castles } = trpc.castle.list.useQuery(undefined, { enabled: isAdmin });
  const { data: mediaItems } = trpc.media.list.useQuery(undefined, { enabled: isAdmin });

  const markReadMutation = trpc.contact.markRead.useMutation({
    onSuccess: () => { utils.contact.list.invalidate(); utils.admin.stats.invalidate(); }
  });
  const deleteMessageMutation = trpc.contact.delete.useMutation({
    onSuccess: () => { utils.contact.list.invalidate(); utils.admin.stats.invalidate(); }
  });

  const heroCreate = trpc.hero.create.useMutation({ onSuccess: () => { utils.hero.list.invalidate(); utils.admin.stats.invalidate(); setShowForm(false); } });
  const heroUpdate = trpc.hero.update.useMutation({ onSuccess: () => { utils.hero.list.invalidate(); setShowForm(false); } });
  const heroDelete = trpc.hero.delete.useMutation({ onSuccess: () => { utils.hero.list.invalidate(); utils.admin.stats.invalidate(); } });

  const battleCreate = trpc.battle.create.useMutation({ onSuccess: () => { utils.battle.list.invalidate(); utils.admin.stats.invalidate(); setShowForm(false); } });
  const battleUpdate = trpc.battle.update.useMutation({ onSuccess: () => { utils.battle.list.invalidate(); setShowForm(false); } });
  const battleDelete = trpc.battle.delete.useMutation({ onSuccess: () => { utils.battle.list.invalidate(); utils.admin.stats.invalidate(); } });

  const timelineCreate = trpc.timeline.create.useMutation({ onSuccess: () => { utils.timeline.list.invalidate(); utils.admin.stats.invalidate(); setShowForm(false); } });
  const timelineUpdate = trpc.timeline.update.useMutation({ onSuccess: () => { utils.timeline.list.invalidate(); setShowForm(false); } });
  const timelineDelete = trpc.timeline.delete.useMutation({ onSuccess: () => { utils.timeline.list.invalidate(); utils.admin.stats.invalidate(); } });

  const manuscriptCreate = trpc.manuscript.create.useMutation({ onSuccess: () => { utils.manuscript.list.invalidate(); utils.admin.stats.invalidate(); setShowForm(false); } });
  const manuscriptUpdate = trpc.manuscript.update.useMutation({ onSuccess: () => { utils.manuscript.list.invalidate(); setShowForm(false); } });
  const manuscriptDelete = trpc.manuscript.delete.useMutation({ onSuccess: () => { utils.manuscript.list.invalidate(); utils.admin.stats.invalidate(); } });

  const castleCreate = trpc.castle.create.useMutation({ onSuccess: () => { utils.castle.list.invalidate(); utils.admin.stats.invalidate(); setShowForm(false); } });
  const castleUpdate = trpc.castle.update.useMutation({ onSuccess: () => { utils.castle.list.invalidate(); setShowForm(false); } });
  const castleDelete = trpc.castle.delete.useMutation({ onSuccess: () => { utils.castle.list.invalidate(); utils.admin.stats.invalidate(); } });

  const mediaCreate = trpc.media.create.useMutation({ onSuccess: () => { utils.media.list.invalidate(); utils.admin.stats.invalidate(); setShowForm(false); } });
  const mediaUpdate = trpc.media.update.useMutation({ onSuccess: () => { utils.media.list.invalidate(); setShowForm(false); } });
  const mediaDelete = trpc.media.delete.useMutation({ onSuccess: () => { utils.media.list.invalidate(); utils.admin.stats.invalidate(); } });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-12 h-12 border-4 border-[#b8860b] border-t-[#c93e3e] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  const statCards = [
    { label: "Герои", value: stats?.heroes ?? 0, icon: Shield, color: "text-[#b8860b]", key: "hero" as EntityType },
    { label: "Сражения", value: stats?.battles ?? 0, icon: Sword, color: "text-[#c93e3e]", key: "battle" as EntityType },
    { label: "События", value: stats?.timelineEvents ?? 0, icon: Clock, color: "text-[#b8860b]", key: "timeline" as EntityType },
    { label: "Рукописи", value: stats?.manuscripts ?? 0, icon: Scroll, color: "text-[#b8860b]", key: "manuscript" as EntityType },
    { label: "Замки", value: stats?.castles ?? 0, icon: Castle, color: "text-[#b8860b]", key: "castle" as EntityType },
    { label: "Медиа", value: stats?.media ?? 0, icon: Image, color: "text-[#c93e3e]", key: "media" as EntityType },
    { label: "Пользователи", value: stats?.users ?? 0, icon: Users, color: "text-[#b8860b]", key: null },
    { label: "Сообщения", value: stats?.contactMessages ?? 0, icon: Mail, color: "text-[#c93e3e]", key: null },
  ];

  const tabs = [
    { id: "stats" as const, label: "Статистика", icon: BarChart3 },
    { id: "hero" as const, label: "Герои", icon: Shield },
    { id: "battle" as const, label: "Сражения", icon: Sword },
    { id: "timeline" as const, label: "События", icon: Clock },
    { id: "manuscript" as const, label: "Рукописи", icon: Scroll },
    { id: "castle" as const, label: "Замки", icon: Castle },
    { id: "media" as const, label: "Медиа", icon: Image },
    { id: "messages" as const, label: "Сообщения", icon: Mail },
    { id: "users" as const, label: "Пользователи", icon: Users },
  ];

  const handleDelete = (type: EntityType, id: number) => {
    if (!confirm("Удалить запись?")) return;
    switch (type) {
      case "hero": heroDelete.mutate({ id }); break;
      case "battle": battleDelete.mutate({ id }); break;
      case "timeline": timelineDelete.mutate({ id }); break;
      case "manuscript": manuscriptDelete.mutate({ id }); break;
      case "castle": castleDelete.mutate({ id }); break;
      case "media": mediaDelete.mutate({ id }); break;
    }
  };

  const handleEdit = (item: Record<string, unknown>) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTable = (type: EntityType, data: any[], columns: { key: string; label: string }[]) => (
    <div className="card-medieval overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-[#b8860b]/20">
        <h3 className="font-['MedievalSharp'] text-xl text-[#262626]">
          {type === "hero" && "Герои"}
          {type === "battle" && "Сражения"}
          {type === "timeline" && "События хронологии"}
          {type === "manuscript" && "Рукописи"}
          {type === "castle" && "Замки"}
          {type === "media" && "Медиа"}
        </h3>
        <button onClick={handleAdd} className="btn-medieval flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Добавить
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#e8dec5] border-b border-[#b8860b]/30">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">{col.label}</th>
              ))}
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id} className="border-b border-[#b8860b]/10 hover:bg-[#e8dec5]/50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-sm">
                    {col.key.includes("description") || col.key.includes("bio") || col.key.includes("tactics")
                      ? (item[col.key]?.slice(0, 50) + "...") || "—"
                      : String(item[col.key] ?? "—")
                    }
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(item)} className="p-1.5 text-[#b8860b] hover:bg-[#b8860b]/10 rounded transition-colors" title="Редактировать">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(type, item.id)} className="p-1.5 text-[#c93e3e] hover:bg-[#c93e3e]/10 rounded transition-colors" title="Удалить">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderForm = () => {
    if (!showForm) return null;
    const type = activeTab as EntityType;

    const FormComponent = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [formData, setFormData] = useState<Record<string, any>>(editingItem || {});

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        switch (type) {
          case "hero":
            if (editingItem) heroUpdate.mutate({ id: editingItem.id as number, ...formData } as Parameters<typeof heroUpdate.mutate>[0]);
            else heroCreate.mutate(formData as Parameters<typeof heroCreate.mutate>[0]);
            break;
          case "battle":
            if (editingItem) battleUpdate.mutate({ id: editingItem.id as number, ...formData } as Parameters<typeof battleUpdate.mutate>[0]);
            else battleCreate.mutate(formData as Parameters<typeof battleCreate.mutate>[0]);
            break;
          case "timeline":
            if (editingItem) timelineUpdate.mutate({ id: editingItem.id as number, ...formData } as Parameters<typeof timelineUpdate.mutate>[0]);
            else timelineCreate.mutate(formData as Parameters<typeof timelineCreate.mutate>[0]);
            break;
          case "manuscript":
            if (editingItem) manuscriptUpdate.mutate({ id: editingItem.id as number, ...formData } as Parameters<typeof manuscriptUpdate.mutate>[0]);
            else manuscriptCreate.mutate(formData as Parameters<typeof manuscriptCreate.mutate>[0]);
            break;
          case "castle":
            if (editingItem) castleUpdate.mutate({ id: editingItem.id as number, ...formData } as Parameters<typeof castleUpdate.mutate>[0]);
            else castleCreate.mutate(formData as Parameters<typeof castleCreate.mutate>[0]);
            break;
          case "media":
            if (editingItem) mediaUpdate.mutate({ id: editingItem.id as number, ...formData } as Parameters<typeof mediaUpdate.mutate>[0]);
            else mediaCreate.mutate(formData as Parameters<typeof mediaCreate.mutate>[0]);
            break;
        }
      };

      const inputClass = "w-full px-3 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors text-sm";
      const labelClass = "block text-sm font-semibold text-[#262626] mb-1";

      const fields: Record<EntityType, { key: string; label: string; type?: string; required?: boolean }[]> = {
        hero: [
          { key: "name", label: "Имя", required: true },
          { key: "title", label: "Титул", required: true },
          { key: "years", label: "Годы жизни", required: true },
          { key: "bio", label: "Биография", required: true },
          { key: "achievements", label: "Достижения", required: true },
          { key: "battles", label: "Битвы" },
          { key: "heraldry", label: "Герб" },
          { key: "imageUrl", label: "URL изображения" },
          { key: "orderIdx", label: "Порядок", type: "number" },
        ],
        battle: [
          { key: "name", label: "Название", required: true },
          { key: "year", label: "Год", type: "number", required: true },
          { key: "date", label: "Дата" },
          { key: "location", label: "Место", required: true },
          { key: "description", label: "Описание", required: true },
          { key: "tactics", label: "Тактика", required: true },
          { key: "result", label: "Итог", required: true },
          { key: "belligerents", label: "Стороны", required: true },
          { key: "imageUrl", label: "URL изображения" },
          { key: "orderIdx", label: "Порядок", type: "number" },
        ],
        timeline: [
          { key: "year", label: "Год", type: "number", required: true },
          { key: "title", label: "Название", required: true },
          { key: "description", label: "Описание", required: true },
          { key: "category", label: "Категория (battle/diplomacy/law/culture)", required: true },
          { key: "icon", label: "Иконка" },
        ],
        manuscript: [
          { key: "title", label: "Название", required: true },
          { key: "description", label: "Описание", required: true },
          { key: "translatedText", label: "Перевод", required: true },
          { key: "originalText", label: "Оригинал" },
          { key: "year", label: "Год", type: "number" },
          { key: "author", label: "Автор" },
          { key: "category", label: "Категория (statute/metric/chronicle/privilege)", required: true },
          { key: "imageUrl", label: "URL изображения" },
        ],
        castle: [
          { key: "name", label: "Название", required: true },
          { key: "location", label: "Местоположение", required: true },
          { key: "description", label: "Описание", required: true },
          { key: "yearBuilt", label: "Год постройки" },
          { key: "owners", label: "Владельцы" },
          { key: "defenseSystem", label: "Оборона" },
          { key: "imageUrl", label: "URL изображения" },
          { key: "orderIdx", label: "Порядок", type: "number" },
        ],
        media: [
          { key: "title", label: "Название", required: true },
          { key: "description", label: "Описание" },
          { key: "type", label: "Тип (image/video/audio)", required: true },
          { key: "url", label: "URL", required: true },
          { key: "thumbnailUrl", label: "URL превью" },
          { key: "category", label: "Категория (artifact/armor/weapon/coin/reconstruction/ballad)", required: true },
        ],
      };

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-[#f5ecd9] border-2 border-[#b8860b] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-['MedievalSharp'] text-2xl text-[#262626]">
                {editingItem ? "Редактировать" : "Добавить"} {type === "hero" ? "героя" : type === "battle" ? "сражение" : type === "timeline" ? "событие" : type === "manuscript" ? "рукопись" : type === "castle" ? "замок" : "медиа"}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 text-[#262626] hover:text-[#c93e3e]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields[type].map((field) => (
                <div key={field.key}>
                  <label className={labelClass}>{field.label}{field.required && " *"}</label>
                  {field.key.includes("bio") || field.key.includes("description") || field.key.includes("tactics") || field.key.includes("result") || field.key.includes("achievements") || field.key.includes("translatedText") || field.key.includes("originalText") || field.key.includes("belligerents") || field.key.includes("defenseSystem") ? (
                    <textarea
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className={inputClass + " min-h-[80px]"}
                      required={field.required}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                      className={inputClass}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-medieval flex-1">
                  {editingItem ? "Сохранить" : "Создать"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border-2 border-[#b8860b]/30 rounded-lg text-[#262626] hover:bg-[#e8dec5] transition-colors">
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    return <FormComponent />;
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-[#b8860b]" />
          <h1 className="font-['MedievalSharp'] text-3xl text-[#262626]">
            Панель управления
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setShowForm(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-[#c93e3e] text-white"
                  : "bg-[#e8dec5] text-[#262626] hover:bg-[#b8860b] hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {statCards.map((card) => (
              <button
                key={card.label}
                onClick={() => card.key && setActiveTab(card.key)}
                className="card-medieval p-4 text-center hover:shadow-lg transition-shadow"
              >
                <card.icon className={`w-8 h-8 ${card.color} mx-auto mb-2`} />
                <div className="font-['MedievalSharp'] text-2xl text-[#262626]">{card.value}</div>
                <div className="text-xs text-[#262626]/60">{card.label}</div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "hero" && renderTable("hero", heroes || [], [
          { key: "name", label: "Имя" },
          { key: "title", label: "Титул" },
          { key: "years", label: "Годы" },
        ])}

        {activeTab === "battle" && renderTable("battle", battles || [], [
          { key: "name", label: "Название" },
          { key: "year", label: "Год" },
          { key: "location", label: "Место" },
        ])}

        {activeTab === "timeline" && renderTable("timeline", timeline || [], [
          { key: "year", label: "Год" },
          { key: "title", label: "Название" },
          { key: "category", label: "Категория" },
        ])}

        {activeTab === "manuscript" && renderTable("manuscript", manuscripts || [], [
          { key: "title", label: "Название" },
          { key: "year", label: "Год" },
          { key: "category", label: "Категория" },
        ])}

        {activeTab === "castle" && renderTable("castle", castles || [], [
          { key: "name", label: "Название" },
          { key: "location", label: "Место" },
          { key: "yearBuilt", label: "Год постройки" },
        ])}

        {activeTab === "media" && renderTable("media", mediaItems || [], [
          { key: "title", label: "Название" },
          { key: "type", label: "Тип" },
          { key: "category", label: "Категория" },
        ])}

        {activeTab === "messages" && (
          <div className="card-medieval overflow-hidden">
            {(contactData?.length || 0) === 0 ? (
              <div className="p-8 text-center text-[#262626]/50">Нет сообщений</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#e8dec5] border-b border-[#b8860b]/30">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Статус</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Имя</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Тема</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Сообщение</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Дата</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactData?.map((msg) => (
                      <tr key={msg.id} className="border-b border-[#b8860b]/10 hover:bg-[#e8dec5]/50">
                        <td className="px-4 py-3">
                          {msg.isRead ? <CheckCircle className="w-5 h-5 text-[#b8860b]" /> : <div className="w-3 h-3 bg-[#c93e3e] rounded-full" />}
                        </td>
                        <td className="px-4 py-3 text-sm">{msg.name}</td>
                        <td className="px-4 py-3 text-sm">{msg.email}</td>
                        <td className="px-4 py-3 text-sm font-medium">{msg.subject}</td>
                        <td className="px-4 py-3 text-sm text-[#262626]/70 max-w-xs truncate">{msg.message}</td>
                        <td className="px-4 py-3 text-xs text-[#262626]/50">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString("ru-RU") : ""}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {!msg.isRead && (
                              <button onClick={() => markReadMutation.mutate({ id: msg.id })} className="p-1.5 text-[#b8860b] hover:bg-[#b8860b]/10 rounded" title="Отметить прочитанным">
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => { if (confirm("Удалить сообщение?")) deleteMessageMutation.mutate({ id: msg.id }); }} className="p-1.5 text-[#c93e3e] hover:bg-[#c93e3e]/10 rounded" title="Удалить">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div className="card-medieval overflow-hidden">
            {(usersData?.oauth.length || 0) + (usersData?.local.length || 0) === 0 ? (
              <div className="p-8 text-center text-[#262626]/50">Нет пользователей</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#e8dec5] border-b border-[#b8860b]/30">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Имя</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Роль</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#262626]">Тип</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData?.oauth.map((u) => (
                      <tr key={`oauth-${u.id}`} className="border-b border-[#b8860b]/10 hover:bg-[#e8dec5]/50">
                        <td className="px-4 py-3 text-sm">{u.id}</td>
                        <td className="px-4 py-3 text-sm font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-sm">{u.email || "—"}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${u.role === "admin" ? "bg-[#c93e3e] text-white" : "bg-[#e8dec5] text-[#262626]"}`}>{u.role}</span></td>
                        <td className="px-4 py-3 text-sm">OAuth</td>
                      </tr>
                    ))}
                    {usersData?.local.map((u) => (
                      <tr key={`local-${u.id}`} className="border-b border-[#b8860b]/10 hover:bg-[#e8dec5]/50">
                        <td className="px-4 py-3 text-sm">{u.id}</td>
                        <td className="px-4 py-3 text-sm font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-sm">{u.email || "—"}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${u.role === "admin" ? "bg-[#c93e3e] text-white" : "bg-[#e8dec5] text-[#262626]"}`}>{u.role}</span></td>
                        <td className="px-4 py-3 text-sm">Local</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {renderForm()}
      </div>
    </div>
  );
}