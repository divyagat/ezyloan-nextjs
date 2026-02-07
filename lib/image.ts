// lib/image.ts
import { client } from './sanity';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function for Sanity image URLs
export function getSanityImageUrl(source: any, width: number = 800) {
  if (!source) return null;
  return urlFor(source)
    .width(width)
    .url();
}