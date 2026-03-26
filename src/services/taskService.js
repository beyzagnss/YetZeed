import { getAllTasks, saveAllTasks } from './taskStorage'

// Helper to get formatted date string (YYYY-MM-DD)
function getTodayDateString() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getStoredTasksForUser(userId) {
  const data = getAllTasks()
  return data[userId] || {}
}

function saveStoredTasksForUser(userId, userTasks) {
  const data = getAllTasks()
  data[userId] = userTasks
  saveAllTasks(data)
}

// Plant-specific germination profile data
const PLANT_GERMINATION_PROFILES = {
  mantar: {
    pot: 'Özel mantar kompost poşeti veya 5-10 litre derin plastik kutu',
    soil: 'Buğday/kavaf saman bazlı özel mantar kompostu (misel aşılanmış)',
    depth: 'Tohumlamaya gerek yok; misel kompost içine karıştırılır',
    equipment: ['Mantar kompostü', 'Plastik poşet/kutu', 'Sisleme şişesi', 'Termometre', 'Nem ölçer'],
    season: 'Tüm yıl (12–24°C arasında)',
    tempRange: '15–24°C',
    waterPerSession: '50–80 ml sisleme (doğrudan kompost değil, çevre)',
    germinationDays: 14,
    sunHours: '0 saat (karanlık ortam) → miseller yerleştikten sonra 600–800 lux günlük',
    checkFrequency: 'Her süreçte günde 2 kez kontrol',
    healthyLook: 'Beyaz ipliksi ağlar (miseller) kompostu sarmaya başlıyor, kokusu toprak gibi/hafif mantar gibi olmalı',
    warnings: ['Yeşil, siyah küf rekabeti → anında o bölgeyi komposttan ayır', 'Doğrudan su temas ettirme (küf riski)', 'CO2 birikmemesi için günlük havalandırma şart'],
    steps: ['Steril poşeti hazırla', 'Kompostu içine dök', 'Ağzını bağla ve karanlık ortama koy', '18–24°C\'de tutmaya başla', 'Günlük gözlem için ışık tut, sonra karanlığa geri al']
  },
  safran: {
    pot: '20–30 cm derinliğinde, iyi drene eden saksı (en az 30 cm çap)',
    soil: 'Hafif kumlu, çürük yapraklı, pH 5.5–6.5 iyi süzülürlü toprak',
    depth: 'Soğan dip kısmı aşağı gelecek şekilde 10–12 cm derinliğe',
    equipment: ['Safran soğanı', 'Kumlu bahçe toprağı', 'pH test cihazı', 'Cımbız (hasat için)', 'Termometre'],
    season: 'Ekim ayı (Eylül–Kasım)',
    tempRange: '15–22°C (çiçeklenme için)',
    waterPerSession: '100–150 ml haftada 2 kez, asla göl oluşturma',
    germinationDays: 21,
    sunHours: '6–8 saat güneş veya eşdeğer tam spektrum ışık',
    checkFrequency: '2 günde bir kontrol',
    healthyLook: 'İlk 7–10 günde toprak yüzeyinden ince, koyu yeşil yaprak filizi görünmeli. 21. günde yapraklar 8–10 cm boya ulaşmalı',
    warnings: ['Aşırı sulama → soğan çürümesi', 'Doğrudan yoğun güneş → yaprak yanması', 'Toprak pH\'ı 7 üzerine çıkarsa gelişim durur'],
    steps: ['Toprağı saksıya dök ve hafif ıslatılan toprak hazırla', 'Soğanları 10 cm aralıklarla dip kısım aşağı yerleştir', '10–12 cm toprak örtüyle kapat', 'Saksıyı güneşli fakat serin yere koy', 'İlk 3 haftada fazla sulamadan kaçın']
  },
  fesleğen: {
    pot: '15–20 cm derinliğinde saksı (kökler yayılır, 6–8 adet bitki için 40 cm çaplı)',
    soil: 'Hafif, organik maddeli, peat veya perlit karışımı, pH 6.0–7.0',
    depth: 'Tohum yüzeye bırakılır, üzeri 0.5 cm ince toprakla örtülür',
    equipment: ['Fesleğen tohumu', 'İnce peat toprağı', 'Sisleme şişesi', 'Filtre kaplı saksı', 'Seramik ısıtıcı (soğuk mevsimlerde)'],
    season: 'İlkbahar–Yaz (Nisan–Ağustos ideal)',
    tempRange: '20–28°C',
    waterPerSession: '50–70 ml günde 1 kez sisleme; toprak hafif nemli kalmalı',
    germinationDays: 7,
    sunHours: '6–8 saat güneş veya 14 saat LED büyüme ışığı',
    checkFrequency: 'Günde 1 kez',
    healthyLook: '3–5. günde çift yapraklı küçük filizler çıkmalı, parlak yeşil ve dik durmalı',
    warnings: ['Soğuk ortam (20°C altı) → çimlenme durur', 'Kış mevsiminde pencere kenarında soğuk hava darbesi', 'Aşırı su → kök çürümesi'],
    steps: ['Saksıyı hafif nemlendirilmiş toprakla doldur', 'Tohumları yüzeye 3–4 cm aralıkla bırak', '0.5 cm toprak örtüsü ekle', 'Saksıyı naylon veya streç film ile kapat (sera etkisi)', '3–5 gün bekle, filizler görününce naylonu kaldır']
  },
  marul: {
    pot: '10–15 cm derinlikli dikey modul veya saksı; 4–6 litre kapasite',
    soil: 'Hafif, iyi hava alan, NPK\'lı organik karışım',
    depth: 'Tohum yüzeye, 1 mm toprak örtüsü',
    equipment: ['Marul tohumu', 'Organik sebze toprağı', 'Sisleme şişesi', 'Güneş ölçer veya lüx ölçer'],
    season: 'İlkbahar ve Sonbahar (15–22°C)',
    tempRange: '15–22°C',
    waterPerSession: '50–100 ml günde 1 kez (küçük saksıda)',
    germinationDays: 5,
    sunHours: '6 saat minimum (sabah güneşi idealdir)',
    checkFrequency: 'Günde 1 kez',
    healthyLook: '4–6. günde ilk çift yapraklar açılmalı, açık yeşil ve dik durmalı',
    warnings: ['Yüksek sıcaklık (22°C+) → erken çiçeklenme', 'Az ışık → uzun ve zayıf fideler'],
    steps: ['Saksıyı hafif nemli toprakla doldur', 'Tohumları 2 cm aralıkla yüzeye yerleştir', '1 mm toprak örtüsü ekle', 'Sisleme şişesiyle iyi nemlendир', 'Filizler çıkana kadar günlük nemlik kontrolü yap']
  },
  nane: {
    pot: '15–20 cm saksı (kökler yayılım gösterir, karmaşa önlemek için tek bitkiye 20 cm çap)',
    soil: 'Organik, nem tutan ama drenajlı toprak',
    depth: 'Fide ile yetiştirme önerilir; rizom/fide 3–5 cm derinliğe',
    equipment: ['Nane fidesi veya rizom', 'Organik gübre', 'Saksı', 'Sisleme şişesi'],
    season: 'Yıl boyu (iç mekanda); ideal Nisan–Ekim',
    tempRange: '15–25°C',
    waterPerSession: '80–100 ml her gün, toprak hep hafif nemli',
    germinationDays: 10,
    sunHours: '4–6 saat güneş; çok aydınlık pencere yeterli',
    checkFrequency: 'Günde 1 kez',
    healthyLook: '7–10. günde yeşil rizom sürgünleri toprak yüzeyine ulaşmalı',
    warnings: ['Fazla su → kök çürümesi', 'Saksıda hızlı büyüyüp kök sıkışması yaşanabilir; yıllık yeniden saksılama önerilir'],
    steps: ['Saksıya toprak koy', 'Fide veya rizom parçasını 3–5 cm derinliğe göm', 'İyi sulayıp üstünü biraz toprakla kapat', 'Yarı gölgeli, aydınlık ortama koy', 'İlk 2 hafta toprak nemini koru']
  },
  default: {
    pot: 'Bitkinin kök derinliğine uygun drenaj delikli saksı (15–25 cm)',
    soil: 'İyi drene eden, organik maddeli sebze/bitki toprağı',
    depth: 'Tohum boyutunun 2–3 katı derinliğe ekim',
    equipment: ['Uygun tohum/fide', 'Organik sebze toprağı', 'Gübre', 'Sulama kabı veya sisleme şişesi', 'Termometre'],
    season: 'Bitkinin büyüme dönemine göre ilkbahar veya sonbahar',
    tempRange: '18–25°C',
    waterPerSession: '80–150 ml günde 1 kez; toprak kuruyunca sulama',
    germinationDays: 10,
    sunHours: '6–8 saat güneş',
    checkFrequency: 'Günde 1 kez',
    healthyLook: 'İlk hafta sonu toprak yüzeyinden çift yapraklı, sağlıklı renkte filizler görünmeli',
    warnings: ['Aşırı sulama → kök çürümesi', 'Az ışık → zayıf, sararmış fideler'],
    steps: ['Saksıyı nemli toprakla doldur', 'Tohumu doğru derinliğe yerleştir', 'Üstünü toprakla kapat', 'Hafif sulayıp aydınlık ortama koy', 'Günlük gözlem yap']
  }
}

