import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { chapters, fronts } from '../src/data/history'

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
]

async function openStory(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('[data-chapter]')).toHaveCount(8)
}

async function scrollIntoChapter(page: Page, id: string, distance = 0) {
  await page.locator(`[id="${id}"]`).evaluate((section, offset) => {
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + offset)
  }, distance)
}

for (const viewport of viewports) {
  test(`eight scenes fit and load at ${viewport.width}×${viewport.height}`, async ({ page }, info) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text()) })
    page.on('requestfailed', request => errors.push(`${request.url()} ${request.failure()?.errorText}`))
    page.on('response', response => { if (!response.ok() && response.status() !== 304) errors.push(`${response.status()} ${response.url()}`) })
    await openStory(page)

    for (const [index, chapter] of chapters.entries()) {
      const distance = viewport.width >= 960
        ? index === 2 ? Math.round(viewport.height * .88) : index === 4 ? 245 : index > 0 && index < 7 ? 70 : 0
        : 0
      await scrollIntoChapter(page, chapter.id, distance)
      const section = page.locator(`[id="${chapter.id}"]`)
      const heading = section.locator('h1,h2')
      await expect(heading).toBeInViewport({ ratio: 0.45 })
      if (viewport.width < 960) {
        for (const image of await section.locator('img:visible').all()) {
          await image.scrollIntoViewIfNeeded()
          await expect.poll(() => image.evaluate(e => (e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
        }
        await scrollIntoChapter(page, chapter.id)
      } else {
        await expect.poll(() => section.locator('img').evaluateAll(images => images.every(image => {
          const img = image as HTMLImageElement
          return img.complete && img.naturalWidth > 0
        }))).toBe(true)
      }
      await expect(page.locator('.chapter-rail [aria-current="location"]')).toHaveAttribute('href', '#' + chapter.id)
      // Wait for the short scrub to reach the captured scroll position.
      await page.waitForTimeout(index === 0 ? 1000 : 440)
      const layout = await heading.evaluate(element => {
        const lines = Array.from(element.querySelectorAll('.line'))
        return {
          pageOverflow: document.documentElement.scrollWidth > window.innerWidth,
          cropped: lines.some(line => line.scrollWidth > line.clientWidth + 2),
        }
      })
      expect(layout, chapter.id).toEqual({ pageOverflow: false, cropped: false })
      await page.screenshot({ path: info.outputPath(`0${index + 1}-${chapter.id}.png`) })
    }
    expect(errors).toEqual([])
  })
}

test('chapter shortcuts, contents, fullscreen, sources and replay', async ({ page }) => {
  await page.setViewportSize(viewports[1])
  await openStory(page)
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('heading', { name: 'Азамат соғысының себептері' })).toBeFocused()
  await expect(page).toHaveURL(/#sebepter$/)
  await page.keyboard.press('ArrowDown')
  await expect(page).toHaveURL(/#bastaluy$/)
  await page.keyboard.press('ArrowLeft')
  await expect(page).toHaveURL(/#sebepter$/)
  await page.getByRole('button', { name: 'Мазмұны' }).click()
  const contents = page.getByRole('dialog', { name: 'Мазмұны' })
  await expect(contents).toBeVisible()
  await contents.getByRole('link', { name: /Негізгі майдандар/ }).click()
  await expect(contents).toBeHidden()
  await expect(page).toHaveURL(/#maidandar$/)
  const fullscreen = page.getByRole('button', { name: 'Толық экран', exact: true })
  await fullscreen.click()
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true)
  await page.getByRole('button', { name: 'Толық экраннан шығу' }).click()
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false)
  await page.keyboard.press('End')
  await expect(page).toHaveURL(/#korytyndy$/)
  await page.getByRole('button', { name: 'Дереккөздер', exact: true }).click()
  const sources = page.getByRole('dialog', { name: 'Дереккөздер' })
  await expect(sources.getByRole('link')).toHaveCount(12)
  await page.keyboard.press('Escape')
  await expect(sources).toBeHidden()
  await expect(page.getByRole('button', { name: 'Дереккөздер', exact: true })).toBeFocused()
  await page.getByRole('link', { name: 'Қайта көру' }).click()
  await expect(page).toHaveURL(/#kirispe$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  await page.getByRole('link', { name: 'Жалғастыру' }).click()
  await expect(page).toHaveURL(/#sebepter$/)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Азамат соғысының себептері' })).toBeInViewport({ ratio: 0.8 })
})

test('desktop scrub progresses through timeline, map and full-bleed transitions', async ({ page }, info) => {
  await page.setViewportSize(viewports[1])
  await openStory(page)
  await expect(page.locator('.pin-spacer')).toHaveCount(7)
  await scrollIntoChapter(page, 'bastaluy', 80)
  const event = page.locator('[data-event]').last()
  await expect.poll(() => event.evaluate(e => Number(getComputedStyle(e).opacity))).toBeLessThan(0.8)
  await scrollIntoChapter(page, 'bastaluy', 720)
  await expect.poll(() => event.evaluate(e => Number(getComputedStyle(e).opacity))).toBeGreaterThan(0.98)
  await page.screenshot({ path: info.outputPath('timeline-complete.png') })
  await scrollIntoChapter(page, 'sebepter', 570)
  await expect.poll(() => page.locator('.cause-photo').evaluate(e => getComputedStyle(e).clipPath)).toMatch(/^inset\([0-3](\.\d+)?%/)
  await expect.poll(() => page.locator('.cause-photo img').evaluate(e => e.getBoundingClientRect().left)).toBeLessThan(0)
  await page.screenshot({ path: info.outputPath('station-portal.png') })
  await scrollIntoChapter(page, 'maidandar', 630)
  await expect(page.locator('.map-choices').getByRole('button', { name: 'Жетісу' })).toHaveAttribute('aria-pressed', 'true')
  await scrollIntoChapter(page, 'maidandar', 20)
  const map = page.getByRole('group', { name: 'Майданды таңдау' })
  await expect(map).toBeInViewport({ ratio: 0.95 })
  await expect(page.locator('.map-note')).toBeInViewport({ ratio: 0.95 })
  await expect(map.getByRole('button', { name: 'Орынбор' })).toHaveAttribute('aria-pressed', 'true')
  for (const front of fronts) {
    await map.getByRole('button', { name: front.name }).click()
    await expect(map.getByRole('button', { name: front.name })).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('.map-note')).toContainText(front.text)
  }
  await page.locator('.map-canvas').getByRole('button', { name: 'Орал' }).click()
  await expect(page.locator('.map-note')).toContainText(fronts[1].text)
  await scrollIntoChapter(page, '1919', 635)
  await expect.poll(() => page.locator('.turn-photo').evaluate(e => getComputedStyle(e).clipPath)).toMatch(/^inset\([0-3](\.\d+)?%/)
  await page.screenshot({ path: info.outputPath('turning-portal.png') })
})

test('reduced motion preserves readable content and map activation', async ({ page }) => {
  await page.setViewportSize(viewports[3])
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openStory(page)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(page.locator('.light-leak')).toBeHidden()
  await scrollIntoChapter(page, 'bastaluy')
  for (const event of await page.locator('[data-event]').all()) await expect(event).toHaveCSS('opacity', '1')
  await scrollIntoChapter(page, 'maidandar')
  const aktobe = page.getByRole('group', { name: 'Майданды таңдау' }).getByRole('button', { name: 'Ақтөбе' })
  await aktobe.focus()
  await page.keyboard.press('Enter')
  await expect(aktobe).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.map-note')).toContainText(fronts[2].text)
})
