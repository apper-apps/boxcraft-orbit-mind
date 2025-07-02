import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = `
    card ${padding} ${className}
    ${hover ? 'hover:shadow-medium hover:scale-[1.02]' : ''}
  `

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card