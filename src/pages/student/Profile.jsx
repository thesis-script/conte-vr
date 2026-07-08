import { BookOpenCheck, Trophy, User } from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import { useApp } from "../../context/AppContext";
import { useData } from "../../context/DataContext";

export default function Profile() {
  const { user, progress } = useApp();
  const { stories } = useData();
  const story = stories.find((s) => s.scenes.length > 0) || stories[0];

  const stats = [
    {
      icon: BookOpenCheck,
      label: "Histoires terminées",
      value: progress.storiesDone,
      accent: "from-bright to-lavender",
    },
    {
      icon: Trophy,
      label: "Dernier résultat",
      value: progress.lastScore !== null ? `${progress.lastScore}%` : "—",
      accent: "from-gold to-terracotta",
    },
  ];

  return (
    <StudentLayout>
      <div className="max-w-2xl mx-auto px-5 py-10 md:py-14">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-royal to-lavender flex items-center justify-center shrink-0">
            <User size={28} className="text-cream" />
          </div>
          <div>
            <h1 className="font-display text-2xl text-navy">{user?.name || "Élève"}</h1>
            <p className="text-sm text-navy/55">Élève — 2ème année moyenne</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {stats.map(({ icon: Icon, label, value, accent }) => (
            <div
              key={label}
              className="rounded-2xl bg-royal/6 border border-bright/15 p-5 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shrink-0`}>
                <Icon size={20} className="text-navy" />
              </div>
              <div>
                <p className="text-2xl font-display text-navy">{value}</p>
                <p className="text-xs text-navy/60">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-royal/6 border border-bright/15 p-6">
          <h2 className="font-display text-lg text-navy mb-3">Conte en cours</h2>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{story.cover}</span>
            <div>
              <p className="text-navy font-medium">{story.title}</p>
              <p className="text-xs text-navy/55">{story.level}</p>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
