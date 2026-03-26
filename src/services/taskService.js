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

function generateDetailedTasks(plantName, dayIndex, germinationDays = 14) {
  const isGermination = dayIndex <= germinationDays;

  if (plantName?.toLowerCase()?.includes('mantar')) {
    if (isGermination) {
      return [
        { id: Date.now() + 1, text: 'Kuluçka Evresi: Ortam karanlık mı? Odanın sıcaklığını 24°C, nemi ise kompost poşetlerinde damlacık yapmayacak şekilde %85-90 seviyesinde tutun.', done: false, time: '08:00' },
        { id: Date.now() + 2, text: 'Misellerin (beyaz ağların) kompostu sarmaya başlayıp başlamadığını, üzerinde yeşil/siyah rekabetçi küfler olup olmadığını yakın ışıkta detaylıca inceleyin.', done: false, time: '13:00' },
        { id: Date.now() + 3, text: 'Gerekirse odayı 15 dk havalandırıp içeri taze hava girmesini sağlayın, CO2 oranının tehlikeli seviyeye çıkmasını önleyin.', done: false, time: '19:00' }
      ]
    } else {
      return [
        { id: Date.now() + 1, text: 'Pim Oluşumu: Günde en az 8 saat 600-800 lux (okuma yapabileceğiniz kadar) ışık sağlandığından emin olun.', done: false, time: '08:00' },
        { id: Date.now() + 2, text: 'Şapka gelişimi için ortam neminin %80 civarında kalmasını sağlayan sisleme sisteminizi çalıştırın. Doğrudan şapkaya su sıkmayın.', done: false, time: '13:00' },
        { id: Date.now() + 3, text: 'Hasat Olgunluğu: Mantar şapkalarının kenarları yukarı kıvrılmaya başlamadan (düzken) hasat edilecek olanları belirleyip kökünden çevirerek hasat edin.', done: false, time: '19:00' }
      ]
    }
  } else if (plantName?.toLowerCase()?.includes('safran')) {
    if (isGermination) {
      return [
        { id: Date.now() + 1, text: 'Dinlenme Evresi: Soğanların 15-18°C aralığında, havadar bir yerde uyanmaya başladığını kontrol edin.', done: false, time: '08:00' },
        { id: Date.now() + 2, text: 'Toprak nemini elle kontrol et, çamur olmamasına (çürüme riski) dikkat edin.', done: false, time: '12:00' },
        { id: Date.now() + 3, text: 'Soğanların üzerinde yumuşama, koku veya küf çürükleri olup olmadığını muayene edin.', done: false, time: '18:00' }
      ]
    } else {
      return [
        { id: Date.now() + 1, text: 'Çiçeklenme Kontrolü: Beliren sürgünlerin mora dönük çiçeklerini açıp açmadığını inceleyin.', done: false, time: '08:00' },
        { id: Date.now() + 2, text: 'Ortamda tam güneş ışığı (veya eşdeğer aydınlatma) olduğuna emin olun.', done: false, time: '12:00' },
        { id: Date.now() + 3, text: 'Açan çiçeklerden kırmızı safran tepeciklerini cımbızla sabah erken saatlerde hasat edin.', done: false, time: '18:00' }
      ]
    }
  }
  
  if (isGermination) {
     return [
       { id: Date.now() + 1, text: 'Çimlenme Şartları: Tohumların bulunduğu ortamın sıcaklık ve nem dengesini (ideali ~%80 nem, 22°C) kontrol edin.', done: false, time: '08:00' },
       { id: Date.now() + 2, text: 'Tohum yatağında aşırı kurumayı önlemek için hafif sisleme (fısfıs) yapın.', done: false, time: '13:00' },
       { id: Date.now() + 3, text: 'Toprak zemininde zararlı bakteri veya küflenme belirtisi olup olmadığını yüzeysel olarak mutlaka inceleyin.', done: false, time: '19:00' }
     ]
  }
  
  return [
    { id: Date.now() + 1, text: 'Sistemin genel su seviyesini ve besin çözeltisinin pH-EC değerlerini gözden geçirin.', done: false, time: '08:00' },
    { id: Date.now() + 2, text: 'Mekan havalandırmasını (fanları) çalıştırıp hastalıkların önüne geçin.', done: false, time: '13:00' },
    { id: Date.now() + 3, text: 'Bitki yapraklarında sararma, leke veya besin eksikliği (örn: azot) belirtisi olup olmadığını dikkatlice inceleyin.', done: false, time: '19:00' }
  ]
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
