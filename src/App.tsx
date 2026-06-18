import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { TRPCProvider } from "./providers/trpc";
import Layout from "./components/Layout";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const HeroesPage = lazy(() => import("./pages/HeroesPage"));
const BattlesPage = lazy(() => import("./pages/BattlesPage"));
const ManuscriptsPage = lazy(() => import("./pages/ManuscriptsPage"));
const CastlesPage = lazy(() => import("./pages/CastlesPage"));
const MediaPage = lazy(() => import("./pages/MediaPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <TRPCProvider>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/heroes" element={<HeroesPage />} />
              <Route path="/battles" element={<BattlesPage />} />
              <Route path="/manuscripts" element={<ManuscriptsPage />} />
              <Route path="/castles" element={<CastlesPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </TRPCProvider>
    </I18nextProvider>
  );
}
