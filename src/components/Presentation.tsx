import type { RefObject } from 'react'
import { Aperture, ArrowDown, ArrowUp, ArrowUpRight, BookOpen, Expand, List, Minimize, X } from 'lucide-react'
import { archive, archiveUrl, chapters, sources } from '../data/history'

export function PresentationHeader({ active, progress, onContents, onFullscreen, fullscreen, fullscreenSupported }: {
  active: number
  progress: RefObject<HTMLSpanElement | null>
  onContents: () => void
  onFullscreen: () => void
  fullscreen: boolean
  fullscreenSupported: boolean
}) {
  return (
    <header className="masthead" data-dark={chapters[active].dark}>
      <a className="brand" href="#kirispe"><Aperture size={20} strokeWidth={1.3} aria-hidden="true" /><span>Қазақстан тарихы</span></a>
      <div className="masthead-actions">
        <button type="button" className="contents-button" onClick={onContents} aria-haspopup="dialog">
          <List size={17} aria-hidden="true" /><span>Мазмұны</span>
        </button>
        {fullscreenSupported && <button type="button" className="fullscreen-button"
          onClick={onFullscreen} aria-label={fullscreen ? 'Толық экраннан шығу' : 'Толық экран'}>
          {fullscreen ? <Minimize size={18} aria-hidden="true" /> : <Expand size={18} aria-hidden="true" />}
        </button>}
      </div>
      <div className="masthead-progress" aria-hidden="true"><span ref={progress} /></div>
    </header>
  )
}

export function ChapterRail({ active }: { active: number }) {
  const previous = chapters[active - 1]
  const next = chapters[active + 1]
  return (
    <>
      <nav className="chapter-rail" aria-label="Тараулар" data-dark={chapters[active].dark}>
        {chapters.map((chapter, index) => (
          <a key={chapter.id} href={'#' + chapter.id} aria-label={chapter.title}
            aria-current={index === active ? 'location' : undefined}><span /></a>
        ))}
      </nav>
      <nav className="chapter-foot" aria-label="Алдыңғы және келесі тарау" data-dark={chapters[active].dark}>
        <span className="counter" aria-label={`${active + 1}-тарау, барлығы 8 тарау`}>
          {String(active + 1).padStart(2, '0')} <span>/ 08</span>
        </span>
        <div className="chapter-arrows">
          {previous
            ? <a href={'#' + previous.id} aria-label="Алдыңғы тарау"><ArrowUp size={15} aria-hidden="true" /></a>
            : <span className="unavailable"><ArrowUp size={15} aria-hidden="true" /></span>}
          {next
            ? <a href={'#' + next.id} aria-label="Келесі тарау"><ArrowDown size={15} aria-hidden="true" /></a>
            : <span className="unavailable"><ArrowDown size={15} aria-hidden="true" /></span>}
        </div>
      </nav>
    </>
  )
}

export function MobileChapterNav({ index }: { index: number }) {
  const previous = chapters[index - 1]
  const next = chapters[index + 1]
  return (
    <nav className="mobile-chapter-nav" aria-label="Алдыңғы және келесі тарау" data-dark={chapters[index].dark}>
      {previous
        ? <a href={'#' + previous.id} aria-label="Алдыңғы тарау"><ArrowUp size={16} aria-hidden="true" />Алдыңғы</a>
        : <span />}
      <span>{String(index + 1).padStart(2, '0')} / 08</span>
      {next
        ? <a href={'#' + next.id} aria-label="Келесі тарау">Келесі<ArrowDown size={16} aria-hidden="true" /></a>
        : <span />}
    </nav>
  )
}

export function StoryDialogs({ contentsRef, sourcesRef, active }: {
  contentsRef: RefObject<HTMLDialogElement | null>
  sourcesRef: RefObject<HTMLDialogElement | null>
  active: number
}) {
  return (
    <>
      <dialog ref={contentsRef} aria-labelledby="contents-title" className="story-dialog">
        <div className="dialog-heading">
          <h2 id="contents-title">Мазмұны</h2>
          <form method="dialog"><button aria-label="Мазмұнды жабу"><X size={23} aria-hidden="true" /></button></form>
        </div>
        <nav aria-label="Барлық тарау" className="dialog-chapters">
          {chapters.map((chapter, index) => (
            <a key={chapter.id} href={'#' + chapter.id} aria-current={index === active ? 'location' : undefined}>
              <span>0{index + 1}</span>{chapter.title}<ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </dialog>
      <dialog ref={sourcesRef} aria-labelledby="sources-title" className="story-dialog sources-dialog">
        <div className="dialog-heading">
          <h2 id="sources-title">Дереккөздер</h2>
          <form method="dialog"><button aria-label="Дереккөздерді жабу"><X size={23} aria-hidden="true" /></button></form>
        </div>
        <h3><BookOpen size={17} aria-hidden="true" />Тарихи әдебиет</h3>
        <ul className="source-list">{sources.map((source) => (
          <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}<ArrowUpRight size={15} aria-hidden="true" /></a><span>{source.by}</span></li>
        ))}</ul>
        <h3>Архив суреттері</h3>
        <ul className="source-list">{Object.values(archive).map(item => (
          <li key={item.file}><a href={archiveUrl(item)} target="_blank" rel="noreferrer">{item.caption}<ArrowUpRight size={15} aria-hidden="true" /></a>
            <span>Wikimedia Commons · {item.rights}</span></li>
        ))}</ul>
        <p>Сызба картада географиялық нысандар мен соғыс бағыттары ықшамдалып берілген.</p>
      </dialog>
    </>
  )
}
