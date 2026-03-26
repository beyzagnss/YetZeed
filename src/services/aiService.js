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
