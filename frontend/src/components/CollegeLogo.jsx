import React from 'react';

export default function CollegeLogo({ size = 36, showText = true, className = "", onClick }) {
  return (
    <div 
      className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}
      onClick={onClick}
    >
      {/* Navy Shield with Open Book */}
      <div 
        className="relative shrink-0 flex items-center justify-center bg-[#1b365d] rounded-t-md rounded-b-[18px] shadow-sm text-white transition-transform hover:scale-105"
        style={{ width: size, height: size * 1.15 }}
      >
        <svg 
          viewBox="0 0 24 28" 
          className="w-3/5 h-3/5" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Open Book */}
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#ffffff" />
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v16H6.5A2.5 2.5 0 0 0 4 22.5z" stroke="#ffffff" fill="none" />
          <line x1="12" y1="4" x2="12" y2="20" stroke="#ffffff" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-[#1b365d] text-[17px] tracking-tight font-serif">
            Riverview
          </span>
          <span className="text-[#1b365d] font-semibold text-[13px] tracking-wide uppercase -mt-0.5">
            College
          </span>
        </div>
      )}
    </div>
  );
}
