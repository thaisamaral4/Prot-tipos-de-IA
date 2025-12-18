
import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger', size?: 'sm' | 'md' | 'lg' }> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-700",
    ghost: "hover:bg-slate-100 text-slate-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-6 py-2",
    lg: "h-14 px-8 text-lg font-semibold",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }> = ({ label, error, className = '', ...props }) => (
  <div className="w-full space-y-1.5">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <input
      className={`w-full px-3 py-2 bg-white border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${error ? 'border-red-500' : 'border-slate-200'} ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }> = ({ label, error, children, className = '', ...props }) => (
  <div className="w-full space-y-1.5">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <select
      className={`w-full px-3 py-2 bg-white border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${error ? 'border-red-500' : 'border-slate-200'} ${className}`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'info' | 'warning' }> = ({ children, variant = 'info' }) => {
  const styles = {
    info: "bg-blue-50 text-blue-700 border-blue-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const Alert: React.FC<{ title?: string; children: React.ReactNode; variant?: 'error' | 'info' }> = ({ title, children, variant = 'info' }) => {
  const styles = {
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };
  return (
    <div className={`p-4 border rounded-lg flex items-start space-x-3 ${styles[variant]}`}>
      <div className="flex-1">
        {title && <h4 className="text-sm font-bold mb-1">{title}</h4>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);
