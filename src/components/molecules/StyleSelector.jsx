import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const StyleSelector = ({ 
  styles, 
  selectedStyle, 
  onSelect,
  className = '' 
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-semibold text-secondary-700">Box Style</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => {
          const isSelected = selectedStyle === style.id
          
          return (
            <motion.div
              key={style.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`
                  cursor-pointer p-4 transition-all duration-200
                  ${isSelected 
                    ? 'ring-2 ring-primary-500 bg-gradient-to-br from-primary-50 to-primary-100' 
                    : 'hover:ring-1 hover:ring-primary-300'
                  }
                `}
                onClick={() => onSelect(style.id)}
                hover={false}
              >
                <div className="space-y-3">
                  <div className="h-24 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center">
                    <ApperIcon name={style.icon} size={32} className="text-primary-600" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-700">{style.name}</h4>
                    <p className="text-sm text-secondary-500 mt-1">{style.description}</p>
                  </div>
                  
                  {isSelected && (
                    <div className="flex items-center gap-2 text-primary-600">
                      <ApperIcon name="Check" size={16} />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default StyleSelector