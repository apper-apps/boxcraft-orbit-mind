import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

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
const drawBox = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    try {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const rect = canvas.getBoundingClientRect()
      
      // Validate canvas dimensions to prevent zero-width/height error
      const minWidth = 100
      const minHeight = 100
      const canvasWidth = Math.max(rect.width || minWidth, minWidth)
      const canvasHeight = Math.max(rect.height || minHeight, minHeight)
      
      // Only set dimensions if they're valid and different
      if (canvas.width !== canvasWidth * window.devicePixelRatio || 
          canvas.height !== canvasHeight * window.devicePixelRatio) {
        canvas.width = canvasWidth * window.devicePixelRatio
        canvas.height = canvasHeight * window.devicePixelRatio
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
      
      // Clear canvas with validated dimensions
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      if (design && canvasWidth > 0 && canvasHeight > 0) {
        const centerX = canvasWidth / 2
        const centerY = canvasHeight / 2
// Scale dimensions for display with safety checks
        const scale = Math.min(canvasWidth, canvasHeight) / 300
        const length = Math.max((design.dimensions?.length || 12) * scale * 8, 10)
        const width = Math.max((design.dimensions?.width || 8) * scale * 8, 10)
        const height = Math.max((design.dimensions?.height || 6) * scale * 8, 10)

        // Apply rotation with validation
        const rotX = rotationRef.current?.x || 0
        const rotY = rotationRef.current?.y || 0

        // Calculate 3D perspective points
        const cos = Math.cos
        const sin = Math.sin
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
      
      // Draw simple logo placeholder
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.beginPath()
      ctx.arc(frontCenter[0], frontCenter[1], 20, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(44, 62, 80, 0.5)'
      ctx.lineWidth = 2
      ctx.stroke()
      }
    } catch (error) {
      console.warn('Canvas drawing error:', error)
      // Fallback: draw a simple error indicator
      if (ctx && canvasWidth > 0 && canvasHeight > 0) {
        ctx.fillStyle = '#f3f4f6'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        ctx.fillStyle = '#6b7280'
        ctx.font = '14px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('Preview unavailable', canvasWidth / 2, canvasHeight / 2)
      }
    }
  }

  const animate = () => {
    try {
      rotationRef.current.y += 0.01
      drawBox()
      animationRef.current = requestAnimationFrame(animate)
    } catch (error) {
      console.error('Animation error:', error)
    }
  }

  // Start animation
  useEffect(() => {
    const timer = setTimeout(() => {
      animate()
    }, 100)
    
    return () => {
      clearTimeout(timer)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    try {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      
      const deltaX = (e.clientX - rect.left - rect.width / 2) / 100
      const deltaY = (e.clientY - rect.top - rect.height / 2) / 100
      
      rotationRef.current = {
        x: Math.max(-0.5, Math.min(0.5, deltaY)),
        y: Math.max(-0.5, Math.min(0.5, deltaX))
      }
    } catch (error) {
      console.warn('Mouse move handler error:', error)
    }
  }

  return (
    <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <ApperIcon className="w-6 h-6 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">3D Preview</h3>
        </div>
        
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-64 rounded-lg border border-gray-200 cursor-move"
            onMouseMove={handleMouseMove}
            style={{ minWidth: '100px', minHeight: '100px' }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
            Drag to rotate
          </div>
        </motion.div>

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