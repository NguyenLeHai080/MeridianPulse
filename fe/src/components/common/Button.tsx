import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'emerald' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }[size];

  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-glow-cyan hover:opacity-95 focus:ring-cyan-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 focus:ring-slate-500',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-glow-rose focus:ring-rose-500',
    critical: 'bg-rose-600 hover:bg-rose-500 text-white shadow-glow-rose focus:ring-rose-500',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-300 focus:ring-cyan-500',
    outline: 'bg-transparent border border-white/15 hover:bg-white/5 text-slate-200 focus:ring-cyan-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-green focus:ring-emerald-500',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
};
