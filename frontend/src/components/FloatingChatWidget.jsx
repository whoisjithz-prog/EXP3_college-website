import React, { useState, useRef, useEffect } from 'react';
import RobotAvatar from './RobotAvatar';
import { Send, X, Maximize2, RotateCcw, Sparkles } from 'lucide-react';

export default function FloatingChatWidget({ 
  onExpandToFullPage,
  activeSessionId,
  anonymousToken,
  API_BASE = 'http://127.0.0.1:8000'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm Riverview's AI assistant. How can I help you today? 😊"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(activeSessionId);
  const messagesEndRef = useRef(null);

  const starterChips = [
    "What are B.Sc. Computer Science fees?",
    "Tell me about Admissions 2025",
    "What was the highest placement package?",
    "Upcoming campus events",
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Initialize or fetch session
  const initSession = async () => {
    if (currentSessionId) return currentSessionId;
    try {
      const res = await fetch(`${API_BASE}/api/chat/sessions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anonymous_token: anonymousToken || 'guest-' + Math.random().toString(36).substring(2, 9),
          title: 'Guest Inquiry'
        })
      });
      const data = await res.json();
      setCurrentSessionId(data.id);
      return data.id;
    } catch (err) {
      console.warn('Backend connection note:', err);
      return null;
    }
  };

  const handleSendMessage = async (queryText = null) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    // Add user message to UI immediately
    const userMsg = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: textToSend
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const sessId = await initSession();
      if (!sessId) throw new Error('Could not create session');

      const res = await fetch(`${API_BASE}/api/chat/sessions/${sessId}/messages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      
      const botMsg = {
        id: data.assistant_message.id,
        role: 'assistant',
        content: data.assistant_message.content
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      // Cheerful resilient fallback
      setMessages((prev) => [
        ...prev,
        {
          id: 'bot-fallback-' + Date.now(),
          role: 'assistant',
          content: "Hello! 😊 For questions regarding admissions, fees, or course schedules, our Admissions Office is always happy to help at admissions@riverview.edu or +1 (800) 555-RIVE (Mon-Fri 9 AM - 5 PM)!"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setCurrentSessionId(null);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm Riverview's AI assistant. How can I help you today? 😊"
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Trigger Button strictly matching the design */}
      {!isOpen && (
        <div className="relative group flex flex-col items-end">
          {/* "Chat with us!" Tooltip Bubble */}
          <div className="mb-2 relative bg-[#1b365d] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg animate-bounce flex items-center gap-1.5">
            <span>Chat with us!</span>
            {/* Down arrow triangle */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#1b365d] transform rotate-45" />
          </div>

          {/* Circular Button with Robot Avatar & Sparkles */}
          <div className="relative">
            {/* Sparkle lines */}
            <div className="absolute -top-1.5 -right-1.5 text-[#f59e0b] pointer-events-none animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-[#1b365d] hover:bg-[#112240] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/90"
              aria-label="Open Riverview AI Assistant Chat"
            >
              <RobotAvatar size={34} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[370px] sm:w-[420px] h-[560px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="bg-[#1b365d] text-white px-5 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1 border border-white/20">
                <RobotAvatar size={26} />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                  Riverview AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
                </h3>
                <p className="text-[11px] text-blue-200">Ask about courses, fees & admissions</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart Chat"
                className="p-1.5 hover:bg-white/10 rounded-full text-blue-200 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onExpandToFullPage}
                title="Expand to Full Page Chat"
                className="p-1.5 hover:bg-white/10 rounded-full text-blue-200 hover:text-white transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 hover:bg-white/10 rounded-full text-blue-200 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f8fafc]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#1b365d] flex items-center justify-center shrink-0 mt-0.5">
                    <RobotAvatar size={18} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-[#1b365d] text-white rounded-br-xs'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-xs'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-[#1b365d] flex items-center justify-center shrink-0">
                  <RobotAvatar size={18} />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#1b365d] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#1b365d] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#1b365d] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {starterChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="text-[11px] font-medium bg-white hover:bg-[#eef6fc] text-slate-700 hover:text-[#1b365d] border border-slate-200 hover:border-[#1b365d]/40 rounded-full px-2.5 py-1 transition-all text-left"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Bottom Input Box */}
          <div className="p-3 bg-white border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#f1f5f9] border border-slate-200 rounded-full px-3 py-1.5 focus-within:border-[#1b365d] focus-within:bg-white transition-all"
            >
              <input
                type="text"
                placeholder="Type your question here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={1000}
                className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="w-8 h-8 rounded-full bg-[#1b365d] hover:bg-[#112240] disabled:bg-slate-300 text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="text-[10px] text-slate-400 text-center mt-1.5">
              Riverview College AI answers strictly from official college data.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
