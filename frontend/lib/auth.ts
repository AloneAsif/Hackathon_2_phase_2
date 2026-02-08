// frontend/lib/auth.ts
import { SignInData, SignUpData, User } from '../types/user';
import { authApiClient } from './api';

const TOKEN_KEY = 'jwt_token';

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  // Basic check: just presence of token. A more robust check would validate expiration.
  return !!token;
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const signIn = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  const response: any = await authApiClient.post('/auth/login', { email, password });
  if (typeof window !== 'undefined' && response.access_token) {
    localStorage.setItem(TOKEN_KEY, response.access_token);
  }
  // Assuming the backend returns user data along with the token
  // For now, mocking user data based on email, will need to adjust if backend response is different
  const mockUser: User = {
    id: response.user_id || 'mock-id',
    email: email,
    name: response.username || 'User', // Assuming username might be in response
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return { user: mockUser, token: response.access_token };
};

export const signUp = async (email: string, name: string, password: string): Promise<{ user: User; token: string }> => {
  const response: any = await authApiClient.post('/auth/register', { email, name, password });
  if (typeof window !== 'undefined' && response.access_token) {
    localStorage.setItem(TOKEN_KEY, response.access_token);
  }
  const mockUser: User = {
    id: response.user_id || 'mock-id',
    email: email,
    name: name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return { user: mockUser, token: response.access_token };
};

export const signOut = async () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};