export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IProjectResult {
  value: string;
  label: string;
}

export interface IProjectImage {
  src: string;
  alt: string;
  publicId?: string;
}

export interface IWork {
  _id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  service: string;
  result: string;
  year: string;
  heroImages: IProjectImage[];
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  executionPoints: string[];
  results: IProjectResult[];
  gallery: IProjectImage[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex: boolean;
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'html'; text: string };

export interface IArticle {
  _id: string;
  slug: string;
  title: string;
  category: 'Marketing Tips' | 'AI Tools' | 'Case Studies' | 'DSZ News';
  excerpt: string;
  image: string;
  imageAlt: string;
  imagePublicId?: string;
  author: string;
  body: ArticleBlock[];
  readTime: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex: boolean;
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IService {
  _id: string;
  slug: string;
  title: string;
  tag: string;
  short: string;
  description: string;
  whatWeDo: string[];
  deliverables: string[];
  whoFor: string;
  image: string;
  imageAlt?: string;
  imagePublicId?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex: boolean;
  };
  createdAt: string;
  updatedAt: string;
}


export type TJobDepartment = 'Development' | 'Design' | 'Marketing' | 'Video' | 'Operations';
export type TJobType = 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
export type TJobLocation = 'On-site' | 'Remote' | 'Hybrid';
export type TJobStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface IJob {
  _id: string;
  slug: string;
  title: string;
  department: TJobDepartment;
  type: TJobType;
  location: TJobLocation;
  city: string;
  experience: string;
  salary?: string;
  postedAt: string;
  deadline: string;
  short: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  tools: string[];
  benefits: string[];
  status: TJobStatus;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
