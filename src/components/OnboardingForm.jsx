import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { QUESTIONS } from '../onboarding/questions'
import Button from './ui/Button'

export default function OnboardingForm() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const { completeOnboarding } = useAuth()
  const navigate = useNavigate()

  const q = QUESTIONS[currentIndex]
  const isFirst = currentIndex === 0
  const isLast = currentIndex === QUESTIONS.length - 1
  const progress = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)

  const handleAnswer = (val) => {
    setAnswers({ ...answers, [q.id]: val })
  }

  const handleMultiAnswer = (val) => {
    const current = (answers[q.id] || [])
    if (current.includes(val)) {
      setAnswers({ ...answers, [q.id]: current.filter((x) => x !== val) })
    } else {
      setAnswers({ ...answers, [q.id]: [...current, val] })
    }
  }

  const canProceed = () => {
    if (!q.required) return true
    const ans = answers[q.id]
    if (q.type === 'multi') return ans && ans.length > 0
    if (q.type === 'boolean') return ans !== undefined
    return ans !== undefined && ans !== ''
  }

  const onNext = () => {
    if (!canProceed()) return
    if (isLast) {
      localStorage.setItem(`yetzeed_answers_${user?.id || 'guest'}`, JSON.stringify(answers))
      // Removed completeOnboarding() here. We'll do it in E2Result when they pick a plant.
      navigate('/e2-sonuc')
    } else {
      setCurrentIndex((p) => p + 1)
    }
  }

  const onPrev = () => {
    if (!isFirst) setCurrentIndex((p) => p - 1)
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-medium text-slate-500">
          <span className="uppercase tracking-wider">Adım {currentIndex + 1} / {QUESTIONS.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 min-h-[200px]">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
          {q.category}
        </div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{q.title}</h2>
        {q.description && <p className="mt-2 text-sm text-slate-600">{q.description}</p>}

        <div className="mt-6 flex flex-col gap-3">
          {q.type === 'single' &&
            q.options?.map((opt) => {
              const selected = answers[q.id] === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`font-medium ${selected ? 'text-emerald-900' : 'text-slate-700'}`}>
                    {opt.label}
                  </span>
                  {selected && (
                    <div className="h-4 w-4 rounded-full border-4 border-emerald-500" />
                  )}
                </button>
              )
            })}

          {q.type === 'multi' &&
            q.options?.map((opt) => {
              const selected = (answers[q.id] || []).includes(opt.value)
              return (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer select-none items-center gap-3 rounded-xl border p-4 transition-all ${
                    selected
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    checked={selected}
                    onChange={() => handleMultiAnswer(opt.value)}
                  />
                  <span className={`font-medium ${selected ? 'text-emerald-900' : 'text-slate-700'}`}>
                    {opt.label}
                  </span>
                </label>
              )
            })}

          {q.type === 'boolean' && (
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className={`flex-1 rounded-xl border p-4 text-center font-medium transition-all ${
                  answers[q.id] === true
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Evet
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className={`flex-1 rounded-xl border p-4 text-center font-medium transition-all ${
                  answers[q.id] === false
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Hayır
              </button>
            </div>
          )}

          {q.type === 'number' && (
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={q.meta?.min}
                max={q.meta?.max}
                step={q.meta?.step}
                value={answers[q.id] || ''}
                onChange={(e) => handleAnswer(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 p-4 text-lg font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:w-1/2"
                placeholder="Miktar"
              />
              {q.meta?.unit && <span className="font-semibold text-slate-500">{q.meta.unit}</span>}
            </div>
          )}

          {q.type === 'text' && (
            <textarea
              rows={3}
              value={answers[q.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Cevabınız..."
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-6">
        <Button variant="ghost" onClick={onPrev} disabled={isFirst} className="px-6">
          Geri
        </Button>
        <Button onClick={onNext} disabled={!canProceed()} className="min-w-[120px]">
          {isLast ? 'Analizi Başlat' : 'Sonraki'}
        </Button>
      </div>
    </div>
  )
}
