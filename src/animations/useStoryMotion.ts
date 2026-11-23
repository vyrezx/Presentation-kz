import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FRONT_STEP } from '../components/FrontMap'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function useStoryMotion(root: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (!root.current) return
    const sections = Array.from(root.current.querySelectorAll<HTMLElement>('[data-chapter]'))
    const media = gsap.matchMedia()

    media.add({
      wide: '(min-width: 960px) and (min-height: 680px)',
      narrow: '(max-width: 959px), (max-height: 679px)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, ({ conditions }) => {
      if (conditions?.reduced) return
      const wide = conditions?.wide
      const pinLengths = [0.65, 0.85, 1.12, 0.65, 1.15, 0.9, 0.62]
      const intro = sections[0]
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(intro.querySelectorAll('[data-title-word]'), { yPercent: 108, duration: 0.9, stagger: 0.08 }, 0)
        .from(intro.querySelectorAll('.hero-content .eyebrow, .hero-deck'), { opacity: 0, y: 8, duration: 0.65, stagger: 0.11 }, 0.22)

      sections.forEach((section, index) => {
        const stage = section.querySelector<HTMLElement>('.stage')!
        const select = (selector: string) => stage.querySelectorAll(selector)
        if (index > 0) {
          gsap.from(select('[data-line]'), {
            yPercent: 106, opacity: 0.3, stagger: 0.07, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 88%', end: 'top 12%', scrub: 0.2 },
          })
        }

        if (!wide || index === 7) {
          if (index === 0 || index === 5 || index === 6 || index === 7) {
            const photo = select(index === 7 ? '.conclusion-figure img' : '.photo:first-child img')
            if (photo.length) gsap.fromTo(photo, { scale: 1.03 }, {
              scale: index === 7 ? 1.13 : 1.21, ease: 'none',
              scrollTrigger: { trigger: section, start: 'clamp(top bottom)', end: 'clamp(bottom top)', scrub: 0.45 },
            })
          }
          if (!wide && index === 1) {
            const photo = select('.cause-photo')
            gsap.fromTo(photo, { clipPath: 'inset(6% 12% 8% 4%)' }, {
              clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
              scrollTrigger: { trigger: photo[0], start: 'top 98%', end: 'top 51%', scrub: 0.25 },
            })
          }
          if (!wide && index === 2) {
            gsap.from(select('.events-progress'), {
              scaleY: 0, ease: 'none',
              scrollTrigger: { trigger: select('.events-wrap')[0], start: 'top 82%', end: 'bottom 49%', scrub: 0.26 },
            })
          }
          if (!wide && index === 3) {
            select('.faction .photo').forEach((photo, position) => {
              gsap.fromTo(photo.querySelector('img'), { scale: 1.17, yPercent: position % 2 ? -4 : 4 }, {
                scale: 1.02, yPercent: 0, ease: 'none',
                scrollTrigger: { trigger: photo, start: 'top bottom', end: 'top 36%', scrub: 0.34 },
              })
            })
          }
          return
        }

        const reel = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section, pin: stage, pinType: 'transform', start: 'top top',
            end: () => '+=' + Math.round(stage.offsetHeight * pinLengths[index]),
            scrub: 0.38, anticipatePin: 1,
          },
        })

        switch (index) {
          case 0:
            reel.to(select('.hero-photo img'), { scale: 1.23, yPercent: -4, duration: 1 }, 0)
              .to(select('.hero-content'), { yPercent: -20, opacity: 0.2, duration: 0.55 }, 0.38)
              .to(select('.hero-foot'), { autoAlpha: 0, duration: 0.3 }, 0.48)
              .fromTo(select('.light-leak'), { yPercent: 115 }, { yPercent: 0, duration: 0.63, ease: 'power2.inOut' }, 0.37)
            break
          case 1:
            reel.to(select('.cause-photo img'), { scale: 1.19, x: 0, xPercent: 0, duration: 0.74, ease: 'power2.inOut' }, 0.26)
              .to(select('.cause-photo'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.56, ease: 'power2.inOut' }, 0.44)
              .to(select('[data-copy]'), { xPercent: -20, opacity: 0, duration: 0.34 }, 0.48)
              .to(select('.cause-credit'), { opacity: 0, duration: 0.35 }, 0.55)
            break
          case 2:
            reel.to(select('.timeline-match'), { opacity: 0, scale: 1.17, duration: 0.55 }, 0)
              .fromTo(select('.timeline-photo img'), { scale: 1.15 }, { scale: 1.02, duration: 1 }, 0)
              .fromTo(select('.events-progress'), { scaleY: 0.06 }, { scaleY: 1, duration: 0.87, ease: 'power1.inOut' }, 0.03)
              .from(select('[data-event]:nth-child(n+2)'), { y: 18, opacity: 0.68, duration: 0.29, stagger: 0.22, ease: 'power2.out' }, 0.16)
              .from(select('.timeline-year'), { yPercent: 20, opacity: 0.35, duration: 0.48 }, 0.03)
            break
          case 3: {
            const introStrips = gsap.timeline({
              scrollTrigger: { trigger: section, start: 'top 92%', end: 'top 3%', scrub: 0.3 },
            })
            introStrips.fromTo(select('[data-strip]'), { yPercent: 0 }, { yPercent: -103, duration: 0.65, stagger: 0.075, ease: 'power2.inOut' }, 0)
              .from(select('[data-faction] .photo'), { clipPath: 'inset(0% 100% 0% 0%)', duration: 0.48, stagger: 0.09 }, 0.14)
            reel.to(select('.faction-0 img'), { scale: 1.18, xPercent: -4, duration: 1 }, 0)
              .to(select('.faction-1 img'), { scale: 1.14, yPercent: 4, duration: 1 }, 0)
              .to(select('.faction-2 img'), { scale: 1.15, xPercent: 3, duration: 1 }, 0)
              .to(select('.faction-1'), { yPercent: -9, duration: 1 }, 0)
              .to(select('.faction-2'), { yPercent: 7, duration: 1 }, 0)
            break
          }
          case 4: {
            let step = 0
            reel.to(select('[data-map-camera]'), { scale: 1.1, xPercent: 1.5, yPercent: -1, duration: 0.58 }, 0)
              .to(select('[data-map-camera]'), { xPercent: -2, yPercent: -3, duration: 0.42 }, 0.58)
              .fromTo(select('.map-cover'), { scaleY: 0 }, { scaleY: 1, duration: 0.16, ease: 'power2.in' }, 0.84)
            reel.eventCallback('onUpdate', () => {
              const next = Math.min(3, Math.floor(reel.progress() * 5.2))
              if (next === step) return
              step = next
              window.dispatchEvent(new CustomEvent(FRONT_STEP, { detail: step }))
            })
            break
          }
          case 5:
            reel.to(select('.turn-photo img'), { scale: 1.16, yPercent: -2, duration: 1 }, 0)
              .to(select('.turn-insert'), { xPercent: 35, yPercent: 24, opacity: 0, duration: 0.56 }, 0.3)
              .to(select('.turn-photo'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.58, ease: 'power2.inOut' }, 0.36)
              .to(select('[data-copy]'), { xPercent: -25, opacity: 0, duration: 0.37 }, 0.38)
              .to(select('.turn-credit'), { opacity: 0, duration: 0.3 }, 0.58)
              .to(select('.turn-wash'), { opacity: 0.56, duration: 0.2 }, 0.8)
            break
          case 6:
            reel.fromTo(select('.end-photo img'), { scale: 1.12 }, { scale: 1.28, yPercent: -3, duration: 1 }, 0)
              .to(select('.end-date'), { xPercent: -8, duration: 0.8 }, 0.07)
              .fromTo(select('.iris'), { scale: 0, opacity: 0.45 }, { scale: 1, opacity: 1, ease: 'power2.inOut', duration: 0.61 }, 0.39)
            break
        }
      })
      ScrollTrigger.refresh()
    })

    let mounted = true
    void document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh() })
    return () => { mounted = false; media.revert() }
  }, { scope: root })
}
