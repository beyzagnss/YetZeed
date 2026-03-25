const STORAGE_KEYS = {
  users: 'yetzeeed_users_v1',
  session: 'yetzeeed_session_v1'
}

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.users)
  return safeJsonParse(raw ?? '[]', [])
}

export function setUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
}

export function getSession() {
  const raw = localStorage.getItem(STORAGE_KEYS.session)
  return safeJsonParse(raw ?? 'null', null)
}

export function setSession(session) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session)
}

