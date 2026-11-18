import React from 'react';

export default function RobotAvatar({ size = 48, className = "" }) {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-sm" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="10" stroke="#1b365d" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="8" r="5" fill="#38bdf8" />

        {/* Head outer */}
        <rect x="20" y="20" width="60" height="52" rx="18" fill="#1b365d" />
        
        {/* Ear pods */}
        <rect x="13" y="36" width="7" height="20" rx="3.5" fill="#38bdf8" />
        <rect x="80" y="36" width="7" height="20" rx="3.5" fill="#38bdf8" />

        {/* Face screen inner */}
        <rect x="27" y="27" width="46" height="38" rx="12" fill="#0f172a" />

        {/* Glowing Eyes */}
        <circle cx="40" cy="42" r="5.5" fill="#38bdf8" />
        <circle cx="60" cy="42" r="5.5" fill="#38bdf8" />
        <circle cx="41.5" cy="40.5" r="1.8" fill="#ffffff" />
        <circle cx="61.5" cy="40.5" r="1.8" fill="#ffffff" />

        {/* Cheerful Smile */}
        <path d="M42 53C45 56.5 55 56.5 58 53" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