function getPlantProfile(plantName) {
  const n = (plantName || '').toLocaleLowerCase('tr-TR');
  if (n.includes('mantar')) return PLANT_GERMINATION_PROFILES.mantar;
  if (n.includes('safran')) return PLANT_GERMINATION_PROFILES.safran;
  if (n.includes('fesleğen') || n.includes('feslegen') || n.includes('reyhan') || n.includes('rehan')) return PLANT_GERMINATION_PROFILES.fesleğen;
  if (n.includes('marul')) return PLANT_GERMINATION_PROFILES.marul;
  if (n.includes('nane')) return PLANT_GERMINATION_PROFILES.nane;
  return PLANT_GERMINATION_PROFILES.default;
}

function generateDetailedTasks(plantName, dayIndex, germinationDays = 14) {
  const isGermination = dayIndex <= germinationDays;
  const profile = getPlantProfile(plantName);
  const name = plantName || 'Bitkini';

  if (isGermination) {
    // Full germination phase task set - 7 tasks covering all categories
    return [
      {
        id: Date.now() + 1,
        text: `Sulama Kontrolü (Gün ${dayIndex}): ${name} için gereken su miktarı ${profile.waterPerSession}. Toprağa parmağınızı 1 cm sokun; nemli ama ıslak hissetmemeli. Fazla sulanmışsa kabın drenajının açık olduğunu doğrulayın.`,
        done: false,
        time: '08:00'
      },
      {
        id: Date.now() + 2,
        text: `Işık Kontrolü (Gün ${dayIndex}): ${name} günlük ${profile.sunHours} ışığa ihtiyaç duyar. Bugün bu süre sağlandı mı? Pencere kenarına yakınlığı kontrol edin; eğer bulutlu bir gün ise lambayı devreye alın.`,
        done: false,
        time: '09:00'
      },
      {
        id: Date.now() + 3,
        text: `Çimlenme Takibi (Gün ${dayIndex}): ${dayIndex}. günde sağlıklı bir ${name}; "${profile.healthyLook}" şeklinde görünmeli. Bu durumda mı? Değilse toprağı dikkatlice karıştırmadan inceleyin ve ${profile.waterPerSession} sisleme uygulayın.`,
        done: false,
        time: '10:30'
      },
      {
        id: Date.now() + 4,
        text: `Sıcaklık Kontrolü (Gün ${dayIndex}): ${name} için ideal aralık ${profile.tempRange}. Ortam sıcaklığını termometreyle ölçün. Aralık dışındaysa saksıyı daha uygun bir konuma taşıyın veya ısıtıcı kullanın.`,
        done: false,
        time: '12:00'
      },
      {
        id: Date.now() + 5,
        text: `Toprak Kontrolü (Gün ${dayIndex}): Toprak yüzeyini inceleyin. Yeşil yosun, küf oluşumu veya çatlama var mı? ${profile.warnings[0]}. Yüzeysel bir sorun görürseniz o kısmı kırmızı çöp torbası ile uzaklaştırın.`,
        done: false,
        time: '14:00'
      },
      {
        id: Date.now() + 6,
        text: `Nem Kontrolü (Gün ${dayIndex}): Ortam nem oranı ${profile.tempRange.includes('safran') ? '%40–60' : '%60–80'} arasında olmalı. Nem ölçer yoksa toprağa bastırıldığında parmağa hafif nem hissettirmeli ama su damlamamalı.`,
        done: false,
        time: '16:00'
      },
      {
        id: Date.now() + 7,
        text: `Büyüme Takibi (Gün ${dayIndex}): Çimlenme ${profile.germinationDays} günde tamamlanmalı. Bugün ${dayIndex}. gün; ${Math.max(0, profile.germinationDays - dayIndex)} gün daha beklenmeli. Fotoğraf çekerek dünkü görüntüyle karşılaştırın, görünür değişim var mı?`,
        done: false,
        time: '19:00'
      }
    ];
  }

  // Post-germination phase - 7 categorized growth/harvest tasks
  return [
    {
      id: Date.now() + 1,
      text: `Sulama Kontrolü (Gün ${dayIndex}): ${name} için gelişim aşamasında ${profile.waterPerSession} uygulayın. Yapraklar solmadan önce sulayın; toprak 2 cm derinliğe kadar kuru hissediyorsa vakit gelmiştir.`,
      done: false,
      time: '08:00'
    },
    {
      id: Date.now() + 2,
      text: `Işık Kontrolü (Gün ${dayIndex}): ${name} bu hafta ${profile.sunHours} ışık aldı mı? Bitkinin güneşe bakan yüzü fazla sararıyorsa döndürün. Yapraklar kapanıyorsa ışık yetersiz demektir.`,
      done: false,
      time: '09:30'
    },
    {
      id: Date.now() + 3,
      text: `Yaprak/Kök Kontrolü (Gün ${dayIndex}): Yapraklarda sararma, kahverengi leke, delik veya yapışkanlık var mı? Bunlar zararlı, mantar hastalığı veya besin eksikliğinin (sarı→azot, mor→fosfor) işaretidir. Varsa Seed Doc'a bildirin.`,
      done: false,
      time: '11:00'
    },
    {
      id: Date.now() + 4,
      text: `Toprak Kontrolü (Gün ${dayIndex}): Toprağın yüzeyi sertleşip kabarmış mı? Sertleşmişse çatal/kaşık ile yüzeyi çok hafifçe kabartin. Bu köklerin hava almasını sağlar.`,
      done: false,
      time: '13:00'
    },
    {
      id: Date.now() + 5,
      text: `Sıcaklık Kontrolü (Gün ${dayIndex}): Anlık ortam sıcaklığı ${profile.tempRange} aralığında mı? Aşırı sıcak (28°C+) bitkiyi bunaltır; gölge oluşturun veya fanı devreye alın.`,
      done: false,
      time: '14:30'
    },
    {
      id: Date.now() + 6,
      text: `Nem Kontrolü (Gün ${dayIndex}): Yaprak altlarında toz veya kuru beyaz kalıntı varsa nem çok düşüktür. %55–70 arasına getirmek için yakına su dolu bir kap koyabilirsiniz.`,
      done: false,
      time: '16:00'
    },
    {
      id: Date.now() + 7,
      text: `Büyüme Takibi (Gün ${dayIndex}): ${name} bugün kaçıncı günde? Genel boy artışı ile ilk günkü boyunu karşılaştırın. Büyüme durmuş görünüyorsa gübre ekleme zamanı (haftada 1 kez sıvı NPK önerilir).`,
      done: false,
      time: '19:00'
    }
  ];
}


