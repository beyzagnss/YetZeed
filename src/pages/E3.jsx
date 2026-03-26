import { useState, useEffect } from 'react'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { getTodayTasks, toggleTask as toggleTaskService, getTaskHistoryCount, addCustomTasks } from '../services/taskService'
import { getSortedIncentives, getSeedDocFeedback } from '../services/aiService'

const plantGridData = [
  { name: 'Safran', w: 5, h: 4, x: 0, y: 0 },
  { name: 'İstiridye Mantarı', w: 5, h: 4, x: 1, y: 0 },
  { name: 'Adaçayı', w: 5, h: 4, x: 2, y: 0 },
  { name: 'Kişniş', w: 5, h: 4, x: 3, y: 0 },
  { name: 'Tarhun', w: 5, h: 4, x: 4, y: 0 },
  { name: 'Reyhan', w: 5, h: 4, x: 0, y: 1 },
  { name: 'Marul', w: 5, h: 4, x: 1, y: 1 },
  { name: 'Roka', w: 5, h: 4, x: 2, y: 1 },
  { name: 'Pazı', w: 5, h: 4, x: 3, y: 1 },
  { name: 'Ispanak', w: 5, h: 4, x: 4, y: 1 },
  { name: 'Fasulye', w: 6, h: 4, x: 0, y: 2 },
  { name: 'Biber', w: 6, h: 4, x: 1, y: 2 },
  { name: 'Biberiye', w: 6, h: 4, x: 2, y: 2 },
  { name: 'Lavanta', w: 6, h: 4, x: 3, y: 2 },
  { name: 'Nane', w: 6, h: 4, x: 4, y: 2 },
  { name: 'Fesleğen', w: 6, h: 4, x: 5, y: 2 },
  { name: 'Maydanoz', w: 6, h: 4, x: 0, y: 3 },
  { name: 'Kekik', w: 6, h: 4, x: 1, y: 3 },
  { name: 'Salatalık', w: 6, h: 4, x: 2, y: 3 },
  { name: 'Domates', w: 6, h: 4, x: 3, y: 3 },
  { name: 'Çilek', w: 6, h: 4, x: 4, y: 3 },
  { name: 'Aloe Vera', w: 6, h: 4, x: 5, y: 3 }
];

const getPlantPos = (name) => {
  if (!name) return null;
  const n = name.trim().toLocaleLowerCase('tr-TR');
  return plantGridData.find(p => p.name.toLocaleLowerCase('tr-TR') === n) || null;
}

