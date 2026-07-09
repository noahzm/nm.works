import type { ImageMetadata } from "astro"
import creativePrintingImg from "@/assets/projects/creative-printing/order-grid-current.png"
import grouchImg from "@/assets/projects/grouch/grouchorange.png"
import ncgaLetterheadImg from "@/assets/projects/ncga-stationery/letterhead-house.png"
import wheelyHeroImg from "@/assets/projects/wheely-weather/home-verdict.png"

export type ProjectCategory = "case-study" | "visual-work"
export type ProjectDiscipline =
  | "product-design"
  | "front-end"
  | "mobile"
  | "ux-ui"
  | "information-architecture"
  | "brand-apparel"
export type ProjectStatus = "published" | "coming-soon"

export interface ProjectHeaderLink {
  label: string
  href: string
  external?: boolean
}

export interface ProjectHeaderDetail {
  label: string
  value: string
}

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
  liveUrlLabel?: string
  appStoreUrl?: string
  githubUrl?: string
  headerLinks?: ProjectHeaderLink[]
  headerDetails?: ProjectHeaderDetail[]
  whatICanShow?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "wheely-weather",
    title: "Wheely Weather",
    category: "case-study",
    status: "published",
    disciplines: ["product-design", "mobile", "front-end"],
    role: "Solo design technologist — design and cross-platform (Expo) build",
    year: "2025",
    summary:
      "Independent cycling-weather app for iOS, Android, and web, built from one Expo Router codebase — a verdict-first UI, a shared TypeScript scoring domain, and Open-Meteo plus Apple WeatherKit data.",
    description:
      "Wheely Weather turns forecast data into ride-quality verdicts, hourly windows, and kit guidance. It keeps humidity and wind visible instead of burying them in a generic forecast stack.",
    tags: ["Expo & React Native", "TypeScript", "Design systems", "UX/UI"],
    image: wheelyHeroImg,
    imageAlt:
      "Wheely Weather showing a green 'CLEAR FOR RIDING' ideal-conditions verdict for Portland.",
    liveUrl: "https://wheelyweather.app",
    liveUrlLabel: "View live web app",
    githubUrl: "https://github.com/noahzm/wheely-weather",
    headerLinks: [
      { label: "Design notes", href: "#system-design", external: false },
    ],
    headerDetails: [
      {
        label: "Status",
        value:
          "Actively developed. iOS, Android, and web from one Expo codebase; web app live at wheelyweather.app.",
      },
    ],
    featured: true,
  },
  {
    slug: "ncga-stationery-templates",
    title: "NCGA Stationery Template System",
    category: "case-study",
    status: "published",
    disciplines: ["information-architecture", "ux-ui", "front-end"],
    role: "Design technologist — internal workflow and variable-data tooling",
    year: "2021–present",
    summary:
      "Internal variable-data print workflow for all 170 General Assembly members: governed letterhead and envelope layouts, print-accurate preview, and PDF handoff into mail merge.",
    description:
      "A constrained template tool for the North Carolina General Assembly print shop, not a document editor. One LegislatorRecord feeds locked letterhead and envelope layouts that staff can edit only within production rules.",
    tags: ["Information architecture", "Variable data", "Print production"],
    image: ncgaLetterheadImg,
    imageAlt:
      "NCGA letterhead editor with a form sidebar and print-accurate preview of legislator stationery.",
    headerDetails: [
      {
        label: "Built with",
        value:
          "HTML/CSS/JS, PDF generation, governed data model, print-ready output, variable-data workflow",
      },
    ],
    whatICanShow:
      "This is an internal print-shop tool, so it isn’t publicly hosted. The screenshots use fictional legislator data; I can demo the live tool or walk through the code on request.",
    featured: true,
  },
  {
    slug: "creative-printing-order-flow",
    title: "Creative Printing Order Flow",
    category: "case-study",
    status: "published",
    disciplines: ["ux-ui", "information-architecture", "front-end"],
    role: "Design technologist — web build and print production",
    year: "2018–2020",
    summary:
      "Responsive homepage order-entry flow for a print shop website, routing customers from job intent to the right service category or intake form.",
    description:
      "Redesigned Creative Printing’s homepage order path around an icon-grid entry point for print, sign, multimedia, website, and service requests.",
    tags: ["Workflow design", "IA", "Responsive web"],
    image: creativePrintingImg,
    imageAlt:
      "Creative Printing order-entry grid with eight service categories for online requests.",
    liveUrl: "https://creative-printing.com",
    liveUrlLabel: "View live site",
    headerDetails: [
      { label: "Shipped", value: "Live homepage order-entry flow" },
      {
        label: "Scope",
        value: "IA, responsive UI, front-end implementation, shop owner review",
      },
    ],
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
    whatICanShow:
      "Grouch was a small physical apparel run, so there’s no app or repo to open. The photos below document the identity and the printed pieces.",
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
