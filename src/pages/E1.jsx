import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../auth/AuthContext'

export default function E1() {
  const { isAuthed } = useAuth()

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#fcfaf4] p-6 shadow-sm ring-1 ring-slate-100 sm:p-10 min-h-[85vh] flex items-center">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <div 
          className="absolute -top-20 -left-20 w-[24rem] h-[24rem] mix-blend-multiply opacity-50 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#a4d4b4', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
        />
        <div 
          className="absolute top-20 right-0 w-[28rem] h-[30rem] mix-blend-multiply opacity-40 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#cdb4db', borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%' }}
        />
        <div 
          className="absolute -bottom-32 left-1/4 w-[35rem] h-[30rem] mix-blend-multiply opacity-30 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#e1ecd1', borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
        />
        <div 
          className="absolute bottom-5 -right-20 w-[24rem] h-[24rem] mix-blend-multiply opacity-40 blur-3xl transition-all duration-1000"
          style={{ backgroundColor: '#7bcf92', borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%' }}
        />
      </div>

      <div className="relative z-10 grid gap-12 lg:grid-cols-5 lg:items-center">
        <div className="lg:col-span-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-emerald-800 shadow-sm ring-1 ring-emerald-200/60">
            <span aria-hidden="true">🌱</span>
            AI Destekli Dikey Tarım Rehberi
          </p>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem] text-emerald-950 leading-[1.1]">
            YetZeed'e Hoş Geldin, <br />
            <span className="text-emerald-600 block mt-2">Let's Seed! 🌿</span>
          </h1>

          <p className="mt-6 text-lg text-emerald-900/70 font-semibold max-w-2xl leading-relaxed">
            Evinizdeki atıl alanları birer kazanç merkezine dönüştürmeye hazır mısın? YetZeed ile safran, mantar ve yüksek değerli bitkileri yetiştirmek artık teknik bir bilmece değil, karlı bir girişim.
          </p>

          <div className="mt-10 space-y-5">
            <h3 className="font-extrabold text-emerald-950 text-xl ml-1">Neler Yapabilirsin?</h3>
            <ul className="grid gap-4 text-emerald-900/80 lg:pr-12">
              <li className="flex items-start gap-4 rounded-2xl bg-white/50 backdrop-blur-md p-5 ring-1 ring-white shadow-[0_8px_20px_rgba(16,185,129,0.04)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.08)] transition-all">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 text-lg shadow-sm ring-1 ring-emerald-100">💡</span>
                <div>
                  <strong className="text-emerald-950 font-bold block mb-1 text-[1.05rem]">Alan Analizi</strong>
                  <span className="leading-relaxed block text-sm">Odanın veya balkonun potansiyelini AI ile keşfedebilir, en karlı ürünü saniyeler içinde belirleyebilirsin.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl bg-white/50 backdrop-blur-md p-5 ring-1 ring-white shadow-[0_8px_20px_rgba(16,185,129,0.04)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.08)] transition-all">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-sky-50 text-sky-700 text-lg shadow-sm ring-1 ring-sky-100">⏱️</span>
                <div>
                  <strong className="text-emerald-950 font-bold block mb-1 text-[1.05rem]">Kişiselleştirilmiş Takip</strong>
                  <span className="leading-relaxed block text-sm">Sulama, gübreleme ve hasat rutinlerini; senin günlük planına, iş saatlerine ve ebeveynlik takvimine göre AI ile optimize edebilirsin.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl bg-white/50 backdrop-blur-md p-5 ring-1 ring-white shadow-[0_8px_20px_rgba(16,185,129,0.04)] hover:shadow-[0_8px_20px_rgba(16,185,129,0.08)] transition-all">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-700 text-lg shadow-sm ring-1 ring-amber-100">📈</span>
                <div>
                  <strong className="text-emerald-950 font-bold block mb-1 text-[1.05rem]">Finansal Rehberlik</strong>
                  <span className="leading-relaxed block text-sm">KOSGEB ve TKDK hibe programlarından sana uygun olanları anında görebilir, bütçeni ve kâr projeksiyonunu bir profesyonel gibi yönetebilirsin.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-10 max-w-2xl sm:pl-2">
            <p className="text-sm font-semibold italic leading-relaxed text-emerald-900/70 border-l-4 border-emerald-300 pl-4 py-1">
              YetZeed’in AI entegre sistemiyle hiçbir sorun çözümsüz, hiçbir sorun cevapsız kalmayacak. Teknolojinin gücüyle filizlenmek ve ekonomik bağımsızlığını yeşertmek için daha fazla bekleme.
              <span className="block mt-2 font-black not-italic text-emerald-800 text-base">E hadi ne duruyorsun? Let’s Seed!</span>
            </p>
          </div>

          <div className="mt-10 flex items-center">
            <Link to={isAuthed ? '/e2' : '/auth'} className="inline-flex w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/30 text-lg px-10 py-4 font-extrabold rounded-2xl">
                {isAuthed ? 'Tarıma Başla' : 'Hemen Başla'}
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 relative h-full flex flex-col justify-center mt-12 lg:mt-0">
          {/* Kadın Girişimci Paneli (Purple) */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#fcf7ff] to-[#f4ebfa] p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(147,51,234,0.15)] ring-1 ring-purple-200/50 backdrop-blur-xl group hover:shadow-[0_20px_40px_-10px_rgba(147,51,234,0.25)] transition-all duration-500 overflow-hidden">
            
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-300/30 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-300/50 transition-colors" />

            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700 ring-1 ring-purple-200/80 shadow-sm">
              <span className="text-sm">👩‍👧‍👦</span> Güçlü Kadınlar İçin
            </div>

            <p className="text-[1.1rem] sm:text-xl font-extrabold text-purple-950/90 leading-[1.4] mb-8 relative">
              <span className="absolute -left-4 -top-3 text-4xl text-purple-300/50 font-serif">"</span>
              YetZeed, sadece bir dikey tarım rehberi değil; ebeveynlik, ev sorumlulukları ve iş hayatı arasında mekik dokuyan güçlü kadınların en büyük yol arkadaşı!
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-[0_4px_10px_rgba(147,51,234,0.08)] ring-1 ring-purple-100">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-sm font-medium leading-relaxed text-purple-900/80 mt-0.5">
                  <strong className="text-purple-950 font-bold block mb-1 text-[15px]">AI Esnek Planlayıcı</strong> 
                  Üretim rutinlerini bebek uyku saatlerine veya iş takviminize göre saniyeler içinde optimize ederek "görünmez emek" yükünüzü hafifletir.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-fuchsia-600 shadow-[0_4px_10px_rgba(147,51,234,0.08)] ring-1 ring-purple-100">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-sm font-medium leading-relaxed text-purple-900/80 mt-0.5">
                  <strong className="text-purple-950 font-bold block mb-1 text-[15px]">Finansal Pilot</strong> 
                  KOSGEB ve TKDK’nın kadınlara özel hibe ve teşviklerini filtreleyerek girişiminize özel hazır bir iş planı sunar.
                </p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  )
}

