// frontend/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const getAuthHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    }
  }
  return {
    'Content-Type': 'application/json',
  };
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
      // Attempt to parse JSON error, fallback to status text
      const errorBody = await response.json().catch(() => ({ detail: `HTTP error! status: ${response.status}` }));
      throw new Error(errorBody.detail || `HTTP error! status: ${response.status}`);
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
      const errorBody = await response.json().catch(() => ({ detail: `HTTP error! status: ${response.status}` }));
      throw new Error(errorBody.detail || `HTTP error! status: ${response.status}`);
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
      const errorBody = await response.json().catch(() => ({ detail: `HTTP error! status: ${response.status}` }));
      throw new Error(errorBody.detail || `HTTP error! status: ${response.status}`);
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
      const errorBody = await response.json().catch(() => ({ detail: `HTTP error! status: ${response.status}` }));
      throw new Error(errorBody.detail || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
