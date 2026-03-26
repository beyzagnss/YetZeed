import React, { createContext, useContext, useMemo, useState } from 'react'
import { getCurrentUser, setOnboardingCompleted, signIn, signOut, signUp, setSelectedPlant } from './authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())

  const value = useMemo(() => {
    return {
      user,
      isAuthed: Boolean(user),
      signUp: async ({ email, password }) => {
        const u = signUp({ email, password })
        setUser(u)
        return u
      },
      signIn: async ({ email, password }) => {
        const u = signIn({ email, password })
        setUser(u)
        return u
      },
      signOut: async () => {
        signOut()
        setUser(null)
      },
      completeOnboarding: async () => {
        if (!user?.id) return null
        const updated = setOnboardingCompleted(user.id, true)
        setUser(updated)
        return updated
      },
      saveUserPlant: async (plantDetails) => {
        if (!user?.id) return null
        const updated = setSelectedPlant(user.id, plantDetails)
        setUser(updated)
        return updated
      }
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