export function getTodayTasks(userId, plantName, germinationDays = 14) {
  if (!userId) return []
  
  const todayStr = getTodayDateString()
  const userTasks = getStoredTasksForUser(userId)
  
  // Calculate day index carefully
  const existingDaysCount = Object.keys(userTasks).length
  const dayIndex = userTasks[todayStr] ? existingDaysCount : existingDaysCount + 1
  
  if (!userTasks[todayStr]) {
    // Generate new descriptive tasks for today based on the plant and the current day stage
    userTasks[todayStr] = generateDetailedTasks(plantName, dayIndex, germinationDays)
    saveStoredTasksForUser(userId, userTasks)
  }
  
  return userTasks[todayStr]
}

export function addCustomTasks(userId, tasksArray) {
  if (!userId || !tasksArray || tasksArray.length === 0) return []

  const todayStr = getTodayDateString()
  const userTasks = getStoredTasksForUser(userId)
  
  if (!userTasks[todayStr]) {
    userTasks[todayStr] = []
  }

  // Prepend emergency/custom tasks from AI to the start
  const newTasks = tasksArray.map((t, idx) => ({
    id: Date.now() + 100 + idx,
    text: t,
    done: false,
    time: '⚠️ Acil'
  }))

  userTasks[todayStr] = [...newTasks, ...userTasks[todayStr]]
  saveStoredTasksForUser(userId, userTasks)
  
  return userTasks[todayStr]
}

export function toggleTask(userId, taskId) {
  if (!userId) return []
  
  const todayStr = getTodayDateString()
  const userTasks = getStoredTasksForUser(userId)
  
  if (!userTasks[todayStr]) return []
  
  userTasks[todayStr] = userTasks[todayStr].map(t => 
    t.id === taskId ? { ...t, done: !t.done } : t
  )
  
  saveStoredTasksForUser(userId, userTasks)
  return userTasks[todayStr]
}

export function getTaskHistoryCount(userId) {
  if (!userId) return 0
  
  const userTasks = getStoredTasksForUser(userId)
  return Object.keys(userTasks).length
}
