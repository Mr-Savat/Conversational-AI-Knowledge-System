import { create } from 'zustand';

export const useAdminStore = create((set) => ({
  isAuthenticated: true, // Set to true for development
  searchQuery: '',
  knowledgeSources: [
    { id: 1, title: 'Academic Policy 2026', type: 'document', documentCount: 5, status: 'Active', date: '2026-03-10' },
    { id: 2, title: 'University Website', type: 'url', documentCount: 124, status: 'Processing', date: '2026-03-12' },
  ],
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addKnowledgeSource: (source) => set((state) => ({
    knowledgeSources: [source, ...state.knowledgeSources]
  })),
  
  deleteKnowledgeSource: (id) => set((state) => ({
    knowledgeSources: state.knowledgeSources.filter(s => s.id !== id)
  })),
  
  logout: () => set({ isAuthenticated: false }),
}));

