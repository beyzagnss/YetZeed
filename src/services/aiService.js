import { GEMINI_API_KEY } from '../config/gemini'

export async function getPlantRecommendations(answers) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API Key eksik! Lütfen .env dosyanıza VITE_GEMINI_API_KEY değişkenini ekleyin.");
  }

  const prompt = `
Sen, şehirli kadın girişimcilere destek olan uzman bir dikey tarım ziraat mühendisi ve girişimcilik danışmanısın.
Aşağıda bir kullanıcının mekan, bütçe, zaman ve hedeflerine dair verdiği cevapların JSON formatı bulunuyor.
Lütfen bu cevapları analiz et ve bu kişinin evinde/alanında yetiştirebileceği en uygun 3 dikey tarım ürününü (örn: İstiridye Mantarı, Pran, Safran, Fesleğen, Çilek, Microgreens vb.) öner.

Kullanıcı Cevapları:
${JSON.stringify(answers, null, 2)}

Lütfen kesinlikle aşağıdaki JSON formatında ve başka hiçbir metin içermeden (markdown formatı kullanmadan) doğrudan JSON dizisi olarak yanıt ver:
[
  {
    "name": "Ürün Adı",
    "profitability": "Yüksek / Orta / Düşük",
    "difficulty": "Kolay / Orta / Zor",
    "cost": "Tahmini Başlangıç Maliyeti",
    "reason": "Neden bu ürünü öneriyorsun? (Kullanıcının cevaplarına özel bir tavsiye)"
  }
]
`;

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
