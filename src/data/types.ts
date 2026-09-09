export type Category =
  | "watches"
  | "jewelry"
  | "accessories"
  | "fashion"
  | "perfume"
  | "tech";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  images: string[];
  colors: ColorOption[];
  sizes?: string[];
  materials: string[];
  description: string;
  details: string[];
  reviews: Review[];
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
}
