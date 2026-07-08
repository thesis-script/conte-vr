import { Link, useLocation } from "react-router-dom";
import { Home, BookOpenText, User } from "lucide-react";

export default function MobileTabBar() {
  const location = useLocation();
  const links = [
    { to: "/eleve/accueil", label: "Accueil", icon: Home },
    { to: "/eleve/histoires", label: "Histoires", icon: BookOpenText },
    { to: "/eleve/profil", label: "Profil", icon: User },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-bright/15 flex justify-around py-2">
      {links.map(({ to, label, icon: Icon }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 text-[11px] ${
              active ? "text-terracotta" : "text-navy/55"
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
