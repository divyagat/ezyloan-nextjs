import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-02-07',
  useCdn: true,
});

// All posts
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishDate desc) {
      title,
      "slug": slug.current,
      metaDescription,
      publishDate,
      "mainImage": mainImage.asset->url,
      category,
      author
    }
  `);
}

// Single post
export async function getPost(slug: string) {
  return client.fetch(
    `
    *[_type == "blogPost" && slug.current == $slug][0]{
      title,
      metaDescription,
      publishDate,
      content,
      "mainImage": mainImage.asset->url,
      category,
      author
    }
  `,
    { slug }
  );
}

// Slugs
export async function getAllSlugs() {
  return client.fetch(`
    *[_type == "blogPost"]{ "slug": slug.current }
  `);
}
