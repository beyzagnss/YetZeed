import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../auth/AuthContext'
import { getSecurityQuestion, verifySecurityAnswer, resetPassword } from '../auth/authService'

const SECURITY_QUESTIONS = [
  "İlk evcil hayvanınızın adı nedir?",
  "İlkokul öğretmeninizin soyadı nedir?",
  "Çocukluk lakabınız nedir?",
  "İlkokula başladığınız şehrin adı nedir?",
  "En sevdiğiniz kitabın adı nedir?"
];

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = useAuth()

  const from = useMemo(() => location.state?.from || '/e2', [location.state])

  const [mode, setMode] = useState('signin') // signin | signup | forgot
  const [forgotStep, setForgotStep] = useState(1) // 1: email, 2: answer, 3: new password
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // Security fields
  const [securityQuestion, setSecurityQuestion] = useState(SECURITY_QUESTIONS[0])
  const [securityAnswer, setSecurityAnswer] = useState('')
  
  // Forgot password specific fields
  const [fetchedQuestion, setFetchedQuestion] = useState('')
  const [oldAnswer, setOldAnswer] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newSecurityQuestion, setNewSecurityQuestion] = useState(SECURITY_QUESTIONS[0])
  const [newSecurityAnswer, setNewSecurityAnswer] = useState('')

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    setForgotStep(1);
  };

  async function onSubmitSignInUp(e) {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setBusy(true)
    try {
      const u = mode === 'signup' 
        ? await signUp({ email, password, securityQuestion, securityAnswer }) 
        : await signIn({ email, password })
        
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

  async function onForgotStep1(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const q = getSecurityQuestion(email);
      setFetchedQuestion(q);
      setForgotStep(2);
    } catch (err) {
      setError(err?.message || 'Bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  }

  async function onForgotStep2(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      verifySecurityAnswer(email, oldAnswer);
      setForgotStep(3);
    } catch (err) {
      setError(err?.message || 'Güvenlik sorusunun cevabı yanlış.');
    } finally {
      setBusy(false);
    }
  }

  async function onForgotStep3(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      resetPassword(email, newPassword, newSecurityQuestion, newSecurityAnswer, oldAnswer);
      handleModeChange('signin');
      setSuccessMsg('Şifreniz başarıyla yenilendi. Yeni şifrenizle giriş yapabilirsiniz.');
    } catch (err) {
      setError(err?.message || 'Bir hata oluştu.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 p-6">
        <h1 className="text-2xl font-extrabold tracking-tight">
          {mode === 'signup' ? 'Hesap Oluştur' : mode === 'signin' ? 'Giriş Yap' : 'Şifremi Unuttum'}
        </h1>
        <p className="mt-2 text-slate-700">
          {mode === 'signup'
            ? 'Onboarding testine başlamak için hesabını oluştur.'
            : mode === 'signin' 
            ? 'Devam etmek için hesabına giriş yap.' 
            : 'Hesabınızı kurtarmak için adımları takip edin.'}
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6 flex gap-2">
          <Button
            variant={mode === 'signin' ? 'secondary' : 'ghost'}
            onClick={() => handleModeChange('signin')}
            type="button"
          >
            Giriş
          </Button>
          <Button
            variant={mode === 'signup' ? 'secondary' : 'ghost'}
            onClick={() => handleModeChange('signup')}
            type="button"
          >
            Kayıt
          </Button>
        </div>

        {successMsg && (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
            {successMsg}
          </div>
        )}

        {(mode === 'signin' || mode === 'signup') && (
          <form className="space-y-4" onSubmit={onSubmitSignInUp}>
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
            
            {mode === 'signup' && (
              <div className="space-y-4 pt-2 border-t border-slate-100 mt-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Güvenlik Sorusu</label>
                  <select 
                    value={securityQuestion}
                    onChange={e => setSecurityQuestion(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 bg-white"
                  >
                    {SECURITY_QUESTIONS.map((q, idx) => (
                      <option key={idx} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Güvenlik Sorusu Cevabı"
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Cevabınız"
                  required
                />
              </div>
            )}

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
            
            {mode === 'signin' && (
              <div className="text-center pt-2">
                <button type="button" onClick={() => handleModeChange('forgot')} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                  Şifremi Unuttum
                </button>
              </div>
            )}

            <p className="text-xs text-slate-500 text-center mt-4 pt-4 border-t border-slate-100">
              MVP notu: Bu aşamada kullanıcı verileri yerel olarak (tarayıcı localStorage) tutulur.
            </p>
          </form>
        )}

        {mode === 'forgot' && (
          <div className="space-y-4">
            {forgotStep === 1 && (
              <form onSubmit={onForgotStep1} className="space-y-4">
                <p className="text-sm font-medium text-slate-700">Şifrenizi sıfırlamak için hesabınıza ait e-posta adresini girin.</p>
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@mail.com"
                  required
                />
                {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" className="w-full" onClick={() => handleModeChange('signin')}>İptal</Button>
                  <Button disabled={busy} type="submit" className="w-full">İleri</Button>
                </div>
              </form>
            )}

            {forgotStep === 2 && (
              <form onSubmit={onForgotStep2} className="space-y-4">
                <div className="rounded-xl bg-slate-100 p-4 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold mb-1">Güvenlik Sorusunu Cevaplayın</p>
                  <p className="text-sm font-bold text-slate-900">{fetchedQuestion}</p>
                </div>
                <Input
                  label="Cevabınız"
                  type="text"
                  value={oldAnswer}
                  onChange={(e) => setOldAnswer(e.target.value)}
                  placeholder="..."
                  required
                />
                {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
                <div className="flex gap-2">
                  <Button type="button" variant="ghost" className="w-full" onClick={() => handleModeChange('signin')}>İptal</Button>
                  <Button disabled={busy} type="submit" className="w-full">Doğrula</Button>
                </div>
              </form>
            )}

            {forgotStep === 3 && (
              <form onSubmit={onForgotStep3} className="space-y-4">
                <p className="text-sm font-medium text-slate-700 mb-4 bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-emerald-800">
                  Kimliğiniz doğrulandı. Yeni şifrenizi ve ileride yaşanacak olası bir durum için yeni nesil güvenlik sorunuzu belirleyin.
                </p>
                
                <Input
                  label="Yeni Şifre"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••"
                  required
                />

                <div className="space-y-4 pt-4 border-t border-slate-100 mt-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">Yeni Güvenlik Sorusu</label>
                    <select 
                      value={newSecurityQuestion}
                      onChange={e => setNewSecurityQuestion(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 bg-white"
                    >
                      {SECURITY_QUESTIONS.map((q, idx) => (
                        <option key={idx} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Yeni Güvenlik Sorusu Cevabı"
                    type="text"
                    value={newSecurityAnswer}
                    onChange={(e) => setNewSecurityAnswer(e.target.value)}
                    placeholder="Yeni cevabınız"
                    required
                  />
                </div>

                {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
                <Button disabled={busy} type="submit" className="w-full">Şifreyi Yenile</Button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
