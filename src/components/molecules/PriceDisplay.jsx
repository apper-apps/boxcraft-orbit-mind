import React from 'react'
import { motion } from 'framer-motion'

const PriceDisplay = ({ 
  price, 
  label = 'Total Price', 
  size = 'lg',
  showAnimation = true,
  className = '' 
}) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  return (
    <div className={`text-center ${className}`}>
      <p className="text-secondary-600 text-sm font-medium mb-1">{label}</p>
      <motion.div
        key={price}
        initial={showAnimation ? { scale: 1.1, opacity: 0.8 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`gradient-text font-display font-bold ${sizes[size]}`}
      >
        ${price?.toFixed(2) || '0.00'}
      </motion.div>
    </div>
  )
}

export default PriceDisplay