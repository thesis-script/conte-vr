import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState } from "react";
import { BookOpenText, User, LogOut, Home, LogIn, Sparkles, Film, Headset, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useData } from "../context/DataContext";

export default function StudentNavbar() {
  const { user, logout } = useApp();
  const { stories } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [showImmersiveMode, setShowImmersiveMode] = useState(false);
  const firstAvailableStory = stories.find((story) => story.status === "Publié" && story.scenes.length > 0);

  const links = [
    { to: "/eleve/accueil", label: "Accueil", icon: Home },
    { to: "/eleve/histoires", label: "Histoires", icon: BookOpenText },
    { to: "/eleve/videos", label: "Vidéos", icon: Film },
    { to: "/eleve/profil", label: "Profil", icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-bright/15 bg-white/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link to="/eleve/accueil" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:animate-float"><img src="/logo.jpg" alt="ConteVR" className="w-10 h-10" style={{ borderRadius: "20%" }} /></span>
          <span className="font-display text-xl tracking-wide text-navy">
            Conte<span className="text-terracotta">VR</span>
          </span>
        </Link>

        {user && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    active ? "bg-royal/10 text-terracotta" : "text-navy/70 hover:text-navy hover:bg-royal/8"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => setShowImmersiveMode(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-lavender to-royal px-3 py-2 text-sm font-semibold text-cream hover:opacity-90 transition-opacity"
                aria-label="Ouvrir le mode immersif"
              >
                <Headset size={16} />
                <span className="hidden sm:inline">Entrer en VR</span>
              </button>
              <span className="hidden sm:flex items-center gap-1.5 text-sm text-navy/60">
                <Sparkles size={14} className="text-terracotta" />
                Bonjour, <span className="text-terracotta font-medium">{user.name}</span>
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-1.5 text-sm text-navy/60 hover:text-terracotta transition-colors"
                aria-label="Se déconnecter"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Quitter</span>
              </button>
            </>
          ) : (
            <Link
              to="/connexion"
              className="flex items-center gap-1.5 text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-terracotta to-gold text-navy hover:shadow-glow transition-shadow"
            >
              <LogIn size={16} />
              Se connecter
            </Link>
          )}
        </div>
      </div>
      {showImmersiveMode && createPortal(
        <div className="fixed inset-0 z-[100] h-screen h-[100dvh] w-screen overflow-hidden bg-navy">
          <img src="/hero.jpg" alt="Expérience immersive ConteVR" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
          <button
            type="button"
            onClick={() => setShowImmersiveMode(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-navy hover:bg-white/90 transition-colors"
            aria-label="Fermer le mode immersif"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 px-6 text-center">
            <p className="font-display text-2xl md:text-3xl text-cream">
              Prêt(e) à entrer dans le conte ?
            </p>
            <Link
              to={firstAvailableStory ? `/eleve/histoire/${firstAvailableStory.id}` : "/eleve/histoires"}
              onClick={() => setShowImmersiveMode(false)}
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-8 py-3.5 text-sm bg-gradient-to-r from-lavender to-royal text-cream shadow-glow hover:opacity-90 transition-opacity"
            >
              {firstAvailableStory ? "Commencer l'expérience" : "Découvrir les histoires"}
            </Link>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
