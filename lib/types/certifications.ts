export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  imageUrl: string;
  verificationUrl: string;
  dateIssued: Date;
  expiryDate?: Date;
  category: 'Quality' | 'Organic' | 'Safety' | 'Environmental';
}

export interface CompanyMilestone {
  id: string;
  year: number;
  title: string;
  description: string;
  imageUrl?: string;
  category: 'Foundation' | 'Product' | 'Award' | 'Expansion';
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description: string;
  imageUrl: string;
  category: 'Industry' | 'Quality' | 'Innovation' | 'Sustainability';
}