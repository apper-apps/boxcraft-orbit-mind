import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { boxStylesService } from '@/services/api/boxStylesService'

const TemplateGallery = () => {
  const [styles, setStyles] = useState([])
  const [filteredStyles, setFilteredStyles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Styles' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'retail', label: 'Retail' },
    { id: 'food', label: 'Food & Beverage' },
    { id: 'display', label: 'Display' }
  ]

  useEffect(() => {
    loadStyles()
  }, [])

  useEffect(() => {
    filterStyles()
  }, [styles, searchTerm, selectedCategory])

  const loadStyles = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await boxStylesService.getAll()
      setStyles(data)
    } catch (err) {
      setError('Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  const filterStyles = () => {
    let filtered = styles

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(style => 
        style.category?.toLowerCase() === selectedCategory
      )
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(style =>
        style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        style.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        style.bestFor?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredStyles(filtered)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadStyles} />

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-secondary-900">
          Template <span className="gradient-text">Gallery</span>
        </h1>
        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
          Browse our collection of professionally designed box templates and customize them to fit your needs
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search templates..."
            className="w-full lg:w-auto"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      {filteredStyles.length === 0 ? (
        <Empty 
          title="No templates found"
          description="Try adjusting your search or filter criteria"
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('')
            setSelectedCategory('all')
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStyles.map((style, index) => (
            <motion.div
              key={style.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden h-full flex flex-col">
                <div className="space-y-4 flex-1">
                  {/* Template Preview */}
                  <div className="h-40 bg-gradient-to-br from-primary-200 to-primary-400 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 15 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary-700"
                    >
                      <ApperIcon name={style.icon} size={48} />
                    </motion.div>
                    
                    {style.popular && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="accent" size="sm">
                          <ApperIcon name="Star" size={10} />
                        </Badge>
                      </div>
                    )}

                    {style.eco && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="success" size="sm">
                          <ApperIcon name="Leaf" size={10} />
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                        {style.name}
                      </h3>
                      <p className="text-secondary-600 text-sm mt-1 line-clamp-2">
                        {style.description}
                      </p>
                    </div>

                    <div className="text-xs text-secondary-500">
                      <span className="font-medium">Best for:</span> {style.bestFor}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to="/customize" state={{ styleId: style.Id }} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Customize
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" icon="Eye">
                      Preview
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-bold text-secondary-900">
            Don't see what you're looking for?
          </h3>
          <p className="text-secondary-600">
            Start from scratch and create your own custom box design
          </p>
          <Link to="/customize">
            <Button variant="primary" size="lg" icon="Plus">
              Create Custom Box
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default TemplateGallery