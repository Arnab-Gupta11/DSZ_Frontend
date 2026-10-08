import { ApiResponse, IWork, IArticle, IService, IJob } from '@/types/api';

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
  
  const isFormData = options.body instanceof FormData;
  const headers = new Headers(options.headers || {});
  
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError('Not Found', 404);
      }
      // Try to parse error message from backend
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData.message || 'An error occurred while fetching data', response.status);
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
  applyForJob: (jobId: string, formData: FormData) => {
    return fetchApi<any>(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: formData,
    });
  },

  submitContact: (data: any) => {
    return fetchApi<any>(`/contact`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getJobs: (params?: { department?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.department) searchParams.append('department', params.department);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    const query = searchParams.toString();
    return fetchApi<IJob[]>(`/jobs${query ? `?${query}` : ''}`, {
      cache: 'no-store',
    });
  },

  getJobBySlug: (slug: string) => 
    fetchApi<IJob>(`/jobs/${slug}`, {
      next: { tags: [`job:${slug}`], revalidate: 60 },
    }),

  getWorks: (params?: { service?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.service) searchParams.append('service', params.service);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    const query = searchParams.toString();
    return fetchApi<IWork[]>(`/works${query ? `?${query}` : ''}`, {
      cache: 'no-store', // Force fresh data for filtered lists
    });
  },
    
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

