// Home.jsx - simple landing page
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <h1>Welcome to the Admin Dashboard demo</h1>
      <p>This SPA demonstrates product management, orders and a user dashboard.</p>
      <Link to='/products' className='button'>Browse Products</Link>
    </div>
  )
}
