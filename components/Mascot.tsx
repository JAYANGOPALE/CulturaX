
import React from 'react';

interface MascotProps {
  mood: 'neutral' | 'happy' | 'sad' | 'excited' | 'thinking';
  message?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mood, message }) => {
  // Holographic Avatar Mascot style
  
  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex flex-col items-center justify-end group">
      
      {/* Tech Speech Bubble if message exists - Adaptive Theme */}
      {message && (
        <div className="absolute -top-20 -right-24 sm:-right-36 w-48 bg-heritage-paper/90 dark:bg-black/80 p-3 rounded-xl border border-heritage-brown/20 dark:border-tech-purple/50 shadow-[0_0_15px_rgba(250,204,21,0.2)] z-20 animate-in fade-in slide-in-from-bottom-2 backdrop-blur-md">
          <p className="text-xs sm:text-sm font-bold text-heritage-brown dark:text-tech-purple text-center leading-tight drop-shadow-sm">
            {message}
          </p>
          {/* Connector line */}
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-heritage-brown/20 dark:border-tech-purple/50 bg-heritage-paper/90 dark:bg-black/80 transform rotate-45 translate-y-2 -translate-x-1"></div>
        </div>
      )}

      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
        <defs>
            <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FACC15" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#EAB308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>

        {/* Hologram Base Effect */}
        <ellipse cx="50" cy="115" rx="30" ry="5" fill="#EAB308" opacity="0.2" className="animate-pulse" />

        {/* Body */}
        <path d="M30,120 L70,120 L70,90 C70,90 80,95 85,80 L80,60 L20,60 L15,80 C20,95 30,90 30,90 L30,120 Z" 
              fill="url(#holoGradient)" stroke="#EAB308" strokeWidth="1" />
        
        {/* Shirt Details */}
        <path d="M20,60 L80,60 L85,120 L15,120 Z" fill="none" stroke="#FACC15" strokeWidth="0.5" opacity="0.5" />

        {/* Head */}
        <circle cx="50" cy="40" r="25" fill="url(#holoGradient)" stroke="#EAB308" strokeWidth="1" />
        
        {/* Turban/Helmet Tech Style */}
        <path d="M25,35 C25,20 35,10 50,10 C65,10 75,20 75,35" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="50" cy="20" r="3" fill="#FFD700" filter="url(#glow)" /> 
        
        {/* Eyes (Glowing) */}
        <circle cx="42" cy="42" r="3" fill="#FFFFFF" className={mood === 'thinking' ? 'animate-pulse' : ''} />
        <circle cx="58" cy="42" r="3" fill="#FFFFFF" className={mood === 'thinking' ? 'animate-pulse' : ''} />
        
        {/* Mouth based on mood - Glowing Lines */}
        {mood === 'happy' && <path d="M40,52 Q50,58 60,52" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />}
        {mood === 'excited' && <path d="M40,52 Q50,62 60,52 Z" fill="#EAB308" opacity="0.5" stroke="#FACC15" />}
        {mood === 'neutral' && <path d="M45,55 L55,55" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />}
        {mood === 'thinking' && <circle cx="50" cy="55" r="3" fill="none" stroke="#FACC15" strokeWidth="2" />}
        {mood === 'sad' && <path d="M40,58 Q50,52 60,58" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />}

        {/* Tech Scanning Line Animation */}
        <rect x="0" y="0" width="100" height="120" fill="url(#holoGradient)" opacity="0.1">
            <animate attributeName="y" from="-120" to="120" dur="3s" repeatCount="indefinite" />
        </rect>

      </svg>
    </div>
  );
};
