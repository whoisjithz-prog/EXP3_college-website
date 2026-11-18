import React, { useState } from 'react';
import CollegeLogo from './CollegeLogo';
import { ChevronDown, Search, X, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  searchQuery, 
  setSearchQuery,
  searchResults,
  onOpenAdmin,
  isAdmin
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { 
      id: 'academics', 
      label: 'Academics', 
      hasDropdown: true,
      subItems: [
        { label: 'All Programs & Courses', tab: 'courses' },
        { label: 'School of Computer Science', tab: 'courses' },
        { label: 'AI & Data Science', tab: 'courses' },
        { label: 'Riverview Business School', tab: 'courses' },
        { label: 'Faculty Directory', tab: 'faculty' },
      ]
    },
    { 
      id: 'admissions', 
      label: 'Admissions', 
      hasDropdown: true,
      subItems: [
        { label: 'Admissions 2025-26', tab: 'admissions' },
        { label: 'Tuition & Fee Structure', tab: 'fees' },
        { label: 'Scholarships & Aid', tab: 'scholarships' },
      ]
    },
    { 
      id: 'campus', 
      label: 'Campus Life', 
      hasDropdown: true,
      subItems: [
        { label: 'Campus Facilities & Labs', tab: 'facilities' },
        { label: 'Student Hostels', tab: 'facilities' },
        { label: 'Placements & Career Center', tab: 'placements' },
      ]
    },
    { id: 'news', label: 'News & Events' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <CollegeLogo 
          size={38} 
          onClick={() => setActiveTab('home')} 
        />

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => (
            <div 
              key={item.id} 
              className="relative group"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setOpenDropdown(null);
                }}
                className={`flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors duration-150 rounded-md ${
                  activeTab === item.id 
                    ? 'text-[#1b365d] font-bold border-b-2 border-[#1b365d] rounded-b-none' 
                    : 'text-slate-700 hover:text-[#1b365d] hover:bg-slate-50'
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1b365d] transition-transform group-hover:rotate-180" />
                )}
              </button>

              {/* Dropdown Menu */}
              {item.hasDropdown && openDropdown === item.id && (
                <div className="absolute top-full left-0 w-60 py-2 bg-white rounded-xl shadow-xl border border-slate-100 animate-fadeIn z-50">
                  {item.subItems.map((sub, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveTab(sub.tab);
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-600 hover:text-[#1b365d] hover:bg-[#eef6fc] transition-colors"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section: Search Bar & Actions */}
        <div className="flex items-center space-x-3">
          {/* Search Box matching the image */}
          <div className="relative">
            <div className="flex items-center bg-[#f1f5f9]/80 border border-slate-200/80 rounded-full px-3 py-1.5 w-44 sm:w-56 focus-within:w-64 focus-within:border-[#1b365d] focus-within:bg-white transition-all shadow-2xs">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={onOpenSearch}
                className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Quick Dropdown */}
            {searchQuery && searchResults && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 z-50 max-h-96 overflow-y-auto">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
                  Search Results
                </div>
                {searchResults.courses?.length > 0 && (
                  <div className="mb-2">
                    <span className="text-[11px] font-semibold text-[#1b365d] px-2">Courses</span>
                    {searchResults.courses.map((c) => (
                      <div 
                        key={c.id} 
                        onClick={() => { setActiveTab('courses'); setSearchQuery(''); }}
                        className="px-2 py-1.5 hover:bg-slate-50 rounded text-xs text-slate-700 cursor-pointer"
                      >
                        <div className="font-medium">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.degree_level} • ${c.annual_fees}/yr</div>
                      </div>
                    ))}
                  </div>
                )}
                {searchResults.events?.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-[#1b365d] px-2">Events</span>
                    {searchResults.events.map((e) => (
                      <div 
                        key={e.id}
                        onClick={() => { setActiveTab('news'); setSearchQuery(''); }}
                        className="px-2 py-1.5 hover:bg-slate-50 rounded text-xs text-slate-700 cursor-pointer"
                      >
                        <div className="font-medium">{e.title}</div>
                        <div className="text-[10px] text-slate-400">{e.event_date}</div>
                      </div>
                    ))}
                  </div>
                )}
                {!searchResults.courses?.length && !searchResults.events?.length && (
                  <div className="text-xs text-slate-500 text-center py-3">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dedicated Chat Link */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'chat' 
                ? 'bg-[#1b365d] text-white shadow-sm' 
                : 'text-[#1b365d] bg-[#eef6fc] hover:bg-[#dbeafe]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>

          {/* Admin Dashboard Button */}
          <button
            onClick={onOpenAdmin}
            title="Admin Dashboard & Knowledge Base"
            className="p-1.5 text-slate-500 hover:text-[#1b365d] hover:bg-slate-100 rounded-full transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
