import React from 'react';

const Textarea = ({ 
  label, 
  error, 
  helperText,
  rows = 4,
  className = '',
  fullWidth = true,
  maxLength,
  showCount = false,
  value,
  ...props 
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={widthClass}>
      <div className="flex justify-between items-center mb-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {showCount && maxLength && (
          <span className="text-xs text-gray-500">
            {value?.length || 0} / {maxLength}
          </span>
        )}
      </div>
      
      <textarea
        rows={rows}
        maxLength={maxLength}
        value={value}
        className={`
          w-full px-4 py-2 border rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          resize-none
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;