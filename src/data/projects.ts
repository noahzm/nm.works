import type { ImageMetadata } from "astro"
import creativePrintingImg from "@/assets/projects/creative-printing/creative-printing.png"
import grouchImg from "@/assets/projects/grouch/grouchorange.png"
import wheelyHeroImg from "@/assets/projects/wheely-weather/hero.png"

export type ProjectCategory = "case-study" | "visual-work"
export type ProjectStatus = "published" | "coming-soon"

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  meta: string
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
    meta: "Product Design · Front-End · 2025",
    role: "Solo product design and front-end development",
    year: "2025",
    summary:
      "A cycling weather decision app built around one question: is today a good day to ride?",
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
    meta: "UX/UI · Information Architecture · 2020",
    role: "Web and graphic designer",
    year: "2020",
    summary:
      "A responsive portal redesign that clarified how print customers moved from project type to submission.",
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
    meta: "Public-Sector Design System · 2021–Present",
    role: "Graphic and production designer",
    year: "2021–Present",
    summary:
      "A reusable standards and template system for recurring legislative materials across print and digital channels.",
    description:
      "A draft case study about making complex public-sector communications more consistent, scannable, and efficient to produce.",
    tags: ["Design systems", "Templates", "Accessibility", "Complex content"],
  },
  {
    slug: "grouch",
    title: "Grouch",
    category: "visual-work",
    status: "published",
    meta: "Brand & Apparel · 2019",
    role: "Brand and apparel design",
    year: "2019",
    summary:
      "A small apparel identity with T-shirts, hats, totes, stickers, and a lean path from mark to merch.",
    description:
      "Grouch was a limited-run visual identity and apparel experiment built around a simple mark, bold colorways, and hands-on production.",
    tags: ["Brand identity", "Apparel", "Print production"],
    image: grouchImg,
    imageAlt: "Orange Grouch T-shirt with a large black typographic mark.",
  },
]

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
