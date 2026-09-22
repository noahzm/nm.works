import { existsSync } from "node:fs"
import path from "node:path"

export const siteName = "Noah Michaels"

export const siteHeadline =
  "Email & Marketing Automation | Variable Data Personalization, HTML/CSS, Production QA"

export const defaultTitle = `${siteName} · Email & Marketing Automation`

export const defaultDescription =
  "Production and web professional in Raleigh, NC: variable data campaigns, responsive HTML/CSS, and production QA. Pursuing the Salesforce Marketing Cloud Engagement Specialist certification."

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
