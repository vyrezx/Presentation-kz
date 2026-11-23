import type { ReactNode } from 'react'
import type { ArchiveImage } from '../data/history'

export function Frame({ item, className = '', priority = false, decorative = false }: {
  item: ArchiveImage
  className?: string
  priority?: boolean
  decorative?: boolean
}) {
  return (
    <div className={'photo ' + className}>
      <img src={'/images/' + item.file + '.webp'} width={item.w} height={item.h}
        alt={decorative ? '' : item.alt} loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined} decoding="async" />
    </div>
  )
}

export function Lines({ lines }: { lines: string[] }) {
  return <span aria-hidden="true" className="lines">{lines.map((line) => (
    <span className="line" key={line}><span data-line>{line}</span></span>
  ))}</span>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><i aria-hidden="true" />{children}</p>
}
