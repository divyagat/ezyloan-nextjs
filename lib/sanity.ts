import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Blog list
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post" && defined(slug.current)]
    | order(publishDate desc) {
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

// Single blog
export async function getPost(slug: string) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      metaDescription,
      publishDate,
      body,
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
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current
    }
  `);
}
