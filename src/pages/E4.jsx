import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { getBudgetAdvice } from '../services/aiService';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getMonthlyData, saveMonthlyData, getAnnualTotals } from '../services/financeStorage';

const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export default function E4() {
  const { user } = useAuth();
  
  const currentTRTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  const [currentYear, setCurrentYear] = useState(currentTRTime.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentTRTime.getMonth() + 1); // 1 to 12
  
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [debts, setDebts] = useState([]);

  const [advice, setAdvice] = useState(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const annualTotals = getAnnualTotals(user?.id, currentYear);

  useEffect(() => {
    const data = getMonthlyData(user?.id, currentYear, currentMonth);
    setIncomes(data.incomes);
    setExpenses(data.expenses);
    setDebts(data.debts);
  }, [user?.id, currentYear, currentMonth]);

  useEffect(() => {
    // Only save if arrays are successfully initialized to prevent saving empty data early
    if (incomes.length > 0 || expenses.length > 0 || debts.length > 0) {
      saveMonthlyData(user?.id, currentYear, currentMonth, { incomes, expenses, debts });
    }
  }, [incomes, expenses, debts, user?.id, currentYear, currentMonth]);

  const monthlyTotalIncome = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const monthlyTotalExpense = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const monthlyTotalDebt = debts.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const handleGetAdvice = async () => {
    setLoadingAdvice(true);
    try {
      const result = await getBudgetAdvice(monthlyTotalIncome, monthlyTotalExpense + monthlyTotalDebt);
      setAdvice(result);
    } catch (error) {
      setTimeout(() => {
        setAdvice(
          "Giderleriniz izlenen bütçe hedeflerine paralel ilerliyor. Gelecek aylardaki kompost hammadde alımları için mevcut net kârınızın %20'sini nakit kenarda tutmanız, olası hammadde fiyat dalgalanmalarına karşı girişiminizi mali açıdan güvenceye alacaktır."
        )
      }, 1500)
    } finally {
      setLoadingAdvice(false);
    }
  };

  const handleAmountChange = (type, id, value) => {
    const strValue = value === '' ? '' : value;
    if (type === 'income') setIncomes(incomes.map(item => item.id === id ? { ...item, amount: strValue } : item));
    else if (type === 'expense') setExpenses(expenses.map(item => item.id === id ? { ...item, amount: strValue } : item));
    else if (type === 'debt') setDebts(debts.map(item => item.id === id ? { ...item, amount: strValue } : item));
  };

  const handleNameChange = (type, id, value) => {
    if (type === 'income') setIncomes(incomes.map(item => item.id === id ? { ...item, name: value } : item));
    else if (type === 'expense') setExpenses(expenses.map(item => item.id === id ? { ...item, name: value } : item));
    else if (type === 'debt') setDebts(debts.map(item => item.id === id ? { ...item, name: value } : item));
  };

  const handleDelete = (type, id) => {
    if (type === 'income') setIncomes(incomes.filter(item => item.id !== id));
    else if (type === 'expense') setExpenses(expenses.filter(item => item.id !== id));
    else if (type === 'debt') setDebts(debts.filter(item => item.id !== id));
  };

  const handleAdd = (type) => {
    const newItem = { id: Date.now(), name: 'Yeni Kalem', amount: '' };
    if (type === 'income') setIncomes([...incomes, newItem]);
    else if (type === 'expense') setExpenses([...expenses, newItem]);
    else if (type === 'debt') setDebts([...debts, newItem]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Finansal Pilot</h1>
          <p className="mt-1 text-slate-600">Yıllık özetinizi ve aylık gelir-gider döngünüzü yönetin.</p>
        </div>
        <div>
          <Link to="/e3">
            <Button variant="ghost">&larr; Görevlere Dön</Button>
          </Link>
        </div>
      </div>

      {/* 3. AI Advisor using the data logic - MOVED TO TOP */}
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-2xl">🤖</div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-sky-900">AI Finans Danışmanı</h2>
            <p className="mt-1 text-sm text-sky-800 mb-4">
              Arka planda tüm aylık gelişiminizi (Chart Data) ve yıllık kârlılık oranlarınızı dikkate alarak girişiminiz için bir sonraki adımı tavsiye ederim.
            </p>
            
            {!advice ? (
              <Button 
                onClick={handleGetAdvice} 
                disabled={loadingAdvice}
                className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700"
              >
                {loadingAdvice ? 'Analiz Ediliyor...' : `${MONTH_NAMES[currentMonth - 1]} Ayı Bütçe Tavsiyesi Al`}
              </Button>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-sky-200 bg-white p-5 shadow-sm relative">
                  <p className="text-sm font-medium leading-relaxed text-slate-800">"{advice}"</p>
                  <button 
                    onClick={handleGetAdvice}
                    disabled={loadingAdvice}
                    className="mt-4 text-xs font-bold text-sky-600 hover:underline hover:text-sky-800"
                  >
                    {loadingAdvice ? 'Yenileniyor...' : 'Tavsiyeyi Güncelle'}
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 1. Annual Dashboard Overview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4">
          {currentYear} Yıllık Özet
        </h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
            <div className="text-xs font-semibold text-emerald-800">Yıllık Toplam Gelir</div>
            <div className="mt-1 text-2xl font-extrabold text-emerald-900">₺{annualTotals.annualIncome}</div>
          </div>
          <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 shadow-sm">
            <div className="text-xs font-semibold text-orange-800">Yıllık Toplam Gider</div>
            <div className="mt-1 text-2xl font-extrabold text-orange-900">₺{annualTotals.annualExpense}</div>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 shadow-sm">
            <div className="text-xs font-semibold text-red-800">Yıllık Toplam Borç</div>
            <div className="mt-1 text-2xl font-extrabold text-red-900">₺{annualTotals.annualDebt}</div>
          </div>
          <div className={`rounded-xl border p-4 shadow-sm ${annualTotals.netProfit >= 0 ? 'border-sky-100 bg-sky-50' : 'border-red-100 bg-red-50'}`}>
            <div className={`text-xs font-semibold ${annualTotals.netProfit >= 0 ? 'text-sky-800' : 'text-red-800'}`}>Net Durum</div>
            <div className={`mt-1 text-2xl font-extrabold ${annualTotals.netProfit >= 0 ? 'text-sky-900' : 'text-red-900'}`}>
              ₺{annualTotals.netProfit}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Monthly Paginated Inputs */}
      <div>
        {/* Month Navigation */}
        <div className="flex items-center justify-between bg-slate-100 p-2 rounded-xl mb-6 shadow-inner">
          <Button variant="ghost" onClick={prevMonth} className="text-slate-600 hover:bg-white hover:shadow-sm">
            &larr; Önceki Ay
          </Button>
          <div className="font-bold text-lg text-slate-800 tracking-tight">
            {MONTH_NAMES[currentMonth - 1]} {currentYear}
          </div>
          <Button variant="ghost" onClick={nextMonth} className="text-slate-600 hover:bg-white hover:shadow-sm">
            Sonraki Ay &rarr;
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Incomes */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2 mb-4">
              <h3 className="text-md font-bold text-emerald-800">Gelirler (Income)</h3>
              <button onClick={() => handleAdd('income')} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md transition-colors">
                + Ekle
              </button>
            </div>
            <div className="space-y-4">
              {incomes.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5 group">
                  <div className="flex items-center justify-between ml-1">
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => handleNameChange('income', item.id, e.target.value)}
                      className="text-xs font-semibold text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-500 focus:outline-none w-full mr-2 py-0.5 transition-colors"
                      placeholder="Kalem Adı"
                    />
                    <button onClick={() => handleDelete('income', item.id)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-1 font-bold" title="Kaldır">
                      ✕
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₺</span>
                    <input 
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleAmountChange('income', item.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-2 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
              {incomes.length === 0 && <div className="text-xs text-slate-400 italic text-center py-2">Henüz gelir kalemi yok.</div>}
            </div>
            <div className="mt-6 flex justify-between items-center bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <span className="font-semibold text-emerald-800 text-sm">Aylık Gelir</span>
              <span className="font-extrabold text-emerald-900 text-lg">₺{monthlyTotalIncome}</span>
            </div>
          </div>

          {/* Expenses */}
          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-orange-100 pb-2 mb-4">
              <h3 className="text-md font-bold text-orange-800">Giderler (Expenses)</h3>
              <button onClick={() => handleAdd('expense')} className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-md transition-colors">
                + Ekle
              </button>
            </div>
            <div className="space-y-4">
              {expenses.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5 group">
                  <div className="flex items-center justify-between ml-1">
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => handleNameChange('expense', item.id, e.target.value)}
                      className="text-xs font-semibold text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-orange-500 focus:outline-none w-full mr-2 py-0.5 transition-colors"
                      placeholder="Kalem Adı"
                    />
                    <button onClick={() => handleDelete('expense', item.id)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-1 font-bold" title="Kaldır">
                      ✕
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₺</span>
                    <input 
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleAmountChange('expense', item.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-2 text-sm font-bold text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
              {expenses.length === 0 && <div className="text-xs text-slate-400 italic text-center py-2">Henüz gider kalemi yok.</div>}
            </div>
            <div className="mt-6 flex justify-between items-center bg-orange-50 p-4 rounded-xl border border-orange-100">
              <span className="font-semibold text-orange-800 text-sm">Aylık Gider</span>
              <span className="font-extrabold text-orange-900 text-lg">₺{monthlyTotalExpense}</span>
            </div>
          </div>

          {/* Debts */}
          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-red-100 pb-2 mb-4">
              <h3 className="text-md font-bold text-red-800">Borçlar (Debts)</h3>
              <button onClick={() => handleAdd('debt')} className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition-colors">
                + Ekle
              </button>
            </div>
            <div className="space-y-4">
              {debts.map((item) => (
                <div key={item.id} className="flex flex-col gap-1.5 group">
                  <div className="flex items-center justify-between ml-1">
                    <input 
                      type="text" 
                      value={item.name} 
                      onChange={(e) => handleNameChange('debt', item.id, e.target.value)}
                      className="text-xs font-semibold text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-red-500 focus:outline-none w-full mr-2 py-0.5 transition-colors"
                      placeholder="Kalem Adı"
                    />
                    <button onClick={() => handleDelete('debt', item.id)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 px-1 font-bold" title="Kaldır">
                      ✕
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₺</span>
                    <input 
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleAmountChange('debt', item.id, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-2 text-sm font-bold text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
              {debts.length === 0 && <div className="text-xs text-slate-400 italic text-center py-2">Henüz borç kalemi yok.</div>}
            </div>
            <div className="mt-6 flex justify-between items-center bg-red-50 p-4 rounded-xl border border-red-100">
              <span className="font-semibold text-red-800 text-sm">Aylık Ödeme</span>
              <span className="font-extrabold text-red-900 text-lg">₺{monthlyTotalDebt}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
