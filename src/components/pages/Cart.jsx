import React from 'react'
import CartSummary from '@/components/organisms/CartSummary'

const Cart = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartSummary />
      </div>
    </div>
  )
}

export default Cart