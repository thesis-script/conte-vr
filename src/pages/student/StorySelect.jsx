import { Link } from "react-router-dom";
import { Clock, BookText, ArrowRight, Lock } from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import { useData } from "../../context/DataContext";

export default function StorySelect() {
  const { stories } = useData();
  const visible = stories.filter((s) => s.status === "Publié");

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider text-bright font-mono">Tes histoires</span>
          <h1 className="font-display text-3xl text-navy mt-1">Choisis un conte à explorer</h1>
          <p className="text-navy/60 mt-2">Sélectionne une histoire pour commencer ton expérience immersive.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((story) => {
            const hasScenes = story.scenes.length > 0;
            const wordsCount = story.scenes.reduce((n, s) => n + s.words.length, 0);
            return (
              <div
                key={story.id}
                className={`group rounded-3xl bg-gradient-to-br from-royal/8 to-lavender/8 border p-6 md:p-7 flex flex-col transition-colors ${
                  hasScenes ? "border-bright/15 hover:border-gold/50" : "border-bright/10 opacity-70"
                }`}
              >
                <div className="text-6xl mb-4">{story.cover}</div>
                <span className="text-xs uppercase tracking-wider text-bright font-mono mb-1">
                  {story.level}
                </span>
                <h2 className="font-display text-xl text-navy mb-2">{story.title}</h2>
                <p className="text-sm text-navy/60 leading-relaxed mb-5 flex-1">{story.summary}</p>
                <div className="flex items-center gap-4 text-xs text-navy/55 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {story.duration}
                  </span>
                  {hasScenes && (
                    <span className="flex items-center gap-1.5">
                      <BookText size={14} /> {wordsCount} mots
                    </span>
                  )}
                </div>
                {hasScenes ? (
                  <Link
                    to={`/eleve/histoire/${story.id}`}
                    className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-sm bg-gradient-to-r from-terracotta to-gold text-navy shadow-soft group-hover:shadow-glow transition-shadow"
                  >
                    Commencer l'expérience <ArrowRight size={16} />
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-sm border border-dashed border-bright/30 text-navy/45">
                    <Lock size={14} /> Bientôt disponible
                  </span>
                )}
              </div>
            );
          })}

          {visible.length === 0 && (
            <p className="text-sm text-navy/45 col-span-2 text-center py-10">
              Aucune histoire publiée pour le moment.
            </p>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
