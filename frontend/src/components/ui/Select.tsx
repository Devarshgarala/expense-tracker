import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <select
        className={`form-control ${error ? 'error' : ''} ${className}`}
        {...props}
      >
        <option value="">Select {label?.toLowerCase() || 'option'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
};