const STORAGE_KEYS = {
  tasks: 'yetzeeed_tasks_v1'
}

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function getAllTasks() {
  const raw = localStorage.getItem(STORAGE_KEYS.tasks)
  return safeJsonParse(raw || '{}', {})
}

export function saveAllTasks(data) {
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(data))
}
