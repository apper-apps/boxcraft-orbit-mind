import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const HeroSection = () => {
  return (
<section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-primary-100/50 py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23D4A574%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-medium text-primary-700"
              >
                <ApperIcon name="Sparkles" size={16} />
                Professional Custom Packaging
              </motion.div>
              
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-secondary-900 leading-tight">
                Design Your
                <span className="block gradient-text">Perfect Box</span>
              </h1>
              
              <p className="text-xl text-secondary-600 leading-relaxed max-w-xl">
                Create professional custom packaging in minutes with our intuitive 3D designer. 
                Preview your design, get instant pricing, and order with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/customize">
                <Button variant="primary" size="lg" icon="Palette" className="w-full sm:w-auto">
                  Start Designing
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" size="lg" icon="Eye" className="w-full sm:w-auto">
                  View Gallery
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="font-display text-2xl font-bold gradient-text">50k+</div>
                <div className="text-sm text-secondary-600">Boxes Created</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold gradient-text">99%</div>
                <div className="text-sm text-secondary-600">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold gradient-text">24h</div>
                <div className="text-sm text-secondary-600">Fast Delivery</div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Box */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotateY: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative z-10 w-80 h-80 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-2xl transform perspective-1000 rotate-3"
              >
                <div className="absolute inset-4 border-2 border-white/30 rounded-xl"></div>
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Package" size={24} className="text-white" />
                </div>
                <div className="absolute bottom-8 right-8 text-white font-display text-lg">
                  BoxCraft
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [-20, 20, -20],
                  x: [-10, 10, -10]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-12 -left-8 w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl shadow-lg opacity-80"
              ></motion.div>

              <motion.div
                animate={{ 
                  y: [20, -20, 20],
                  x: [10, -10, 10]
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute bottom-12 -right-8 w-32 h-32 bg-gradient-to-br from-primary-300 to-primary-500 rounded-xl shadow-lg opacity-60"
              ></motion.div>

              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full filter blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection