import type { ImageMetadata } from "astro"
import creativePrintingImg from "@/assets/projects/creative-printing/order-grid-current.png"
import grouchImg from "@/assets/projects/grouch/grouchorange.png"
import wheelyHeroImg from "@/assets/projects/wheely-weather/verdict-sf.png"

export type ProjectCategory = "case-study" | "visual-work"
export type ProjectDiscipline =
  | "product-design"
  | "front-end"
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
  recruiterSignal?: string
  description: string
  tags: string[]
  image?: ImageMetadata
  imageAlt?: string
  imageObjectPosition?: string
  liveUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "wheely-weather",
    title: "Wheely Weather",
    category: "case-study",
    status: "published",
    disciplines: ["product-design", "front-end"],
    role: "Solo product design and front-end development",
    year: "2025",
    summary:
      "A cycling weather app that tells riders whether to go now, why the rating dropped, and which window is better when the answer is no.",
    recruiterSignal:
      "Mobile decision UI, accessible forecast states, and front-end implementation in one shipped app.",
    description:
      "Wheely Weather turns raw forecast data into clear ride-quality verdicts, hourly riding windows, and weather-based kit guidance for cyclists.",
    tags: ["UX/UI", "Product strategy", "Astro & React", "Accessibility"],
    image: wheelyHeroImg,
    imageAlt:
      "Wheely Weather app showing an “IDEAL RIDE CONDITIONS” verdict on a deep green background for San Francisco.",
    imageObjectPosition: "top",
    liveUrl: "https://wheelyweather.app",
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
      "A responsive order-entry flow that moved print customers from the homepage into the right service category or intake form.",
    recruiterSignal:
      "Task-based IA that routes customer intent into the right service path.",
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
      "A skate-inspired DIY apparel project with original graphics, screen-printed shirts, and small-run merch.",
    recruiterSignal:
      "Visual identity carried through production, materials, and finished objects.",
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
