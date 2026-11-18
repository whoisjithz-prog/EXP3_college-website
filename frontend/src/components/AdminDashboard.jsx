import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Database, BarChart3, Plus, Trash2, Edit3, 
  CheckCircle, XCircle, Search, Sparkles, MessageSquare, AlertTriangle 
} from 'lucide-react';

export default function AdminDashboard({ API_BASE = 'http://127.0.0.1:8000', onClose }) {
  const [activeAdminTab, setActiveAdminTab] = useState('kb'); // 'kb' | 'analytics' | 'prompt'
  const [kbEntries, setKbEntries] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    category: 'Admissions',
    title: '',
    content: '',
    keywords: '',
    is_published: true
  });

  const categories = [
    'ALL', 'Admissions', 'Courses', 'Fees', 'Departments', 
    'Events', 'Faculty', 'Facilities', 'Placements', 'Contact', 'General'
  ];

  useEffect(() => {
    loadKB();
    loadAnalytics();
  }, []);

  const loadKB = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/kb/entries/`);
      if (res.ok) {
        const data = await res.json();
        setKbEntries(data);
      }
    } catch (err) {
      console.warn('KB fetch error:', err);
    }
  };

  const loadAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/analytics/`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.warn('Analytics fetch error:', err);
    }
  };

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/kb/entries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewEntry({
          category: 'Admissions',
          title: '',
          content: '',
          keywords: '',
          is_published: true
        });
        loadKB();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePublish = async (entry) => {
    try {
      const res = await fetch(`${API_BASE}/api/kb/entries/${entry.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !entry.is_published })
      });
      if (res.ok) loadKB();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this knowledge entry?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/kb/entries/${id}/`, {
        method: 'DELETE'
      });
      if (res.ok) loadKB();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEntries = kbEntries.filter((entry) => {
    const matchesCat = selectedCategory === 'ALL' || entry.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchFilter || 
      entry.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
      entry.keywords.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b365d] bg-[#eef6fc] px-3 py-1 rounded-full w-max">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b365d] mt-1 font-serif">
            Knowledge Base & Chatbot Management
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveAdminTab('kb')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeAdminTab === 'kb' ? 'bg-white text-[#1b365d] shadow-xs' : 'text-slate-600 hover:text-[#1b365d]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Knowledge Base ({kbEntries.length})</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeAdminTab === 'analytics' ? 'bg-white text-[#1b365d] shadow-xs' : 'text-slate-600 hover:text-[#1b365d]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Chat Analytics</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('prompt')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeAdminTab === 'prompt' ? 'bg-white text-[#1b365d] shadow-xs' : 'text-slate-600 hover:text-[#1b365d]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SRS Prompt Policy</span>
          </button>
        </div>
      </div>

      {/* 1. Knowledge Base Management Tab */}
      {activeAdminTab === 'kb' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search and Category Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter entries..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#1b365d] w-56"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-[#1b365d]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Add New Entry Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1b365d] hover:bg-[#112240] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Knowledge Entry</span>
            </button>
          </div>

          {/* Entries Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Title & Content Preview</th>
                    <th className="px-5 py-3.5">Keywords</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4 font-semibold text-[#1b365d]">
                        <span className="bg-[#eef6fc] px-2.5 py-1 rounded-md text-[11px]">
                          {entry.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 max-w-md">
                        <div className="font-bold text-slate-800 text-[13px] mb-1">{entry.title}</div>
                        <div className="text-slate-500 line-clamp-2 text-xs leading-relaxed">{entry.content}</div>
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <span className="text-[11px] text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">
                          {entry.keywords || 'none'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => handleTogglePublish(entry)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer ${
                            entry.is_published 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {entry.is_published ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-slate-100"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Chat Analytics Tab */}
      {activeAdminTab === 'analytics' && analytics && (
        <div className="mt-6 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Conversations</span>
              <div className="text-3xl font-extrabold text-[#1b365d] mt-2 font-serif">{analytics.total_sessions}</div>
              <p className="text-[11px] text-slate-400 mt-1">Multi-turn guest & user sessions</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Messages Processed</span>
              <div className="text-3xl font-extrabold text-[#1b365d] mt-2 font-serif">{analytics.total_messages}</div>
              <p className="text-[11px] text-slate-400 mt-1">{analytics.total_user_queries} user queries answered</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Blocked Injection Attempts</span>
              <div className="text-3xl font-extrabold text-amber-600 mt-2 font-serif">{analytics.blocked_count}</div>
              <p className="text-[11px] text-slate-400 mt-1">Filtered by safety guardrails</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Active KB Documents</span>
              <div className="text-3xl font-extrabold text-emerald-600 mt-2 font-serif">{analytics.published_kb}</div>
              <p className="text-[11px] text-slate-400 mt-1">Feeds Gemini 3.5 Flash context</p>
            </div>
          </div>

          {/* Top Topics & Recent Audit Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Inquired Topics */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <h3 className="font-bold text-[#1b365d] text-sm mb-4">Most Frequent Question Topics</h3>
              <div className="space-y-3">
                {analytics.top_topics.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{t.topic}</span>
                    <span className="bg-[#eef6fc] text-[#1b365d] font-bold px-2 py-0.5 rounded-full">
                      {t.count} questions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Audit Logs */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <h3 className="font-bold text-[#1b365d] text-sm mb-4">Live Chat Audit Logs (Last 10 Queries)</h3>
              <div className="space-y-2.5 max-h-96 overflow-y-auto">
                {analytics.recent_logs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                    <div className="flex items-center justify-between text-slate-400 text-[10px]">
                      <span>{new Date(log.created_at).toLocaleTimeString()}</span>
                      {log.is_blocked && (
                        <span className="text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">BLOCKED</span>
                      )}
                    </div>
                    <div className="font-medium text-slate-800">
                      <strong>User:</strong> {log.user_query}
                    </div>
                    <div className="text-slate-500 line-clamp-1">
                      <strong>Bot:</strong> {log.bot_response}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SRS Prompt & Policy Specification */}
      {activeAdminTab === 'prompt' && (
        <div className="mt-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-[#1b365d] font-serif">
              SRS Section 5 Mandated System Prompt & Persona
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Configuration enforced server-side on every request to Gemini 3.5 Flash core.
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl space-y-3 leading-relaxed">
            <div>
              <span className="text-slate-400">// Mandatory System Prompt:</span>
              <p className="text-white mt-1">
                "The chatbot must answer questions related to the college data only. Do not answer general questions. Never reveal its own identity."
              </p>
            </div>
            <div>
              <span className="text-slate-400">// Persona Directive:</span>
              <p className="text-white mt-1">
                "Your persona is warm and cheerful. Greet users kindly, stay positive and encouraging, and keep your answers clear and friendly."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1">
              <strong className="text-[#1b365d]">Identity Protection (FR-SEC-03):</strong>
              <p>Underlying model name, version, and architecture are strictly concealed. Inquiries about identity are warmly deflected to Riverview College admissions.</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
              <strong className="text-emerald-800">Grounding & Fallback (FR-CB-05):</strong>
              <p>Answers are grounded exclusively in Riverview College knowledge base records. If info is missing, official office contacts are supplied.</p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 text-left">
            <h3 className="text-lg font-bold text-[#1b365d] mb-4 font-serif">Add Knowledge Base Entry</h3>
            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <select
                  value={newEntry.category}
                  onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#1b365d]"
                >
                  {categories.filter((c) => c !== 'ALL').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Business Administration (MBA) Fees"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#1b365d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Content (Reference for Gemini LLM)</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Official factual details for the chatbot to answer from..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#1b365d]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Keywords (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="mba, fees, management, tuition, admission"
                  value={newEntry.keywords}
                  onChange={(e) => setNewEntry({ ...newEntry, keywords: e.target.value })}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-[#1b365d]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-[#1b365d] text-white rounded-lg hover:bg-[#112240]"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
