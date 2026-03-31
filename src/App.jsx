import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAdminStore } from './store/adminStore';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import ChatPage from './pages/ChatPage';
import AdminKnowledgePage from './pages/admin/AdminKnowledgePage';
import AdminSourcesPage from './pages/admin/AdminSourcesPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import NotFoundPage from './pages/notfondpage/NotFoundPage';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  const { initAuth, isAuthLoading } = useAdminStore();

  useEffect(() => {
    initAuth();
  }, []);

  // Show loading screen while checking authentication
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafc] dark:bg-black">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#0071e3] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-[13px] text-[#8e8e93]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-brand-50 dark:bg-brand-950 text-brand-900 dark:text-brand-50 selection:bg-brand-200 transition-colors duration-300">
        <Routes>

          {/* USER PORTAL - Protected (Requires Login) */}
          <Route path="/" element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          } />

          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* AUTH - Public */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Redirect old admin login to new auth page */}
          <Route path="/admin/login" element={<Navigate to="/auth" replace />} />

          {/* ADMIN PANEL - Protected with Admin Role Check */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboardPage />} />
            <Route path="knowledge" element={<AdminKnowledgePage />} />
            <Route path="sources" element={<AdminSourcesPage />} />
            <Route path="settings" element={
              <div className="p-8">
                <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white tracking-tight">
                  Settings
                </h1>
                <p className="text-[#8e8e93] mt-2">System configuration coming soon...</p>
              </div>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* 404 - Public */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;