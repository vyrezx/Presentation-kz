import { memo, useEffect, useRef, useState } from 'react'
import type { MouseEvent, RefObject } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStoryMotion } from './animations/useStoryMotion'
import { ChapterRail, MobileChapterNav, PresentationHeader, StoryDialogs } from './components/Presentation'
import { chapters } from './data/history'
import { Beginning, Causes, Conclusion, EndOfWar, Factions, Fronts, Introduction, TurningPoint } from './scenes/Chapters'

const scenes = [Introduction, Causes, Beginning, Factions, Fronts, TurningPoint, EndOfWar, Conclusion]
const Story = memo(function Story({ root, sources }: {
  root: RefObject<HTMLElement | null>
  sources: RefObject<HTMLDialogElement | null>
}) {
  return (
    <main ref={root} id="oqiga" tabIndex={-1}>
      {chapters.map((chapter, index) => {
        const Scene = scenes[index]
        return (
          <section key={chapter.id} id={chapter.id} data-chapter aria-label={chapter.title}>
            <Scene onSources={() => sources.current?.showModal()} />
            <MobileChapterNav index={index} />
          </section>
        )
      })}
    </main>
  )
})

function sectionTop(id: string) {
  const section = document.getElementById(id)
  return section ? section.getBoundingClientRect().top + window.scrollY : 0
}

function goTo(index: number) {
  const chapter = chapters[index]
  if (!chapter) return
  window.history.replaceState(null, '', '#' + chapter.id)
  window.scrollTo({ top: sectionTop(chapter.id), behavior: 'instant' })
  document.getElementById(chapter.id)?.querySelector<HTMLElement>('h1,h2')?.focus({ preventScroll: true })
}

export default function App() {
  const root = useRef<HTMLElement>(null)
  const contents = useRef<HTMLDialogElement>(null)
  const sources = useRef<HTMLDialogElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  useStoryMotion(root)

  useEffect(() => {
    let frame = 0
    let offsets: number[] = []
    let maxScroll = 0
    const renderScroll = () => {
      frame = 0
      const scrolled = window.scrollY
      const upcoming = offsets.findIndex(offset => offset > scrolled + window.innerHeight * 0.29)
      const next = upcoming < 0 ? Math.max(0, offsets.length - 1) : Math.max(0, upcoming - 1)
      if (activeRef.current !== next) {
        activeRef.current = next
        setActive(next)
      }
      if (progress.current) progress.current.style.transform = `scaleX(${maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0})`
    }

    const update = () => { if (!frame) frame = requestAnimationFrame(renderScroll) }
    const measure = () => {
      offsets = chapters.map(({ id }) => sectionTop(id))
      maxScroll = document.documentElement.scrollHeight - window.innerHeight
      update()
    }
    const jumpToHash = () => {
      const id = window.location.hash.slice(1)
      if (chapters.some(chapter => chapter.id === id)) window.scrollTo({ top: sectionTop(id), behavior: 'instant' })
    }
    const keydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return
      if ((event.target as HTMLElement).closest('dialog, .map-controls, .map-canvas, input, textarea, select, [contenteditable]')) return
      const next = event.key === 'ArrowRight' || event.key === 'ArrowDown'
      const previous = event.key === 'ArrowLeft' || event.key === 'ArrowUp'
      if (!next && !previous && event.key !== 'Home' && event.key !== 'End') return
      event.preventDefault()
      if (event.key === 'Home') goTo(0)
      else if (event.key === 'End') goTo(chapters.length - 1)
      else goTo(activeRef.current + (next ? 1 : -1))
    }

    const fullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement))
    const observer = new ResizeObserver(measure)
    if (root.current) observer.observe(root.current)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('hashchange', jumpToHash)
    window.addEventListener('keydown', keydown)
    document.addEventListener('fullscreenchange', fullscreenChange)
    ScrollTrigger.addEventListener('refresh', measure)
    jumpToHash()
    measure()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', measure)
      window.removeEventListener('hashchange', jumpToHash)
      window.removeEventListener('keydown', keydown)
      document.removeEventListener('fullscreenchange', fullscreenChange)
      ScrollTrigger.removeEventListener('refresh', measure)
    }
  }, [])

  const [fullscreenError, setFullscreenError] = useState(false)
  const toggleFullscreen = async () => {
    setFullscreenError(false)
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await document.documentElement.requestFullscreen()
    } catch {
      setFullscreenError(true)
    }
  }

  const handleChapterLink = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    const hash = (event.target as Element).closest('a')?.getAttribute('href')
    const index = chapters.findIndex(({ id }) => '#' + id === hash)
    if (index < 0) return
    event.preventDefault()
    contents.current?.close()
    goTo(index)
  }

  return (
    <div className="presentation" onClick={handleChapterLink}>
      <a className="skip-link" href="#oqiga">Мазмұнға өту</a>
      <PresentationHeader active={active} progress={progress} onContents={() => contents.current?.showModal()}
        fullscreen={fullscreen} fullscreenSupported={document.fullscreenEnabled === true} onFullscreen={toggleFullscreen} />
      <ChapterRail active={active} />
      <Story root={root} sources={sources} />
      <StoryDialogs contentsRef={contents} sourcesRef={sources} active={active} />
      {fullscreenError && <p className="fullscreen-error" role="status">Браузер толық экран режимін аша алмады.</p>}
    </div>
  )
}
