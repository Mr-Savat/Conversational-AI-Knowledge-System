// services/api.js
const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('API Base URL:', this.baseURL);
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('Requesting:', url);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      console.log('Response status:', response.status);

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

    const url = `${this.baseURL}/api/knowledge/upload`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
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
}

export default new ApiService();