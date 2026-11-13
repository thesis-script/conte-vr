import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, UserCog, Lock, User as UserIcon } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useData } from "../../context/DataContext";
import Button from "../../components/Button";

export default function Login() {
  const [role, setRole] = useState("eleve");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useApp();
  const { updateTeacherProfile } = useData();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      setError("Merci de remplir le nom d'utilisateur et le mot de passe.");
      return;
    }
    setError("");
    login(name.trim(), role);

    if (role === "enseignant") {
      const parts = name.trim().split(/\s+/);
      updateTeacherProfile({
        identifiant: name.trim(),
        prenom: parts[0] || "",
        nom: parts.slice(1).join(" ") || "",
      });
    }

    navigate(role === "enseignant" ? "/enseignant/tableau-de-bord" : "/eleve/accueil");
  }

  return (
    <div className="min-h-screen bg-paper-gradient text-navy font-body flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-3xl"><img src="/logo.jpg" alt="ConteVR" className="w-10 h-10" style={{ borderRadius: "20%" }} /></span>
          <span className="font-display text-2xl text-navy">
            Conte<span className="text-terracotta">VR</span>
          </span>
        </Link>

        <div className="rounded-3xl bg-royal/6 border border-bright/15 p-7 md:p-9 shadow-soft backdrop-blur-sm">
          <h1 className="font-display text-2xl text-center text-navy mb-1">Connexion</h1>
          <p className="text-center text-navy/55 text-sm mb-6">
            Entre dans le conte et commence ton aventure.
          </p>

          <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-white mb-6">
            <button
              type="button"
              onClick={() => setRole("eleve")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${role === "eleve" ? "bg-gradient-to-r from-terracotta to-gold text-navy" : "text-navy/60"
                }`}
            >
              <GraduationCap size={16} /> Élève
            </button>
            <button
              type="button"
              onClick={() => setRole("enseignant")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors ${role === "enseignant" ? "bg-gradient-to-r from-terracotta to-gold text-navy" : "text-navy/60"
                }`}
            >
              <UserCog size={16} /> Enseignant
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Nom d'utilisateur</span>
              <div className="flex items-center gap-2 bg-white border border-bright/20 rounded-xl px-4 py-3 focus-within:border-gold/60 transition-colors">
                <UserIcon size={16} className="text-navy/45" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === "eleve" ? "ex. Yasmine.B" : "ex. M.Bensaid"}
                  className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/35 w-full"
                />
              </div>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Mot de passe</span>
              <div className="flex items-center gap-2 bg-white border border-bright/20 rounded-xl px-4 py-3 focus-within:border-gold/60 transition-colors">
                <Lock size={16} className="text-navy/45" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/35 w-full"
                />
              </div>
            </label>

            {error && <p className="text-xs text-terracotta">{error}</p>}

            <Button type="submit" variant="primary" className="w-full mt-2">
              Se connecter
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-navy/45 mt-6">
          Prototype ConteVR — données de démonstration uniquement.
        </p>
      </div>
    </div>
  );
}
