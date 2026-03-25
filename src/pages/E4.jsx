import { useState } from 'react'
import Button from '../components/ui/Button'
import { getBudgetAdvice } from '../services/aiService'
import { Link } from 'react-router-dom'

export default function E4() {
  const [incomes, setIncomes] = useState([{ id: 1, name: 'İlk Satış (Aile)', amount: 1500 }])
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Tohum / Misel', amount: 300 },
    { id: 2, name: 'Elektrik & Su', amount: 450 },
    { id: 3, name: 'Ekipman', amount: 1200 }
  ])
  
  const [advice, setAdvice] = useState(null)
  const [loadingAdvice, setLoadingAdvice] = useState(false)

  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0)
  const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount), 0)
  const netProfit = totalIncome - totalExpense

  const handleGetAdvice = async () => {
    setLoadingAdvice(true)
    try {
      const result = await getBudgetAdvice(totalIncome, totalExpense)
      setAdvice(result)
    } catch (error) {
      setTimeout(() => {
        setAdvice(
          "Giderleriniz başlangıç için normal seviyede. İkinci el ekipman kiralama yoluna giderek kâr marjınızı artırabilir, ilk hasat kârınızı pazarlamaya ayırarak müşteri kitlenizi büyütebilirsiniz."
        )
      }, 1500)
    } finally {
      setLoadingAdvice(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Finansal Pilot</h1>
          <p className="mt-1 text-slate-600">Gelir, gider ve kârlılık durumunuzu takip edin.</p>
        </div>
        <div>
          <Link to="/e3">
            <Button variant="ghost">&larr; Görevlere Dön</Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
          <div className="text-sm font-semibold text-emerald-800">Toplam Gelir</div>
          <div className="mt-2 text-3xl font-extrabold text-emerald-900">₺{totalIncome}</div>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm">
          <div className="text-sm font-semibold text-orange-800">Toplam Gider</div>
          <div className="mt-2 text-3xl font-extrabold text-orange-900">₺{totalExpense}</div>
        </div>
        <div className={`rounded-2xl border p-6 shadow-sm ${netProfit >= 0 ? 'border-sky-100 bg-sky-50' : 'border-red-100 bg-red-50'}`}>
          <div className={`text-sm font-semibold ${netProfit >= 0 ? 'text-sky-800' : 'text-red-800'}`}>Net Durum</div>
          <div className={`mt-2 text-3xl font-extrabold ${netProfit >= 0 ? 'text-sky-900' : 'text-red-900'}`}>
            ₺{netProfit}
          </div>
        </div>
      </div>

      {/* Inputs and AI */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Giderler</h2>
              {/* Fake Add Button for MVP */}
              <button className="text-emerald-600 hover:text-emerald-700 font-bold text-xl">+</button>
            </div>
            <div className="mt-4 space-y-3">
              {expenses.map((exp) => (
                <div key={exp.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="font-medium text-slate-700">{exp.name}</span>
                  <span className="font-bold text-slate-900">₺{exp.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-2xl">🤖</div>
              <div>
                <h2 className="text-lg font-bold text-sky-900">AI Finans Danışmanı</h2>
                <p className="mt-1 text-sm text-sky-800">
                  Mevcut rakamlarınıza göre sıradaki yatırımınız veya tasarruf planınız için tavsiye alın.
                </p>
              </div>
            </div>

            <div className="mt-6">
              {!advice ? (
                <Button 
                  onClick={handleGetAdvice} 
                  disabled={loadingAdvice}
                  className="w-full bg-sky-600 hover:bg-sky-700"
                >
                  {loadingAdvice ? 'Analiz Ediliyor...' : 'Bütçem İçin Tavsiye Al'}
                </Button>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-sky-200 bg-white p-4 shadow-sm relative">
                   <p className="text-sm font-medium leading-relaxed text-slate-800">"{advice}"</p>
                   <button 
                     onClick={handleGetAdvice}
                     disabled={loadingAdvice}
                     className="mt-3 text-xs font-bold text-sky-600 underline"
                   >
                     {loadingAdvice ? 'Yenileniyor...' : 'Yeni Tavsiye İste'}
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


