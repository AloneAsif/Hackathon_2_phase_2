// Authentication utilities for Better Auth integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt_token', token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token');
  }
  return null;
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token');
  }
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  // In a real implementation, you'd also verify the token hasn't expired
  return !!token;
};

// Functions for Better Auth integration
// These interact with the backend API
export const signIn = async (email: string, password: string): Promise<{ user: any; token: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || 'Sign in failed');
  }

  const data = await response.json();
  if (data.token) {
    setAuthToken(data.token);
  }

  return data;
};

export const signUp = async (email: string, name: string, password: string): Promise<{ user: any; token: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || 'Sign up failed');
  }

  const data = await response.json();
  if (data.token) {
    setAuthToken(data.token);
  }

  return data;
};

export const signOut = async (): Promise<void> => {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      removeAuthToken();
    }
  } catch (error) {
    // Even if API call fails, still remove local token
    removeAuthToken();
  }
};