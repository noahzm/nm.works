import type { ImageMetadata } from "astro"

export interface EmailTemplate {
  slug: string
  title: string
  description: string
  techniques: string[]
  // Path to a standalone HTML file under public/email-previews/, rendered in a
  // sandboxed iframe (scripts disabled) and linked as a full preview.
  previewHtml?: string
  // Screenshot imported from src/assets/email/. Used when there is no
  // previewHtml, or as a fallback image for it.
  screenshot?: ImageMetadata
  screenshotAlt?: string
}

// Keeps /email out of navigation and the sitemap, and noindexed, until this is
// true and at least one template below is filled in.
export const emailWorkLive = false

// TODO(noah): add real templates. Example shape:
//
// import welcomeShot from "@/assets/email/welcome-series.png"
//
// {
//   slug: "welcome-series",
//   title: "Welcome series, email 1",
//   description: "One or two sentences on the goal and audience.",
//   techniques: ["Hybrid/fluid layout", "AMPscript personalization", "Dark mode"],
//   previewHtml: "/email-previews/welcome-series.html",
//   screenshot: welcomeShot,
//   screenshotAlt: "What the screenshot actually shows.",
// },
export const emailTemplates: EmailTemplate[] = []

export const showEmailWork = emailWorkLive && emailTemplates.length > 0

export const emailWorkPath = "/email"
