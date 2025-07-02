import React from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const MaterialCard = ({ 
  material, 
  selected = false, 
  onClick,
  className = '' 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Card 
        className={`
          cursor-pointer p-4 transition-all duration-200
          ${selected 
            ? 'ring-2 ring-primary-500 bg-gradient-to-br from-primary-50 to-primary-100' 
            : 'hover:ring-1 hover:ring-primary-300'
          }
        `}
        onClick={onClick}
        hover={false}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-secondary-700">{material.name}</h3>
              <p className="text-sm text-secondary-500">{material.thickness}</p>
            </div>
            {material.eco && (
              <Badge variant="success" size="sm">
                <ApperIcon name="Leaf" size={12} className="mr-1" />
                Eco
              </Badge>
            )}
          </div>
          
          <div className="h-16 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center">
            <ApperIcon name="Package" size={24} className="text-primary-600" />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary-600">Per sq ft</span>
            <span className="font-bold text-primary-600">
              ${material.pricePerSqFt?.toFixed(2)}
            </span>
          </div>
          
          {selected && (
            <div className="flex items-center gap-2 text-primary-600">
              <ApperIcon name="Check" size={16} />
              <span className="text-sm font-medium">Selected</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default MaterialCard