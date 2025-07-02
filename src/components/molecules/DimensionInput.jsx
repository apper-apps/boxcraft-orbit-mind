import React from 'react'
import Input from '@/components/atoms/Input'

const DimensionInput = ({ 
  dimensions, 
  onChange,
  errors = {},
  className = '' 
}) => {
  const handleChange = (field, value) => {
    const numValue = parseFloat(value) || 0
    onChange({
      ...dimensions,
      [field]: numValue
    })
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-semibold text-secondary-700 mb-4">Box Dimensions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Length"
          type="number"
          value={dimensions.length || ''}
          onChange={(e) => handleChange('length', e.target.value)}
          placeholder="0"
          unit="in"
          min="1"
          max="48"
          step="0.1"
          error={errors.length}
        />
        
        <Input
          label="Width"
          type="number"
          value={dimensions.width || ''}
          onChange={(e) => handleChange('width', e.target.value)}
          placeholder="0"
          unit="in"
          min="1"
          max="48"
          step="0.1"
          error={errors.width}
        />
        
        <Input
          label="Height"
          type="number"
          value={dimensions.height || ''}
          onChange={(e) => handleChange('height', e.target.value)}
          placeholder="0"
          unit="in"
          min="1"
          max="24"
          step="0.1"
          error={errors.height}
        />
      </div>
      
      {(dimensions.length && dimensions.width && dimensions.height) && (
        <div className="bg-surface p-3 rounded-lg">
          <p className="text-sm text-secondary-600">
            Volume: <span className="font-semibold">
              {(dimensions.length * dimensions.width * dimensions.height).toFixed(1)} cubic inches
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default DimensionInput