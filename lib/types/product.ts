export interface DownloadableResource {
  id: string
  title: string
  description: string
  type: 'pdf' | 'image' | 'video' | 'guide'
  url: string
  fileSize?: string
  downloadCount?: number
  featured?: boolean
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductSpecification {
  id: string;
  name: string;
  value: string;
  category: 'Basic' | 'Growing' | 'Harvest' | 'Storage';
}

export interface GrowingGuideSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface GrowingGuide {
  id: string;
  title: string;
  pdfUrl: string;
  sections: GrowingGuideSection[];
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fiber: number;
  vitamins: string[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  structuredData: object;
}

export type ProductCategory = 'Vegetable' | 'Crop' | 'Hybrid';
export type Season = 'Spring' | 'Summer' | 'Monsoon' | 'Winter' | 'All-Season';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  longDescription: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
  growingGuide: GrowingGuide;
  downloadableResources: DownloadableResource[];
  seasonality: Season[];
  difficultyLevel: DifficultyLevel;
  yieldExpectation: string;
  maturityTime: string;
  plantingInstructions: string;
  careInstructions: string;
  harvestingTips: string;
  storageGuidance: string;
  nutritionalInfo?: NutritionalInfo;
  certifications: string[];
  availability: boolean;
  featured: boolean;
  seoMetadata: SEOMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilter {
  categories: ProductCategory[];
  seasons: Season[];
  difficultyLevels: DifficultyLevel[];
  availability?: boolean;
  featured?: boolean;
}

export interface ProductSort {
  field: 'name' | 'category' | 'createdAt' | 'featured';
  direction: 'asc' | 'desc';
}