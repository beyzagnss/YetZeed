import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../auth/AuthContext'

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = useAuth()

  const from = useMemo(() => location.state?.from || '/e2', [location.state])

  const [mode, setMode] = useState('signin') // signin | signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const u = mode === 'signup' ? await signUp({ email, password }) : await signIn({ email, password })
      if (!u?.onboardingCompleted) {
        navigate('/e2', { replace: true })
      } else {
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err?.message || 'Bir hata oluştu.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 p-6">
        <h1 className="text-2xl font-extrabold tracking-tight">
          {mode === 'signup' ? 'Hesap Oluştur' : 'Giriş Yap'}
        </h1>
        <p className="mt-2 text-slate-700">
          {mode === 'signup'
            ? 'Onboarding testine başlamak için hesabını oluştur.'
            : 'Devam etmek için hesabına giriş yap.'}
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6 flex gap-2">
          <Button
            variant={mode === 'signin' ? 'secondary' : 'ghost'}
            onClick={() => setMode('signin')}
            type="button"
          >
            Giriş
          </Button>
          <Button
            variant={mode === 'signup' ? 'secondary' : 'ghost'}
            onClick={() => setMode('signup')}
            type="button"
          >
            Kayıt
          </Button>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            required
          />
          <Input
            label="Şifre"
            type="password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            required
          />

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <div className="pt-2">
            <Button disabled={busy} type="submit" className="w-full">
              {busy
                ? 'Lütfen bekle...'
                : mode === 'signup'
                  ? 'Hesap Oluştur'
                  : 'Giriş Yap'}
            </Button>
          </div>

          <p className="text-xs text-slate-500">
            MVP notu: Bu aşamada kullanıcı verileri yerel olarak (tarayıcı localStorage) tutulur.
          </p>
        </form>
      </div>
    </section>
  )
}

