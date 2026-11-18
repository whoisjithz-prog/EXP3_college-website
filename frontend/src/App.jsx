import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NewsAndEventsSection from './components/NewsAndEventsSection';
import DedicatedChatPage from './components/DedicatedChatPage';
import FloatingChatWidget from './components/FloatingChatWidget';
import CoursesModal from './components/CoursesModal';
import AdmissionsModal from './components/AdmissionsModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

const API_BASE = 'http://127.0.0.1:8000';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'chat' | 'courses' | 'admissions' | 'news' | 'admin'
  const [anonymousToken, setAnonymousToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Initialize or load anonymous token from localStorage per SRS FR-HIS-04
  useEffect(() => {
    let token = localStorage.getItem('riverview_anon_token');
    if (!token) {
      token = 'guest_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      localStorage.setItem('riverview_anon_token', token);
    }
    setAnonymousToken(token);
  }, []);

  // Search API handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const timer = setTimeout(() => {
      fetch(`${API_BASE}/api/college/search/?q=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setSearchResults(data))
        .catch((err) => console.warn('Search query error:', err));
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleAskInChat = (query) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      {/* Top Navbar strictly matching the UI image */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        onOpenAdmin={() => setActiveTab('admin')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* View 1: Homepage (Strictly matching top layout of uploaded image) */}
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onExplorePrograms={() => setActiveTab('courses')}
              onVisitCampus={() => setActiveTab('chat')}
            />
            <NewsAndEventsSection
              onViewAllNews={() => setActiveTab('news')}
              onViewAllEvents={() => setActiveTab('news')}
            />
          </div>
        )}

        {/* View 2: Dedicated Chat View (Strictly matching bottom layout of uploaded image) */}
        {activeTab === 'chat' && (
          <DedicatedChatPage
            anonymousToken={anonymousToken}
            API_BASE={API_BASE}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {/* Academics / Courses Catalog */}
        {activeTab === 'courses' && (
          <CoursesModal
            API_BASE={API_BASE}
            onAskInChat={handleAskInChat}
          />
        )}

        {/* Admissions & Fees */}
        {(activeTab === 'admissions' || activeTab === 'fees' || activeTab === 'scholarships') && (
          <AdmissionsModal
            onAskInChat={handleAskInChat}
          />
        )}

        {/* News & Events Full View */}
        {activeTab === 'news' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left animate-fadeIn">
            <h2 className="text-3xl font-extrabold text-[#1b365d] mb-6 font-serif">
              Campus News & Official Announcements
            </h2>
            <NewsAndEventsSection
              onViewAllNews={() => {}}
              onViewAllEvents={() => {}}
            />
          </div>
        )}

        {/* Admin Dashboard */}
        {activeTab === 'admin' && (
          <AdminDashboard
            API_BASE={API_BASE}
            onClose={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Floating Chat Widget (Reachable from every page per SRS FR-WEB-03, matching bottom-right of top layout) */}
      {activeTab !== 'chat' && (
        <FloatingChatWidget
          onExpandToFullPage={() => setActiveTab('chat')}
          anonymousToken={anonymousToken}
          API_BASE={API_BASE}
        />
      )}

      {/* Collegiate Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
