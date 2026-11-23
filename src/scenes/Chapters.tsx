import { ArrowDown, ArrowUpRight, RotateCcw } from 'lucide-react'
import { Eyebrow, Frame, Lines } from '../components/Editions'
import { FrontMap } from '../components/FrontMap'
import { archive, events1918 } from '../data/history'

export function Introduction() {
  return (
    <div className="stage hero">
      <Frame item={archive.cavalry} className="hero-photo" priority />
      <div className="hero-shade" />
      <div className="hero-content">
        <Eyebrow>1918–1920 жылдар</Eyebrow>
        <h1 aria-label="Азамат соғысы жылдарындағы Қазақстан" tabIndex={-1}>
          <span className="hero-prefix line" aria-hidden="true">
            <span data-title-word>АЗАМАТ</span>{' '}<span data-title-word>СОҒЫСЫ</span>{' '}<span data-title-word>ЖЫЛДАРЫНДАҒЫ</span>
          </span>
          <span className="hero-title line" aria-hidden="true"><span data-title-word>ҚАЗАҚСТАН</span></span>
        </h1>
        <p className="hero-deck">Соғыс қазақ даласына қалай жетті және елдің тағдырын қалай өзгертті?</p>
      </div>
      <div className="hero-foot">
        <p className="image-credit">{archive.cavalry.caption}</p>
        <a className="scroll-cue" href="#sebepter"><span>Жалғастыру</span><ArrowDown size={18} aria-hidden="true" /></a>
      </div>
      <div className="light-leak" aria-hidden="true" />
    </div>
  )
}

export function Causes() {
  return (
    <div className="stage causes">
      <div className="cause-copy editorial-copy" data-copy>
        <Eyebrow>1917 жыл</Eyebrow>
        <h2 aria-label="Азамат соғысының себептері" tabIndex={-1}><Lines lines={['Азамат соғысының', 'себептері']} /></h2>
        <p>1917 жылғы Ақпан төңкерісінен кейін патша билігі құлады. Уақытша үкімет пен жұмысшы және солдат кеңестері билікке таласты. Қазақ зиялылары ұлттық автономия құруды көздеді.</p>
        <p>Қазан төңкерісінде большевиктер билікке келді. Қарсыластары жаңа өкіметті мойындамады. Желтоқсанда қазақ съезі Алаш автономиясын құру туралы шешім қабылдады. Билік пен елдің болашағы жөніндегі қайшылықтар қарулы күреске ұласты.</p>
      </div>
      <Frame item={archive.station} className="cause-photo portal" />
      <p className="image-credit cause-credit">{archive.station.caption}</p>
    </div>
  )
}

