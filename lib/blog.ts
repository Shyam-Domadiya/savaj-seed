export interface BlogPost {
  title: string
  description: string
  author: string
  date: string
  slug: string
  image: string
}

import fs from "fs"
import path from "path"

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "blogs.csv")
    const csvText = await fs.promises.readFile(filePath, "utf8")

    // Parse CSV
    const lines = csvText.trim().split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

    const posts: BlogPost[] = []

    for (let i = 1; i < lines.length; i++) {
      // Handle CSV parsing with quoted fields that may contain commas
      const matches = lines[i].match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)
      if (!matches || matches.length < 4) continue

      const values = matches.map((v) => v.trim().replace(/^"|"$/g, ""))

      const post: BlogPost = {
        title: values[0] || "",
        description: values[1] || "",
        author: values[2] || "",
        date: values[3] || "",
        image: values[4] || "",
        slug: createSlug(values[0] || ""),
      }

      posts.push(post)
    }

    return posts
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug) || null
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}
