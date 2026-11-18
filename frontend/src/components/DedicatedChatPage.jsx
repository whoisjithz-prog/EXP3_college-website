import React, { useState, useRef, useEffect } from 'react';
import RobotAvatar from './RobotAvatar';
import { Send, Sparkles, Plus, Trash2, History, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function DedicatedChatPage({ 
  anonymousToken, 
  API_BASE = 'http://127.0.0.1:8000',
  onBackToHome 
}) {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [notice, setNotice] = useState(null);
  const messagesEndRef = useRef(null);

  const starterChips = [
    "What are the B.Sc. Computer Science fees?",
    "And what is the eligibility for it?",
    "Admissions timeline for 2025-26",
    "What was the highest placement package in 2025?",
    "Hostel accommodation and room types",
    "Upcoming campus events & Career Fair"
  ];

  // Fetch or create user session
  useEffect(() => {
    loadSessions();
  }, [anonymousToken]);

  const loadSessions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/sessions/?anonymous_token=${anonymousToken}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
        if (data.length > 0 && !currentSessionId) {
          // Open the most recent session
          selectSession(data[0].id);
        } else if (data.length === 0) {
          createNewSession();
        }
      }
    } catch (err) {
      console.warn('Backend loadSessions note:', err);
      // Local fallback session
      if (messages.length === 0) {
        setMessages([
          {
            id: 'init-welcome',
            role: 'assistant',
            content: "Hello! I'm Riverview's AI assistant.\nHow can I help you today? 😊"
          }
        ]);
      }
    }
  };

  const createNewSession = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/chat/sessions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anonymous_token: anonymousToken,
          title: 'New Conversation'
        })
      });
      if (res.ok) {
        const newSess = await res.json();
        setSessions((prev) => [newSess, ...prev]);
        setCurrentSessionId(newSess.id);
        setMessages([
          {
            id: 'welcome-' + newSess.id,
            role: 'assistant',
            content: "Hello! I'm Riverview's AI assistant.\nHow can I help you today? 😊"
          }
        ]);
      }
    } catch (err) {
      console.warn(err);
      setCurrentSessionId('local-' + Date.now());
      setMessages([
        {
          id: 'welcome-local',
          role: 'assistant',
          content: "Hello! I'm Riverview's AI assistant.\nHow can I help you today? 😊"
        }
      ]);
    }
  };

  const selectSession = async (sessId) => {
    setCurrentSessionId(sessId);
    try {
      const res = await fetch(`${API_BASE}/api/chat/sessions/${sessId}/messages/`);
      if (res.ok) {
        const msgs = await res.json();
        if (msgs.length === 0) {
          setMessages([
            {
              id: 'welcome-' + sessId,
              role: 'assistant',
              content: "Hello! I'm Riverview's AI assistant.\nHow can I help you today? 😊"
            }
          ]);
        } else {
          setMessages(msgs);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteSession = async (sessId, e) => {
    e.stopPropagation();
    try {
      await fetch(`${API_BASE}/api/chat/sessions/${sessId}/`, { method: 'DELETE' });
      setSessions((prev) => prev.filter((s) => s.id !== sessId));
      if (currentSessionId === sessId) {
        const remaining = sessions.filter((s) => s.id !== sessId);
        if (remaining.length > 0) {
          selectSession(remaining[0].id);
        } else {
          createNewSession();
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (query = null) => {
    const textToSend = (query || inputText).trim();
    if (!textToSend || isLoading) return;

    let sessId = currentSessionId;
    if (!sessId || sessId.startsWith('local-')) {
      await createNewSession();
      sessId = currentSessionId;
    }

    const userMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: textToSend
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat/sessions/${sessId}/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) throw new Error('API response not ok');
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: data.assistant_message.id,
          role: 'assistant',
          content: data.assistant_message.content
        }
      ]);

      // Update session title in list if this was the first question
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessId && s.title === 'New Conversation'
            ? { ...s, title: textToSend.substring(0, 32) + '...' }
            : s
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: (
            "Hello! 😊 I'm always delighted to assist you with Riverview College inquiries!\n\n" +
            "For full course catalogs, official fee structures, or campus tours, our Admissions Office is happy to help:\n" +
            "• Email: admissions@riverview.edu\n" +
            "• Phone: +1 (800) 555-RIVE (Mon-Fri 9:00 AM - 5:00 PM)"
          )
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)] bg-gradient-to-b from-[#e3effb] via-[#eef6fc] to-[#f8fafc] flex flex-col justify-between overflow-hidden">
      
      {/* Soft Illustrated Campus Backdrop matching the bottom view of image */}
      {/* Clocktower Illustration on the bottom-left */}
      <div className="absolute left-0 bottom-0 w-80 sm:w-96 md:w-[480px] pointer-events-none opacity-40 select-none z-0">
        <svg viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Belltower/Clocktower structure */}
          <path d="M80 450V250L130 180L180 250V450H80Z" fill="#a0c4e8" fillOpacity="0.4" />
          <path d="M130 130L150 180H110L130 130Z" fill="#7ba7d7" fillOpacity="0.5" />
          <circle cx="130" cy="220" r="14" fill="#ffffff" fillOpacity="0.7" />
          <rect x="128" y="212" width="4" height="10" fill="#7ba7d7" />
          <rect x="128" y="220" width="8" height="3" fill="#7ba7d7" />
          {/* Building wings */}
          <rect x="180" y="320" width="160" height="130" fill="#bfd9f2" fillOpacity="0.4" />
          <rect x="20" y="340" width="60" height="110" fill="#bfd9f2" fillOpacity="0.3" />
          {/* Trees */}
          <circle cx="60" cy="420" r="45" fill="#8cbde5" fillOpacity="0.4" />
          <circle cx="210" cy="430" r="55" fill="#8cbde5" fillOpacity="0.4" />
          <circle cx="330" cy="420" r="65" fill="#7faecf" fillOpacity="0.35" />
        </svg>
      </div>

      {/* Illustrated Green Leaves framing the top-right corner */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 pointer-events-none opacity-40 select-none z-0">
        <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M300 0C250 20 200 60 170 120" stroke="#4a7c59" strokeWidth="3" strokeLinecap="round" />
          <path d="M210 50C190 35 160 55 175 75C190 95 210 50 210 50Z" fill="#609966" />
          <path d="M175 110C150 95 130 115 145 135C160 155 175 110 175 110Z" fill="#9dc08b" />
          <path d="M260 20C240 10 220 30 235 45C250 60 260 20 260 20Z" fill="#609966" />
          <path d="M270 70C250 65 240 85 255 100C270 115 270 70 270 70Z" fill="#9dc08b" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10 relative z-10 flex-1 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Handwritten Calligraphy "Ask. Learn. Explore." */}
          <div className="lg:col-span-4 text-left pl-2 sm:pl-6 select-none">
            <div className="relative inline-block">
              {/* Cursive handwritten font */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl text-[#1b365d] font-handwriting font-bold tracking-tight transform -rotate-2">
                Ask. Learn. Explore.
              </h1>
              
              {/* Playful Yellow Brush Stroke / Highlighter Underline */}
              <div className="absolute -bottom-3 left-2 w-48 sm:w-60 h-3 text-[#f59e0b] opacity-90 pointer-events-none">
                <svg viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M3 8C45 4 120 2 195 7" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <p className="mt-8 text-sm text-slate-600 max-w-xs leading-relaxed hidden lg:block">
              Get immediate answers about programs, tuition fees, faculty, campus events, and admissions from Riverview's dedicated AI assistant.
            </p>

            {/* Session Management Drawer Button */}
            <div className="mt-6 hidden lg:flex items-center gap-3">
              <button
                onClick={createNewSession}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white text-[#1b365d] text-xs font-semibold rounded-full border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#1b365d]" />
                <span>New Conversation</span>
              </button>

              <button
                onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-[#1b365d] text-xs font-medium rounded-full hover:bg-white/60 transition-colors"
              >
                <History className="w-3.5 h-3.5" />
                <span>Past Chats ({sessions.length})</span>
              </button>
            </div>
          </div>

          {/* Right Side: The White Chat Card strictly matching the bottom layout */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl border border-white/80 backdrop-blur-md p-6 sm:p-8 flex flex-col h-[580px] max-h-[75vh] relative overflow-hidden">
              
              {/* Yellow Sparkle Lines in the top-right corner */}
              <div className="absolute top-5 right-7 text-[#f59e0b] pointer-events-none select-none">
                <svg width="30" height="26" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 22L1 18" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 13L6 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M19 8L18 2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M27 12L31 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Chat Messages Stream */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-left">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3.5 ${
                      m.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Bot Avatar on Assistant messages */}
                    {m.role === 'assistant' && (
                      <div className="shrink-0">
                        <RobotAvatar size={42} />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-xs sm:text-[14px] leading-relaxed shadow-2xs whitespace-pre-line ${
                        m.role === 'user'
                          ? 'bg-[#1b365d] text-white rounded-br-xs font-medium'
                          : 'bg-[#f0f6fc] text-slate-800 border border-[#e1edf9] rounded-tl-xs'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex items-start gap-3.5 justify-start">
                    <RobotAvatar size={42} />
                    <div className="bg-[#f0f6fc] border border-[#e1edf9] rounded-2xl px-5 py-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1b365d] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1b365d] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1b365d] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Starter Chips */}
              {messages.length <= 2 && (
                <div className="pt-3 pb-2 flex flex-wrap items-center gap-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Suggested:
                  </span>
                  {starterChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(chip)}
                      className="text-xs bg-[#f8fafc] hover:bg-[#eef6fc] text-slate-700 hover:text-[#1b365d] border border-slate-200 hover:border-[#1b365d]/50 rounded-full px-3 py-1.5 transition-all text-left shadow-2xs cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Bottom Chat Input Bar strictly matching the design */}
              <div className="pt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2 border border-slate-200/90 rounded-full px-4 py-2 bg-white focus-within:border-[#1b365d] focus-within:ring-2 focus-within:ring-[#1b365d]/10 transition-all shadow-xs"
                >
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    maxLength={1000}
                    className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none px-1"
                  />

                  {/* Blue Pill Button "✈ Ask" */}
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1b365d] hover:bg-[#112240] disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 transform -rotate-45 -mt-0.5" />
                    <span>Ask</span>
                  </button>
                </form>

                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Official responses based on Riverview College Knowledge Base. Contact Admissions Office for formal verification.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* History Drawer Modal */}
      {showHistoryDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
          <div className="w-80 max-w-full bg-white h-full shadow-2xl p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-[#1b365d] text-base flex items-center gap-2">
                <History className="w-4 h-4 text-[#1b365d]" />
                Conversation History
              </h3>
              <button
                onClick={() => setShowHistoryDrawer(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-4">
              <button
                onClick={() => {
                  createNewSession();
                  setShowHistoryDrawer(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1b365d] hover:bg-[#112240] text-white text-xs font-semibold rounded-full shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Start New Conversation</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-left">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  onClick={() => {
                    selectSession(sess.id);
                    setShowHistoryDrawer(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    currentSessionId === sess.id
                      ? 'border-[#1b365d] bg-[#eef6fc] text-[#1b365d]'
                      : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-white'
                  }`}
                >
                  <div className="truncate flex-1 pr-2">
                    <p className="text-xs font-medium truncate">{sess.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{new Date(sess.updated_at).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={(e) => deleteSession(sess.id, e)}
                    title="Delete Conversation"
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 rounded transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
