import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Badge from '@/components/atoms/Badge'
import PriceDisplay from '@/components/molecules/PriceDisplay'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock cart data
      const mockCart = [
        {
          id: 1,
          name: 'Custom Mailer Box',
          dimensions: { length: 12, width: 8, height: 6 },
          material: 'Corrugated Cardboard',
          quantity: 100,
          unitPrice: 2.45,
          totalPrice: 245.00,
          thumbnail: 'mailer'
        },
        {
          id: 2,
          name: 'Display Box Premium',
          dimensions: { length: 10, width: 10, height: 4 },
          material: 'Rigid Paperboard',
          quantity: 50,
          unitPrice: 3.20,
          totalPrice: 160.00,
          thumbnail: 'display'
        }
      ]
      
      setCartItems(mockCart)
    } catch (err) {
      setError('Failed to load cart items')
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const totalPrice = newQuantity * item.unitPrice
        return { ...item, quantity: newQuantity, totalPrice }
      }
      return item
    }))
    
    toast.success('Quantity updated')
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    toast.success('Item removed from cart')
  }

  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': 0.10,
      'NEWCUSTOMER': 0.15,
      'BULK20': 0.20
    }
    
    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()])
      toast.success(`Promo code applied! ${(validCodes[promoCode.toUpperCase()] * 100)}% discount`)
    } else {
      toast.error('Invalid promo code')
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const discountAmount = subtotal * discount
  const shipping = subtotal > 500 ? 0 : 49.99
  const tax = (subtotal - discountAmount + shipping) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCartItems} />
  if (cartItems.length === 0) return (
    <Empty 
      title="Your cart is empty"
      description="Start designing your custom boxes to see them here"
      actionLabel="Start Designing"
      onAction={() => window.location.href = '/customize'}
    />
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-secondary-900">
            Shopping Cart
          </h2>
          <Badge variant="primary">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </Badge>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="Package" size={32} className="text-primary-700" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-secondary-900">
                        {item.name}
                      </h3>
                      <p className="text-secondary-600 text-sm">
                        {item.dimensions.length}" × {item.dimensions.width}" × {item.dimensions.height}" • {item.material}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-secondary-600">Qty:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <ApperIcon name="Minus" size={14} />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                          >
                            <ApperIcon name="Plus" size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-secondary-600">
                          ${item.unitPrice.toFixed(2)} each
                        </div>
                        <div className="font-bold text-lg text-primary-600">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" icon="Edit2">
                        Edit Design
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon="Trash2"
                        onClick={() => removeItem(item.id)}
                        className="text-accent-500 hover:text-accent-600 hover:bg-accent-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card className="p-6 sticky top-24">
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-secondary-900">
              Order Summary
            </h3>

            {/* Promo Code */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-secondary-700">
                Promo Code
              </label>
              <div className="flex gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={applyPromoCode}
                  disabled={!promoCode}
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-secondary-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({(discount * 100)}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-secondary-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between text-secondary-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <PriceDisplay 
                  price={total}
                  label="Total"
                  size="lg"
                />
              </div>
            </div>

            {/* Shipping Info */}
            {shipping === 0 && (
              <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2">
                <ApperIcon name="Truck" size={16} className="text-green-600" />
                <span className="text-sm text-green-700">
                  Free shipping on orders over $500
                </span>
              </div>
            )}

            {/* Checkout Button */}
            <Button variant="primary" size="lg" className="w-full" icon="CreditCard">
              Proceed to Checkout
            </Button>

            <div className="text-center text-xs text-secondary-500">
              Secure checkout with SSL encryption
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CartSummary