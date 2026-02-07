import { createClient } from '@sanity/client'
import { cache } from 'react'

// ---------------- ENV ----------------
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-07'

// ---------------- VALIDATION ----------------
if (!projectId || !/^[a-z0-9-]+$/.test(projectId)) {
  throw new Error(
    'Invalid NEXT_PUBLIC_SANITY_PROJECT_ID (only a-z, 0-9, dash allowed)'
  )
}

if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

// ---------------- CLIENT ----------------
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_READ_TOKEN,
})

// ---------------- FETCH HELPER ----------------
export const sanityFetch = cache(
  async <T>(query: string, params: Record<string, any> = {}): Promise<T> => {
    return client.fetch(query, params)
  }
)

// =================================================
// BLOG FUNCTIONS (ALL EXPORTS USED IN UI)
// =================================================

// ✅ ALL BLOG POSTS
export async function getAllBlogPosts() {
  return sanityFetch<any[]>(`
    *[_type == "blogPost"] | order(publishDate desc) {
      title,
      slug,
      metaDescription,
      publishDate,
      updatedDate,
      "mainImage": mainImage.asset->url,
      category->{
        title
      },
      author->{
        name
      },
      "excerpt": pt::text(content)[0..200]
    }
  `)
}

// ✅ BLOG SLUGS (SSG)
export async function getAllBlogSlugs() {
  return sanityFetch<{ slug: { current: string } }[]>(`
    *[_type == "blogPost"] {
      slug
    }
  `)
}

// ✅ SINGLE BLOG POST
export async function getBlogPost(slug: string) {
  return sanityFetch<any>(
    `
    *[_type == "blogPost" && slug.current == $slug][0] {
      title,
      metaTitle,
      metaDescription,
      publishDate,
      updatedDate,
      content,
      faq,
      "mainImage": mainImage.asset->url,
      category->{
        title
      },
      author->{
        name
      }
    }
  `,
    { slug }
  )
}

// ✅ ✅ CATEGORIES (THIS WAS MISSING ❗)
export async function getCategories() {
  return sanityFetch<{ title: string }[]>(`
    *[_type == "category"] | order(title asc) {
      title
    }
  `)
}
