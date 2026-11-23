import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { fronts } from '../data/history'

export const FRONT_STEP = 'history:front-step'

export function FrontMap() {
  const [active, setActive] = useState(0)
  const front = fronts[active]

  useEffect(() => {
    const update = (event: Event) => setActive((event as CustomEvent<number>).detail)
    window.addEventListener(FRONT_STEP, update)
    return () => window.removeEventListener(FRONT_STEP, update)
  }, [])

  return (
    <>
      <div className="map-canvas">
        <div className="map-camera" data-map-camera>
          <img src="/maps/fronts-base.svg" width="900" height="450" loading="lazy" alt="" />
          <svg viewBox="0 0 900 450" aria-hidden="true" className="map-overlay">
            <defs>
              <marker id="direction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="m0 0 10 5-10 5z" fill="#eab687" />
              </marker>
            </defs>
            {fronts.map((point, index) => (
              <g key={point.name} className={index === active ? 'map-point selected' : 'map-point'}>
                <circle cx={point.x} cy={point.y} r={index === active ? 20 : 11} className="map-halo" />
                <circle cx={point.x} cy={point.y} r="4.8" className="map-dot" />
                <text x={point.labelX} y={point.labelY}>{point.name}</text>
              </g>
            ))}
            <path key={front.name} d={front.route} markerEnd="url(#direction)" pathLength="1" className="map-route" />
          </svg>
          {fronts.map((point, index) => (
            <button key={point.name} className="map-pin" aria-label={point.name} aria-pressed={index === active}
              style={{ left: `${point.x / 9}%`, top: `${point.y / 4.5}%` }}
              onClick={() => setActive(index)} />
          ))}
        </div>
      </div>
      <div className="map-controls">
        <div role="group" aria-label="Майданды таңдау" className="map-choices">
          {fronts.map((point, index) => (
            <button key={point.name} aria-pressed={index === active} onClick={() => setActive(index)}>{point.name}</button>
          ))}
        </div>
        <div className="map-note" aria-live="polite" aria-atomic="true">
          <span className="map-period"><ArrowUpRight size={14} aria-hidden="true" />{front.period}</span>
          <p>{front.text}</p>
        </div>
      </div>
    </>
  )
}
