import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BoxCustomizer from '@/components/organisms/BoxCustomizer'
import Box3DPreview from '@/components/organisms/Box3DPreview'

const Customize = () => {
  const location = useLocation()
  const initialStyleId = location.state?.styleId
  const [currentDesign, setCurrentDesign] = useState({
    dimensions: { length: 12, width: 8, height: 6 },
    materialId: '',
    styleId: initialStyleId || '',
    quantity: 100
  })

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
            Design Your <span className="gradient-text">Custom Box</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl">
            Create the perfect packaging solution with our intuitive customizer. 
            See your design come to life in real-time 3D preview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customizer Panel */}
          <div>
            <BoxCustomizer 
              onDesignChange={setCurrentDesign}
              initialStyleId={initialStyleId}
            />
          </div>

          {/* 3D Preview */}
          <div className="lg:sticky lg:top-8">
            <Box3DPreview design={currentDesign} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customize