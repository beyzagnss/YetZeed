## YetZeed - MVP Gorev Listesi (M1)

Bu dosya, `tasks.md` icindeki **M1 (MVP)** kapsamina giren minimum gorevleri icerir.
Hedef: Kullaniciyi `E1 -> E2 -> E2 Sonuc` akisinda calisan bir ilk surume ulastirmak.

### 1) Proje Kurulumu (Faz 0)

- [ ] **MVP-0.1:** React + Tailwind projesini baslat ve temel klasor yapisini olustur.
- [ ] **MVP-0.2:** `.env` yapisini kur ve `Gemini API key` degiskenini tanimla.
- [ ] **MVP-0.3:** Ortak UI temellerini olustur (renk, tipografi, buton/input).
- [ ] **MVP-0.4:** Route yapisini kur (`E1`, `E2`, `E2 Sonuc`).

### 2) E1 - Karsilama ve Giris (Faz 1)

- [ ] **MVP-1.1:** Hero bolumu + "Hemen Basla" butonunu gelistir.
- [ ] **MVP-1.2:** Email/sifre ile kayit-giris akisinin temelini ekle.
- [ ] **MVP-1.3:** Basarili giristen sonra kullaniciyi onboarding ekranina yonlendir.
- [ ] **MVP-1.4:** E1 ekranini mobilde sorunsuz calisacak sekilde duzenle.

### 3) E2 - Akilli Onboarding (Faz 2)

- [ ] **MVP-2.1:** 30 soruluk veri modelini olustur (Mekan, Butce, Zaman, Hedefler).
- [ ] **MVP-2.2:** Cok adimli formu gelistir (ilerle/geri + ilerleme durumu).
- [ ] **MVP-2.3:** Girdi dogrulama ve zorunlu alan kontrollerini ekle.
- [ ] **MVP-2.4:** Test sonu "Girisimci Profili" ozetini hazirla.

### 4) E2 Sonuc - AI Cevre Analisti (Faz 3)

- [ ] **MVP-3.1:** `aiService` katmanini yaz ve Gemini baglantisini test et.
- [ ] **MVP-3.2:** Onboarding cevaplarini AI'ya gonderen prompt akislarini kur.
- [ ] **MVP-3.3:** "En Uygun 3 Urun" sonuc kartlarini (karlilik, maliyet, zorluk) goster.
- [ ] **MVP-3.4:** Kullaniciya bir urun secip projeyi baslatma aksiyonu ekle.

### 5) MVP Cikis Kriterleri

- [ ] **MVP-K1:** Kullanici `E1 -> E2 -> E2 Sonuc` akisini kesintisiz tamamlayabiliyor.
- [ ] **MVP-K2:** AI sonucu olarak 3 urun onerisi her tamamlanan testte gorunuyor.
- [ ] **MVP-K3:** Temel hata durumlari ele aliniyor (API hatasi, bos yanit, timeout).
- [ ] **MVP-K4:** Netlify uzerinde test ortamina alinmis calisan bir demo mevcut.
