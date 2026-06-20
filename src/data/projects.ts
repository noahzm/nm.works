import type { ImageMetadata } from "astro"
import creativePrintingImg from "@/assets/projects/creative-printing/order-grid-current.png"
import grouchImg from "@/assets/projects/grouch/grouchorange.png"
import ncgaLetterheadImg from "@/assets/projects/ncga-stationery/letterhead-house.png"
import wheelyHeroImg from "@/assets/projects/wheely-weather/verdict-sf.png"

export type ProjectCategory = "case-study" | "visual-work"
export type ProjectDiscipline =
  | "product-design"
  | "front-end"
  | "mobile"
  | "ux-ui"
  | "information-architecture"
  | "brand-apparel"
export type ProjectStatus = "published" | "coming-soon"

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  disciplines: ProjectDiscipline[]
  role: string
  year: string
  summary: string
  description: string
  tags: string[]
  image?: ImageMetadata
  imageAlt?: string
  imageObjectPosition?: string
  liveUrl?: string
  appStoreUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "wheely-weather",
    title: "Wheely Weather",
    category: "case-study",
    status: "published",
    disciplines: ["product-design", "mobile", "front-end"],
    role: "Solo product design and iOS development",
    year: "2025",
    summary:
      "Native iOS and watchOS cycling weather app in development, with a verdict-first UI, shared WheelyCore logic, and Open-Meteo and National Weather Service data.",
    description:
      "Wheely Weather turns forecast data into ride-quality verdicts, hourly windows, and kit guidance. It foregrounds the humidity and wind signals riders actually use instead of burying them in a generic forecast stack.",
    tags: ["Swift & SwiftUI", "UX/UI", "Design systems", "Accessibility"],
    image: wheelyHeroImg,
    imageAlt:
      "Wheely Weather app showing an “IDEAL RIDE CONDITIONS” verdict on a deep green background for Seattle.",
    imageObjectPosition: "top",
    liveUrl: "https://wheelyweather.app",
    featured: true,
  },
  {
    slug: "ncga-stationery-templates",
    title: "NCGA Stationery Template System",
    category: "case-study",
    status: "published",
    disciplines: ["information-architecture", "ux-ui", "front-end"],
    role: "Print & Digital Production (Printing Clerk II)",
    year: "2021–present",
    summary:
      "Variable-data template system for 170+ General Assembly members: governed letterhead and envelope layouts, print-accurate preview, and PDF handoff into single-pass mail merge.",
    description:
      "A constrained template tool for the North Carolina General Assembly print shop, not a document editor. One LegislatorRecord pours into locked letterhead and envelope layouts staff can edit only within production rules.",
    tags: ["Information architecture", "Variable data", "Print production"],
    image: ncgaLetterheadImg,
    imageAlt:
      "NCGA letterhead editor with a form sidebar and print-accurate preview of legislator stationery.",
    featured: true,
  },
  {
    slug: "creative-printing-order-flow",
    title: "Creative Printing Order Flow",
    category: "case-study",
    status: "published",
    disciplines: ["ux-ui", "information-architecture", "front-end"],
    role: "UX/UI designer and developer",
    year: "2018–2020",
    summary:
      "Responsive order-entry flow that routes customers to the right service category or intake form. IA validated with the shop owner; the category grid still anchors the live site.",
    description:
      "Redesigned Creative Printing’s homepage order path around an icon-grid entry point, routing customers to print, sign, multimedia, website, and service intake options.",
    tags: ["Workflow design", "IA", "Responsive web"],
    image: creativePrintingImg,
    imageAlt:
      "Creative Printing order-entry grid with eight service categories for online requests.",
  },
  {
    slug: "grouch",
    title: "Grouch",
    category: "visual-work",
    status: "published",
    disciplines: ["brand-apparel"],
    role: "Brand and apparel design",
    year: "2019",
    summary:
      "A skate-inspired DIY apparel project with original graphics and screen-printed shirts. Visual identity carried through production, materials, and finished run.",
    description:
      "Grouch was a limited-run visual identity and apparel experiment built around a simple mark, bold colorways, and hands-on production.",
    tags: ["Brand identity", "Apparel", "Print production"],
    image: grouchImg,
    imageAlt: "Orange Grouch T-shirt with a large black typographic mark.",
  },
]

export const disciplineLabels: Record<ProjectDiscipline, string> = {
  "product-design": "Product Design",
  "front-end": "Front-End",
  mobile: "Mobile",
  "ux-ui": "UX/UI",
  "information-architecture": "Information Architecture",
  "brand-apparel": "Brand & Apparel",
}

export const caseStudies = projects.filter(
  (project) => project.category === "case-study"
)

export const publishedCaseStudies = caseStudies.filter(
  (project) => project.status === "published"
)

export const upcomingCaseStudies = caseStudies.filter(
  (project) => project.status === "coming-soon"
)

export const visualWork = projects.filter(
  (project) => project.category === "visual-work"
)

export const publishedProjects = projects.filter(
  (project) => project.status === "published"
)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
