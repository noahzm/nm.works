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
  teaser: string
  description: string
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
}

export const projects: Project[] = [
  {
    slug: "wheely-weather",
    title: "Wheely Weather",
    category: "case-study",
    status: "published",
    disciplines: ["product-design", "mobile", "front-end"],
    role: "Solo designer and developer",
    year: "2026",
    teaser:
      "A cycling weather app that answers one question: should I ride right now?",
    description:
      "Forecast data turned into a ride verdict, optimal hourly windows, and kit recommendations. Built with Expo for iOS, Android, and web.",
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
        label: "Platform",
        value: "iOS, Android, and web from one Expo codebase.",
      },
    ],
  },
  {
    slug: "ncga-stationery-templates",
    title: "NCGA Stationery Template System",
    category: "case-study",
    status: "published",
    disciplines: ["information-architecture", "ux-ui", "front-end"],
    role: "Solo designer & developer",
    year: "2026",
    teaser:
      "Locked letterhead and envelope templates for all 170 NC legislators. Personalized mailings now run in one press pass instead of two.",
    description:
      "A constrained template system for the NCGA print shop, using a single legislator record to drive locked letterhead and envelope layouts.",
    image: ncgaLetterheadImg,
    imageAlt:
      "NCGA letterhead editor with a form sidebar and print-accurate preview of legislator stationery.",
    imageObjectPosition: "left center",
    headerDetails: [
      {
        label: "Built with",
        value: "HTML/CSS/JS, PDF generation, variable-data workflow",
      },
    ],
    whatICanShow:
      "An internal print-shop tool, not publicly hosted. Screenshots use fictional legislator data; I can demo it on request.",
  },
  {
    slug: "creative-printing-order-flow",
    title: "Creative Printing Order Flow",
    category: "case-study",
    status: "published",
    disciplines: ["ux-ui", "information-architecture", "front-end"],
    role: "Product designer & front-end developer",
    year: "2019",
    teaser:
      "A print shop homepage redesign with an intuitive service grid. Still live seven years later.",
    description:
      "A homepage rebuilt around an intuitive icon grid for print, sign, multimedia, website, and service requests, allowing customers to pick a path instantly.",
    image: creativePrintingImg,
    imageAlt:
      "Creative Printing order-entry grid with eight service categories for online requests.",
    liveUrl: "https://creative-printing.com",
    liveUrlLabel: "View live site",
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
      "A skate-inspired apparel run: one artwork, two colorways, screen printed by hand.",
    description:
      "A limited-run identity and apparel project: a rough-edged wordmark, a reworked public-domain cartoon, and hands-on print production.",
    image: grouchImg,
    imageAlt:
      "White Grouch T-shirt screen printed with a red-orange Grouch wordmark above a black cartoon-cat graphic.",
    whatICanShow:
      "A small physical apparel run, so there is no live web app or repository. The photos document the identity and hand-printed pieces.",
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
