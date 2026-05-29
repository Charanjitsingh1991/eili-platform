"use client";

// Shared IndexedDB helpers for all EILI tools.
// DB: eili_tools  (namespace: eili.tools per architecture rules)
// Stores: planner_draft, scorecard_draft, reset_progress

const DB_NAME = "eili_tools";
const DB_VERSION = 1;

export function openToolsDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("planner_draft")) {
        db.createObjectStore("planner_draft", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("scorecard_draft")) {
        db.createObjectStore("scorecard_draft", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("reset_progress")) {
        db.createObjectStore("reset_progress", { keyPath: "key" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbGet<T>(
  store: string,
  key: string,
): Promise<T | undefined> {
  const db = await openToolsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function idbPut(store: string, value: unknown): Promise<void> {
  const db = await openToolsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    const req = tx.objectStore(store).put(value);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
