# **PRD: YetZeed \- Akıllı Dikey Tarım Rehberi**

## **1\. Ürün Özeti (Project Overview)**

**YetZeed**, şehirde yaşayan bireylerin, özellikle de kadın girişimcilerin, evlerindeki boş alanları (oda, balkon, bodrum) kullanarak safran ve mantar gibi yüksek değerli tarım ürünleri yetiştirmesini sağlayan AI destekli bir web uygulamasıdır. Uygulama, teknik ziraat bilgisini sadeleştirir, KOSGEB/TKDK hibe süreçlerini yönetir ve üretim takvimini kullanıcının günlük yaşantısına (ebeveynlik, iş saatleri) göre esnek bir şekilde planlar.

## **2\. Hedef Kitle (Target Audience)**

* **Öncelikli:** Finansal bağımsızlık arayan, ev içi sorumlulukları olan kadınlar ve anneler.  
* **Genel:** Ek gelir elde etmek isteyen üniversite öğrencileri, emekliler ve şehirli girişimci ruhlu herkes.

## **3\. Temel Özellikler (Core Features)**

* **AI Çevre Analisti:** Alanın büyüklüğü, ışık durumu ve konum verilerine göre en karlı 3 ürünü maliyet analiziyle birlikte önerir.  
* **AI Ziraat Mühendisi:** Sulama, gübreleme ve hasat görevlerini kullanıcının "bebek uyku" veya "iş" saatlerine göre esnek şekilde takvimler.  
* **AI Finansal Pilot:** Kadın girişimci desteklerini (KOSGEB/TKDK) filtreler ve akıllı bütçe tavsiyeleri verir.  
* **Bilgi Bankası:** Teknik terimlerden arındırılmış, "Vibe Coding" mantığında hazırlanmış hızlı bakım ipuçları sunar.

## **4\. Kullanıcı Akışı (User Flow)**

1. **Karşılama (E1):** Kullanıcı uygulamayı açar, dikey tarım vizyonunu anlar ve kayıt olur.  
2. **Onboarding & Analiz (E2):** Kullanıcı 30 soruluk akıllı testi çözer; AI mekan ve rutin analizini yapar.  
3. **Ürün Seçimi (E2 \- Sonuç):** AI'nın sunduğu analiz raporuna göre kullanıcı 3 üründen birini seçerek projeyi başlatır.  
4. **Yönetim Paneli (E3):** Kullanıcı günlük görevlerini takip eder ve yan panelden AI teşvik çekmecesini kontrol eder.  
5. **Finansal Planlama (E4):** Kullanıcı bütçe paneline geçerek gelir-gider girişi yapar ve AI'dan tasarruf tavsiyeleri alır.

## **5\. Teknik Yığın (Tech Stack)**

* **Ana AI Asistanı:** Gemini (Google) \- Kod yazımı, hata düzeltme ve belge oluşturma.  
* **Kod Editörü:** Cursor \- "Agent Modu" ile uygulamayı geliştirecek ana platform.  
* **Yapay Zeka Entegrasyonu:** Google AI Studio (Gemini API).  
* **Frontend:** React \+ Tailwind CSS (Modern ve hızlı arayüz).  
* **Yayınlama (Deploy):** Netlify (GitHub bağlantılı hızlı yayınlama).  
* **Araştırma:** Perplexity (Güncel hibe ve pazar araştırması).

## **6\. Ekran Tasarımları ve Fonksiyonel Gereksinimler (Screens & UI)**

### **E1: Karşılama ve Giriş Ekranı (Hero & Auth)**

* **İşlev:** Uygulama tanıtımı, dikey tarım illüstrasyonları ve "Hemen Başla" butonu.  
* **Görsel:** Pastel tonlarda, modern ve güven veren kadın girişimci temalı görseller.

### **E2: Akıllı Onboarding (30 Soruluk Test & Sonuç)**

* **Yapı:** Mekan, Bütçe, Zaman ve Hedefler kategorilerine bölünmüş adım adım form.  
* **AI Çıktısı:** Test sonunda kişiye özel "Girişimci Profili" ve "En Uygun 3 Ürün" kartları.

### **E3: Ana Dashboard (Takip ve Navigasyon)**

* **Ürün Takibi:** Aktif ürünün ilerleme durumu, sulama ve gübreleme için günlük görev listesi.  
* **AI Teşvik Çekmecesi:** Yan panelden açılan, kullanıcı profiline (yaş, şehir vb.) özel hibe ve vergi muafiyeti bildirimleri.  
* **Navigasyon:** Bütçe planlayıcıya hızlı erişim sağlayan finans butonu.

### **E4: Finansal Pilot ve Bütçe Planlayıcı**

* **İşlev:** Gider (elektrik, tohum, ekipman) ve gelir girişi yapma, bütçe kaydetme.  
* **AI Danışman:** "Bütçem hakkında tavsiye al" butonu; AI'nın verimlilik ve tasarruf önerileri sunduğu panel.

## **Başarı Kriterleri (Success Metrics)**

* **Hızlı Karar Alma**: Kullanıcının 1 dakikadan kısa sürede kendine uygun ürünü ve hibe yol haritasını bulabilmesi.  
* **Uygulanabilirlik**: Karmaşık tarım verilerinin, evdeki bir anne veya girişimci için anlaşılır ve uygulanabilir günlük görevlere dönüşmesi.  
* **Finansal Farkındalık**: Kullanıcının devlet teşvikleri (KOSGEB/TKDK) hakkında kişiselleştirilmiş bilgiye ulaşarak bütçe planlaması yapabilmesi.


