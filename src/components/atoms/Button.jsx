import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'text-secondary-500 hover:text-primary-500 hover:bg-primary-50 px-4 py-2 rounded-lg transition-all duration-200'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-semibold rounded-lg
    transition-all duration-200 hover:scale-105 hover:shadow-lg
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${variants[variant]} ${size !== 'custom' ? sizes[size] : ''} ${className}
  `

  return (
    <motion.button
      className={baseClasses}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="animate-spin" size={16} />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} size={16} />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} size={16} />
      )}
    </motion.button>
  )
}

export default Button