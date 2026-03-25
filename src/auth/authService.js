import { clearSession, getSession, getUsers, setSession, setUsers } from './authStorage'

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase()
}

function nowIso() {
  return new Date().toISOString()
}

export function getCurrentUser() {
  const session = getSession()
  if (!session?.userId) return null
  const users = getUsers()
  const user = users.find((u) => u.id === session.userId) || null
  return user
    ? { id: user.id, email: user.email, onboardingCompleted: Boolean(user.onboardingCompleted) }
    : null
}

export function setOnboardingCompleted(userId, value) {
  const users = getUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx === -1) return null

  const updated = {
    ...users[idx],
    onboardingCompleted: Boolean(value),
    onboardingCompletedAt: value ? nowIso() : null
  }

  const next = [...users]
  next[idx] = updated
  setUsers(next)

  return {
    id: updated.id,
    email: updated.email,
    onboardingCompleted: Boolean(updated.onboardingCompleted)
  }
}

export function signUp({ email, password }) {
  const e = normalizeEmail(email)
  const p = String(password || '')

  if (!e.includes('@')) throw new Error('Lütfen geçerli bir email girin.')
  if (p.length < 6) throw new Error('Şifre en az 6 karakter olmalı.')

  const users = getUsers()
  if (users.some((u) => u.email === e)) throw new Error('Bu email ile kayıt zaten var.')

  const user = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random()}`,
    email: e,
    password: p,
    createdAt: nowIso(),
    onboardingCompleted: false,
    onboardingCompletedAt: null
  }

  setUsers([...users, user])
  setSession({ userId: user.id, createdAt: nowIso() })
  return { id: user.id, email: user.email, onboardingCompleted: false }
}

export function signIn({ email, password }) {
  const e = normalizeEmail(email)
  const p = String(password || '')

  const users = getUsers()
  const user = users.find((u) => u.email === e) || null
  if (!user || user.password !== p) throw new Error('Email veya şifre hatalı.')

  setSession({ userId: user.id, createdAt: nowIso() })
  return {
    id: user.id,
    email: user.email,
    onboardingCompleted: Boolean(user.onboardingCompleted)
  }
}

export function signOut() {
  clearSession()
}

