import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="label">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`
            input-field appearance-none pr-10
            ${error ? 'border-accent-500 focus:ring-accent-500' : ''}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <ApperIcon name="ChevronDown" size={20} />
        </div>
      </div>
      {error && (
        <p className="text-accent-500 text-sm flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={16} />
          {error}
        </p>
      )}
    </div>
  )
}

export default Select