import type { ImageMetadata } from "astro"
import creativePrintingImg from "@/assets/projects/creative-printing/creative-printing.png"
import grouchImg from "@/assets/projects/grouch/grouchorange.png"
import wheelyHeroImg from "@/assets/projects/wheely-weather/hero.png"

export type ProjectCategory = "case-study" | "visual-work"
export type ProjectDiscipline =
  | "product-design"
  | "front-end"
  | "ux-ui"
  | "information-architecture"
  | "public-sector-design-system"
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
      "A cycling weather app that translates complex forecast APIs into glanceable ride-quality verdicts, visual hourly windows, and adaptive kit guidance.",
    description:
      "Wheely Weather translates complex forecast APIs into glanceable ride-quality verdicts, hourly riding windows, and weather-based kit guidance for cyclists.",
    tags: ["UX/UI", "Product strategy", "React", "Accessibility"],
    image: wheelyHeroImg,
    imageAlt:
      "iPhone home screen with a lime-green “Good to Ride” verdict card and cycling weather stats.",
    liveUrl: "https://wheelyweather.app",
    featured: true,
  },
  {
    slug: "creative-printing-job-submission-portal",
    title: "Creative Printing Job Submission Portal",
    category: "case-study",
    status: "published",
    disciplines: ["ux-ui", "information-architecture", "front-end"],
    role: "UX/UI designer and developer",
    year: "2018–2020",
    summary:
      "A workflow redesign that replaced a high-dropoff submission process with responsive, task-oriented navigation, mapping diverse customer intents directly to target print specifications.",
    description:
      "Replaced a high-dropoff, desktop-only print submission path with a responsive icon-grid portal that mapped client project intents directly to the correct print specifications.",
    tags: ["Workflow design", "IA", "Responsive web"],
    image: creativePrintingImg,
    imageAlt:
      "Creative Printing and Internet Services website home page shown in a browser.",
  },
  {
    slug: "ncga-template-system",
    title: "NCGA Reusable Template System",
    category: "case-study",
    status: "published",
    disciplines: ["public-sector-design-system", "information-architecture"],
    role: "Systems and information designer",
    year: "2021–Present",
    summary:
      "A multi-channel design system and layout standards serving 170+ legislative members, standardizing complex legislative publications and connecting print collateral to digital channels via QR systems.",
    description:
      "Designed a multi-channel layout system and production templates for the North Carolina General Assembly, standardizing complex legislative publications and connecting print materials to digital workflows.",
    tags: ["Design systems", "Templates", "Accessibility", "Complex content"],
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
  "public-sector-design-system": "Public-Sector Design System",
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
