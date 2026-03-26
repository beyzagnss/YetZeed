import { GEMINI_API_KEY } from '../config/gemini'
import PLANT_DATABASE_MD from '../../Bitki.md?raw'

export async function getPlantRecommendations(answers) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API Key eksik! Lütfen .env dosyanıza VITE_GEMINI_API_KEY değişkenini ekleyin.");
  }

  const prompt = `
Sen, şehirli kadın girişimcilere destek olan uzman bir dikey tarım ziraat mühendisi ve girişimcilik danışmanısın.
Aşağıda bir kullanıcının mekan, bütçe, zaman ve hedeflerine dair verdiği cevapların JSON formatı bulunuyor.

Sistemimizde yer alan kapsamlı bitki veritabanı aşağıdadır. Bu veritabanında 20'den fazla bitki/ürün bulunmakta olup sen bunları kullanıcının profiline göre DEĞERLENDİRMELİSİN:
${PLANT_DATABASE_MD}

Kullanıcı Cevapları:
${JSON.stringify(answers, null, 2)}

Görevin:
1. Kullanıcının bütçesine, mevcut alanına, zamanına, pazarlama hedeflerine ve teknik bilgi düzeyine göre yukarıdaki veritabanından EN UYGUN 3 ile 5 arasında ürün seç. 
2. Rekabetçi kâr potansiyeli, düşük bakım, hızlı hasat veya pazar değeri kriterlerini kullanıcının cevaplarına göre özelleştir.
3. Her öneri için güncel Türkiye piyasası bilgisini (özellikle 2025 fiyatları, KOSGEB/TKDK teşvikleri) kullan.
4. Seçim yaparken VERİTABANINDAKİ TÜM BİTKİLERİ DEĞERLENDİR. Sadece Safran, Mantar veya Fesleğen önerme; kullanıcının profiline en uygun olanları seç.

Kesinlikle aşağıdaki JSON formatında ve başka hiçbir metin içermeden (markdown formatı kullanmadan) doğrudan JSON dizisi olarak yanıt ver:
[
  {
    "name": "Ürün Adı (veritabanındaki bitki adını kullan)",
    "profitability": "Yüksek / Orta / Düşük",
    "difficulty": "Çok Kolay / Kolay / Orta / Zor",
    "cost": "Tahmini başlangıç maliyeti (TL cinsinden veritabanındaki verileri baz al)",
    "reason": "Neden bu ürünü öneriyorsun? Kullanıcının bütçesi, alanı, zamanı ve hedefleriyle nasıl uyuşuyor? Spesifik ve kısa açıkla."
  }
]
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ googleSearch: {} }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "AI servisine bağlanılamadı.");
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    return JSON.parse(resultText);
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}


export async function getBudgetAdvice(income, expenses) {
  if (!GEMINI_API_KEY) {
    throw new Error("API Key eksik");
  }

  const prompt = `
Sen dikey tarım yapan şehirli kadın girişimciler için uzman bir finansal danışmansın.
Kullanıcının mevcut durumu:
- Toplam Gelir (Aylık/Dönemlik): ${income} TL
- Toplam Gider: ${expenses} TL
- Kâr/Zarar Durumu: ${income - expenses} TL

Lütfen bu verileri analiz et ve kademeli büyüme, tasarruf veya pazarlama konusunda EN FAZLA 3 CÜMLELİK şefkatli, net ve motive edici bir finansal tavsiye ver.
Sadece tavsiye metnini dön, başka hiçbir açıklama yapma.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!response.ok) throw new Error("Makine öğrenmesi servisi yanıt vermedi");
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("AI Budget Error:", err);
    throw err;
  }
}

export async function getSeedDocFeedback(plantName, dayIndex, healthText) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY eksik.");
  
  const prompt = `Sen profesyonel bir tarım ziraat mühendisi yapay zeka doktoru olan "Seed Doc" asistanısın. 
Kullanıcı şu bitkiyi yetiştiriyor: "${plantName}" 
Sistemimizde ${dayIndex}. gününde (not: ilk 14 gün çimlenme/kuluçka evresi kabul edilir).

Kullanıcının bugün bitkisiyle ilgili gözlemi şu şekilde:
"${healthText}"

Lütfen bu gözlemi bilimsel olarak analiz et. Eğer hastalıklı, riskli bir durum (küf, sararma, çürüme vb.) varsa, durumunu "Attention" yap ve kullanıcının bugünkü görev listesine eklenecek kısa net kurtarma eylemlerini (newTasks içine string dizisi olarak) yaz. Eğer iyiyse status "Healthy" koy ve motive edici kısa bir geri bildirim yaz. Uzun destanlar yazma, direkt teşhisi söyle.

Kesinlikle sadece aşağıdaki formatta saf JSON olarak yanıt ver (Markdown tırnakları veya başka metin asla ekleme):
{
  "status": "Healthy" | "Attention",
  "feedback": "Kullanıcıya vereceğin bilimsel teşhis ve şefkatli uzman tavsiyesi",
  "newTasks": [
    "Hemen ortamı havalandır ve nemi %70'e düşür",
    "Siyah lekeli kısımları ayır"
  ] 
}
Eğer bitki sağlıklıysa newTasks mutlaka boş bir dizi [] olmalıdır.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) throw new Error("Seed Doc servisine ulaşılamadı.");

    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("Seed Doc Error:", error);
    throw error;
  }
}

export async function getPlantBiologicalProfile(plantName) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY eksik.");
  
  const prompt = `Sen profesyonel bir ziraat uzmanısın. Kullanıcı "${plantName}" yetiştirmeye karar verdi. 
