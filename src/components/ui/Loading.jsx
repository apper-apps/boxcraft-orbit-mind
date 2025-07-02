import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Loading = ({ message = 'Loading...', type = 'default' }) => {
  if (type === 'skeleton') {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3 animate-pulse"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-soft p-6 space-y-4">
              <div className="h-32 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 rounded-lg animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-10 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
      >
        <ApperIcon name="Package" size={32} className="text-white" />
      </motion.div>
      
      <div className="text-center space-y-2">
        <motion.h3 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="font-semibold text-secondary-700"
        >
          {message}
        </motion.h3>
        <p className="text-secondary-500 text-sm">
          Creating your perfect packaging experience
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{ 
              y: [-4, 4, -4],
              backgroundColor: ['#D4A574', '#BC8E5E', '#D4A574']
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: index * 0.2,
              ease: "easeInOut"
            }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}

export default Loading