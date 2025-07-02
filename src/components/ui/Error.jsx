import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = 'Something went wrong', 
  description = 'We encountered an error while loading your content. Please try again.',
  onRetry,
  showRetry = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center space-y-6 max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto"
        >
          <ApperIcon name="AlertTriangle" size={40} className="text-accent-500" />
        </motion.div>

        <div className="space-y-3">
          <h3 className="font-display text-2xl font-bold text-secondary-900">
            {message}
          </h3>
          <p className="text-secondary-600 leading-relaxed">
            {description}
          </p>
        </div>

        {showRetry && onRetry && (
          <div className="space-y-3">
            <Button 
              variant="primary" 
              onClick={onRetry}
              icon="RefreshCw"
              className="shadow-lg"
            >
              Try Again
            </Button>
            <p className="text-xs text-secondary-500">
              If the problem persists, please contact support
            </p>
          </div>
        )}

        {/* Decorative elements */}
        <div className="flex justify-center space-x-4 pt-4">
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-accent-300 rounded-full opacity-60"
          />
          <motion.div
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-2 h-2 bg-primary-300 rounded-full opacity-60"
          />
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-2 h-2 bg-accent-300 rounded-full opacity-60"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Error