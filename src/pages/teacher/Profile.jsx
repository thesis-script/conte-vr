import { useState } from "react";
import { UserCircle, Mail, Phone, School, BookMarked, Pencil, Check, X } from "lucide-react";
import TeacherLayout from "../../components/TeacherLayout";
import Button from "../../components/Button";
import { useData } from "../../context/DataContext";

const fields = [
  { key: "prenom", label: "Prénom", icon: UserCircle },
  { key: "nom", label: "Nom", icon: UserCircle },
  { key: "email", label: "E-mail", icon: Mail },
  { key: "telephone", label: "Téléphone", icon: Phone },
  { key: "matiere", label: "Matière enseignée", icon: BookMarked },
  { key: "etablissement", label: "Établissement", icon: School },
  { key: "identifiant", label: "Identifiant de connexion", icon: UserCircle },
];

export default function Profile() {
  const { teacherProfile, updateTeacherProfile } = useData();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(teacherProfile);

  function startEdit() {
    setForm(teacherProfile);
    setEditing(true);
  }

  function save() {
    updateTeacherProfile(form);
    setEditing(false);
  }

  return (
    <TeacherLayout>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-bright font-mono">Compte</span>
          <h1 className="font-display text-3xl text-navy mt-1">Mon profil</h1>
          <p className="text-navy/60 mt-2">Gère tes informations personnelles.</p>
        </div>
        {!editing && (
          <Button variant="primary" onClick={startEdit}>
            <Pencil size={16} /> Modifier
          </Button>
        )}
      </div>

      <div className="rounded-3xl bg-royal/6 border border-bright/15 p-6 md:p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-royal to-lavender flex items-center justify-center shrink-0">
            <UserCircle size={32} className="text-cream" />
          </div>
          <div>
            <h2 className="font-display text-xl text-navy">
              {teacherProfile.prenom} {teacherProfile.nom}
            </h2>
            <p className="text-sm text-navy/55">Enseignant(e) — {teacherProfile.matiere}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {fields.map(({ key, label, icon: Icon }) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60 flex items-center gap-1.5">
                <Icon size={13} /> {label}
              </span>
              {editing ? (
                <input
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
                />
              ) : (
                <p className="text-sm text-navy px-1 py-1.5">{teacherProfile[key] || "—"}</p>
              )}
            </label>
          ))}
        </div>

        {editing && (
          <div className="flex gap-2 justify-end mt-7">
            <Button variant="ghost" onClick={() => setEditing(false)}>
              <X size={14} /> Annuler
            </Button>
            <Button variant="primary" onClick={save}>
              <Check size={14} /> Enregistrer
            </Button>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
