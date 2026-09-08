import React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: 'light' | 'dark';
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ 
  surface = 'light', 
  icon, 
  children, 
  className = '', 
  ...props 
}) => {
  const isDark = surface === 'dark';

  return (
    <div 
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono tracking-tight transition-all select-none shadow-xs ${
        isDark
          ? 'bg-[#17532F] text-white border border-white/20 hover:border-white/40'
          : 'bg-white/95 text-[#111815] border border-[#17532F]/20 hover:border-[#17532F]/40 backdrop-blur-sm'
      } ${className}`}
      {...props}
    >
      {icon && (
        <span className={`flex items-center justify-center shrink-0 ${isDark ? 'text-[#E8A33D]' : 'text-[#17532F]'}`}>
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap font-medium">{children}</span>
    </div>
  );
};

