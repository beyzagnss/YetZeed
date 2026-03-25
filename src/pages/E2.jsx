import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../auth/AuthContext'
import { CATEGORIES, getQuestionsByCategory, QUESTIONS } from '../onboarding/questions'

export default function E2() {
  const { user, completeOnboarding } = useAuth()
  const grouped = getQuestionsByCategory()

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">E2 - Onboarding Testi</h1>
      <p className="mt-2 text-slate-700">
        30 soruluk adım adım test (Mekan, Bütçe, Zaman, Hedefler) burada ilerleyecek.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="text-xs font-semibold text-slate-600">Toplam</div>
          <div className="mt-1 text-xl font-extrabold">{QUESTIONS.length} soru</div>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="text-xs font-semibold text-slate-600">Kategoriler</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm font-semibold text-slate-800">
            <div>Mekan: {grouped[CATEGORIES.MEKAN].length}</div>
            <div>Bütçe: {grouped[CATEGORIES.BUTCE].length}</div>
            <div>Zaman: {grouped[CATEGORIES.ZAMAN].length}</div>
            <div>Hedefler: {grouped[CATEGORIES.HEDEFLER].length}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link to="/e2-sonuc">
          <Button>Puanlama Sonucunu Gor</Button>
        </Link>

        <Button
          variant={user?.onboardingCompleted ? 'secondary' : 'primary'}
          type="button"
          onClick={completeOnboarding}
          disabled={Boolean(user?.onboardingCompleted)}
        >
          {user?.onboardingCompleted ? 'Onboarding Tamamlandi' : "Onboarding'i Tamamla"}
        </Button>
      </div>
    </section>
  )
}

