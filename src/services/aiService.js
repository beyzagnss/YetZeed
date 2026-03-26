import { GEMINI_API_KEY } from '../config/gemini'
import PLANT_DATABASE_MD from '../../Bitki.md?raw'

export async function getPlantRecommendations(answers) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API Key eksik! Lütfen .env dosyanıza VITE_GEMINI_API_KEY değişkenini ekleyin.");
  }

  const prompt = `
Sen, şehirli kadın girişimcilere destek olan uzman bir dikey tarım ziraat mühendisi ve girişimcilik danışmanısın.
Aşağıda bir kullanıcının mekan, bütçe, zaman ve hedeflerine dair verdiği cevapların JSON formatı bulunuyor.
Ayrıca sistemimizde yer alan temel bitki veritabanını (aşağıda) baz almalısın. FAKAT bu veritabanı eski olabilir.
Lütfen Google Search (websearch) özelliğini KESİNLİKLE DOĞRUDAN kullanarak bugünün güncel verilerini (özellikle son 3 ayın tarım hibe/destekleri, KOSGEB/TKDK teşvikleri ve enflasyon/güncel tohum-ekipman fiyatlarını) araştır. Veritabanındaki standart bitki ihtiyaçları ile internetteki güncel ekonomik verileri harmanla.

Elde ettiğin en güncel fiyatlara, teşviklere ve kullanıcının cevaplarına dayanarak, kullanıcının evinde/alanında yetiştirebileceği en uygun 3 ürünü (örn: İstiridye Mantarı, Safran, Fesleğen vb.) öner.

Kullanıcı Cevapları:
${JSON.stringify(answers, null, 2)}

Sistem Bitki Veritabanı Referansı (Maliyet/Işık/Su/Büyüme Şartları):
${PLANT_DATABASE_MD}

Lütfen kesinlikle aşağıdaki JSON formatında ve başka hiçbir metin içermeden (markdown formatı kullanmadan) doğrudan JSON dizisi olarak yanıt ver:
[
  {
    "name": "Ürün Adı",
    "profitability": "Yüksek / Orta / Düşük",
    "difficulty": "Kolay / Orta / Zor",
    "cost": "Tahmini GÜNCEL Başlangıç Maliyeti",
    "reason": "Neden bu ürünü öneriyorsun? (İnternetten bulduğun çok GÜNCEL trendleri, son 3 aydaki maliyet fiyatlarını veya güncel spesifik teşvikleri mutlaka belirterek kullanıcının hedeflerine bağla.)"
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