Lütfen bilinen tarımsal yetiştiricilik standartlarına göre bu bitkinin;
1. Tohumdan, kuluçkadan çıkıp büyüme evresine (çimlenme sonu) geçmesi için kaç gün gerektiğini (germinationDays),
2. Hasat edilebilir olgunluğa gelmesi için toplamda kaç gün gerektiğini (harvestDays) yaz.

Kesinlikle sadece aşağıdaki formatta saf JSON olarak yanıt ver (Markdown vs ekleme):
{
  "germinationDays": 14,
  "harvestDays": 30
}
Gerçekçi, ortalama tam sayılar ver.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      })
    });
    if (!response.ok) throw new Error("Plant Profile API servisine ulaşılamadı.");
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("Plant Profile Error:", error);
    return { germinationDays: 14, harvestDays: 30 }; // Fallback
  }
}

export const AI_INCENTIVES_DB = [
  {
    id: "inc_kosgeb_kadin",
    title: "KOSGEB İleri Girişimci & Kadın/Genç Desteği",
    description: "Yeni işletme kuran genç veya kadın girişimcilere kuruluş, makine, teçhizat giderleri için %50'ye varan faiz indirimli 1 Milyon TL'ye kadar kredi ve hibe desteği.",
    source: "KOSGEB 2025/2026",
    tags: ["kadin", "genc", "genel", "ekipman"],
    icon: "👩‍💼"
  },
  {
    id: "inc_tarim_dikey",
    title: "Tarım Bakanlığı Kapalı Ortam Dikey Tarım Hibesi",
    description: "İklimlendirmeli ve katlı modern sera kurulumlarında (mantar, yeşillik vb.) %50 hibe. Ayrıca kadın ve genç çiftçilere dekar başına +930 TL ilave tarımsal destek.",
    source: "Tarım ve Orman Bakanlığı",
    tags: ["tarim", "mantar", "sera", "kadin", "genc"],
    icon: "🍄"
  },
  {
    id: "inc_vergi_genc",
    title: "Genç Girişimci Kazanç İstisnası",
    description: "29 yaş altı ilk defa iş kuranlar için 3 takvim yılı boyunca 2026 yılı limiti olan 400.000 TL'ye kadar kazançlarında tam gelir vergisi muafiyeti.",
    source: "Gelir İdaresi Başkanlığı",
    tags: ["genc", "vergi", "genel"],
    icon: "📉"
  },
  {
    id: "inc_tkdk_kirsal",
    title: "TKDK IPARD III Kırsal Kalkınma Hibe Programı",
    description: "Kırsal alanlarda mantar veya tıbbi aromatik bitki (safran, fesleğen) yatırımlarına %70'e varan, 500.000 Euro'ya kadar geri ödemesiz AB destekli dev hibe.",
    source: "Tarım ve Kırsal Kalkınma Destek Kurumu",
    tags: ["tarim", "kirsal", "mantar", "safran", "feslegen", "genel"],
    icon: "🇪🇺"
  },
  {
    id: "inc_ziraat_kredi",
    title: "Ziraat Bankası Tarımsal Üretim Yatırım Kredisi",
    description: "Mantar yetiştiriciliği ve topraksız tarım yatırımları için %50 ile %100 arasında faiz sübvansiyonlu (sıfır faize kadar inebilen) 100 milyon TL üst limitli kredi desteği.",
    source: "T.C. Ziraat Bankası",
    tags: ["tarim", "mantar", "sera", "kredi"],
    icon: "🏦"
  },
  {
    id: "inc_kosgeb_genel_emekli",
    title: "KOSGEB Geleneksel/Genel Girişimci Desteği (Genel)",
    description: "Emekliler veya yaş/cinsiyet şartı aranmaksızın tüm girişimciler için işletme kuruluş giderleri ve personel istihdam desteklerini içeren standart paket.",
    source: "KOSGEB",
    tags: ["genel", "emekli", "kobi"],
    icon: "🏭"
  }
];

export function getSortedIncentives(selectedPlant) {
  const lowerPlant = (selectedPlant || '').toLowerCase();
  const isAgri = lowerPlant.includes('mantar') || lowerPlant.includes('safran') || lowerPlant.includes('fesleğen');
  const isMantar = lowerPlant.includes('mantar');
  
  return [...AI_INCENTIVES_DB].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    
    // Agricultural focus bonus
    if (isAgri) {
      if (a.tags.includes('tarim')) scoreA += 10;
      if (b.tags.includes('tarim')) scoreB += 10;
    }
    if (isMantar) {
      if (a.tags.includes('mantar')) scoreA += 5;
      if (b.tags.includes('mantar')) scoreB += 5;
    }
    
    // App demographic implicitly heavily favors women/youth (as per specific target audience)
    if (a.tags.includes('kadin') || a.tags.includes('genc')) scoreA += 3;
    if (b.tags.includes('kadin') || b.tags.includes('genc')) scoreB += 3;
    
    // Generic programs demoted relatively
    if (a.tags.includes('emekli')) scoreA -= 2;
    if (b.tags.includes('emekli')) scoreB -= 2;

    return scoreB - scoreA;
  });
}
