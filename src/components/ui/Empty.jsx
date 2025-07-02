import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = 'No items found',
  description = 'There are no items to display at the moment.',
  icon = 'Package',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
    >
      <div className="text-center space-y-6 max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
            type: "spring",
            stiffness: 200
          }}
          className="relative"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto shadow-soft">
            <ApperIcon name={icon} size={48} className="text-primary-500" />
          </div>
          
          {/* Floating decorative elements */}
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-accent-200 to-accent-300 rounded-lg opacity-80"
          />
          
          <motion.div
            animate={{ 
              y: [10, -10, 10],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-1 -left-3 w-4 h-4 bg-gradient-to-br from-primary-300 to-primary-400 rounded-full opacity-70"
          />
        </motion.div>

        <div className="space-y-3">
          <h3 className="font-display text-2xl font-bold text-secondary-900">
            {title}
          </h3>
          <p className="text-secondary-600 leading-relaxed">
            {description}
          </p>
        </div>

        {actionLabel && onAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              variant="primary" 
              onClick={onAction}
              icon="Plus"
              className="shadow-lg"
            >
              {actionLabel}
            </Button>
          </motion.div>
        )}

{/* Background pattern */}
        <div className="absolute -z-10 inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23D4A574%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty