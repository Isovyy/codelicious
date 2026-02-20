// src/store/progress.js
// Manages module unlock state in localStorage

const STORAGE_KEY = "codekitchen_progress";

const DEFAULT_PROGRESS = {
  completedModules: [], // e.g. [1, 2, 3]
  currentModule: 1,
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_PROGRESS };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

export function completeModule(moduleId) {
  const progress = loadProgress();
  if (!progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId);
  }
  progress.currentModule = moduleId + 1;
  saveProgress(progress);
  return progress;
}

export function isModuleUnlocked(moduleId, progress) {
  if (moduleId === 1) return true; // first module always unlocked
  return progress.completedModules.includes(moduleId - 1);
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
