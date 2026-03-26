import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { getPlantRecommendations, getPlantBiologicalProfile } from '../services/aiService'
import { useAuth } from '../auth/AuthContext'

export default function E2Result() {
  const { user, completeOnboarding, saveUserPlant } = useAuth()
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAI() {
      try {
        const stored = localStorage.getItem(`yetzeed_answers_${user?.id || 'guest'}`)
        const answers = stored ? JSON.parse(stored) : {}
        
        const data = await getPlantRecommendations(answers)
        setRecommendations(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError(err.message)
        setLoading(false)
      }
    }
    
    fetchAI()
  }, [user])

  const handleSelectPlant = async (item) => {
    setLoading(true) // Turn on loading overlay during biological profiling
    try {
      const stages = await getPlantBiologicalProfile(item.name)
      await saveUserPlant({ name: item.name, stages })
      await completeOnboarding()
      navigate('/e3')
    } catch (err) {
      console.error(err)
      // Fallback
      await saveUserPlant({ name: item.name, stages: { germinationDays: 14, harvestDays: 30 } })
      await completeOnboarding()
      navigate('/e3')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 animate-spin text-emerald-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">Yapay Zeka Mekanınızı Analiz Ediyor...</h2>
        <p className="mt-2 text-slate-500">Mekanınıza, bütçenize ve zamanınıza özel en ideal tarım ürünleri hesaplanıyor.</p>
      </div>
    )
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <h1 className="text-xl font-bold text-red-900">Bir Hata Oluştu</h1>
        <p className="mt-2 text-red-700">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>Tekrar Dene</Button>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-emerald-900 md:text-3xl">İşte Size Özel En Uygun 3 Ürün!</h1>
        <p className="mt-2 text-emerald-700">
          Verdiğiniz cevaplara göre yapay zeka (Gemini AI) tarafından özenle seçilmiş dikey tarım tavsiyeleri.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {recommendations?.map((item, idx) => (
          <div key={idx} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h3 className="text-xl font-extrabold text-slate-900">{item.name}</h3>
            
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2 text-center text-emerald-800">
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70">Beklenen Kâr</span>
                <span className="font-bold">{item.profitability}</span>
              </div>
              <div className="rounded-xl border border-orange-100 bg-orange-50 p-2 text-center text-orange-800">
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70">Bakım Zorluğu</span>
                <span className="font-bold">{item.difficulty}</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tahmini Bütçe</span>
              <p className="text-lg font-bold text-slate-900">{item.cost}</p>
            </div>

            <div className="mt-4 flex-grow border-t border-slate-100 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Neden Bu Ürün?</span>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.reason}</p>
            </div>

            <Button className="mt-6 w-full" onClick={() => handleSelectPlant(item)}>
              Yetiştirmeye Başla
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

