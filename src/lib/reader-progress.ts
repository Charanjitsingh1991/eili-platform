"use client";

// IndexedDB helpers for anonymous chapter progress tracking.
// Namespace: eili.tools  DB: eili_reader  Store: chapter_progress
// Key shape: `${bookSlug}:${chapterOrdering}`
// Value shape: { bookSlug, chapterOrdering, readAt: ISO string }

const DB_NAME = "eili_reader";
const STORE_NAME = "chapter_progress";
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export interface ProgressEntry {
  key: string;
  bookSlug: string;
  chapterOrdering: number;
  readAt: string;
}

export async function markChapterRead(
  bookSlug: string,
  chapterOrdering: number,
): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const entry: ProgressEntry = {
      key: `${bookSlug}:${chapterOrdering}`,
      bookSlug,
      chapterOrdering,
      readAt: new Date().toISOString(),
    };
    const req = store.put(entry);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getLastReadChapter(
  bookSlug: string,
): Promise<ProgressEntry | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    // Collect all entries for this book and find max ordering
    const req = store.openCursor();
    let best: ProgressEntry | null = null;
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        const entry = cursor.value as ProgressEntry;
        if (entry.bookSlug === bookSlug) {
          if (!best || entry.chapterOrdering > best.chapterOrdering) {
            best = entry;
          }
        }
        cursor.continue();
      } else {
        resolve(best);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getAllProgress(): Promise<ProgressEntry[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result as ProgressEntry[]);
    req.onerror = () => reject(req.error);
  });
}
