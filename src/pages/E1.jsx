import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../auth/AuthContext'

export default function E1() {
  const { isAuthed } = useAuth()

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#fcfaf4] p-5 shadow-sm ring-1 ring-slate-100 sm:p-8 min-h-[70vh] flex items-center max-w-6xl mx-auto">
      {/* Background Blobs (scaled down slightly using container clipping) */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <div 
          className="absolute -top-10 -left-10 w-[20rem] h-[20rem] mix-blend-multiply opacity-50 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#a4d4b4', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
        />
        <div 
          className="absolute top-10 right-0 w-[24rem] h-[26rem] mix-blend-multiply opacity-40 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#cdb4db', borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%' }}
        />
        <div 
          className="absolute -bottom-20 left-1/4 w-[28rem] h-[24rem] mix-blend-multiply opacity-30 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#e1ecd1', borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
        />
        <div 
          className="absolute bottom-0 -right-10 w-[20rem] h-[20rem] mix-blend-multiply opacity-40 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#7bcf92', borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%' }}
        />
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 shadow-sm ring-1 ring-emerald-200/60">
            <span aria-hidden="true">🌱</span>
            AI Destekli Dikey Tarım Rehberi
          </p>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl text-emerald-950 leading-tight">
            YetZeed'e Hoş Geldin, <br />
            <span className="text-emerald-600 block mt-1">Let's Seed! 🌿</span>
          </h1>

          <p className="mt-4 text-base text-emerald-900/70 font-semibold max-w-xl leading-relaxed">
            Evinizdeki atıl alanları birer kazanç merkezine dönüştürmeye hazır mısın? YetZeed ile safran, mantar ve yüksek değerli bitkileri yetiştirmek artık teknik bir bilmece değil, karlı bir girişim.
          </p>

          {/* Button is moved immediately below the intro text for quick accessibility */}
          <div className="mt-5 flex items-center">
            <Link to={isAuthed ? '/e2' : '/auth'} className="inline-flex w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 text-base px-6 py-3 font-bold rounded-xl transition-all">
                {isAuthed ? 'Tarıma Başla' : 'Hemen Başla'}
              </Button>
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="font-bold text-emerald-950 text-lg ml-1">Neler Yapabilirsin?</h3>
            <ul className="grid gap-3 text-emerald-900/80 lg:pr-8">
              <li className="flex items-start gap-3 rounded-xl bg-white/50 backdrop-blur-md p-3.5 ring-1 ring-white shadow-[0_4px_12px_rgba(16,185,129,0.03)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.06)] transition-all">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 text-sm shadow-sm ring-1 ring-emerald-100">💡</span>
                <div>
                  <strong className="text-emerald-950 font-bold block text-[13px] mb-0.5">Alan Analizi</strong>
                  <span className="leading-snug block text-xs">Odanın veya balkonun potansiyelini AI ile keşfedebilir, en karlı ürünü saniyeler içinde belirleyebilirsin.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white/50 backdrop-blur-md p-3.5 ring-1 ring-white shadow-[0_4px_12px_rgba(16,185,129,0.03)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.06)] transition-all">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-sky-50 text-sky-700 text-sm shadow-sm ring-1 ring-sky-100">⏱️</span>
                <div>
                  <strong className="text-emerald-950 font-bold block text-[13px] mb-0.5">Kişiselleştirilmiş Takip</strong>
                  <span className="leading-snug block text-xs">Sulama/gübreleme rutinlerini senin planına, iş saatlerine ve ebeveynlik takvimine göre AI ile optimize edebilirsin.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white/50 backdrop-blur-md p-3.5 ring-1 ring-white shadow-[0_4px_12px_rgba(16,185,129,0.03)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.06)] transition-all">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700 text-sm shadow-sm ring-1 ring-amber-100">📈</span>
                <div>
                  <strong className="text-emerald-950 font-bold block text-[13px] mb-0.5">Finansal Rehberlik</strong>
                  <span className="leading-snug block text-xs">KOSGEB ve TKDK hibe programlarını görüp; bütçeni ve kâr projeksiyonunu bir profesyonel gibi yönetebilirsin.</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="mt-6 max-w-xl sm:pl-1">
            <p className="text-xs font-semibold italic leading-relaxed text-emerald-900/70 border-l-2 border-emerald-300 pl-3 py-0.5">
              YetZeed’in AI sistemiyle hiçbir sorun çözümsüz kalmayacak. Teknolojinin gücüyle filizlenmek için bekleme.
              <span className="block mt-1 font-bold not-italic text-emerald-800">E hadi ne duruyorsun? Let’s Seed!</span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 relative h-full flex flex-col justify-center mt-8 lg:mt-0">
          {/* Kadın Girişimci Paneli (Purple) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#fcf7ff] to-[#f4ebfa] p-6 sm:p-7 shadow-[0_12px_30px_-10px_rgba(147,51,234,0.12)] ring-1 ring-purple-200/50 backdrop-blur-xl overflow-hidden group hover:shadow-[0_15px_30px_-8px_rgba(147,51,234,0.2)] transition-all">
            
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-300/30 rounded-full blur-xl pointer-events-none" />

            {/* Removed Emoji from text below -> "Güçlü Kadınlar İçin" */}
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-700 ring-1 ring-purple-200/80 shadow-sm">
              Güçlü Kadınlar İçin
            </div>

            <p className="text-base font-extrabold text-purple-950/90 leading-snug mb-6 relative">
              YetZeed, anne ve iş hayatı arasında mekik dokuyan güçlü kadınların en büyük yol arkadaşı!
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm ring-1 ring-purple-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-xs font-medium leading-relaxed text-purple-900/80 mt-0.5">
                  <strong className="text-purple-950 font-bold block mb-0.5 text-[13px]">AI Esnek Planlayıcı</strong> 
                  Üretim rutinlerini bebek uyku saatlerine veya iş takviminize optimize ederek görünmez emek yükünüzü hafifletir.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-fuchsia-600 shadow-sm ring-1 ring-purple-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-xs font-medium leading-relaxed text-purple-900/80 mt-0.5">
                  <strong className="text-purple-950 font-bold block mb-0.5 text-[13px]">Finansal Pilot</strong> 
                  KOSGEB/TKDK’nın kadınlara özel teşviklerini filtreleyerek girişiminize özel iş planı sunar.
                </p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  )
}

