import { useState, useRef, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import { Scroll, X, Send, Feather, Crown, Loader2 } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => {
    const existing = localStorage.getItem("chat_session_id");
    if (existing) return existing;
    const newId = crypto.randomUUID();
    localStorage.setItem("chat_session_id", newId);
    return newId;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: history } = trpc.chat.history.useQuery(
    { sessionId },
    { enabled: open }
  );

  const sendMutation = trpc.chat.send.useMutation({
    onSuccess: () => {
      utils.chat.history.invalidate({ sessionId });
    },
  });

  const utils = trpc.useUtils();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMutation.mutate({ message, sessionId });
    setMessage("");
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-[#262626] text-[#f5ecd9] rotate-0"
            : "bg-[#c93e3e] text-white hover:bg-[#a83232] hover:scale-110"
        }`}
      >
        {open ? <X className="w-6 h-6" /> : <Crown className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#f5ecd9] border-2 border-[#b8860b] rounded-lg shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "500px", maxHeight: "calc(100vh - 8rem)" }}
        >
          {/* Header */}
          <div className="bg-[#262626] text-[#f5ecd9] px-4 py-3 flex items-center gap-3">
            <Feather className="w-5 h-5 text-[#b8860b]" />
            <div>
              <h3 className="font-['MedievalSharp'] text-sm">Исторический советник</h3>
              <p className="text-xs text-[#f5ecd9]/60">Эксперт по истории ВКЛ</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-medieval">
            {(!history || history.length === 0) && (
              <div className="text-center py-8">
                <Scroll className="w-12 h-12 text-[#b8860b] mx-auto mb-3 opacity-50" />
                <p className="text-[#262626]/60 text-sm">
                  Задайте вопрос о рыцарстве, битвах или героях ВКЛ
                </p>
              </div>
            )}
            {history?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-lg text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#c93e3e] text-white rounded-br-none"
                      : "bg-[#e8dec5] text-[#262626] border border-[#b8860b]/30 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {sendMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-[#e8dec5] border border-[#b8860b]/30 rounded-lg rounded-bl-none px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#b8860b]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#b8860b]/30 bg-[#e8dec5]/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Спросите историка..."
                className="flex-1 px-3 py-2 bg-[#f5ecd9] border border-[#b8860b]/30 rounded-lg text-sm text-[#262626] placeholder:text-[#262626]/40 focus:outline-none focus:border-[#b8860b]"
              />
              <button
                type="submit"
                disabled={sendMutation.isPending || !message.trim()}
                className="px-3 py-2 bg-[#c93e3e] text-white rounded-lg hover:bg-[#a83232] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
