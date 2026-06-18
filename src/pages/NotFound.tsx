import { Link } from "react-router";
import { Shield, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center">
        <Shield className="w-20 h-20 text-[#b8860b] mx-auto mb-6 opacity-50" />
        <h1 className="font-['MedievalSharp'] text-6xl text-[#262626] mb-2">404</h1>
        <p className="text-[#262626]/60 text-lg mb-6">
          Страница не найдена. Возможно, она была перемещена или удалена.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 btn-medieval">
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
