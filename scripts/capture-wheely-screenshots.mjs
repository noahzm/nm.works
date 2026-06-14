// Re-captures the five phone-portrait screenshots used by the Wheely Weather
// case study from the live app at https://wheelyweather.app.
//
//   node scripts/capture-wheely-screenshots.mjs
//
// Output: 1170x2532 PNGs (iPhone viewport 390x844 @ DPR 3) written to
// scripts/.screenshots-tmp/ for inspection before they replace the assets in
// src/assets/projects/wheely-weather/.
//
// Verdict cards are weather-dependent, so the green "ideal" city is chosen at
// run time to keep the existing green-ideal / orange-rest-day framing.
import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import sharp from "sharp"

const APP = "https://wheelyweather.app"
const OUT = "scripts/.screenshots-tmp"
// City that should currently read as a green "ideal ride" verdict.
const GREEN_CITY = process.env.GREEN_CITY || "Seattle"

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
})
const page = await context.newPage()

async function settle() {
  await page.waitForLoadState("networkidle").catch(() => {})
  await page.waitForTimeout(1500)
}

// Document-space top (CSS px) of a section, located by its H2 heading text.
// Walks up to the numbered section wrapper so the "01"-"04" label is included.
async function sectionTop(headingRe) {
  return page.evaluate((reSource) => {
    const re = new RegExp(reSource, "i")
    const h = [...document.querySelectorAll("h2")].find((el) =>
      re.test((el.textContent || "").trim())
    )
    if (!h) throw new Error("heading not found: " + reSource)
    let node = h
    for (let i = 0; i < 4 && node.parentElement; i++) {
      node = node.parentElement
      if (/^0[1-4]\b/.test((node.textContent || "").trim())) break
    }
    return node.getBoundingClientRect().top + window.scrollY
  }, headingRe.source)
}

// Crop a 1170x2532 (390x844 @ DPR 3) window out of a full-page screenshot,
// anchored at `cssTop`. When a section sits too close to the page bottom to
// fill the frame, pad the remainder with the white page background so the
// heading stays at the top rather than pulling the previous section into view.
async function cropWindow(fullPng, cssTop, file) {
  const meta = await sharp(fullPng).metadata()
  const top = Math.max(0, Math.round((cssTop - 12) * 3))
  const avail = meta.height - top
  let img = sharp(fullPng).extract({
    left: 0,
    top,
    width: 1170,
    height: Math.min(2532, avail),
  })
  if (avail < 2532) {
    img = img.extend({
      bottom: 2532 - avail,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
  }
  await img.png().toFile(`${OUT}/${file}`)
  console.log("captured", file)
}

await page.goto(APP, { waitUntil: "networkidle" })
await settle()

// 1. Raleigh (default) — orange rest-day verdict, captured at the top.
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(300)
await page.screenshot({ path: `${OUT}/verdict-raleigh.png` })
console.log("captured verdict-raleigh.png")

// 2–4. Panels from the default location. Crop precise windows out of one
// full-page screenshot so framing is exact even for the last section, which
// the page can't scroll far enough to seat at the top of the viewport.
const tops = {
  "hour-by-hour.png": await sectionTop(/hour by hour/i),
  "the-numbers.png": await sectionTop(/the numbers/i),
  "week-ahead.png": await sectionTop(/the week ahead/i),
}
const fullPng = `${OUT}/_full-raleigh.png`
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(300)
await page.screenshot({ path: fullPng, fullPage: true })
for (const [file, top] of Object.entries(tops)) {
  await cropWindow(fullPng, top, file)
}

// 5. Green "ideal" city — search, select, capture verdict at the top.
const input = page.getByPlaceholder("Search a city or place")
if (!(await input.isVisible().catch(() => false))) {
  await page
    .getByRole("button", { name: /,\s*[A-Z]{2}|location/i })
    .first()
    .click()
  await page.waitForTimeout(400)
}
await input.click()
await input.fill("")
await input.pressSequentially(GREEN_CITY, { delay: 30 })
await page.waitForTimeout(1800)
await page.keyboard.press("ArrowDown")
await page.keyboard.press("Enter")
await settle()
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(400)
await page.screenshot({ path: `${OUT}/verdict-sf.png` })
console.log(`captured verdict-sf.png (${GREEN_CITY})`)

await browser.close()
