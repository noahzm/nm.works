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
  teaser?: string
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
    role: "Solo product designer and developer, from first sketch to shipped app (Expo)",
    year: "2026",
    teaser:
      "A cycling weather app that answers one question: should I ride right now?",
    summary:
      "A cycling weather app that gives riders a clear go/no-go verdict instead of a wall of forecast data. Designed and built with Expo for iOS, Android, and web from one codebase.",
    description:
      "Wheely Weather turns forecast data into a simple ride verdict, the best hourly windows, and what to wear. The key numbers stay visible; the app just does the interpreting first.",
    tags: ["Expo & React Native", "TypeScript", "Design systems", "UX/UI"],
    image: wheelyHeroImg,
    imageAlt:
      "Wheely Weather showing a green ‘CLEAR FOR RIDING’ ideal-conditions verdict for Portland.",
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
    role: "Product designer for the print shop. Designed the workflow and built the tool",
    year: "2026",
    teaser:
      "A template system that keeps official stationery consistent and print-ready for all 170 members of the NC legislature.",
    summary:
      "An internal print tool for all 170 General Assembly members: locked letterhead and envelope layouts, a print-accurate preview, and clean PDF handoff into mail merge.",
    description:
      "A constrained template system for the North Carolina General Assembly print shop, not a freeform editor. One record per legislator feeds locked letterhead and envelope layouts, so staff can update details without breaking the design.",
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
    role: "Product designer. Information architecture, responsive UI, and front-end build",
    year: "2019",
    teaser:
      "A homepage redesign that gets print customers from “I need a thing” to the right order form without guesswork.",
    summary:
      "A responsive order-entry flow for a print shop’s website that routes customers from what they need to the right service category or intake form.",
    description:
      "I redesigned Creative Printing’s homepage around a simple icon grid of print, sign, multimedia, website, and service requests, so customers pick a path instead of hunting through pages.",
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
    teaser:
      "A DIY skate-inspired apparel brand: original graphics, screen printing, and a small production run.",
    summary:
      "A skate-inspired DIY apparel project: original graphics, screen-printed shirts, and a visual identity carried all the way through production.",
    description:
      "Grouch was a limited-run identity and apparel experiment built around a simple mark, bold colorways, and hands-on production.",
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
