import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import DimensionInput from '@/components/molecules/DimensionInput'
import MaterialCard from '@/components/molecules/MaterialCard'
import StyleSelector from '@/components/molecules/StyleSelector'
import QuantitySelector from '@/components/molecules/QuantitySelector'
import PriceDisplay from '@/components/molecules/PriceDisplay'
import ApperIcon from '@/components/ApperIcon'
import { materialsService } from '@/services/api/materialsService'
import { boxStylesService } from '@/services/api/boxStylesService'

const BoxCustomizer = ({ onDesignChange }) => {
  const [currentTab, setCurrentTab] = useState('dimensions')
  const [materials, setMaterials] = useState([])
  const [boxStyles, setBoxStyles] = useState([])
  const [loading, setLoading] = useState(true)
  const [design, setDesign] = useState({
    dimensions: { length: 12, width: 8, height: 6 },
    materialId: '',
    styleId: '',
    quantity: 100,
    printOptions: {
      hasLogo: false,
      colors: 1
    }
  })

  const tabs = [
    { id: 'dimensions', label: 'Dimensions', icon: 'Ruler' },
    { id: 'style', label: 'Style', icon: 'Package' },
    { id: 'material', label: 'Material', icon: 'Layers' },
    { id: 'quantity', label: 'Quantity', icon: 'Hash' }
  ]

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    onDesignChange?.(design)
  }, [design, onDesignChange])

  const loadData = async () => {
    try {
      setLoading(true)
      const [materialsData, stylesData] = await Promise.all([
        materialsService.getAll(),
        boxStylesService.getAll()
      ])
      setMaterials(materialsData)
      setBoxStyles(stylesData)
      
      // Set defaults
      if (materialsData.length > 0) {
        setDesign(prev => ({ ...prev, materialId: materialsData[0].Id }))
      }
      if (stylesData.length > 0) {
        setDesign(prev => ({ ...prev, styleId: stylesData[0].Id }))
      }
    } catch (error) {
      toast.error('Failed to load customization options')
    } finally {
      setLoading(false)
    }
  }

  const calculatePrice = () => {
    const selectedMaterial = materials.find(m => m.Id === design.materialId)
    if (!selectedMaterial || !design.dimensions.length || !design.dimensions.width || !design.dimensions.height) {
      return 0
    }

    const surfaceArea = 2 * (
      design.dimensions.length * design.dimensions.width +
      design.dimensions.width * design.dimensions.height +
      design.dimensions.height * design.dimensions.length
    ) / 144 // Convert to square feet

    const materialCost = surfaceArea * selectedMaterial.pricePerSqFt
    const baseCost = materialCost + 0.50 // Setup cost
    const printCost = design.printOptions.hasLogo ? design.printOptions.colors * 0.25 : 0
    
    return baseCost + printCost
  }

  const unitPrice = calculatePrice()
  const totalPrice = unitPrice * design.quantity

  const updateDesign = (updates) => {
    setDesign(prev => ({ ...prev, ...updates }))
  }

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <ApperIcon name="Loader2" className="animate-spin text-primary-500" size={32} />
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <Card className="p-2">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                ${currentTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                  : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                }
              `}
            >
              <ApperIcon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Tab Content */}
      <Card className="p-6">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentTab === 'dimensions' && (
            <DimensionInput
              dimensions={design.dimensions}
              onChange={(dimensions) => updateDesign({ dimensions })}
            />
          )}

          {currentTab === 'style' && (
            <StyleSelector
              styles={boxStyles}
              selectedStyle={design.styleId}
              onSelect={(styleId) => updateDesign({ styleId })}
            />
          )}

          {currentTab === 'material' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-secondary-700">Select Material</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => (
                  <MaterialCard
                    key={material.Id}
                    material={material}
                    selected={design.materialId === material.Id}
                    onClick={() => updateDesign({ materialId: material.Id })}
                  />
                ))}
              </div>
            </div>
          )}

          {currentTab === 'quantity' && (
            <QuantitySelector
              quantity={design.quantity}
              onChange={(quantity) => updateDesign({ quantity })}
              unitPrice={unitPrice}
            />
          )}
        </motion.div>
      </Card>

      {/* Price Summary */}
      <Card className="p-6 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-secondary-600 text-sm">
              {design.quantity} boxes • ${unitPrice.toFixed(2)} each
            </p>
            <PriceDisplay 
              price={totalPrice}
              label="Total Price"
              size="lg"
            />
          </div>
          <Button variant="primary" size="lg" icon="ShoppingCart">
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default BoxCustomizer