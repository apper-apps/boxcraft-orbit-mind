import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Customize', path: '/customize' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Cart', path: '/cart' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Package" size={20} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold gradient-text">
              BoxCraft Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="primary" size="sm">
              Get Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
            >
              <ApperIcon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200
                    ${isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Button variant="primary" className="w-full">
                  Get Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header