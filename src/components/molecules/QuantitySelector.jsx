import React from 'react'
import Slider from '@/components/atoms/Slider'
import Input from '@/components/atoms/Input'
import PriceDisplay from '@/components/molecules/PriceDisplay'

const QuantitySelector = ({ 
  quantity, 
  onChange, 
  unitPrice = 0,
  className = '' 
}) => {
  const totalPrice = quantity * unitPrice
  const priceBreaks = [
    { min: 1, max: 49, label: 'Small Order' },
    { min: 50, max: 249, label: 'Medium Order' },
    { min: 250, max: 999, label: 'Large Order' },
    { min: 1000, max: Infinity, label: 'Wholesale' }
  ]
  
  const currentBreak = priceBreaks.find(
    break_ => quantity >= break_.min && quantity <= break_.max
  )

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-secondary-700">Quantity</h3>
          <span className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
            {currentBreak?.label}
          </span>
        </div>
        
        <Slider
          value={quantity}
          onChange={(e) => onChange(parseInt(e.target.value))}
          min={1}
          max={5000}
          step={1}
        />
        
        <Input
          type="number"
          value={quantity}
          onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          max="5000"
          className="max-w-32"
        />
      </div>
      
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-6 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-secondary-600 text-sm font-medium mb-1">Unit Price</p>
            <p className="text-xl font-bold text-secondary-700">
              ${unitPrice.toFixed(2)}
            </p>
          </div>
          
          <PriceDisplay 
            price={totalPrice}
            label="Total Price"
            size="md"
          />
        </div>
      </div>
    </div>
  )
}

export default QuantitySelector