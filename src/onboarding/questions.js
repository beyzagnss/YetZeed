export const CATEGORIES = /** @type {const} */ ({
  MEKAN: 'mekan',
  BUTCE: 'butce',
  ZAMAN: 'zaman',
  HEDEFLER: 'hedefler'
})

/**
 * @typedef {'text'|'number'|'single'|'multi'|'boolean'} QuestionType
 *
 * @typedef {Object} QuestionOption
 * @property {string} value
 * @property {string} label
 *
 * @typedef {Object} Question
 * @property {string} id
 * @property {'mekan'|'butce'|'zaman'|'hedefler'} category
 * @property {string} title
 * @property {string=} description
 * @property {QuestionType} type
 * @property {boolean=} required
 * @property {QuestionOption[]=} options
 * @property {Object=} meta
 */

/** @type {Question[]} */
export const QUESTIONS = [
  // Mekan (8)
  {
    id: 'mekan_1',
    category: CATEGORIES.MEKAN,
    title: 'Uretim yapacagin alan hangisi?',
    type: 'single',
    required: true,
    options: [
      { value: 'oda', label: 'Oda' },
      { value: 'balkon', label: 'Balkon' },
      { value: 'bodrum', label: 'Bodrum' },
      { value: 'teras', label: 'Teras' },
      { value: 'diger', label: 'Diger' }
    ]
  },
  {
    id: 'mekan_2',
    category: CATEGORIES.MEKAN,
    title: 'Yaklasik kullanilabilir alanin kac m²?',
    description: 'Ornek: 3 (m²)',
    type: 'number',
    required: true,
    meta: { min: 0.5, max: 200, step: 0.5, unit: 'm2' }
  },
  {
    id: 'mekan_3',
    category: CATEGORIES.MEKAN,
    title: 'Tavan yuksekligin uygun mu?',
    description: 'Raf/askilik sistemi icin en az ~2.2m tavsiye edilir.',
    type: 'single',
    required: true,
    options: [
      { value: 'dusuk', label: 'Dusuk (2.2m altı)' },
      { value: 'orta', label: 'Orta (2.2m - 2.6m)' },
      { value: 'yuksek', label: 'Yuksek (2.6m+)' }
    ]
  },
  {
    id: 'mekan_4',
    category: CATEGORIES.MEKAN,
    title: 'Gunde ortalama kac saat dogal isik aliyor?',
    type: 'single',
    required: true,
    options: [
      { value: '0_1', label: '0-1 saat' },
      { value: '1_3', label: '1-3 saat' },
      { value: '3_6', label: '3-6 saat' },
      { value: '6_plus', label: '6+ saat' }
    ]
  },
  {
    id: 'mekan_5',
    category: CATEGORIES.MEKAN,
    title: 'Yapay aydinlatma (LED) kullanabilir misin?',
    type: 'boolean',
    required: true
  },
  {
    id: 'mekan_6',
    category: CATEGORIES.MEKAN,
    title: 'Havalandirma/airflow imkanin var mi?',
    type: 'single',
    required: true,
    options: [
      { value: 'yok', label: 'Yok' },
      { value: 'sinirli', label: 'Sinirli' },
      { value: 'iyi', label: 'Iyi' }
    ]
  },
  {
    id: 'mekan_7',
    category: CATEGORIES.MEKAN,
    title: 'Suya erisim ve drenaj durumu nasil?',
    type: 'single',
    required: true,
    options: [
      { value: 'kolay', label: 'Kolay' },
      { value: 'orta', label: 'Orta' },
      { value: 'zor', label: 'Zor' }
    ]
  },
  {
    id: 'mekan_8',
    category: CATEGORIES.MEKAN,
    title: 'Bulundugun sehir/il?',
    description: 'Iklim ve tesvik uygunlugu icin kullanilir.',
    type: 'text',
    required: true
  },

  // Butce (7)
  {
    id: 'butce_1',
    category: CATEGORIES.BUTCE,
    title: 'Baslangic icin ayirabilecegin butce araligi nedir?',
    type: 'single',
    required: true,
    options: [
      { value: '0_5k', label: '0 - 5.000 TL' },
      { value: '5_15k', label: '5.000 - 15.000 TL' },
      { value: '15_50k', label: '15.000 - 50.000 TL' },
      { value: '50k_plus', label: '50.000 TL+' }
    ]
  },
  {
    id: 'butce_2',
    category: CATEGORIES.BUTCE,
    title: 'Aylik sabit giderleri karsilamakta zorlanir misin?',
    type: 'single',
    required: true,
    options: [
      { value: 'hayir', label: 'Hayir' },
      { value: 'bazen', label: 'Bazen' },
      { value: 'evet', label: 'Evet' }
    ]
  },
  {
    id: 'butce_3',
    category: CATEGORIES.BUTCE,
    title: 'Elektrik maliyeti senin icin kritik mi?',
    description: 'LED / iklimlendirme kullanimini etkileyebilir.',
    type: 'single',
    required: true,
    options: [
      { value: 'dusuk', label: 'Dusuk onem' },
      { value: 'orta', label: 'Orta' },
      { value: 'yuksek', label: 'Cok kritik' }
    ]
  },
  {
    id: 'butce_4',
    category: CATEGORIES.BUTCE,
    title: 'Ekipman teminini nasil yaparsin?',
    type: 'multi',
    required: true,
    options: [
      { value: 'ikinci_el', label: 'Ikinci el' },
      { value: 'sifir', label: 'Sifir' },
      { value: 'kendim_yaparim', label: 'Kendim yaparim/DIY' },
      { value: 'kiralama', label: 'Kiralama' }
    ]
  },
  {
    id: 'butce_5',
    category: CATEGORIES.BUTCE,
    title: 'Hibe/tesvik basvurusuna istekli misin?',
    type: 'boolean',
    required: true
  },
  {
    id: 'butce_6',
    category: CATEGORIES.BUTCE,
    title: 'Ilk satis hedefin nedir?',
    type: 'single',
    required: true,
    options: [
      { value: 'aile_cevresi', label: 'Aile/cevrem' },
      { value: 'pazar', label: 'Semt pazari' },
      { value: 'online', label: 'Online satis' },
      { value: 'kafe_restoran', label: 'Kafe/Restoran' }
    ]
  },
  {
    id: 'butce_7',
    category: CATEGORIES.BUTCE,
    title: 'Butce takibi yapma aliskanligin var mi?',
    type: 'single',
    required: true,
    options: [
      { value: 'duzenli', label: 'Duzenli' },
      { value: 'ara_sira', label: 'Ara sira' },
      { value: 'hic', label: 'Hic' }
    ]
  },

  // Zaman (8)
  {
    id: 'zaman_1',
    category: CATEGORIES.ZAMAN,
    title: 'Gunluk ayirabilecegin toplam sure nedir?',
    type: 'single',
    required: true,
    options: [
      { value: '0_15', label: '0-15 dk' },
      { value: '15_30', label: '15-30 dk' },
      { value: '30_60', label: '30-60 dk' },
      { value: '60_plus', label: '60 dk+' }
    ]
  },
  {
    id: 'zaman_2',
    category: CATEGORIES.ZAMAN,
    title: 'Haftanin kac gunu ilgilenebilirsin?',
    type: 'single',
    required: true,
    options: [
      { value: '1_2', label: '1-2 gun' },
      { value: '3_4', label: '3-4 gun' },
      { value: '5_6', label: '5-6 gun' },
      { value: '7', label: 'Her gun' }
    ]
  },
  {
    id: 'zaman_3',
    category: CATEGORIES.ZAMAN,
    title: 'Genelde hangi saat araliginda musait olursun?',
    type: 'multi',
    required: true,
    options: [
      { value: 'sabah', label: 'Sabah' },
      { value: 'ogle', label: 'Ogle' },
      { value: 'aksam', label: 'Aksam' },
      { value: 'gece', label: 'Gece' }
    ]
  },
  {
    id: 'zaman_4',
    category: CATEGORIES.ZAMAN,
    title: 'Rutininde “kesin musait degilim” dedigin saatler var mi?',
    description: 'Ornek: 09:00-12:00 gibi (MVP’de serbest metin).',
    type: 'text',
    required: false
  },
  {
    id: 'zaman_5',
    category: CATEGORIES.ZAMAN,
    title: 'Evde cocuk/bakim sorumlulugu var mi?',
    type: 'boolean',
    required: true
  },
  {
    id: 'zaman_6',
    category: CATEGORIES.ZAMAN,
    title: 'Bitki/mantar bakiminda deneyimin nedir?',
    type: 'single',
    required: true,
    options: [
      { value: 'yok', label: 'Yok' },
      { value: 'baslangic', label: 'Baslangic' },
      { value: 'orta', label: 'Orta' },
      { value: 'ileri', label: 'Ileri' }
    ]
  },
  {
    id: 'zaman_7',
    category: CATEGORIES.ZAMAN,
    title: 'Takvim/hatirlatici kullanmaya acik misin?',
    type: 'boolean',
    required: true
  },
  {
    id: 'zaman_8',
    category: CATEGORIES.ZAMAN,
    title: 'Uretim surecinde disiplinli takip senin icin kolay mi?',
    type: 'single',
    required: true,
    options: [
      { value: 'kolay', label: 'Kolay' },
      { value: 'orta', label: 'Orta' },
      { value: 'zor', label: 'Zor' }
    ]
  },

  // Hedefler (7)
  {
    id: 'hedef_1',
    category: CATEGORIES.HEDEFLER,
    title: 'Uretime baslama amacin nedir?',
    type: 'multi',
    required: true,
    options: [
      { value: 'ek_gelir', label: 'Ek gelir' },
      { value: 'girisim', label: 'Kendi girisimimi kurmak' },
      { value: 'hobi', label: 'Hobi/merak' },
      { value: 'surdurulebilirlik', label: 'Surdurulebilir yasam' }
    ]
  },
  {
    id: 'hedef_2',
    category: CATEGORIES.HEDEFLER,
    title: 'Ne kadar surede ilk geliri hedefliyorsun?',
    type: 'single',
    required: true,
    options: [
      { value: '1_3', label: '1-3 ay' },
      { value: '3_6', label: '3-6 ay' },
      { value: '6_12', label: '6-12 ay' },
      { value: 'esnek', label: 'Esnek' }
    ]
  },
  {
    id: 'hedef_3',
    category: CATEGORIES.HEDEFLER,
    title: 'Risk toleransin nedir?',
    type: 'single',
    required: true,
    options: [
      { value: 'dusuk', label: 'Dusuk' },
      { value: 'orta', label: 'Orta' },
      { value: 'yuksek', label: 'Yuksek' }
    ]
  },
  {
    id: 'hedef_4',
    category: CATEGORIES.HEDEFLER,
    title: 'Hangi urunler daha cok ilgini cekiyor?',
    type: 'multi',
    required: true,
    options: [
      { value: 'mantar', label: 'Mantar' },
      { value: 'safran', label: 'Safran' },
      { value: 'microgreens', label: 'Microgreens' },
      { value: 'otlar', label: 'Tibbi/aromatik otlar' }
    ]
  },
  {
    id: 'hedef_5',
    category: CATEGORIES.HEDEFLER,
    title: 'Satista nasil bir strateji dusunuyorsun?',
    type: 'single',
    required: true,
    options: [
      { value: 'hizli', label: 'Hizli satis (hizli donus)' },
      { value: 'premium', label: 'Premium/nis pazar' },
      { value: 'karisik', label: 'Karısık' }
    ]
  },
  {
    id: 'hedef_6',
    category: CATEGORIES.HEDEFLER,
    title: 'Markalasma/ambalaj gibi konularla ilgilenir misin?',
    type: 'boolean',
    required: true
  },
  {
    id: 'hedef_7',
    category: CATEGORIES.HEDEFLER,
    title: 'Urun seciminde “en onemli” kriterin hangisi?',
    type: 'single',
    required: true,
    options: [
      { value: 'karlilik', label: 'Karlilik' },
      { value: 'kolaylik', label: 'Kolay bakim' },
      { value: 'hiz', label: 'Hizli sonuc' },
      { value: 'butce', label: 'Dusuk baslangic maliyeti' }
    ]
  }
]

export function getQuestionsByCategory() {
  /** @type {Record<string, Question[]>} */
  const grouped = {
    [CATEGORIES.MEKAN]: [],
    [CATEGORIES.BUTCE]: [],
    [CATEGORIES.ZAMAN]: [],
    [CATEGORIES.HEDEFLER]: []
  }

  for (const q of QUESTIONS) grouped[q.category].push(q)
  return grouped
}

