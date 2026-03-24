# **PRD: YetZeed \- Akıllı Dikey Tarım Rehberi**

## **1\. Ürün Özeti (Project Overview)**

**YetZeed**, şehirde yaşayan bireylerin, özellikle de kadın girişimcilerin, evlerindeki boş alanları (oda, balkon, bodrum) kullanarak yüksek değerli tarım ürünleri (safran, mantar vb.) yetiştirmesini sağlayan AI destekli bir web uygulamasıdır. Uygulama, teknik ziraat bilgisini sadeleştirir, hibe/teşvik süreçlerini yönetir ve üretim takvimini kullanıcının günlük yaşantısına (ebeveynlik, iş saatleri) göre esnek bir şekilde planlar.

## **2\. Hedef Kitle (Target Audience)**

* **Öncelikli:** Finansal bağımsızlık arayan, ev içi sorumlulukları olan kadınlar ve anneler.  
* **Genel:** Ek gelir elde etmek isteyen üniversite öğrencileri, emekliler ve şehirli girişimciler.

## **3\. Temel Özellikler (Core Features)**

### **A. Alan Analizi ve Ürün Önerisi (AI Çevre Analisti)**

* Kullanıcı; alanın büyüklüğünü, ışık durumunu ve bulunduğu şehri seçer.  
* AI, bu verilere göre en karlı 3 ürün önerisi sunar (Kurulum maliyeti ve tahmini kâr dahil).

### **B. Esnek Üretim Takvimi (AI Ziraat Mühendisi)**

* Seçilen ürün için sulama, gübreleme ve hasat görevleri oluşturulur.  
* Kullanıcı, "Bebek uyku saati" veya "İş saati" gibi kısıtları girer; AI görevleri bu saatlerin dışına yayar.

### **C. Finansal Rehber ve Hibe Navigasyonu (AI Finansal Pilot)**

* KOSGEB ve TKDK gibi kadın girişimci destekleri hakkında bilgilendirme paneli.  
* Basit bir gelir-gider takip çizelgesi.

### **D. Bilgi Bankası (Basit Rehber)**

* Teknik terimlerden arındırılmış, "Vibe Coding" mantığında hazırlanmış hızlı bitki bakım ipuçları.

## **4\. Kullanıcı Akışı (User Flow)**

1. **Giriş:** Kullanıcı uygulamayı açar ve "Yeni Proje Başlat" der.  
2. **Analiz:** Alan özelliklerini (Örn: 10m2, Kuzey cephe, İstanbul) girer.  
3. **Seçim:** AI'nın önerdiği ürünlerden birini (Örn: İstiridye Mantarı) seçer.  
4. **Planlama:** Günlük rutinindeki meşgul olduğu saatleri işaretler.  
5. **Takip:** Dashboard (Panel) üzerinden günlük tarım görevlerini ve finansal durumunu izler.

## **5\. Teknik Yığın (Tech Stack)**

* **Frontend:** React veya Next.js (Tailwind CSS ile modern ve temiz bir arayüz).  
* **Backend:** Gemini API (Google AI Studio üzerinden zeka desteği).  
* **Yayınlama (Deploy):** Lovable veya Netlify.

## **6\. Başarı Kriterleri (Success Metrics)**

* Kullanıcının 1 dakikadan kısa sürede kendine uygun ürünü ve hibe yol haritasını bulabilmesi.  
* Karmaşık tarım verilerinin, evdeki bir anne için uygulanabilir günlük görevlere dönüşmesi.

### **7\. Ekran Tasarımları ve Fonksiyonel Gereksinimler (Screens & UI)**

#### **E1: Karşılama ve Giriş Ekranı (Hero & Auth)**

* **Görsel:** Dikey tarımı ve kadın emeğini simgeleyen, pastel tonlarda modern illüstrasyonlar.  
* **İçerik:** "YetZeed ile Evinizdeki Potansiyeli Keşfedin" sloganı. Dikey tarımın şehir hayatındaki avantajlarını anlatan kısa animasyonlu kartlar.  
* **İşlev:** Kullanıcı Kayıt/Giriş (Google Auth veya E-posta).

#### **E2: Akıllı Onboarding: "YetZeed Üretim Analizi" (30 Soruluk Akıllı Test)**

* **Yapı:** 30 soru; Mekan, Bütçe, Zaman ve Hedefler olmak üzere 4 ana kategoriye bölünmüş "Step-by-Step" (Adım Adım) form yapısı.  
* **AI Rolü:** Kullanıcı soruları cevapladıkça AI arkada çalışmaya başlar. Örneğin; "Günde sadece 1 saat ayırabilirim" diyen kullanıcıya, bakım gereksinimi yüksek olan bitkileri testin sonunda eler.  
* **Çıktı:** Test bittiğinde AI kullanıcıya özel bir "Girişimci Profili" ve "En Uygun 3 Ürün" raporu sunar.

#### **E3: Ana Dashboard (Takip ve Navigasyon)**

* **Ürün Kartları:** Her ekili ürün için (Örn: Safran \- 12\. Gün) ilerleme barı, su/gübre hatırlatıcıları.  
* **AI Bildirim Çekmecesi (Side Drawer):** Ekranın yanından açılan, AI'nın o günkü kullanıcı profiline göre seçtiği **"Öncelikli Devlet Teşvikleri"** (Örn: "29 yaş altı olduğun için vergi muafiyeti hakkın var\!") ve genel hibe duyuruları.  
* **Finansal Kısayol:** Göze çarpan, hızlı erişilebilir "Bütçe ve Finans Yönetimi" butonu.

#### **E4: Finansal Pilot ve Bütçe Planlayıcı (Budget Planner)**

* **Girdi Alanları:** Kurulum masrafları, tohum/besin maliyetleri, elektrik gideri.  
* **Kayıt ve Analiz:** Harcamaların kaydedildiği ve grafiklerle (Pasta dilimi/Çizgi grafik) sunulduğu temiz bir arayüz.  
* **AI Finansal Danışman Modülü:** "Bütçem hakkında AI önerisi al" butonu. AI, kullanıcının girdiği verileri analiz ederek: *"Bu ay elektrik giderin beklentinin üzerinde, LED saatlerini gece tarifesine kaydırmanı öneririm"* gibi tasarruf tavsiyeleri verir.


