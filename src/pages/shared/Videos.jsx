import { useEffect, useState } from "react";
import { Film, Headset, Play, Plus, Trash2, Upload } from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import TeacherLayout from "../../components/TeacherLayout";
import VideoPlayer from "../../components/VideoPlayer";
import { useApp } from "../../context/AppContext";
import { useData } from "../../context/DataContext";
import { VIDEO_RETENTION_DAYS } from "../../data/videoStorage";

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export default function Videos() {
  const { user } = useApp();
  const isTeacher = user?.role === "enseignant";
  const { videos, videosLoading, videosError, addVideo, deleteVideo, getVideoFile } = useData();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loadingVideo, setLoadingVideo] = useState(false);

  useEffect(() => {
    let active = true;
    let objectUrl = "";
    if (!activeVideo) {
      setVideoUrl("");
      setLoadingVideo(false);
      return undefined;
    }
    setLoadingVideo(true);
    getVideoFile(activeVideo.id)
      .then((blob) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoUrl(objectUrl);
      })
      .catch((loadError) => {
        console.error("Unable to open the selected video.", loadError);
        if (active) {
          setError(loadError.message || "Impossible d'ouvrir cette vidéo.");
          setActiveVideo(null);
        }
      })
      .finally(() => {
        if (active) setLoadingVideo(false);
      });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [activeVideo, getVideoFile]);

  async function handleUpload(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!file || !title.trim()) {
      setError("Ajoute un titre et sélectionne une vidéo.");
      return;
    }
    if (!file.type.startsWith("video/")) {
      setError("Le fichier sélectionné doit être une vidéo.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      await addVideo(file, { title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      setFile(null);
      form.reset();
    } catch (uploadError) {
      console.error("Unable to save the uploaded video.", uploadError);
      setError("Impossible d'enregistrer la vidéo. Vérifie l'espace disponible sur cet appareil.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(video) {
    if (!window.confirm(`Supprimer « ${video.title} » de cet appareil ?`)) return;
    try {
      await deleteVideo(video.id);
    } catch (deleteError) {
      console.error("Unable to delete the selected video.", deleteError);
      setError("Impossible de supprimer cette vidéo.");
    }
  }

  const content = (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-bright font-mono">
          {isTeacher ? "Gestion" : "Médiathèque"}
        </span>
        <h1 className="font-display text-3xl text-navy mt-1">Vidéos immersives</h1>
        <p className="text-navy/60 mt-2">
          {isTeacher
            ? "Ajoute des vidéos à la médiathèque pour que les élèves puissent les regarder."
            : "Choisis une vidéo et regarde-la sur l'écran ou avec un casque VR."}
        </p>
      </div>

      {isTeacher && (
        <form onSubmit={handleUpload} className="rounded-2xl bg-royal/6 border border-bright/15 p-5 md:p-6 mb-8">
          <h2 className="font-display text-lg text-navy flex items-center gap-2 mb-4">
            <Upload size={18} className="text-terracotta" /> Ajouter une vidéo
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Titre</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={100}
                placeholder="Titre de la vidéo"
                className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs text-navy/60">Fichier vidéo</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                required
                onChange={(event) => setFile(event.target.files?.[0] || null)}
                className="bg-white border border-bright/20 rounded-xl px-3 py-2 text-sm text-navy file:mr-3 file:rounded-full file:border-0 file:bg-royal/10 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5 mt-4">
            <span className="text-xs text-navy/60">Description (facultative)</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}
              maxLength={500}
              placeholder="Quelques mots sur cette vidéo…"
              className="bg-white border border-bright/20 rounded-xl px-4 py-2.5 text-sm text-navy outline-none focus:border-gold/60 resize-y"
            />
          </label>
          <p className="text-xs text-navy/50 mt-3">
            Pour la VR à 360°, téléverse une vidéo équirectangulaire. MP4 et WebM sont acceptés.
            Les vidéos sont enregistrées dans le navigateur de cet appareil et supprimées après {VIDEO_RETENTION_DAYS} jours.
          </p>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-terracotta to-gold text-navy disabled:opacity-50"
            >
              <Plus size={16} /> {uploading ? "Enregistrement…" : "Ajouter à la médiathèque"}
            </button>
          </div>
        </form>
      )}

      {(error || videosError) && (
        <p role="alert" className="rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm mb-5">
          {error || videosError}
        </p>
      )}

      {videosLoading ? (
        <p className="text-sm text-navy/55 py-10 text-center">Chargement de la médiathèque…</p>
      ) : videos.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-5">
          {videos.map((video) => (
            <article key={video.id} className="rounded-2xl bg-white/80 border border-bright/15 overflow-hidden shadow-soft">
              <div className="h-36 bg-gradient-to-br from-navy via-indigo to-lavender flex items-center justify-center">
                <Film size={42} className="text-white/80" />
              </div>
              <div className="p-5">
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg text-navy">{video.title}</h2>
                    <p className="text-xs text-navy/45 mt-1">
                      {formatSize(video.size)} · {video.fileName}
                    </p>
                    <p className="text-xs text-navy/45 mt-1">
                      Supprimée le {new Date(video.expiresAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  {isTeacher && (
                    <button
                      type="button"
                      onClick={() => handleDelete(video)}
                      aria-label={`Supprimer ${video.title}`}
                      className="p-2 h-fit rounded-lg text-navy/45 hover:text-terracotta hover:bg-royal/8"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                {video.description && <p className="text-sm text-navy/60 leading-relaxed mt-3">{video.description}</p>}
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setActiveVideo(video);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 mt-4 text-sm font-semibold bg-gradient-to-r from-royal to-lavender text-white hover:opacity-90"
                >
                  <Play size={15} fill="currentColor" /> Regarder
                  <Headset size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-bright/25 bg-white/40 py-14 px-5 text-center">
          <Film size={34} className="mx-auto text-lavender/70 mb-3" />
          <p className="font-display text-lg text-navy">Aucune vidéo pour le moment</p>
          <p className="text-sm text-navy/50 mt-1">
            {isTeacher ? "Ajoute une vidéo ci-dessus pour la partager avec les élèves." : "Les vidéos ajoutées par l'enseignant apparaîtront ici."}
          </p>
        </div>
      )}
      {loadingVideo && <p className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 text-white">Préparation de la vidéo…</p>}
      {activeVideo && videoUrl && (
        <VideoPlayer
          title={activeVideo.title}
          videoUrl={videoUrl}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );

  return isTeacher ? <TeacherLayout>{content}</TeacherLayout> : <StudentLayout>{content}</StudentLayout>;
}
