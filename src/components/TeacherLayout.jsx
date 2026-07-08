import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, BookOpen, HelpCircle, LogOut, Menu, X, UserCircle } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext"
const links = [
  { to: "/enseignant/tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/enseignant/eleves", label: "Élèves", icon: Users },
  { to: "/enseignant/histoires", label: "Histoires", icon: BookOpen },
  { to: "/enseignant/evaluations", label: "Évaluations", icon: HelpCircle },
  { to: "/enseignant/profil", label: "Mon profil", icon: UserCircle },
];

export default function TeacherLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [showHero, setShowHero] = useState(false);

  return (
    <div className="min-h-screen bg-paper-gradient text-navy font-body flex">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-bright/15 bg-white/80 backdrop-blur-md p-5">
        <Link to="/enseignant/tableau-de-bord" className="flex items-center gap-2 mb-10 px-2">
          <span className="text-2xl"><img src="/logo.jpg" alt="ConteVR" className="w-10 h-10" style={{ borderRadius: "20%" }} /></span>
          <span className="font-display text-xl text-navy">
            Conte<span className="text-terracotta">VR</span>
          </span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-royal/10 text-terracotta" : "text-navy/70 hover:bg-royal/8 hover:text-navy"
                  }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button onClick={() => setShowHero(true)}
          className="rounded-2xl bg-gradient-to-b from-royal/10 to-indigo/10 border border-bright/20 p-5 text-center mb-4 hover:border-gold/40 transition-colors"
        >
          <img src='/vr.png' alt="Casque VR" className="w-36 h-36 mx-auto mb-3 drop-shadow-lg" />
          <p className="font-display text-base text-navy mb-1">Mode immersif</p>
          <p className="text-xs text-navy/60 mb-4 leading-snug">
            Plongez dans le conte en réalité virtuelle
          </p>
          <span className="inline-block w-full rounded-full bg-gradient-to-r from-lavender to-royal text-cream text-sm font-semibold py-2.5 hover:opacity-90 transition-opacity">
            Entrer en VR
          </span>
        </button>
        <div className="border-t border-bright/15 pt-4 mt-4">
          <p className="text-xs text-navy/55 px-2 mb-2 flex items-center gap-1.5">
            <UserCircle size={14} className="text-royal/60" />
            Connecté en tant que <span className="text-terracotta">{user?.name || "Enseignant"}</span>
          </p>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-navy/60 hover:text-terracotta transition-colors w-full"
          >
            <LogOut size={16} /> Se déconnecter
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-bright/15 flex items-center justify-between px-4 py-3">
        <Link to="/enseignant/tableau-de-bord" className="flex items-center gap-2">
          <span className="text-xl"><img src="/logo.jpg" alt="ConteVR" className="w-10 h-10" style={{ borderRadius: "20%" }} /></span>
          <span className="font-display text-lg text-navy">
            Conte<span className="text-terracotta">VR</span>
          </span>
        </Link>
        <button onClick={() => setOpen(!open)} className="text-navy p-1" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-white/95 backdrop-blur-md pt-16 px-5 flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base text-navy/80 hover:bg-royal/8"
            >
              <Icon size={18} /> {label}
            </Link>
          ))}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-3 px-4 py-3 text-base text-terracotta mt-4"
          >
            <LogOut size={18} /> Se déconnecter
          </button>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-16 md:pt-0">
        <div className="p-5 md:p-8 max-w-6xl mx-auto">{children}</div>
      </main>
      {showHero && (
        <div className="fixed inset-0 z-50 bg-navy">
          <img src="/hero.jpg" alt="Expérience VR" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
          <button
            onClick={() => setShowHero(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-navy hover:bg-white/90 transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-6 text-center">
            <p className="font-display text-2xl md:text-3xl text-cream">
              Prêt(e) à entrer dans le conte ?
            </p>
            <Link
              to="/eleve/histoire/petit-garcon-sorciere"
              onClick={() => setShowHero(false)}
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-8 py-3.5 text-sm bg-gradient-to-r from-lavender to-royal text-cream shadow-glow hover:opacity-90 transition-opacity"
            >
              Commencer l'expérience
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
