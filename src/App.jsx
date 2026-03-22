import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import AdminLayout from './layouts/AdminLayout';
import ChatPage from './pages/ChatPage';
import AdminKnowledgePage from './pages/admin/AdminKnowledgePage';
import AdminSourcesPage from './pages/admin/AdminSourcesPage'; // 1. Import the page
import AdminLoginPage from './pages/admin/AdminLoginPage';
import NotFoundPage from './pages/notfondpage/NotFoundPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-brand-50 dark:bg-brand-950 text-brand-900 dark:text-brand-50 selection:bg-brand-200 transition-colors duration-300">
        <Routes>

          {/* USER PORTAL */}
          <Route path="/" element={
            <>
              <Navbar />
              <ChatPage />
            </>
          } />

          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* ADMIN PANEL (Nested Routes) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<div className="p-8">Dashboard Coming Soon...</div>} />
            <Route path="knowledge" element={<AdminKnowledgePage />} />
            <Route path="sources" element={<AdminSourcesPage />} />
            <Route path="settings" element={<div className="p-8">Settings Coming Soon...</div>} />
            {/* <Route path="*" element={<Navigate to="/admin" replace />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;