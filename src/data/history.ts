export const chapters = [
  { id: 'kirispe', title: 'Кіріспе', dark: true },
  { id: 'sebepter', title: 'Соғыстың себептері', dark: false },
  { id: 'bastaluy', title: 'Соғыстың басталуы', dark: false },
  { id: 'kushter', title: 'Қарсыласушы күштер', dark: true },
  { id: 'maidandar', title: 'Негізгі майдандар', dark: true },
  { id: '1919', title: 'Бетбұрыс жылы', dark: false },
  { id: '1920', title: 'Соғыстың аяқталуы', dark: true },
  { id: 'korytyndy', title: 'Қорытынды', dark: false },
] as const

export const archive = {
  cavalry: {
    file: 'alash-soldiers', w: 1218, h: 638,
    alt: 'Ат үстінде қатар тұрған Алаш сарбаздары',
    caption: 'Алаш сарбаздары. Семей, 1919 жыл.',
    source: 'Alash_soldiers_in_Semipalatinsk_1919.png', rights: 'PD-US-expired',
  },
  station: {
    file: 'station', w: 1391, h: 902,
    alt: 'Орынбор теміржол вокзалының екі қабатты ғимараты',
    caption: 'Орынбор вокзалы. Ашықхат, 1910 жыл.',
    source: 'Оренбург._Вокзал._Почтовая_открытка.jpg', rights: 'Қоғамдық игілік',
  },
  alash: {
    file: 'alash', w: 946, h: 670,
    alt: 'Семейде бірге суретке түскен Алаш зиялылары',
    caption: 'Алаш зиялылары. Семей, 1918 жыл.',
    source: 'Alash_intelligentsia,_Semipalatinsk,_1918.jpg', rights: 'Қоғамдық игілік',
  },
  reds: {
    file: 'reds', w: 965, h: 714,
    alt: 'Азамат соғысына аттанар алдында топ болып суретке түскен қызыл әскерилер',
    caption: 'Қызыл әскер жауынгерлері. Соғыс кезеңін танытатын сурет.',
    source: 'The_Red_Army_before_being_sent_to_the_Civil_War.JPG', rights: 'Қоғамдық игілік',
  },
  whites: {
    file: 'whites', w: 1200, h: 926,
    alt: 'Сапқа тұрған Колчак әскері',
    caption: 'Колчак әскері, 1919 жыл. Кезеңді танытатын сурет.',
    source: 'Kolchak1919troops.jpg', rights: 'Қоғамдық игілік',
  },
  retreat: {
    file: 'retreat', w: 780, h: 558,
    alt: 'Ашық далада жаяу және атпен кетіп бара жатқан адамдар',
    caption: 'Колчак әскерінің шегінуі, 1919 жыл. Соғыс кезеңін танытатын сурет.',
    source: 'Kolchak_troops_retreat_1919.jpg', rights: 'PD-US',
  },
  decree: {
    file: 'decree', w: 810, h: 790,
    alt: 'Алашорда халық кеңесінің бланкісіне қолмен жазылған құжат',
    caption: 'Алашорда құжаты, 1918 жыл.',
    source: 'Alash_Orda_document_1918.jpg', rights: 'Қоғамдық игілік',
  },
} as const

export type ArchiveImage = (typeof archive)[keyof typeof archive]

export const events1918 = [
  {
    date: 'Мамыр',
    title: 'Чехословак корпусы көтеріліске шықты',
    text: 'Теміржол бойындағы қарулы көтеріліс соғыстың Сібір мен Қазақстанның солтүстігіне таралуын жеделдетті.',
  },
  {
    date: 'Маусым',
    title: 'Семейде Кеңес билігі құлады',
    text: 'Солтүстік пен шығыстағы бірқатар қаланы Кеңес билігіне қарсы күштер алды. Семей Алашорда қызметінің маңызды орталығы болды.',
  },
  {
    date: 'Шілде',
    title: 'Дутов Орынборды алды',
    text: 'Орынбор арқылы өтетін теміржол үзілді. Кеңестік Түркістанның орталық Ресеймен тікелей теміржол қатынасы тоқтады.',
  },
]

export const fronts = [
  { name: 'Орынбор', period: '1918 шілде · 1919 қаңтар', x: 210, y: 97, labelX: 227, labelY: 81,
    route: 'M210 97 Q228 121 259 142 T332 245', text: 'Дутов әскері 1918 жылы қаланы алды. 1919 жылғы қаңтарда Қызыл әскер Орынборға қайта кірді. Қала Түркістанға баратын теміржолда тұрды.' },
  { name: 'Орал', period: '1919 қаңтар · шілде', x: 124, y: 114, labelX: 42, labelY: 116,
    route: 'M105 74 Q133 96 124 114 T114 204', text: 'Қызыл әскер қаңтарда қаланы алды. Көктемде Оралды ақ казактар қоршады. Қоршау шілдеде бұзылды.' },
  { name: 'Ақтөбе', period: '1918 күз · 1919 қыркүйек', x: 259, y: 142, labelX: 275, labelY: 158,
    route: 'M226 110 Q278 162 295 185 T341 256', text: 'Ақтөбе майданы теміржол бойын қорғады. 1919 жылғы қыркүйекте жергілікті қызыл бөлімдер Түркістан майданының әскерімен қосылды.' },
  { name: 'Жетісу', period: '1918 жаз · 1920 наурыз', x: 743, y: 292, labelX: 758, labelY: 315,
    route: 'M821 228 Q782 254 743 292 T696 355', text: 'Солтүстік Жетісуда ақтар мен қызылдар ұзақ шайқасты. Черкасск қорғанысы осы майдандағы ірі оқиғалардың бірі еді. Майдан 1920 жылғы наурызда жойылды.' },
] as const

export const sources = [
  { title: 'Қазақстан азаматтық қарсыластық жылдарында (1917–1920)', by: 'Қазақстан тарихы порталы', url: 'https://e-history.kz/kz/history-of-kazakhstan/show/33831' },
  { title: 'Қазақстан азамат соғысы қарсаңында', by: 'Қазақстан тарихы порталы', url: 'https://e-history.kz/kz/history-of-kazakhstan/show/8963' },
  { title: 'Алаш автономиясы және кеңестер билігі', by: 'Қазақстан тарихы порталы', url: 'https://e-history.kz/kz/history-of-kazakhstan/show/8942' },
  { title: 'Алаш әскері: құрылуы мен қызметі', by: 'Қазақстан тарихы порталы', url: 'https://e-history.kz/kz/history-of-kazakhstan/show/8943' },
  { title: 'Қазақстан тарихы', by: 'Б. Абдуғұлова, А. Қапаева, Г. Кенжебаев · оқулық', url: 'https://e-history.kz/storage/upload/library_kk_files/iblock/ef0/ef0495bcdd051ab9155b571674d83bc8.pdf' },
]

export const archiveUrl = (item: ArchiveImage) => 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(item.source)
