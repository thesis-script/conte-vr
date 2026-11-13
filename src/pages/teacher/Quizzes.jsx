import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import TeacherLayout from "../../components/TeacherLayout";
import Button from "../../components/Button";
import { useData } from "../../context/DataContext";

const emptyDraft = { question: "", options: ["", "", "", ""], answer: 0 };

export default function Quizzes() {
  const { stories, quizzes, addQuestion, updateQuestion, deleteQuestion } = useData();
  const storiesWithScenes = stories.filter((s) => s.scenes.length > 0);
  const [activeStoryId, setActiveStoryId] = useState(storiesWithScenes[0]?.id || "");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(emptyDraft);

  const allQuestions = quizzes[activeStoryId] || [];
  const mcqQuestions = allQuestions.filter((q) => q.type === "mcq");

  function startNew() {
    setDraft(emptyDraft);
    setEditingId("new");
  }

  function startEdit(q) {
    setDraft({ question: q.question, options: [...q.options], answer: q.answer });
    setEditingId(q.id);
  }

  function save() {
    if (!draft.question.trim() || draft.options.some((o) => !o.trim())) return;
    if (editingId === "new") {
      addQuestion(activeStoryId, { type: "mcq", ...draft });
    } else {
      updateQuestion(activeStoryId, editingId, { ...draft });
    }
    setEditingId(null);
  }

  function remove(id) {
    deleteQuestion(activeStoryId, id);
  }

  if (storiesWithScenes.length === 0) {
    return (
      <TeacherLayout>
        <p className="text-sm text-navy/55">
          Ajoute d'abord une histoire avec des scènes pour pouvoir créer une évaluation.
        </p>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-bright font-mono">Gestion</span>
          <h1 className="font-display text-3xl text-navy mt-1">Évaluations</h1>
          <p className="text-navy/60 mt-2">
            Ajoute, modifie ou supprime les questions. Les changements sont visibles immédiatement par les élèves.
          </p>
        </div>
        <Button variant="primary" onClick={startNew}>
          <Plus size={16} /> Ajouter une question
        </Button>
      </div>

      {storiesWithScenes.length > 1 && (
        <label className="flex items-center gap-3 mb-6">
          <span className="text-xs text-navy/60">Histoire</span>
          <select
            value={activeStoryId}
            onChange={(e) => {
              setActiveStoryId(e.target.value);
              setEditingId(null);
            }}
            className="bg-white border border-bright/20 rounded-xl px-3 py-2 text-sm text-navy outline-none focus:border-gold/60"
          >
            {storiesWithScenes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      )}

      {editingId && (
        <div className="rounded-2xl bg-royal/6 border border-gold/30 p-5 mb-6 flex flex-col gap-3">
          <input
            value={draft.question}
            onChange={(e) => setDraft({ ...draft, question: e.target.value })}
            placeholder="Énoncé de la question"
            className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
          />
          {draft.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name="answer"
                checked={draft.answer === i}
                onChange={() => setDraft({ ...draft, answer: i })}
                className="accent-gold shrink-0"
                aria-label={`Marquer comme bonne réponse ${i + 1}`}
              />
              <input
                value={opt}
                onChange={(e) => {
                  const opts = [...draft.options];
                  opts[i] = e.target.value;
                  setDraft({ ...draft, options: opts });
                }}
                placeholder={`Option ${i + 1}`}
                className="flex-1 bg-white border border-bright/20 rounded-xl px-4 py-2 text-sm text-navy outline-none focus:border-gold/60"
              />
            </div>
          ))}
          <p className="text-[11px] text-navy/45">Sélectionne le bouton radio de la bonne réponse.</p>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setEditingId(null)}>
              <X size={14} /> Annuler
            </Button>
            <Button variant="primary" onClick={save}>
              <Check size={14} /> Enregistrer
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {mcqQuestions.map((q, i) => (
          <div key={q.id} className="rounded-2xl bg-royal/6 border border-bright/15 p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="text-sm text-navy font-medium">
                <span className="text-terracotta font-mono mr-2">Q{i + 1}.</span>
                {q.question}
              </p>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => startEdit(q)}
                  className="p-2 rounded-lg text-navy/55 hover:text-terracotta hover:bg-white"
                  aria-label="Modifier"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => remove(q.id)}
                  className="p-2 rounded-lg text-navy/55 hover:text-terracotta hover:bg-white"
                  aria-label="Supprimer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => (
                <span
                  key={oi}
                  className={`text-xs rounded-lg px-3 py-2 border ${
                    oi === q.answer
                      ? "bg-bright/8 border-bright/50 text-bright"
                      : "bg-royal/5 border-bright/10 text-navy/60"
                  }`}
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>
        ))}
        {mcqQuestions.length === 0 && (
          <p className="text-center text-sm text-navy/45 py-10">Aucune question pour le moment.</p>
        )}
      </div>
    </TeacherLayout>
  );
}
