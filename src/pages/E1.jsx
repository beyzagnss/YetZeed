import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../auth/AuthContext'

export default function E1() {
  const { isAuthed } = useAuth()

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-slate-50 p-5 shadow-sm sm:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl"
      />

      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm ring-1 ring-emerald-200">
            <span aria-hidden="true">*</span>
            AI destekli dikey tarım rehberi
          </p>

          <h1 id="hero-title" className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Boş alanını üretkenliğe çevir.
          </h1>

          <p className="mt-3 text-slate-700">
            YetZeed; ışık, alan ve zamanına göre safran ve mantar gibi yüksek değerli ürünler için
            günlük görevleri planlar. Hibe süreçlerini de daha anlaşılır hale getirir.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to={isAuthed ? '/e2' : '/auth'} className="inline-flex">
              <Button className="w-full sm:w-auto">
                {isAuthed ? 'Onboarding’e Başla' : 'Hemen Başla'}
              </Button>
            </Link>
            <Link to="/e2-sonuc" className="inline-flex">
              <Button variant="ghost" className="w-full sm:w-auto">
                Önizleme Gör
              </Button>
            </Link>
          </div>

          <ul className="mt-7 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
            <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-slate-200">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white">
                1
              </span>
              30 soruluk akıllı test ile kişisel plan
            </li>
            <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-slate-200">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-sky-600 text-white">
                2
              </span>
              AI ile “en uygun 3 ürün” önerisi
            </li>
            <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-slate-200">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white">
                3
              </span>
              Günlük sulama/gübreleme görev takvimi
            </li>
            <li className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-slate-200">
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-sky-600 text-white">
                4
              </span>
              KOSGEB/TKDK bilgi ve yol haritası
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-slate-200 backdrop-blur sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">Mini Prototip</div>
              <div className="text-xs font-semibold text-emerald-700">MVP</div>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <div>
                  <div className="text-sm font-bold text-slate-900">Bugün planın</div>
                  <div className="text-xs text-slate-600">Esnek takvim ile</div>
                </div>
                <div className="rounded-2xl bg-emerald-600 px-3 py-2 text-sm font-bold text-white">
                  3 görev
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-semibold text-slate-600">Öneri</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">En uygun 3 ürün</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-xs font-semibold text-slate-600">Teşvik</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">Hibe yol haritası</div>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-3xl bg-emerald-600/10 blur-sm"
          />
        </div>
      </div>
    </section>
  )
}

