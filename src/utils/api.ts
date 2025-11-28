const API_BASE_URL = 'http://localhost:3001/api';

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Resume {
  id: number;
  user_id: string;
  title: string;
  content: any;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  user?: User;
  resume?: Resume;
  resumes?: Resume[];
}

// Auth API calls
export const authAPI = {
  signup: async (email: string, name: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name, password }),
    });
    return response.json();
  },

  login: async (email: string, password: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },
};

// Resume API calls
export const resumeAPI = {
  getUserResumes: async (userId: string): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/resumes/${userId}`);
    return response.json();
  },

  saveResume: async (userId: string, title: string, content: any): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, title, content }),
    });
    return response.json();
  },

  updateResume: async (resumeId: number, title: string, content: any): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    return response.json();
  },

  deleteResume: async (resumeId: number): Promise<ApiResponse> => {
    const response = await fetch(`${API_BASE_URL}/resumes/${resumeId}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
