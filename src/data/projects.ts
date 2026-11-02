import type { ImageMetadata } from "astro"
import grouchImg from "@/assets/projects/grouch/grouchorange.png"
import creativePrintingImg from "@/assets/projects/creative-printing/order-grid-current.png"
import ncgaLetterheadImg from "@/assets/projects/ncga-stationery/letterhead-house.png"
import printSplitImg from "@/assets/projects/print-split-calculator/calculator-full.png"
import wheelyHeroImg from "@/assets/projects/wheely-weather/home-verdict.png"

export type ProjectCategory = "case-study" | "side-project"
export type ProjectDiscipline =
  | "print-production"
  | "typography-layout"
  | "html-css"
  | "web-design"
  | "brand-systems"
  | "wordpress"
  | "brand-identity"
  | "merchandising-screen-print"
  | "mobile"
  | "front-end"
  | "production-workflow"
  | "html-css-js"
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
    disciplines: ["print-production", "typography-layout", "html-css"],
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
          "HTML/CSS/JS, PDF generation, browser merge tool, and Python CLI pipeline",
      },
    ],
    whatICanShow:
      "An internal print-shop tool, not publicly hosted. Screenshots use fictional legislator data; I can demo it on request.",
  },
  {
    slug: "creative-printing-order-flow",
    title: "Creative Printing & Client Web Systems",
    category: "case-study",
    status: "published",
    disciplines: ["web-design", "brand-systems", "wordpress"],
    role: "Web designer & front-end developer",
    year: "2019–2026",
    teaser:
      "Creative Printing’s order-entry portal, 20+ responsive client websites, print-to-web brand systems, and promotional email campaigns.",
    description:
      "Creative Printing’s order-entry portal, 20+ responsive client websites, print-to-web brand systems, and promotional email campaigns.",
    image: creativePrintingImg,
    imageAlt:
      "Creative Printing order-entry grid with eight service categories for online requests.",
    liveUrl: "https://creative-printing.com",
    liveUrlLabel: "View live site",
    headerDetails: [{ label: "Built with", value: "WordPress and Elementor" }],
  },
  {
    slug: "grouch",
    title: "Grouch",
    category: "side-project",
    status: "published",
    disciplines: ["brand-identity", "merchandising-screen-print"],
    role: "Design & screen printing",
    year: "2022",
    teaser:
      "An independent apparel and print goods line: original brand identity, spot-color screen printing separations, headwear, tote bags, and die-cut stickers.",
    description:
      "An independent apparel and print goods line: original brand identity, spot-color screen printing separations, headwear, tote bags, and die-cut stickers.",
    image: grouchImg,
    imageAlt:
      "White Grouch T-shirt with a jagged red-orange wordmark above three black cartoon cats.",
    imageObjectPosition: "center 30%",
    headerDetails: [
      { label: "With", value: "Amari, who helped with printing and marketing" },
    ],
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
      "A cyclist-first weather app, now on the App Store: live weather and air-quality data turned into a 0–5 star ride verdict across iOS, Android, and web.",
    description:
      "A cyclist-first weather app that turns live weather and air-quality data into a 0–5 star ride verdict, hourly and 8-day ratings, and kit picks. Built with Expo for iOS, Android, and web, and live on the App Store.",
    image: wheelyHeroImg,
    imageAlt:
      "Wheely Weather on iPhone showing a 4.5-star ‘Go get lost’ verdict for Portland with a best ride window of 3 PM–6 PM, the hour-by-hour chart, and Today’s kit.",
    appStoreUrl: "https://apps.apple.com/app/id6788117343",
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
  {
    slug: "print-split-calculator",
    title: "Print Split Calculator",
    category: "case-study",
    status: "published",
    disciplines: ["production-workflow", "html-css-js"],
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
]

export const disciplineLabels: Record<ProjectDiscipline, string> = {
  "print-production": "Print Production",
  "typography-layout": "Typography & Layout",
  "html-css": "HTML/CSS",
  "web-design": "Web Design",
  "brand-systems": "Brand Systems",
  wordpress: "WordPress",
  "brand-identity": "Brand Identity",
  "merchandising-screen-print": "Merchandising & Screen Print",
  mobile: "Mobile",
  "front-end": "Front-End",
  "production-workflow": "Production Workflow",
  "html-css-js": "HTML/CSS/JS",
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
