import type { ImageMetadata } from "astro"
import creativePrintingImg from "@/assets/projects/creative-printing/order-grid-current.png"
import ncgaLetterheadImg from "@/assets/projects/ncga-stationery/letterhead-house.png"
import printSplitImg from "@/assets/projects/print-split-calculator/calculator-full.png"
import wheelyHeroImg from "@/assets/projects/wheely-weather/home-verdict.png"

export type ProjectCategory = "case-study" | "side-project"
export type ProjectDiscipline =
  | "variable-data"
  | "production-qa"
  | "workflow-tools"
  | "html-css"
  | "wordpress"
  | "front-end"
  | "mobile"
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
    slug: "ncga-variable-data-stationery",
    title: "NCGA Variable Data Stationery",
    category: "case-study",
    status: "published",
    disciplines: ["variable-data", "production-qa", "html-css"],
    role: "Solo designer & developer",
    year: "2026",
    teaser:
      "Variable data stationery for all 170 NC legislators: base letterhead merged with each recipient’s address and letter body in one press pass instead of two.",
    description:
      "A variable data workflow for the NCGA print shop: one legislator record drives locked letterhead and envelope templates, and a merge step lays each recipient’s address and letter body onto that stationery in a single pass.",
    image: ncgaLetterheadImg,
    imageAlt:
      "NCGA letterhead editor with a form sidebar and print-accurate preview of legislator stationery.",
    imageObjectPosition: "left center",
    headerDetails: [
      {
        label: "Built with",
        value:
          "HTML/CSS/JS, PDF generation, browser-based and basic Python merge tools",
      },
    ],
    whatICanShow:
      "An internal print-shop tool, not publicly hosted. Screenshots use fictional legislator data; I can demo it on request.",
  },
  {
    slug: "print-split-calculator",
    title: "Print Split Calculator",
    category: "case-study",
    status: "published",
    disciplines: ["workflow-tools", "html-css"],
    role: "Solo designer & developer",
    year: "2026",
    teaser:
      "A portable web tool that turns originals, copies, and press speeds into a recommended split across the shop’s printers.",
    description:
      "An internal tool for the NCGA print shop that converts production data, like press speeds, setup time, and job specs, into a recommended machine split: which printers to use, in what order, and how many copies to send each.",
    image: printSplitImg,
    imageAlt:
      "Print Split calculator for a 25-original, 55-copy job recommending 3 printers, KM 1, KM 2, and KM 4, with a finish time of 4 minutes 22 seconds.",
    imageObjectPosition: "center top",
    headerDetails: [
      {
        label: "Built with",
        value:
          "One self-contained HTML file: HTML, CSS, and vanilla JavaScript",
      },
    ],
    whatICanShow:
      "An internal print-shop tool, not publicly hosted. The screenshot shows the calculator’s built-in example job; I can demo it on request.",
  },
  {
    slug: "creative-printing-order-flow",
    title: "Creative Printing Order Flow",
    category: "case-study",
    status: "published",
    disciplines: ["wordpress"],
    role: "Web designer & front-end developer",
    year: "2019",
    teaser:
      "Creative Printing’s own homepage, one of 20+ responsive client sites I built and maintained for the shop. Still live seven years later.",
    description:
      "A responsive homepage rebuilt around an icon grid for print, sign, multimedia, website, and service requests, so customers can start the right order right away.",
    image: creativePrintingImg,
    imageAlt:
      "Creative Printing order-entry grid with eight service categories for online requests.",
    liveUrl: "https://creative-printing.com",
    liveUrlLabel: "View live site",
    headerDetails: [{ label: "Built with", value: "WordPress and Elementor" }],
  },
  {
    slug: "wheely-weather",
    title: "Wheely Weather",
    category: "side-project",
    status: "published",
    disciplines: ["mobile", "front-end"],
    role: "Solo designer & developer",
    year: "2026",
    teaser:
      "Live weather and air-quality data turned into rule-based ride recommendations, on iOS, Android, and web.",
    description:
      "Live weather and air-quality data turned into a rule-based ride verdict, hourly riding windows, and kit recommendations. Built with Expo for iOS, Android, and web.",
    image: wheelyHeroImg,
    imageAlt:
      "Wheely Weather showing a green ‘CLEAR FOR RIDING’ ideal-conditions verdict for Portland.",
    liveUrl: "https://wheelyweather.app",
    liveUrlLabel: "View live web app",
    githubUrl: "https://github.com/noahzm/wheely-weather",
    headerLinks: [
      { label: "How it works", href: "#how-it-works", external: false },
    ],
    headerDetails: [
      {
        label: "Built with",
        value: "Expo and React Native, one codebase for iOS, Android, and web",
      },
    ],
  },
]

export const disciplineLabels: Record<ProjectDiscipline, string> = {
  "variable-data": "Variable Data",
  "production-qa": "Production QA",
  "workflow-tools": "Workflow Tools",
  "html-css": "HTML/CSS",
  wordpress: "WordPress",
  "front-end": "Front-End",
  mobile: "Mobile",
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

export const sideProjects = projects.filter(
  (project) => project.category === "side-project"
)

export const publishedProjects = projects.filter(
  (project) => project.status === "published"
)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
