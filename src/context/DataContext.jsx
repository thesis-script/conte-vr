import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { seedStories, seedQuizzes, seedStudents, seedTeacherProfile } from "../data/storyData";
import { deleteStoredVideo, listStoredVideos, readStoredVideo, saveStoredVideo } from "../data/videoStorage";

const DataContext = createContext(null);

const KEYS = {
  stories: "contevr_stories",
  quizzes: "contevr_quizzes",
  students: "contevr_students",
  teacherProfile: "contevr_teacher_profile",
};

function loadOrSeed(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    // fall through to seed
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

// Broadcast channel-like sync across tabs/components via the "storage" event
// only fires in *other* tabs, so within the same tab we rely on React state
// shared through this single provider (mounted once at the app root) —
// this guarantees teacher edits and student views read from the same source.

export function DataProvider({ children }) {
  const [stories, setStories] = useState(() => loadOrSeed(KEYS.stories, seedStories));
  const [quizzes, setQuizzes] = useState(() => loadOrSeed(KEYS.quizzes, seedQuizzes));
  const [students, setStudents] = useState(() => loadOrSeed(KEYS.students, seedStudents));
  const [teacherProfile, setTeacherProfile] = useState(() =>
    loadOrSeed(KEYS.teacherProfile, seedTeacherProfile)
  );
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState("");

  useEffect(() => {
    let active = true;
    listStoredVideos()
      .then((storedVideos) => {
        if (active) setVideos(storedVideos);
      })
      .catch((error) => {
        console.error("Unable to load videos from browser storage.", error);
        if (active) setVideosError("Impossible de charger les vidéos enregistrées sur cet appareil.");
      })
      .finally(() => {
        if (active) setVideosLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(KEYS.stories, JSON.stringify(stories));
  }, [stories]);
  useEffect(() => {
    localStorage.setItem(KEYS.quizzes, JSON.stringify(quizzes));
  }, [quizzes]);
  useEffect(() => {
    localStorage.setItem(KEYS.students, JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem(KEYS.teacherProfile, JSON.stringify(teacherProfile));
  }, [teacherProfile]);

  // ---- Stories CRUD ----
  const addStory = useCallback((story) => {
    setStories((list) => [
      ...list,
      {
        id: `histoire-${Date.now()}`,
        cover: "📘",
        level: "2ème année moyenne",
        duration: "—",
        status: "Brouillon",
        scenes: [],
        ...story,
      },
    ]);
  }, []);

  const updateStory = useCallback((id, patch) => {
    setStories((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const deleteStory = useCallback((id) => {
    setStories((list) => list.filter((s) => s.id !== id));
    setQuizzes((q) => {
      const next = { ...q };
      delete next[id];
      return next;
    });
  }, []);

  // ---- Quizzes CRUD (scoped to a story id) ----
  const addQuestion = useCallback((storyId, question) => {
    setQuizzes((q) => ({
      ...q,
      [storyId]: [...(q[storyId] || []), { id: `q${Date.now()}`, type: "mcq", ...question }],
    }));
  }, []);

  const updateQuestion = useCallback((storyId, questionId, patch) => {
    setQuizzes((q) => ({
      ...q,
      [storyId]: (q[storyId] || []).map((item) =>
        item.id === questionId ? { ...item, ...patch } : item
      ),
    }));
  }, []);

  const deleteQuestion = useCallback((storyId, questionId) => {
    setQuizzes((q) => ({
      ...q,
      [storyId]: (q[storyId] || []).filter((item) => item.id !== questionId),
    }));
  }, []);

  // ---- Students CRUD ----
  const addStudent = useCallback((student) => {
    setStudents((list) => [
      ...list,
      { id: Date.now(), completion: 0, lastScore: 0, storiesDone: 0, ...student },
    ]);
  }, []);

  const updateStudent = useCallback((id, patch) => {
    setStudents((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const deleteStudent = useCallback((id) => {
    setStudents((list) => list.filter((s) => s.id !== id));
  }, []);

  // ---- Teacher profile ----
  const updateTeacherProfile = useCallback((patch) => {
    setTeacherProfile((p) => ({ ...p, ...patch }));
  }, []);

  const addVideo = useCallback(async (file, details) => {
    const video = await saveStoredVideo(file, details);
    setVideos((list) => [video, ...list]);
    return video;
  }, []);

  const deleteVideo = useCallback(async (id) => {
    await deleteStoredVideo(id);
    setVideos((list) => list.filter((video) => video.id !== id));
  }, []);

  const getVideoFile = useCallback((id) => readStoredVideo(id), []);

  return (
    <DataContext.Provider
      value={{
        stories,
        addStory,
        updateStory,
        deleteStory,
        quizzes,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        teacherProfile,
        updateTeacherProfile,
        videos,
        videosLoading,
        videosError,
        addVideo,
        deleteVideo,
        getVideoFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
