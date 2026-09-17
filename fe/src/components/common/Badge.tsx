import React from 'react';

interface BadgeProps {
  variant?: 'stable' | 'warning' | 'critical' | 'cyan' | 'info' | 'emerald';
  children: React.ReactNode;
  hasPulseDot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'stable',
  children,
  hasPulseDot = false,
  className = '',
}) => {
  const variantStyles = {
    stable: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    critical: 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse-slow',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    info: 'bg-slate-500/10 border-slate-500/30 text-slate-300',
  }[variant];

  const dotColor = {
    stable: 'bg-emerald-400 shadow-glow-green',
    emerald: 'bg-emerald-400 shadow-glow-green',
    warning: 'bg-amber-400',
    critical: 'bg-rose-400 shadow-glow-rose',
    cyan: 'bg-cyan-400 shadow-glow-cyan',
    info: 'bg-slate-400',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${variantStyles} ${className}`}
    >
      {hasPulseDot && <span className={`w-2 h-2 rounded-full animate-ping ${dotColor}`} />}
      {children}
    </span>
  );
};
