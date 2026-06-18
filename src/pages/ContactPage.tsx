import { useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import { Mail, Send, CheckCircle, MapPin, Clock, Phone } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Mail className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
          <h1 className="section-title text-4xl">{t("sections.contact")}</h1>
          <p className="text-[#262626]/60 mt-3 max-w-xl mx-auto">
            Если у вас есть вопросы, предложения или вы хотите поделиться материалами,
            свяжитесь с нами через форму ниже.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="card-medieval p-5">
              <MapPin className="w-6 h-6 text-[#b8860b] mb-2" />
              <h3 className="font-['MedievalSharp'] text-[#262626] mb-1">Адрес</h3>
              <p className="text-sm text-[#262626]/70">
                г. Минск, Республика Беларусь
              </p>
            </div>
            <div className="card-medieval p-5">
              <Clock className="w-6 h-6 text-[#b8860b] mb-2" />
              <h3 className="font-['MedievalSharp'] text-[#262626] mb-1">Часы работы</h3>
              <p className="text-sm text-[#262626]/70">
                Пн–Пт: 9:00 – 18:00
              </p>
            </div>
            <div className="card-medieval p-5">
              <Phone className="w-6 h-6 text-[#b8860b] mb-2" />
              <h3 className="font-['MedievalSharp'] text-[#262626] mb-1">Телефон</h3>
              <p className="text-sm text-[#262626]/70">
                +375 (17) 000-00-00
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="card-medieval p-8 text-center">
                <CheckCircle className="w-16 h-16 text-[#b8860b] mx-auto mb-4" />
                <h3 className="font-['MedievalSharp'] text-2xl text-[#262626] mb-2">
                  Сообщение отправлено!
                </h3>
                <p className="text-[#262626]/70 mb-6">
                  Благодарим за обращение. Мы ответим вам в ближайшее время.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-medieval"
                >
                  Отправить еще
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-medieval p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#262626] mb-1">
                    {t("common.name")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#262626] mb-1">
                    {t("common.email")} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#262626] mb-1">
                    {t("common.subject")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#262626] mb-1">
                    {t("common.message")} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="btn-medieval w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitMutation.isPending ? "Отправка..." : t("common.send")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
