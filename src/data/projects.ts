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
      "A cycling weather decision app that turns forecast data into ride guidance, kit recommendations, and best-day picks.",
    description:
      "Wheely Weather turns forecast data into ride-quality verdicts, hourly windows, best-day picks, and weather-based kit guidance for cyclists.",
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
    status: "coming-soon",
    disciplines: ["ux-ui", "information-architecture"],
    role: "Web and graphic designer",
    year: "2020",
    summary:
      "A responsive portal redesign that clarified the path from project type to submission.",
    description:
      "A draft case study about simplifying a print-shop job submission flow with clearer hierarchy, icon-grid navigation, and a more direct path to the right form.",
    tags: ["Workflow design", "IA", "Responsive web"],
    image: creativePrintingImg,
    imageAlt:
      "Creative Printing and Internet Services website home page shown in a browser.",
  },
  {
    slug: "ncga-template-system",
    title: "NCGA Reusable Template System",
    category: "case-study",
    status: "coming-soon",
    disciplines: ["public-sector-design-system"],
    role: "Graphic and production designer",
    year: "2021–Present",
    summary:
      "Reusable standards and templates for recurring legislative materials across print and digital channels.",
    description:
      "A draft case study about making complex public-sector communications more consistent, scannable, and efficient to produce.",
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
