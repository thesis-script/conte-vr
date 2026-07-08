import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Check, X, ChevronRight, Trophy, RotateCcw } from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import Button from "../../components/Button";
import { useApp } from "../../context/AppContext";
import { useData } from "../../context/DataContext";

function MatchQuestion({ question, onComplete }) {
  const [matched, setMatched] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wrongFlash, setWrongFlash] = useState(null);
  const shuffledEmojis = [...question.pairs].sort(() => Math.random() - 0.5);

  function pickWord(word) {
    if (matched.includes(word)) return;
    setSelectedWord(word);
  }

  function pickEmoji(pair) {
    if (!selectedWord || matched.includes(pair.word)) return;
    if (pair.word === selectedWord) {
      const next = [...matched, selectedWord];
      setMatched(next);
      setSelectedWord(null);
      if (next.length === question.pairs.length) onComplete();
    } else {
      setWrongFlash(pair.word);
      setTimeout(() => setWrongFlash(null), 400);
      setSelectedWord(null);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        {question.pairs.map((p) => (
          <button
            key={p.word}
            onClick={() => pickWord(p.word)}
            disabled={matched.includes(p.word)}
            className={`text-left text-sm font-medium rounded-xl px-4 py-3 border transition-colors ${
              matched.includes(p.word)
                ? "bg-bright/6 border-bright/40 text-navy/45 line-through"
                : selectedWord === p.word
                ? "bg-gold/12 border-gold text-terracotta"
                : "bg-royal/6 border-bright/15 text-navy hover:border-bright/40"
            }`}
          >
            {p.word}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {shuffledEmojis.map((p) => (
          <button
            key={p.emoji + p.word}
            onClick={() => pickEmoji(p)}
            disabled={matched.includes(p.word)}
            className={`text-3xl rounded-xl py-4 border transition-all ${
              matched.includes(p.word)
                ? "bg-bright/6 border-bright/30 opacity-30"
                : wrongFlash === p.word
                ? "bg-terracotta/15 border-terracotta animate-pulse"
                : "bg-royal/6 border-bright/15 hover:border-gold/50"
            }`}
          >
            {p.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Quiz() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { recordQuizResult } = useApp();
  const { quizzes, stories } = useData();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [matchDone, setMatchDone] = useState(false);
  const [finished, setFinished] = useState(false);

  const story = stories.find((s) => s.id === storyId) || { title: "" };
  const quiz = quizzes[storyId] || [];

  if (quiz.length === 0) {
    return (
      <StudentLayout>
        <div className="max-w-lg mx-auto px-5 py-20 text-center">
          <p className="text-navy/60 mb-4">Aucune évaluation n'est disponible pour cette histoire.</p>
          <Link to="/eleve/histoires" className="text-terracotta underline text-sm">
            Retour aux histoires
          </Link>
        </div>
      </StudentLayout>
    );
  }

  const q = quiz[step];
  const isLast = step === quiz.length - 1;

  function submitMcq() {
    if (selected === null) return;
    advance(selected === q.answer);
  }

  function submitMatch() {
    advance(matchDone);
  }

  function advance(correct) {
    const updated = [...answers, correct];
    setAnswers(updated);
    if (isLast) {
      const score = Math.round((updated.filter(Boolean).length / quiz.length) * 100);
      recordQuizResult(score);
      setFinished(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setMatchDone(false);
    }
  }

  if (finished) {
    const score = Math.round((answers.filter(Boolean).length / quiz.length) * 100);
    return (
      <StudentLayout>
        <div className="max-w-md mx-auto px-5 py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-terracotta flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Trophy size={40} className="text-navy" />
          </div>
          <h1 className="font-display text-3xl text-navy mb-2">Bravo !</h1>
          <p className="text-navy/60 mb-6">Tu as terminé l'évaluation de « {story.title} ».</p>
          <div className="rounded-2xl bg-royal/6 border border-bright/15 p-6 mb-8">
            <p className="text-5xl font-display text-terracotta">{score}%</p>
            <p className="text-xs text-navy/55 mt-1">de bonnes réponses</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button as={Link} to="/eleve/profil" variant="primary">
              Voir mon profil
            </Button>
            <Button as={Link} to="/eleve/histoires" variant="ghost">
              Retour aux histoires
            </Button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-2xl mx-auto px-5 pt-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono text-navy/45">
            Question {step + 1} / {quiz.length}
          </span>
          <div className="flex gap-1">
            {quiz.map((_, i) => (
              <span
                key={i}
                className={`w-6 h-1.5 rounded-full ${
                  i < step ? "bg-gold" : i === step ? "bg-bright" : "bg-bright/6"
                }`}
              />
            ))}
          </div>
        </div>

        <h1 className="font-display text-xl md:text-2xl text-navy mb-6">{q.question}</h1>

        {q.type === "mcq" && (
          <div className="flex flex-col gap-3 mb-8">
            {q.options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => setSelected(i)}
                className={`text-left rounded-xl px-5 py-3.5 border text-sm font-medium transition-colors flex items-center justify-between ${
                  selected === i
                    ? "bg-gold/12 border-gold text-terracotta"
                    : "bg-royal/6 border-bright/15 text-navy hover:border-bright/40"
                }`}
              >
                {opt}
                {selected === i && <Check size={16} />}
              </button>
            ))}
          </div>
        )}

        {q.type === "match" && (
          <div className="mb-8">
            <MatchQuestion question={q} onComplete={() => setMatchDone(true)} />
            {matchDone && (
              <p className="text-xs text-bright mt-4 flex items-center gap-1.5">
                <Check size={14} /> Toutes les paires sont associées !
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={q.type === "mcq" ? submitMcq : submitMatch}
            disabled={q.type === "mcq" ? selected === null : !matchDone}
            variant="primary"
          >
            {isLast ? "Terminer" : "Question suivante"} <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </StudentLayout>
  );
}
