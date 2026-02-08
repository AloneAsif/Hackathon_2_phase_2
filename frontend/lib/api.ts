// frontend/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:8000';

const getAuthHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

interface ApiClientResponse<T> extends Response {
  json(): Promise<T>;
}


export const apiClient = {
  get: async <T>(path: string, userId?: string): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  post: async <T>(path: string, data: any): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  put: async <T>(path: string, data: any): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  patch: async <T>(path: string, data: any): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  delete: async <T>(path: string): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },
};

export const authApiClient = {
  get: async <T>(path: string, userId?: string): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${AUTH_API_BASE_URL}${path}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  post: async <T>(path: string, data: any): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${AUTH_API_BASE_URL}${path}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  put: async <T>(path: string, data: any): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${AUTH_API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  patch: async <T>(path: string, data: any): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${AUTH_API_BASE_URL}${path}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },

  delete: async <T>(path: string): Promise<T> => {
    const headers = getAuthHeaders();
    const response: ApiClientResponse<T> = await fetch(`${AUTH_API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      let errorMessage = `HTTP error! status: ${response.status}`;

      if (errorBody && typeof errorBody === 'object' && 'detail' in errorBody && typeof errorBody.detail === 'string') {
        errorMessage = errorBody.detail;
      }
      throw new Error(errorMessage);
    }
    return response.json();
  },
};