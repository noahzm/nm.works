import { existsSync } from "node:fs"
import path from "node:path"

export const siteName = "Noah Michaels"

export const siteHeadline =
  "Marketing & Print Production Design | Prepress, Brand Identity, HTML/CSS"

export const defaultTitle = `${siteName} · Marketing & Print Production Design`

export const defaultDescription =
  "Marketing and print production designer: 4-color prepress, Pantone color systems, brand identity, promotional print, and responsive HTML/CSS. Open to remote and NYC roles."

export const contactEmail = "hi@nm.works"
export const contactHref = `mailto:${contactEmail}?subject=Hi%20from%20nm.works`
export const linkedInUrl = "https://www.linkedin.com/in/noahzm/"
export const gitHubUrl = "https://github.com/noahzm"

// TODO(noah): drop the PDF at public/resume/noah-michaels-resume.pdf, or change
// this path. Resume links only render once the file exists at build time.
export const resumePath = "/resume/noah-michaels-resume.pdf"

export const hasResume = existsSync(
  path.join(process.cwd(), "public", resumePath)
)

// Packaging and print production portfolio. Links render only when the file exists.
export const portfolioPath = "/portfolio.pdf"

export const hasPortfolio = existsSync(
  path.join(process.cwd(), "public", portfolioPath)
)
