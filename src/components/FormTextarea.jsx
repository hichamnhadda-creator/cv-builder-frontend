import React from 'react';

const FormTextarea = ({
    label,
    name,
    value,
    onChange,
    placeholder = '',
    error = '',
    required = false,
    disabled = false,
    rows = 4,
    maxLength = null,
    className = ''
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                rows={rows}
                maxLength={maxLength}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-vertical ${error ? 'border-red-500' : 'border-gray-300'
                    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            <div className="flex justify-between mt-1">
                {error && <p className="text-sm text-red-500">{error}</p>}
                {maxLength && (
                    <p className="text-sm text-gray-500 ml-auto">
                        {value.length}/{maxLength}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FormTextarea;
