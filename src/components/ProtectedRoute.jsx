import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProtectedRoute({ role, children }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/connexion" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "enseignant" ? "/enseignant/tableau-de-bord" : "/eleve/accueil"} replace />;
  }
  return children;
}
