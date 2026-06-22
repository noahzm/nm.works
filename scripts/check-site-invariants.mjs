import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const publicDir = path.join(root, "public")
const projectsDataPath = path.join(root, "src/data/projects.ts")
const projectPagesDir = path.join(root, "src/pages/projects")

async function findFilesByName(dir, fileName) {
  const matches = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      matches.push(...(await findFilesByName(entryPath, fileName)))
    } else if (entry.name === fileName) {
      matches.push(path.relative(root, entryPath))
    }
  }

  return matches
}

function parseProjectSlugs(source) {
  const slugs = []
  const slugPattern = /^\s*slug:\s*"([^"]+)",/gm

  for (const match of source.matchAll(slugPattern)) {
    slugs.push(match[1])
  }

  return slugs
}

async function getProjectPageSlugs() {
  const entries = await readdir(projectPagesDir, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => fileName.endsWith(".astro") && fileName !== "index.astro")
    .map((fileName) => fileName.replace(/\.astro$/, ""))
    .sort()
}

function difference(left, right) {
  const rightSet = new Set(right)
  return left.filter((item) => !rightSet.has(item))
}

function fail(message, details) {
  console.error(message)

  if (details.length > 0) {
    for (const detail of details) {
      console.error(`- ${detail}`)
    }
  }

  process.exitCode = 1
}

const dsStoreFiles = await findFilesByName(publicDir, ".DS_Store")

if (dsStoreFiles.length > 0) {
  fail("Static asset invariant failed: remove macOS metadata files from public/.", dsStoreFiles)
}

const projectsSource = await readFile(projectsDataPath, "utf8")
const projectSlugs = parseProjectSlugs(projectsSource).sort()
const pageSlugs = await getProjectPageSlugs()

const missingPages = difference(projectSlugs, pageSlugs)
const missingData = difference(pageSlugs, projectSlugs)

if (missingPages.length > 0) {
  fail("Project invariant failed: every project in src/data/projects.ts needs a page.", missingPages)
}

if (missingData.length > 0) {
  fail("Project invariant failed: every project page needs an entry in src/data/projects.ts.", missingData)
}

if (process.exitCode) {
  process.exit(process.exitCode)
}

console.log("Site invariants passed.")
