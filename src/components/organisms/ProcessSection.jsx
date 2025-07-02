import React from 'react'
import { motion } from 'framer-motion'
import ProcessStep from '@/components/molecules/ProcessStep'

const ProcessSection = () => {
  const steps = [
    {
      icon: 'Ruler',
      title: 'Set Dimensions',
      description: 'Enter your box dimensions and select the perfect size'
    },
    {
      icon: 'Palette',
      title: 'Choose Design',
      description: 'Pick materials, colors, and upload your artwork'
    },
    {
      icon: 'Eye',
      title: 'Preview in 3D',
      description: 'See your box come to life with realistic preview'
    },
    {
      icon: 'ShoppingCart',
      title: 'Order & Ship',
      description: 'Get instant pricing and place your order'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-secondary-900">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Create professional custom packaging in four simple steps. 
            Our intuitive process makes it easy to design, preview, and order your perfect boxes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              step={step}
              index={index}
              isActive={index === 0}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-secondary-700">Ready to start?</div>
              <div className="text-sm text-secondary-600">Design your first box in under 5 minutes</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection