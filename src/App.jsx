import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom'
import E1 from './pages/E1'
import E2 from './pages/E2'
import E2Result from './pages/E2Result'
import E3 from './pages/E3'
import E4 from './pages/E4'
import Auth from './pages/Auth'
import RequireAuth from './auth/RequireAuth'
import RequireOnboarding from './auth/RequireOnboarding'
import Button from './components/ui/Button'
import { useAuth } from './auth/AuthContext'

export default function App() {
  const { user, isAuthed, signOut } = useAuth()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/70 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <div className="text-lg font-semibold tracking-tight">YetZeed</div>
            <div className="flex items-center gap-4">


              {isAuthed ? (
                <div className="flex items-center gap-2">
                  <div className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 sm:block">
                    {user?.email}
                  </div>
                  <Button variant="ghost" onClick={signOut}>
                    Çıkış
                  </Button>
                </div>
              ) : (
                <Link to="/auth" className="inline-flex">
                  <Button variant="ghost">Giriş / Kayıt</Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 pb-16 pt-6">
          <Routes>
            <Route path="/" element={<Navigate to="/e1" replace />} />
            <Route path="/e1" element={isAuthed && user?.onboardingCompleted ? <Navigate to="/e3" replace /> : <E1 />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/e2"
              element={
                <RequireAuth>
                  {user?.onboardingCompleted ? <Navigate to="/e3" replace /> : <E2 />}
                </RequireAuth>
              }
            />
            <Route
              path="/e2-sonuc"
              element={
                <RequireAuth>
                  {user?.onboardingCompleted ? <Navigate to="/e3" replace /> : <E2Result />}
                </RequireAuth>
              }
            />
            <Route
              path="/e3"
              element={
                <RequireAuth>
                  <RequireOnboarding>
                    <E3 />
                  </RequireOnboarding>
                </RequireAuth>
              }
            />
            <Route
              path="/e4"
              element={
                <RequireAuth>
                  <RequireOnboarding>
                    <E4 />
                  </RequireOnboarding>
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

