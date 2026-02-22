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
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-800 text-white hover:bg-primary-900 shadow-sm',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border-2 border-primary-800 text-primary-800 hover:bg-primary-50',
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
