import React from 'react';

interface LuminosaLogoProps {
  variant?: 'light' | 'dark' | 'currentColor';
  mode?: 'full' | 'horizontal' | 'mark-only';
  tagline?: string;
  className?: string;
}

export const LuminosaLogo: React.FC<LuminosaLogoProps> = ({
  variant = 'light',
  mode = 'horizontal',
  tagline = 'Make Your Memories Immortal',
  className = '',
}) => {
  const isExplicitDark = variant === 'dark';
  const isCurrentColor = variant === 'currentColor';

  const strokeColor =
    isExplicitDark
      ? '#FFFFFF'
      : isCurrentColor
      ? 'currentColor'
      : 'currentColor';

  const textColor =
    isExplicitDark
      ? 'text-white'
      : isCurrentColor
      ? 'text-current'
      : 'text-neutral-900 dark:text-white';

  const subtextColor =
    isExplicitDark
      ? 'text-neutral-300'
      : isCurrentColor
      ? 'text-current opacity-75'
      : 'text-neutral-600 dark:text-neutral-400';

  const svgColorClass =
    isExplicitDark
      ? 'text-white'
      : isCurrentColor
      ? 'text-current'
      : 'text-neutral-900 dark:text-white';

  // Minimalist camera vector mark
  const CameraSvg = (
    <svg
      viewBox="0 0 240 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${svgColorClass}`}
      aria-hidden="true"
    >
      {/* Top Dial with vertical notches */}
      <rect
        x="32"
        y="18"
        width="34"
        height="18"
        rx="2"
        stroke={strokeColor}
        strokeWidth="6"
      />
      <line x1="39" y1="23" x2="39" y2="31" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
      <line x1="49" y1="23" x2="49" y2="31" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
      <line x1="59" y1="23" x2="59" y2="31" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

      {/* Top Viewfinder bump */}
      <path
        d="M80 36 C 88 12, 104 6, 120 6 C 136 6, 152 12, 160 36"
        stroke={strokeColor}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Main Camera Body Outline */}
      <path
        d="M18 36 H 222 C 228 36, 232 40, 232 46 V 118 H 226 V 42 H 14 V 118 H 8 V 46 C 8 40, 12 36, 18 36 Z"
        fill={strokeColor}
      />

      {/* Sensor / Flash Window */}
      <rect
        x="180"
        y="48"
        width="26"
        height="12"
        stroke={strokeColor}
        strokeWidth="5"
        rx="1.5"
      />
      <line x1="198" y1="67" x2="222" y2="67" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

      {/* Mid Body divider line */}
      <line x1="14" y1="67" x2="80" y2="67" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />

      {/* Center Lens Assembly */}
      {/* Outer Arch */}
      <path
        d="M74 118 C 74 88, 95 66, 120 66 C 145 66, 166 88, 166 118"
        stroke={strokeColor}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner Lens Element */}
      <circle
        cx="128"
        cy="96"
        r="10"
        stroke={strokeColor}
        strokeWidth="5"
        fill="none"
      />
    </svg>
  );

  if (mode === 'mark-only') {
    return <div className={`inline-block ${className}`}>{CameraSvg}</div>;
  }

  if (mode === 'horizontal') {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
        <div className="w-8 h-5 sm:w-10 sm:h-6 shrink-0 transition-transform group-hover:scale-105 duration-200">
          {CameraSvg}
        </div>
        <div className="flex flex-col">
          <span
            className={`text-lg sm:text-xl font-bold tracking-[0.2em] font-serif leading-none ${textColor}`}
          >
            LUMINOSA
          </span>
          <span className={`text-[9px] tracking-wider uppercase font-medium mt-0.5 opacity-70 ${subtextColor}`}>
            Nepal
          </span>
        </div>
      </div>
    );
  }

  // Full Poster Badge / Brand Hero Mode matching user's uploaded image
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Camera Icon */}
      <div className="w-32 sm:w-44 h-20 sm:h-28 mb-3 sm:mb-4">
        {CameraSvg}
      </div>

      {/* Wordmark flanked by horizontal double lines */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-xs">
        <div className="flex-1 h-[2px] bg-current opacity-70" />
        <h2
          className={`text-2xl sm:text-3xl font-extrabold tracking-[0.25em] font-serif ${textColor}`}
        >
          LUMINOSA
        </h2>
        <div className="flex-1 h-[2px] bg-current opacity-70" />
      </div>

      {/* Subtitle / Tagline */}
      <p
        className={`mt-2.5 text-xs sm:text-sm italic tracking-wide font-serif ${subtextColor}`}
      >
        {tagline}
      </p>
    </div>
  );
};
