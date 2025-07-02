import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Box3DPreview = ({ 
  design = { 
    dimensions: { length: 12, width: 8, height: 6 },
    materialId: '',
    styleId: ''
  }
}) => {
  const canvasRef = useRef(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const drawBox = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      // Scale dimensions for display
      const scale = Math.min(rect.width, rect.height) / 300
      const length = (design.dimensions?.length || 12) * scale * 8
      const width = (design.dimensions?.width || 8) * scale * 8
      const height = (design.dimensions?.height || 6) * scale * 8

      // Apply rotation
      const rotX = rotationRef.current.x
      const rotY = rotationRef.current.y

      // Calculate 3D perspective points
      const cos = Math.cos
      const sin = Math.sin

      // Define box vertices
      const vertices = [
        [-length/2, -width/2, -height/2],
        [length/2, -width/2, -height/2],
        [length/2, width/2, -height/2],
        [-length/2, width/2, -height/2],
        [-length/2, -width/2, height/2],
        [length/2, -width/2, height/2],
        [length/2, width/2, height/2],
        [-length/2, width/2, height/2]
      ]

      // Transform vertices
      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y axis
        const rotatedX = x * cos(rotY) - z * sin(rotY)
        const rotatedZ = x * sin(rotY) + z * cos(rotY)
        
        // Rotate around X axis
        const finalY = y * cos(rotX) - rotatedZ * sin(rotX)
        const finalZ = y * sin(rotX) + rotatedZ * cos(rotX)
        
        // Project to 2D
        const perspective = 300 / (300 + finalZ)
        return [
          centerX + rotatedX * perspective,
          centerY + finalY * perspective
        ]
      })

      // Draw faces
      const faces = [
        [0, 1, 2, 3], // Front
        [4, 5, 6, 7], // Back
        [0, 1, 5, 4], // Bottom
        [2, 3, 7, 6], // Top
        [0, 3, 7, 4], // Left
        [1, 2, 6, 5]  // Right
      ]

      const faceColors = [
        'rgba(212, 165, 116, 0.9)', // Front - Primary
        'rgba(212, 165, 116, 0.7)', // Back - Darker
        'rgba(212, 165, 116, 0.8)', // Bottom
        'rgba(212, 165, 116, 1.0)', // Top - Brightest
        'rgba(212, 165, 116, 0.6)', // Left - Darkest
        'rgba(212, 165, 116, 0.85)' // Right
      ]

      faces.forEach((face, index) => {
        ctx.beginPath()
        ctx.moveTo(projected[face[0]][0], projected[face[0]][1])
        
        face.forEach((vertexIndex, i) => {
          if (i > 0) {
            ctx.lineTo(projected[vertexIndex][0], projected[vertexIndex][1])
          }
        })
        
        ctx.closePath()
        ctx.fillStyle = faceColors[index]
        ctx.fill()
        ctx.strokeStyle = 'rgba(44, 62, 80, 0.3)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw logo placeholder on front face
      const frontCenter = [
        (projected[0][0] + projected[1][0] + projected[2][0] + projected[3][0]) / 4,
        (projected[0][1] + projected[1][1] + projected[2][1] + projected[3][1]) / 4
      ]

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.fillRect(frontCenter[0] - 20, frontCenter[1] - 10, 40, 20)
      ctx.strokeStyle = 'rgba(44, 62, 80, 0.5)'
      ctx.lineWidth = 1
      ctx.strokeRect(frontCenter[0] - 20, frontCenter[1] - 10, 40, 20)
      
      ctx.fillStyle = 'rgba(44, 62, 80, 0.7)'
      ctx.font = '12px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('LOGO', frontCenter[0], frontCenter[1] + 4)
    }

    const animate = () => {
      rotationRef.current.y += 0.01
      drawBox()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [design])

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Left mouse button pressed
      const rect = canvasRef.current.getBoundingClientRect()
      const deltaX = (e.clientX - rect.left - rect.width / 2) / rect.width
      const deltaY = (e.clientY - rect.top - rect.height / 2) / rect.height
      
      rotationRef.current.x = deltaY * Math.PI
      rotationRef.current.y = deltaX * Math.PI
    }
  }

  return (
    <Card className="p-6 h-full">
      <div className="space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-secondary-700">3D Preview</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" icon="RotateCcw">
              Reset
            </Button>
            <Button variant="ghost" size="sm" icon="Download">
              Export
            </Button>
          </div>
        </div>

        <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-primary-50 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            style={{ minHeight: '400px' }}
          />
          
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm text-secondary-600">
            <div className="flex items-center gap-2">
              <ApperIcon name="MousePointer2" size={14} />
              Drag to rotate
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-surface p-3 rounded-lg">
            <div className="text-sm text-secondary-600">Length</div>
            <div className="font-semibold text-primary-600">
              {design.dimensions?.length || 0}"
            </div>
          </div>
          <div className="bg-surface p-3 rounded-lg">
            <div className="text-sm text-secondary-600">Width</div>
            <div className="font-semibold text-primary-600">
              {design.dimensions?.width || 0}"
            </div>
          </div>
          <div className="bg-surface p-3 rounded-lg">
            <div className="text-sm text-secondary-600">Height</div>
            <div className="font-semibold text-primary-600">
              {design.dimensions?.height || 0}"
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Box3DPreview