export function Beginning() {
  return (
    <div className="stage beginning">
      <div className="beginning-visual">
        <Frame item={archive.station} className="timeline-match" decorative />
        <Frame item={archive.alash} className="timeline-photo" />
        <span className="timeline-year" aria-hidden="true">1918</span>
        <p className="image-credit">{archive.alash.caption}</p>
      </div>
      <div className="timeline-copy">
        <Eyebrow>1918 жыл</Eyebrow>
        <h2 aria-label="Соғыстың басталуы" tabIndex={-1}><Lines lines={['Соғыстың', 'басталуы']} /></h2>
        <div className="events-wrap">
          <span className="events-progress" aria-hidden="true" />
          <ol className="events">
            {events1918.map(event => (
              <li key={event.date} data-event>
                <span className="event-date">{event.date}</span>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

const factions = [
  { image: archive.reds, name: 'Қызыл әскер', text: 'Большевиктер құрған әскер Кеңес билігін сақтап, оны бүкіл елге орнатуға ұмтылды.' },
  { image: archive.whites, name: 'Ақ гвардия', text: 'Кеңес билігіне қарсы күштер. Қазақ өлкесінде Дутовтың казактары мен Колчак әскері әрекет етті.' },
  { image: archive.alash, name: 'Алаш қозғалысы', text: 'Алашорда қазақ автономиясын қорғауды көздеді. 1918 жылы ақтармен уақытша одақтасты. 1919 жылы Алаш қайраткерлерінің бір бөлігі Кеңес өкіметімен келіссөз жүргізіп, кеңестік мекемелерде қызмет ете бастады.' },
]

export function Factions() {
  return (
    <div className="stage factions">
      <div className="faction-strips" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((strip) => <span key={strip} data-strip />)}
      </div>
      <div className="factions-heading">
        <Eyebrow>1918–1919 жылдар</Eyebrow>
        <h2 aria-label="Қарсыласушы күштер" tabIndex={-1}><Lines lines={['Қарсыласушы күштер']} /></h2>
      </div>
      <div className="faction-layout">
        {factions.map(({ image, name, text }, index) => (
          <article key={name} className={'faction faction-' + index} data-faction>
            <figure>
              <Frame item={image} />
              <figcaption className="image-credit">{image.caption}</figcaption>
            </figure>
            <h3>{name}</h3><p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function Fronts() {
  return (
    <div className="stage fronts">
      <div className="fronts-heading">
        <Eyebrow>1918–1920 жылдар</Eyebrow>
        <h2 aria-label="Қазақстандағы негізгі майдандар" tabIndex={-1}><Lines lines={['Негізгі майдандар']} /></h2>
      </div>
      <FrontMap />
      <p className="map-disclaimer">Сызба карта. Бағыттар шартты түрде көрсетілген.</p>
      <span className="map-cover" aria-hidden="true" />
    </div>
  )
}

export function TurningPoint() {
  return (
    <div className="stage turning">
      <Frame item={archive.retreat} className="turn-photo portal" />
      <div className="turning-copy editorial-copy" data-copy>
        <Eyebrow>Бетбұрыс жылы</Eyebrow>
        <h2 aria-label="1919 жыл" tabIndex={-1}><Lines lines={['1919']} /></h2>
        <p>Қызыл әскер Шығыс майданда Колчак әскерін шегіндірді. Жыл соңына қарай қазақ өлкесінің көп бөлігінде Кеңес билігі қайта орнады.</p>
        <p><strong>10 шілде.</strong> Өлкені уақытша басқару үшін Қазақ революциялық комитеті — Қазревком құрылды.</p>
      </div>
      <figure className="turn-insert">
        <Frame item={archive.cavalry} />
        <figcaption className="image-credit">{archive.cavalry.caption}</figcaption>
      </figure>
      <p className="image-credit turn-credit">{archive.retreat.caption}</p>
      <div className="turn-wash" aria-hidden="true" />
    </div>
  )
}

export function EndOfWar() {
  return (
    <div className="stage ending">
      <Frame item={archive.retreat} className="end-photo" />
      <div className="end-shade" />
      <div className="ending-layout">
        <div className="end-date" aria-hidden="true"><Lines lines={['1920']} /></div>
        <div className="end-copy">
          <Eyebrow>1920 жыл · наурыз</Eyebrow>
          <h2 aria-label="Соғыстың аяқталуы" tabIndex={-1}><Lines lines={['Соғыстың', 'аяқталуы']} /></h2>
          <p>Наурызда Солтүстік Жетісу майданы жойылды. Қазақстандағы негізгі шайқастар аяқталып, Кеңес билігі орнықты.</p>
          <p>Соғыс адам шығынына әкелді, шаруашылық пен көлік қатынасын әлсіретті.</p>
        </div>
      </div>
      <p className="image-credit end-credit">{archive.retreat.caption}</p>
      <div className="iris" aria-hidden="true" />
    </div>
  )
}

export function Conclusion({ onSources }: { onSources: () => void }) {
  return (
    <div className="stage conclusion">
      <div className="conclusion-copy">
        <Eyebrow>Қорытынды</Eyebrow>
        <h2 aria-label="Тарихтан тағылым" tabIndex={-1}><Lines lines={['ТАРИХТАН', 'ТАҒЫЛЫМ']} /></h2>
        <p>Соғыстан кейін Кеңес өкіметі орнықты, Алашорда таратылды. 1920 жылғы <strong>26 тамызда</strong> РКФСР құрамында Қазақ АКСР-ін құру туралы декрет шықты. <strong>4 қазанда</strong> Орынборда автономияның Құрылтай съезі ашылды.</p>
        <p>Бұл кезең қазақ жерін бір автономияға біріктіру жолындағы маңызды белес болды. Соғыстан кейін елдің алдында шаруашылықты қалпына келтіру міндеті тұрды.</p>
        <div className="conclusion-actions">
          <a href="#kirispe"><RotateCcw size={16} aria-hidden="true" />Қайта көру</a>
          <button type="button" onClick={onSources}>Дереккөздер<ArrowUpRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
      <figure className="conclusion-figure">
        <Frame item={archive.decree} />
        <figcaption className="image-credit">{archive.decree.caption}</figcaption>
      </figure>
    </div>
  )
}
