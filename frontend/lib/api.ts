// API client with JWT token handling for API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    userId?: string
  ): Promise<T> {
    // Construct the URL based on the endpoint and userId
    let url = `${this.baseUrl}${endpoint}`;

    // For user-specific endpoints, replace placeholders or construct properly
    if (userId && endpoint.includes('{user_id}')) {
      url = `${this.baseUrl}${endpoint.replace('{user_id}', userId)}`;
    } else if (userId && !endpoint.startsWith('/api/')) {
      // Adjust endpoint format to match backend API: /api/{user_id}/tasks
      const parts = endpoint.split('/');
      if (parts.length >= 3 && parts[1] === 'users' && parts[3]) {
        // Convert /users/{userId}/tasks/{taskId} to /api/{userId}/tasks/{taskId}
        url = `${this.baseUrl}/api/${userId}/${parts.slice(3).join('/')}`;
      } else if (parts.length >= 2 && parts[1] === 'users') {
        // Convert /users/{userId}/tasks to /api/{userId}/tasks
        url = `${this.baseUrl}/api/${userId}/${parts[3] || ''}`;
      }
    }

    // Get JWT token from wherever it's stored (localStorage, cookies, etc.)
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

    const finalHeaders = new Headers();
    finalHeaders.set('Content-Type', 'application/json');

    // Merge existing headers from options
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          finalHeaders.set(key, value);
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          finalHeaders.set(key, value);
        });
      } else { // Record<string, string>
        for (const key in options.headers) {
          finalHeaders.set(key, options.headers[key]);
        }
      }
    }

    if (token) {
      finalHeaders.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers: finalHeaders,
    });

    if (!response.ok) {
      // Get error details from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += `, message: ${errorData.detail || errorData.message || 'Unknown error'}`;
      } catch (e) {
        // If response is not JSON, use the status text
        errorMessage += `, message: ${response.statusText}`;
      }

      throw new Error(errorMessage);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string, userId?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, userId);
  }

  async post<T>(endpoint: string, data?: any, userId?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, userId);
  }

  async put<T>(endpoint: string, data?: any, userId?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, userId);
  }

  async patch<T>(endpoint: string, data?: any, userId?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }, userId);
  }

  async delete<T>(endpoint: string, userId?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, userId);
  }
}

export const apiClient = new ApiClient();

export default ApiClient;