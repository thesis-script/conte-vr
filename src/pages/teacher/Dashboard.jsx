import { Users, BookOpen, BarChart3 } from "lucide-react";
import TeacherLayout from "../../components/TeacherLayout";
import StatCard from "../../components/StatCard";
import { useData } from "../../context/DataContext";

export default function Dashboard() {
  const { students, stories } = useData();

  const avgScore =
    students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + s.lastScore, 0) / students.length)
      : 0;

  const topStudents = [...students].sort((a, b) => b.lastScore - a.lastScore).slice(0, 5);

  return (
    <TeacherLayout>
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-bright font-mono">Tableau de bord</span>
        <h1 className="font-display text-3xl text-navy mt-1">Vue d'ensemble</h1>
        <p className="text-navy/60 mt-2">Suis l'activité de tes élèves sur ConteVR.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <StatCard icon={Users} label="Élèves inscrits" value={students.length} accent="from-bright to-lavender" />
        <StatCard icon={BookOpen} label="Histoires disponibles" value={stories.length} accent="from-lavender to-pinkpurple" />
        <StatCard icon={BarChart3} label="Moyenne des évaluations" value={`${avgScore}%`} accent="from-gold to-terracotta" />
      </div>

      <div className="rounded-2xl bg-royal/6 border border-bright/15 p-6">
        <h2 className="font-display text-lg text-navy mb-4">Meilleurs résultats récents</h2>
        <div className="flex flex-col gap-3">
          {topStudents.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 py-2 border-b border-bright/10 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-royal/10 flex items-center justify-center text-sm font-semibold text-terracotta shrink-0">
                  {s.prenom?.charAt(0)}
                </div>
                <span className="text-sm text-navy">{s.prenom} {s.nom}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-28 h-2 rounded-full bg-white/80 overflow-hidden hidden sm:block">
                  <div className="h-full bg-gradient-to-r from-bright to-gold" style={{ width: `${s.lastScore}%` }} />
                </div>
                <span className="text-sm font-mono text-terracotta w-10 text-right">{s.lastScore}%</span>
              </div>
            </div>
          ))}
          {topStudents.length === 0 && (
            <p className="text-sm text-navy/45 text-center py-6">Aucun élève pour le moment.</p>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
}
