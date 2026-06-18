import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { Shield, LogIn, UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";

function getOAuthUrl() {
  const portalUrl = import.meta.env.VITE_PORTAL_URL;
  const appID = import.meta.env.VITE_APP_ID;

  // Если OAuth не настроен — возвращаем пустую строку
  if (!portalUrl || portalUrl === "undefined" || !appID || appID === "your_app_id") {
    return "";
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${portalUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: () => {
      setMode("login");
      setError("");
      setPassword("");
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      loginMutation.mutate({ username, password });
    } else {
      if (password.length < 6) {
        setError("Пароль должен быть не менее 6 символов");
        return;
      }
      registerMutation.mutate({
        username,
        displayName: displayName || undefined,
        email: email || undefined,
        password,
      });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;
  const oauthUrl = getOAuthUrl();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16"
      style={{
        backgroundImage: "url('/images/scroll-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#f5ecd9]/80" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[#262626]/60 hover:text-[#c93e3e] text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <div className="card-medieval p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-[#b8860b] mx-auto mb-3" />
            <h1 className="font-['MedievalSharp'] text-2xl text-[#262626]">
              {mode === "login" ? "Вход" : "Регистрация"}
            </h1>
            <p className="text-sm text-[#262626]/60 mt-1">
              {mode === "login"
                ? "Войдите в свой аккаунт"
                : "Создайте новый аккаунт"}
            </p>
          </div>

          {/* OAuth — показываем только если настроен */}
          {oauthUrl && (
            <>
              <a
                href={oauthUrl}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#262626] text-[#f5ecd9] rounded-lg hover:bg-[#262626]/80 transition-colors mb-4 text-sm font-semibold"
              >
                <LogIn className="w-4 h-4" />
                Войти через портал
              </a>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[#b8860b]/30" />
                <span className="text-xs text-[#262626]/40">или</span>
                <div className="flex-1 h-px bg-[#b8860b]/30" />
              </div>
            </>
          )}

          {/* Local Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#262626] mb-1">
                Имя пользователя *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors"
              />
            </div>

            {mode === "register" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-[#262626] mb-1">
                    Отображаемое имя
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#262626] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#262626] mb-1">
                Пароль *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 bg-[#f5ecd9] border-2 border-[#b8860b]/30 rounded-lg text-[#262626] focus:outline-none focus:border-[#b8860b] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#262626]/40 hover:text-[#b8860b]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[#c93e3e] text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="btn-medieval w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mode === "login" ? (
                <>
                  <LogIn className="w-4 h-4" />
                  {isPending ? "Вход..." : "Войти"}
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  {isPending ? "Создание..." : "Создать аккаунт"}
                </>
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="text-center mt-4">
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-sm text-[#b8860b] hover:text-[#c93e3e] transition-colors"
            >
              {mode === "login"
                ? "Нет аккаунта? Зарегистрироваться"
                : "Уже есть аккаунт? Войти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}