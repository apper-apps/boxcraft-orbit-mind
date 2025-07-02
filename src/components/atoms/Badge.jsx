import React from 'react'

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300',
    secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 border border-secondary-300',
    accent: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border border-accent-300',
    success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300',
    warning: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
    info: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const baseClasses = `
    inline-flex items-center font-medium rounded-full
    ${variants[variant]} ${sizes[size]} ${className}
  `

  return (
    <span className={baseClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge