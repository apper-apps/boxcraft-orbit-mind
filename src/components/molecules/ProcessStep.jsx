import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ProcessStep = ({ 
  step, 
  index, 
  isActive = false,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative ${className}`}
    >
      <div className={`
        flex flex-col items-center text-center space-y-4
        ${isActive ? 'text-primary-600' : 'text-secondary-600'}
      `}>
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isActive 
            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg scale-110' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-secondary-500'
          }
        `}>
          <ApperIcon name={step.icon} size={24} />
        </div>
        
        <div>
          <h3 className="font-semibold text-lg">{step.title}</h3>
          <p className="text-secondary-500 text-sm mt-1">{step.description}</p>
        </div>
      </div>
      
      {index < 3 && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent transform translate-x-4" />
      )}
    </motion.div>
  )
}

export default ProcessStep