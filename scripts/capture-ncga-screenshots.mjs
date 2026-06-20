import { mkdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const baseUrl = "http://127.0.0.1:4322"
const outDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/assets/projects/ncga-stationery"
)

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
await page.waitForTimeout(500)
await page.screenshot({
  path: path.join(outDir, "letterhead-house.png"),
  fullPage: false,
})

await page.goto(`${baseUrl}/envelopes`, { waitUntil: "networkidle" })
await page.waitForTimeout(500)
await page.screenshot({
  path: path.join(outDir, "envelope-editor.png"),
  fullPage: false,
})

await browser.close()
console.log("Saved NCGA screenshots to src/assets/projects/ncga-stationery/")
