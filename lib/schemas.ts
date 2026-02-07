export interface BlogPost {
  title: string;
  slug: { current: string };
  metaTitle?: string;
  metaDescription?: string;
  category?: { title: string };
  author?: { name: string; image?: { asset: { url: string } } };
  publishDate: string;
  updatedDate?: string;
  content: any[]; // Portable Text
  faq?: { question: string; answer: string }[];
  mainImage?: { asset: { url: string } };
}