export default function E3() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [seedDocInput, setSeedDocInput] = useState('')
  const [seedDocBusy, setSeedDocBusy] = useState(false)
  const [seedDocResult, setSeedDocResult] = useState(null)
  
  const plantName = typeof user?.selectedPlant === 'object' ? user?.selectedPlant?.name : user?.selectedPlant;
  const plantStages = typeof user?.selectedPlant === 'object' ? user?.selectedPlant?.stages : { germinationDays: 14, harvestDays: 30 };

  const dayIndex = getTaskHistoryCount(user?.id) || 1

  useEffect(() => {
    if (user?.id) {
      setTasks(getTodayTasks(user.id, plantName, plantStages.germinationDays))
    }
  }, [user])

  const toggleTask = (id) => {
    if (user?.id) {
      setTasks(toggleTaskService(user.id, id))
    }
  }

  const handleSeedDoc = async () => {
    if (!seedDocInput.trim()) return;
    setSeedDocBusy(true);
    setSeedDocResult(null);
    try {
      const res = await getSeedDocFeedback(plantName, dayIndex, seedDocInput);
      setSeedDocResult(res);
      if (res.newTasks && res.newTasks.length > 0) {
        const updatedTasks = addCustomTasks(user.id, res.newTasks);
        setTasks(updatedTasks);
      }
    } catch (err) {
      setSeedDocResult({ status: 'Error', feedback: 'Bağlantı hatası oluştu, lütfen tekrar deneyin.', newTasks: [] });
    } finally {
      setSeedDocBusy(false);
    }
  };
  
  const completedCount = tasks.filter(t => t.done).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Overview Head */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Dashboard</h1>
          <p className="mt-1 text-slate-600">{plantName || 'İstiridye Mantarı'} üretiminizin {dayIndex}. Günündesiniz.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/e4">
             <Button variant="secondary" className="w-full sm:w-auto">Bütçeye Git</Button>
          </Link>
          <Button onClick={() => setDrawerOpen(!drawerOpen)} className="w-full sm:w-auto">
            ✨ AI Teşvikleri
          </Button>
        </div>
      </div>

      {/* Off-canvas Right Drawer Backdrop */}
      {drawerOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Right Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">✨ AI Teşvik Danışmanı</h2>
            <p className="mt-1 text-sm text-slate-500">Profilinize en uygun güncel hibe ve muafiyetler</p>
          </div>
          <button 
            onClick={() => setDrawerOpen(false)} 
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
             <span className="text-xl font-bold">✕</span>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {getSortedIncentives(plantName).map((inc, i) => (
             <div key={inc.id} className={`rounded-xl border ${i < 3 ? 'border-sky-200 bg-sky-50 shadow-sm' : 'border-slate-100 bg-white'} p-4`}>
               <div className="flex items-start gap-3">
                 <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${i < 3 ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-600'} text-xl`}>
                   {inc.icon}
                 </div>
                 <div>
                   <h3 className={`font-bold ${i < 3 ? 'text-sky-900' : 'text-slate-700'}`}>{inc.title}</h3>
                   <div className="flex flex-wrap gap-2 mt-1">
                     <span className="inline-block rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                       {inc.source}
                     </span>
                     {inc.tags?.includes('kadin') && (
                       <span className="inline-block rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 border border-purple-200">
                         ✨ Kadın Girişimcilere Destek Bulunuyor
                       </span>
                     )}
                   </div>
                   <p className={`mt-2 text-sm ${i < 3 ? 'text-sky-800' : 'text-slate-500'}`}>
                     {inc.description}
                   </p>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column (Tasks) */}
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
               <h2 className="text-xl font-bold text-slate-900">Bugünkü Görevler</h2>
               <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                 {progress}% Tamamlandı
               </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                 <div
                   className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                   style={{ width: `${progress}%` }}
                 />
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <label 
                    key={task.id} 
                    className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all ${
                      task.done 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5">
                      <input 
                        type="checkbox" 
                        checked={task.done} 
                        onChange={() => toggleTask(task.id)}
                        className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${task.done ? 'line-through opacity-70' : 'text-slate-800'}`}>
                        {task.text}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{task.time}</p>
                    </div>
                  </label>
                ))}
              </div>
              
            </div>
          </div>

          {/* Seed Doc Widget */}
          <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm overflow-hidden">
            <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex items-center gap-3">
              <div className="bg-white rounded-full p-2 shadow-sm text-emerald-600 font-bold text-xl">👨‍⚕️</div>
              <div>
                 <h2 className="font-bold text-emerald-900">Seed Doc (AI Bitki Doktoru)</h2>
                 <p className="text-xs text-emerald-700">Bugünkü gözlemlerinizi yazın, analiz edip gerekli kurtarma görevlerini listenize ekleyeyim.</p>
              </div>
            </div>
            <div className="p-6">
               <textarea
                  value={seedDocInput}
                  onChange={(e) => setSeedDocInput(e.target.value)}
                  placeholder="Örneğin: 'Şapkaların üzerinde siyah lekeler oluşmaya başladı ve kötü kokuyor...'"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                  rows={3}
               />
               <div className="mt-3 flex justify-end">
                  <Button onClick={handleSeedDoc} disabled={seedDocBusy || !seedDocInput.trim()}>
                    {seedDocBusy ? 'Analiz Ediliyor...' : 'Muayene Et'}
                  </Button>
               </div>
        
               {seedDocResult && (
                 <div className={`mt-4 p-4 rounded-xl border ${seedDocResult.status === 'Healthy' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : seedDocResult.status === 'Error' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-red-50 border-red-200 text-red-900'}`}>
                   <h4 className="font-bold text-sm mb-1">{seedDocResult.status === 'Healthy' ? '✅ Bitkiniz Sağlıklı' : seedDocResult.status === 'Attention' ? '⚠️ Acil Durum Tespiti' : '❌ Hata'}</h4>
                   <p className="text-sm font-medium">{seedDocResult.feedback}</p>
                   {seedDocResult.newTasks?.length > 0 && (
                     <div className="mt-3 pt-3 border-t border-red-200/30">
                       <p className="text-xs font-bold mb-2">Seed Doc Listeye Acil Görevler Ekledi:</p>
                       <ul className="list-disc pl-4 text-xs font-semibold space-y-1">
                         {seedDocResult.newTasks.map((t, idx) => <li key={idx}>{t}</li>)}
                       </ul>
                     </div>
                   )}
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Right Column (Status) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Bitki Durumu</h2>
            
            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-8 border-emerald-100 bg-white">
                {dayIndex <= plantStages.germinationDays ? (
                  <span className="text-5xl">🌱</span>
                ) : getPlantPos(plantName) ? (
                  <div className="absolute inset-0">
                    <img 
                      src="/plants-grid.jpg" 
                      alt={plantName}
                      className="absolute max-w-none"
                      style={{
                        width: `${getPlantPos(plantName).w * 135}%`,
                        height: `${getPlantPos(plantName).h * 135}%`,
                        left: '-17.5%',
                        top: '-32%',
                        transform: `translate(-${getPlantPos(plantName).x * (100 / getPlantPos(plantName).w)}%, -${getPlantPos(plantName).y * (100 / getPlantPos(plantName).h)}%)`,
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-5xl">{((plantName || '').toLowerCase().includes('mantar') ? '🍄' : '🌿')}</span>
                )}
              </div>
              <p className="mt-4 font-bold text-slate-700">Hasata Son {Math.max(0, plantStages.harvestDays - dayIndex)} Gün</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <div className="font-bold text-slate-800">Çimlenme</div>
                <div className="mt-1 text-xs text-slate-500">Tamamlandı</div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="font-bold text-emerald-800">Gelişim</div>
                <div className="mt-1 text-xs text-emerald-600">Devam Ediyor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


