import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = '',
    icon = null,
    fullWidth = false
}) => {
    const baseStyles = 'px-5 py-2.5 rounded-[12px] font-bold text-sm whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]';
    
    const variants = {
        primary: 'bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_20px_rgba(37,99,235,0.35)] border-none',
        secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
        outline: 'border-2 border-[#2563eb] text-[#2563eb] hover:bg-blue-50',
        ghost: 'text-gray-500 hover:bg-gray-50'
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
