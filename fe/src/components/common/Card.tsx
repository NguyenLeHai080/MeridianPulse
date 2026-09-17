import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-dark-900/80 border border-white/10 rounded-2xl p-5 backdrop-blur-md transition-all duration-200 ${
        hoverEffect ? 'hover:border-cyan-500/40 hover:shadow-glow-cyan hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
