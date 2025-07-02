import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { boxStylesService } from '@/services/api/boxStylesService'

const PopularStyles = () => {
  const [styles, setStyles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStyles()
  }, [])

  const loadStyles = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await boxStylesService.getAll()
      setStyles(data.slice(0, 6)) // Show first 6 styles
    } catch (err) {
      setError('Failed to load box styles')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadStyles} />

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-secondary-900">
            Popular <span className="gradient-text">Box Styles</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our most popular box designs or create your own custom style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style, index) => (
            <motion.div
              key={style.Id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden">
                <div className="space-y-4">
                  {/* Style Preview */}
                  <div className="h-48 bg-gradient-to-br from-primary-200 to-primary-400 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary-700"
                    >
                      <ApperIcon name={style.icon} size={64} />
                    </motion.div>
                    
                    {style.popular && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="accent" size="sm">
                          <ApperIcon name="Star" size={12} className="mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                        {style.name}
                      </h3>
                      <p className="text-secondary-600 text-sm mt-1">
                        {style.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-secondary-600">
                        <span className="font-medium">Best for:</span> {style.bestFor}
                      </div>
                    </div>

                    <Link to="/customize" state={{ styleId: style.Id }}>
                      <Button variant="outline" className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500">
                        Customize This Style
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/gallery">
            <Button variant="secondary" size="lg" icon="ArrowRight">
              View All Styles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PopularStyles