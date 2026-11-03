const DATABASE_NAME = "contevr_video_library";
const STORE_NAME = "videos";
const DATABASE_VERSION = 1;
export const VIDEO_RETENTION_DAYS = 30;
const VIDEO_RETENTION_MS = VIDEO_RETENTION_DAYS * 24 * 60 * 60 * 1000;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Unable to open video storage."));
  });
}

async function withStore(mode, action) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const request = action(transaction.objectStore(STORE_NAME));
    let result;
    request.onsuccess = () => {
      result = request.result;
    };
    request.onerror = () => reject(request.error || new Error("Video storage request failed."));
    transaction.onabort = () => {
      database.close();
      reject(transaction.error || new Error("Video storage transaction failed."));
    };
    transaction.oncomplete = () => {
      database.close();
      resolve(result);
    };
  });
}

function metadata(record) {
  const details = { ...record };
  delete details.blob;
  return details;
}

export async function listStoredVideos() {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    let activeVideos = [];

    request.onsuccess = () => {
      const now = Date.now();
      activeVideos = request.result.filter((video) => {
        const uploadedAt = Date.parse(video.createdAt);
        const expiresAt = Number.isNaN(uploadedAt)
          ? Number.POSITIVE_INFINITY
          : uploadedAt + VIDEO_RETENTION_MS;
        if (expiresAt <= now) {
          store.delete(video.id);
          return false;
        }
        return true;
      });
    };
    request.onerror = () => reject(request.error || new Error("Unable to load stored videos."));
    transaction.onabort = () => {
      database.close();
      reject(transaction.error || new Error("Video storage transaction failed."));
    };
    transaction.oncomplete = () => {
      database.close();
      resolve(
        activeVideos
          .map((video) => ({
            ...metadata(video),
            expiresAt: new Date(Date.parse(video.createdAt) + VIDEO_RETENTION_MS).toISOString(),
          }))
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      );
    };
  });
}

export async function saveStoredVideo(file, details) {
  const createdAt = new Date();
  const video = {
    id: `video-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`,
    title: details.title,
    description: details.description,
    fileName: file.name,
    mimeType: file.type,
    size: file.size,
    createdAt: createdAt.toISOString(),
    expiresAt: new Date(createdAt.getTime() + VIDEO_RETENTION_MS).toISOString(),
    blob: file,
  };
  await withStore("readwrite", (store) => store.put(video));
  return metadata(video);
}

export async function readStoredVideo(id) {
  const record = await withStore("readonly", (store) => store.get(id));
  if (!record) throw new Error("La vidéo enregistrée est introuvable.");
  return record.blob;
}

export async function deleteStoredVideo(id) {
  await withStore("readwrite", (store) => store.delete(id));
}
