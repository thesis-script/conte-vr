import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Volume2, Eye, X, BookOpen } from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import StoryPath from "../../components/StoryPath";
import { useData } from "../../context/DataContext";

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "fr-FR";
  utter.rate = 0.9;
  window.speechSynthesis.speak(utter);
}

export default function StoryExperience() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { stories } = useData();
  const [index, setIndex] = useState(0);
  const [revealedWord, setRevealedWord] = useState(null);

  const story = stories.find((s) => s.id === storyId);
  const scenes = story?.scenes || [];

  if (!story || scenes.length === 0) {
    return (
      <StudentLayout>
        <div className="max-w-lg mx-auto px-5 py-20 text-center">
          <p className="text-navy/60 mb-4">Cette histoire n'est pas encore disponible.</p>
          <Link to="/eleve/histoires" className="text-terracotta underline text-sm">
            Retour aux histoires
          </Link>
        </div>
      </StudentLayout>
    );
  }

  const scene = scenes[index];
  const isLast = index === scenes.length - 1;
  const isFirst = index === 0;

  function goTo(i) {
    if (i < 0 || i >= scenes.length) return;
    setIndex(i);
    setRevealedWord(null);
  }

  function handleSelectFromPath(sceneId) {
    const i = scenes.findIndex((s) => s.id === sceneId);
    if (i >= 0) goTo(i);
  }

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto px-5 pt-6 pb-14">
        <div className="flex items-center justify-between mb-2">
          <Link to="/eleve/histoires" className="text-xs text-navy/55 hover:text-terracotta flex items-center gap-1">
            <ChevronLeft size={14} /> Retour aux histoires
          </Link>
          <span className="text-xs font-mono text-navy/45">
            Scène {index + 1} / {scenes.length}
          </span>
        </div>

        <h1 className="font-display text-2xl text-navy text-center mt-2 mb-1">{story.title}</h1>

        <StoryPath scenes={scenes} activeId={scene.id} onSelect={handleSelectFromPath} compact />

        {/* Scene panel */}
        <div
          className={`relative rounded-3xl overflow-hidden border border-bright/20 shadow-soft bg-gradient-to-br ${scene.palette} mt-4`}
        >
          <div className="absolute inset-0 bg-navy/25" />
          <div className="absolute inset-0 bg-stars opacity-40" />

          <div className="relative px-6 py-10 md:px-12 md:py-16 text-center">
            {scene.image ? (
              <img
                src={scene.image}
                alt={scene.nameFr}
                className="w-64 h-64 md:w-64 md:h-64 mx-auto mb-5 rounded-3xl object-cover shadow-soft animate-float"
              />
            ) : (
              <div className="w-64 h-64 md:w-64 md:h-64 mx-auto mb-5 rounded-3xl overflow-hidden shadow-soft animate-float bg-navy/20">
                {scene.image ? (
                  <img src={scene.image} alt={scene.nameFr} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-7xl md:text-8xl flex items-center justify-center w-full h-full">
                    {scene.emoji}
                  </span>
                )}
              </div>
            )}
            <span className="text-xs uppercase tracking-wider text-cream/80 font-mono">
              Scène {scene.id}
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-white mt-1 mb-4">{scene.nameFr}</h2>
            <p className="text-white/90 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
              {scene.text}
            </p>
            <button
              onClick={() => speak(scene.text)}
              className="inline-flex items-center gap-2 mt-6 text-xs font-semibold bg-white/15 hover:bg-white/25 text-white rounded-full px-4 py-2 transition-colors"
            >
              <Volume2 size={14} /> Écouter le texte
            </button>
          </div>
        </div>

        {/* Vocabulary */}
        <div className="mt-7">
          <h3 className="font-display text-lg text-navy mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-terracotta" /> Nouveaux mots de cette scène
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {scene.words.map((w) => {
              const open = revealedWord === w.fr;
              return (
                <div
                  key={w.fr}
                  className={`rounded-2xl border p-4 transition-colors ${open ? "bg-royal/10 border-gold/50" : "bg-royal/6 border-bright/15"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-base text-navy">{w.fr}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speak(w.fr)}
                        aria-label={`Écouter ${w.fr}`}
                        className="p-1.5 rounded-full text-navy/60 hover:text-terracotta hover:bg-white"
                      >
                        <Volume2 size={15} />
                      </button>
                      <button
                        onClick={() => setRevealedWord(open ? null : w.fr)}
                        aria-label={`Voir le sens de ${w.fr}`}
                        className="p-1.5 rounded-full text-navy/60 hover:text-terracotta hover:bg-white"
                      >
                        {open ? <X size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  {open && (
                    <div className="mt-2 pt-2 border-t border-bright/15 text-sm">
                      <p className="text-navy/80">{w.hint}</p>
                      <p className="text-pinkpurple text-xs mt-1" dir="rtl">
                        {w.ar}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-9">
          <button
            onClick={() => goTo(index - 1)}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-5 py-2.5 border border-bright/30 text-navy/70 disabled:opacity-30 hover:border-bright/60 transition-colors"
          >
            <ChevronLeft size={16} /> Précédent
          </button>

          {isLast ? (
            <button
              onClick={() => navigate(`/eleve/quiz/${storyId}`)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-6 py-2.5 bg-gradient-to-r from-terracotta to-gold text-navy shadow-soft hover:shadow-glow transition-shadow"
            >
              Passer à l'évaluation <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => goTo(index + 1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-6 py-2.5 bg-gradient-to-r from-royal to-lavender text-cream shadow-soft hover:opacity-90 transition-opacity"
            >
              Suivant <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}