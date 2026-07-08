import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronDown, X, Check } from "lucide-react";
import TeacherLayout from "../../components/TeacherLayout";
import Button from "../../components/Button";
import { useData } from "../../context/DataContext";

const emptyForm = { nom: "", prenom: "", classe: "", genre: "Fille" };

function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 rounded-full bg-white/80 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-bright to-pinkpurple" style={{ width: `${value}%` }} />
    </div>
  );
}

export default function Students() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [expanded, setExpanded] = useState(null);
  const [editing, setEditing] = useState(null); // student id being edited, or "new"
  const [form, setForm] = useState(emptyForm);

  function openNew() {
    setForm(emptyForm);
    setEditing("new");
  }

  function openEdit(s) {
    setForm({ nom: s.nom, prenom: s.prenom, classe: s.classe, genre: s.genre });
    setEditing(s.id);
  }

  function saveForm() {
    if (!form.nom.trim() || !form.prenom.trim() || !form.classe.trim()) return;
    if (editing === "new") {
      addStudent({ ...form });
    } else {
      updateStudent(editing, { ...form });
    }
    setEditing(null);
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-bright font-mono">Gestion</span>
          <h1 className="font-display text-3xl text-navy mt-1">Élèves</h1>
        </div>
        <Button variant="primary" onClick={openNew}>
          <Plus size={16} /> Ajouter un élève
        </Button>
      </div>

      {editing && (
        <div className="rounded-2xl bg-royal/6 border border-gold/30 p-5 mb-6 flex flex-col gap-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Nom</span>
              <input
                autoFocus
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                placeholder="ex. Belkacem"
                className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Prénom</span>
              <input
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                placeholder="ex. Yasmine"
                className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Classe</span>
              <input
                value={form.classe}
                onChange={(e) => setForm({ ...form, classe: e.target.value })}
                placeholder="ex. 2AM1"
                className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Genre</span>
              <select
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
              >
                <option>Fille</option>
                <option>Garçon</option>
              </select>
            </label>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setEditing(null)} className="!px-4 !py-2.5">
              <X size={16} /> Annuler
            </Button>
            <Button variant="primary" onClick={saveForm} className="!px-4 !py-2.5">
              <Check size={16} /> Enregistrer
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-royal/6 border border-bright/15 overflow-hidden">
        {students.map((s) => (
          <div key={s.id} className="border-b border-bright/10 last:border-0">
            <div className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-royal/5 transition-colors">
              <button
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left"
              >
                <div className="w-9 h-9 rounded-full bg-royal/10 flex items-center justify-center text-sm font-semibold text-terracotta shrink-0">
                  {s.prenom?.charAt(0)}
                </div>
                <span className="text-sm text-navy truncate">
                  {s.prenom} {s.nom}
                </span>
                <span className="text-xs text-navy/45 shrink-0">{s.classe}</span>
                <ChevronDown
                  size={16}
                  className={`text-navy/45 shrink-0 transition-transform ${expanded === s.id ? "rotate-180" : ""}`}
                />
              </button>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(s)}
                  className="p-2 rounded-lg text-navy/55 hover:text-terracotta hover:bg-white"
                  aria-label="Modifier"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => deleteStudent(s.id)}
                  className="p-2 rounded-lg text-navy/55 hover:text-terracotta hover:bg-white"
                  aria-label="Supprimer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {expanded === s.id && (
              <div className="px-5 pb-5 pt-1 grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex justify-between text-xs text-navy/55 mb-1.5">
                    <span>Progression de l'histoire</span>
                    <span className="text-terracotta">{s.completion}%</span>
                  </div>
                  <ProgressBar value={s.completion} />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-navy/55 mb-1.5">
                    <span>Dernier résultat d'évaluation</span>
                    <span className="text-terracotta">{s.lastScore}%</span>
                  </div>
                  <ProgressBar value={s.lastScore} />
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-navy/55">
                  <span>Genre : <span className="text-navy">{s.genre}</span></span>
                  <span>Classe : <span className="text-navy">{s.classe}</span></span>
                  <span>Histoires terminées : <span className="text-navy">{s.storiesDone}</span></span>
                </div>
              </div>
            )}
          </div>
        ))}
        {students.length === 0 && (
          <p className="text-center text-sm text-navy/45 py-10">Aucun élève pour le moment.</p>
        )}
      </div>
    </TeacherLayout>
  );
}
