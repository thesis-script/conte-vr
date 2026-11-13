import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X, Layers, BookText } from "lucide-react";
import TeacherLayout from "../../components/TeacherLayout";
import Button from "../../components/Button";
import { useData } from "../../context/DataContext";

const emptyForm = { title: "", summary: "", level: "2ème année moyenne", cover: "📘", duration: "", status: "Brouillon" };

const ICON_OPTIONS = [
  "📘", "📗", "📙", "📕", "📖", "📚", "📜", "🪄",
  "✨", "🌙", "🌟", "⭐", "☀️", "🌈", "❄️", "🔥",
  "🧙", "🧙‍♀️", "🧚", "🧚‍♀️", "👑", "🗝️", "🏰", "🏡",
  "🌲", "🌳", "🌸", "🍃", "🌊", "🏜️", "🏔️", "🌋",
  "🐉", "🦉", "🦋", "🦂", "🐍", "🦁", "🐺", "🐢",
  "🎭", "🎨", "🎪", "🧭", "⚔️", "🛡️", "💎", "🔮",
];

export default function Stories() {
  const { stories, addStory, updateStory, deleteStory } = useData();
  const [editingId, setEditingId] = useState(null); // story id or "new"
  const [form, setForm] = useState(emptyForm);

  function startNew() {
    setForm(emptyForm);
    setEditingId("new");
  }

  function startEdit(s) {
    setForm({ title: s.title, summary: s.summary, level: s.level, cover: s.cover, duration: s.duration, status: s.status });
    setEditingId(s.id);
  }

  function save() {
    if (!form.title.trim() || !form.summary.trim()) return;
    if (editingId === "new") {
      addStory({ ...form });
    } else {
      updateStory(editingId, { ...form });
    }
    setEditingId(null);
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-bright font-mono">Gestion</span>
          <h1 className="font-display text-3xl text-navy mt-1">Histoires</h1>
          <p className="text-navy/60 mt-2">
            Ajoute, modifie ou supprime des contes. Les changements apparaissent immédiatement côté élève.
          </p>
        </div>
        <Button variant="primary" onClick={startNew}>
          <Plus size={16} /> Ajouter une histoire
        </Button>
      </div>

      {editingId && (
        <div className="rounded-2xl bg-royal/6 border border-gold/30 p-5 mb-6 flex flex-col gap-3">
          <div className="grid sm:grid-cols-[1fr_140px] gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Titre</span>
              <input
                autoFocus
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Titre du conte"
                className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Durée</span>
              <input
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="ex. 20 min"
                className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
              />
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-navy/60">Icône du conte</span>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-12 h-12 rounded-xl bg-white border border-gold/40 flex items-center justify-center text-2xl shrink-0">
                {form.cover}
              </span>
              <span className="text-xs text-navy/45">Choisis une icône ci-dessous</span>
            </div>
            <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto rounded-xl bg-royal/5 border border-bright/15 p-3">
              {ICON_OPTIONS.map((icon) => (
                <button
                  type="button"
                  key={icon}
                  onClick={() => setForm({ ...form, cover: icon })}
                  className={`text-xl rounded-lg py-1.5 transition-colors ${
                    form.cover === icon ? "bg-gold/12 ring-2 ring-gold" : "hover:bg-royal/8"
                  }`}
                  aria-label={`Choisir l'icône ${icon}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-navy/60">Description</span>
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={3}
              className="w-full bg-white border border-bright/20 rounded-xl px-3 py-2 text-sm text-navy outline-none focus:border-gold/60 resize-none"
            />
          </label>
          <label className="flex items-center gap-3">
            <span className="text-xs text-navy/60">Statut</span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-white border border-bright/20 rounded-xl px-3 py-2 text-sm text-navy outline-none focus:border-gold/60"
            >
              <option>Publié</option>
              <option>Brouillon</option>
            </select>
            <span className="text-[11px] text-navy/45">
              Seules les histoires « Publié » sont visibles par les élèves.
            </span>
          </label>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setEditingId(null)} className="!px-3 !py-1.5 text-xs">
              <X size={14} /> Annuler
            </Button>
            <Button variant="primary" onClick={save} className="!px-3 !py-1.5 text-xs">
              <Check size={14} /> Enregistrer
            </Button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {stories.map((s) => (
          <div key={s.id} className="rounded-2xl bg-royal/6 border border-bright/15 p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{s.cover}</span>
                <div>
                  <h2 className="font-display text-lg text-navy">{s.title}</h2>
                  <span
                    className={`inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      s.status === "Publié" ? "bg-bright/6 text-bright" : "bg-gold/12 text-terracotta"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => startEdit(s)}
                  className="p-2 rounded-lg text-navy/55 hover:text-terracotta hover:bg-white"
                  aria-label="Modifier"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => deleteStory(s.id)}
                  className="p-2 rounded-lg text-navy/55 hover:text-terracotta hover:bg-white"
                  aria-label="Supprimer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-navy/55 mb-3">
              <span className="flex items-center gap-1.5">
                <Layers size={14} /> {s.scenes.length} scènes
              </span>
              <span className="flex items-center gap-1.5">
                <BookText size={14} /> {s.scenes.reduce((n, sc) => n + sc.words.length, 0)} mots
              </span>
            </div>

            <p className="text-sm text-navy/70 leading-relaxed">{s.summary}</p>
          </div>
        ))}
        {stories.length === 0 && (
          <p className="text-center text-sm text-navy/45 py-10 md:col-span-2">Aucune histoire pour le moment.</p>
        )}
      </div>
    </TeacherLayout>
  );
}