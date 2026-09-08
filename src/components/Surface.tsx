import React from 'react';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  tone: 'light' | 'dark';
}

export const Surface: React.FC<SurfaceProps> = ({ tone, className, children, ...props }) => {
  return (
    <div 
      className={`surface-${tone} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
