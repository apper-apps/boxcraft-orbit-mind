import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  unit,
  min,
  max,
  step,
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
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ApperIcon name={icon} size={20} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className={`
            input-field
            ${icon ? 'pl-11' : ''}
            ${unit ? 'pr-16' : ''}
            ${error ? 'border-accent-500 focus:ring-accent-500' : ''}
          `}
          {...props}
        />
        {unit && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
            {unit}
          </div>
        )}
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

export default Input