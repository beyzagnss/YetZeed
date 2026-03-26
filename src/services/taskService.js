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

function generateInitialTasks(plantName) {
  if (plantName?.toLowerCase()?.includes('mantar')) {
    return [
      { id: Date.now() + 1, text: 'Sabah nem seviyesini ölç (%85 ideal)', done: false, time: '08:00' },
      { id: Date.now() + 2, text: 'Öğle saatlerinde ortamı havalandır (15dk)', done: false, time: '13:00' },
      { id: Date.now() + 3, text: 'Mantarların gelişimini gözlemle ve not al', done: false, time: '19:00' }
    ]
  } else if (plantName?.toLowerCase()?.includes('safran')) {
    return [
      { id: Date.now() + 1, text: 'Sabah sıcaklığını kontrol et (15-18°C ideal)', done: false, time: '08:00' },
      { id: Date.now() + 2, text: 'Toprak nemini elle kontrol et, aşırı sulamadan kaçın', done: false, time: '12:00' },
      { id: Date.now() + 3, text: 'Soğanların hava alması için ortamı 20dk havalandır', done: false, time: '18:00' }
    ]
  }
  // Default fallback tasks
  return [
    { id: Date.now() + 1, text: 'Sistemin genel su seviyesini kontrol et', done: false, time: '08:00' },
    { id: Date.now() + 2, text: 'Mekan havalandırmasını çalıştır (15dk)', done: false, time: '13:00' },
    { id: Date.now() + 3, text: 'Bitki yapraklarını incele ve sağlık durumlarını not al', done: false, time: '19:00' }
  ]
}

export function getTodayTasks(userId, plantName) {
  if (!userId) return []
  
  const todayStr = getTodayDateString()
  const userTasks = getStoredTasksForUser(userId)
  
  if (!userTasks[todayStr]) {
    // Generate new tasks for today based on the plant
    userTasks[todayStr] = generateInitialTasks(plantName)
    saveStoredTasksForUser(userId, userTasks)
  }
  
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
