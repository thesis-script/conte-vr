import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpenText, User, LogOut, Home, LogIn, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function StudentNavbar() {
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: "/eleve/accueil", label: "Accueil", icon: Home },
    { to: "/eleve/histoires", label: "Histoires", icon: BookOpenText },
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
    </header>
  );
}
