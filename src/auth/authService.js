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
    ? { id: user.id, email: user.email, onboardingCompleted: Boolean(user.onboardingCompleted), selectedPlant: user.selectedPlant || null }
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
    onboardingCompleted: Boolean(updated.onboardingCompleted),
    selectedPlant: updated.selectedPlant || null
  }
}

export function setSelectedPlant(userId, plantDetails) {
  const users = getUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx === -1) return null

  const updated = {
    ...users[idx],
    selectedPlant: plantDetails
  }

  const next = [...users]
  next[idx] = updated
  setUsers(next)

  return {
    id: updated.id,
    email: updated.email,
    onboardingCompleted: Boolean(updated.onboardingCompleted),
    selectedPlant: updated.selectedPlant || null
  }
}

export function signUp({ email, password, securityQuestion, securityAnswer }) {
  const e = normalizeEmail(email)
  const p = String(password || '')

  if (!e.includes('@')) throw new Error('Lütfen geçerli bir email girin.')
  if (p.length < 6) throw new Error('Şifre en az 6 karakter olmalı.')
  
  if (!securityQuestion) throw new Error('Güvenlik sorusu seçmelisiniz.')
  if (!securityAnswer || securityAnswer.trim().length === 0) throw new Error('Güvenlik sorusunu cevaplamalısınız.')

  const users = getUsers()
  if (users.some((u) => u.email === e)) throw new Error('Bu email ile kayıt zaten var.')

  const user = {
    id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random()}`,
    email: e,
    password: p,
    securityQuestion,
    securityAnswer: securityAnswer.trim().toLowerCase(),
    createdAt: nowIso(),
    onboardingCompleted: false,
    onboardingCompletedAt: null
  }

  setUsers([...users, user])
  setSession({ userId: user.id, createdAt: nowIso() })
  return { id: user.id, email: user.email, onboardingCompleted: false, selectedPlant: null }
}

export function getSecurityQuestion(email) {
  const e = normalizeEmail(email)
  const users = getUsers()
  const user = users.find((u) => u.email === e)
  if (!user) throw new Error('Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.')
  if (!user.securityQuestion) throw new Error('Bu hesabın bir güvenlik sorusu ayarlanmamış.')
  return user.securityQuestion
}

export function verifySecurityAnswer(email, answer) {
  const e = normalizeEmail(email)
  const a = String(answer || '').trim().toLowerCase()
  const users = getUsers()
  const user = users.find((u) => u.email === e)
  if (!user) throw new Error('Kullanıcı bulunamadı.')
  if (user.securityAnswer !== a) throw new Error('Güvenlik sorusu cevabı yanlış.')
  return true
}

export function resetPassword(email, newPassword, newSecurityQuestion, newSecurityAnswer, oldAnswer) {
  const e = normalizeEmail(email)
  const users = getUsers()
  const idx = users.findIndex((u) => u.email === e)
  if (idx === -1) throw new Error('Kullanıcı bulunamadı.')
  
  const user = users[idx]
  const oA = String(oldAnswer || '').trim().toLowerCase()
  if (user.securityAnswer !== oA) throw new Error('Eski güvenlik sorusu cevabı yanlış.')
  
  const p = String(newPassword || '')
  if (p.length < 6) throw new Error('Şifre en az 6 karakter olmalı.')
  
  if (!newSecurityQuestion) throw new Error('Yeni güvenlik sorusu seçmelisiniz.')
  if (!newSecurityAnswer || newSecurityAnswer.trim().length === 0) throw new Error('Yeni güvenlik sorusunu cevaplamalısınız.')

  const updated = {
    ...user,
    password: p,
    securityQuestion: newSecurityQuestion,
    securityAnswer: newSecurityAnswer.trim().toLowerCase()
  }
  
  const next = [...users]
  next[idx] = updated
  setUsers(next)
  return true
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
    onboardingCompleted: Boolean(user.onboardingCompleted),
    selectedPlant: user.selectedPlant || null
  }
}

export function signOut() {
  clearSession()
}

