// Checkout.jsx - single page that mirrors simple checkout flow (redirects to dashboard)
import React from 'react'
import { Link } from 'react-router-dom'

export default function Checkout(){
  return (
    <div>
      <h2>Checkout</h2>
      <p>This demo integrates checkout within the Dashboard where user selects saved addresses.</p>
      <Link to='/dashboard' className='button'>Go to My Dashboard to confirm order</Link>
    </div>
  )
}
