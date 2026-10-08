import { ApiResponse, IWork, IArticle, IService } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      // For 404s, Next.js can handle it via notFound(), but we'll throw an ApiError
      if (response.status === 404) {
        throw new ApiError('Not Found', 404);
      }
      throw new ApiError('An error occurred while fetching data', response.status);
    }

    const data: ApiResponse<T> = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network Error or Server Unavailable', 500);
  }
}

export const api = {
  getWorks: () => 
    fetchApi<IWork[]>('/works', {
      next: { tags: ['works'], revalidate: 60 },
    }),
    
  getWorkBySlug: (slug: string) => 
    fetchApi<IWork>(`/works/${slug}`, {
      next: { tags: [`work:${slug}`], revalidate: 60 },
    }),

  getArticles: () => 
    fetchApi<IArticle[]>('/articles', {
      next: { tags: ['articles'], revalidate: 60 },
    }),
    
  getArticleBySlug: (slug: string) => 
    fetchApi<IArticle>(`/articles/${slug}`, {
      next: { tags: [`article:${slug}`], revalidate: 60 },
    }),

  getServices: () => 
    fetchApi<IService[]>('/services', {
      next: { tags: ['services'], revalidate: 60 },
    }),
    
  getServiceBySlug: (slug: string) => 
    fetchApi<IService>(`/services/${slug}`, {
      next: { tags: [`service:${slug}`], revalidate: 60 },
    }),
};

