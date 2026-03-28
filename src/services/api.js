// services/api.js
import { supabase } from './supabase';

const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('API Base URL:', this.baseURL);
  }

  async getAuthToken() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Your actual token:', session?.access_token);
      return session?.access_token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  async request(endpoint, options = {}) {
    const token = await this.getAuthToken();
    const url = `${this.baseURL}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    console.log('Requesting:', url);
    console.log('Has token:', !!token);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('Response status:', response.status);

      // If 401 or 403, token might be invalid
      if (response.status === 401 || response.status === 403) {
        // Try to refresh the session
        const { data: { session } } = await supabase.auth.refreshSession();
        if (session) {
          // Retry with new token
          const newHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            ...options.headers,
          };
          const retryResponse = await fetch(url, { ...options, headers: newHeaders });
          if (retryResponse.ok) {
            return await retryResponse.json();
          }
        }
        throw new Error('Not authenticated');
      }

      if (!response.ok) {
        let errorMessage;
        try {
          const error = await response.json();
          errorMessage = error.detail || error.message;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getKnowledgeSources(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/knowledge${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  async getKnowledgeSource(id) {
    return this.request(`/api/knowledge/${id}`);
  }

  async addTextKnowledge(data) {
    return this.request('/api/knowledge/add-text', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async uploadFile(file, title, type = 'document') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('type', type);

    const token = await this.getAuthToken();
    const url = `${this.baseURL}/api/knowledge/upload`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
        throw new Error(error.detail || 'Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  }

  async deleteKnowledgeSource(id) {
    return this.request(`/api/knowledge/${id}`, {
      method: 'DELETE',
    });
  }

  async getDataSources() {
    console.log('Fetching data sources...');
    return this.request('/api/sources');
  }


  async addDataSource(url, title) {
    return this.request('/api/sources', {
      method: 'POST',
      body: JSON.stringify({ url, title }),
    });
  }

  async syncDataSource(id) {
    return this.request(`/api/sources/${id}/sync`, {
      method: 'POST',
    });
  }

  async deleteDataSource(id) {
    return this.request(`/api/sources/${id}`, {
      method: 'DELETE',
    });
  }

  async sendChatMessage(data) {
    return this.request('/api/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getConversations() {
    return this.request('/api/conversations');
  }

  async getConversation(id) {
    return this.request(`/api/conversations/${id}`);
  }

  async deleteConversation(id) {
    return this.request(`/api/conversations/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();