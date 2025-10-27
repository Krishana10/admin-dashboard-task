// Navbar.jsx - top navigation, shows login status
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App.jsx'

export default function Navbar(){
  const { user } = useContext(UserContext)
  return (
    <nav className='flex'>
      <div><Link to='/' style={{color:'white', textDecoration:'none'}}><strong>Admin Dashboard</strong></Link></div>
      <div className='right'>
        <Link to='/products' className='button'>Products</Link>
        <Link to='/admin' className='button'>Admin</Link>
        {user ? (
          <>
            <Link to='/dashboard' className='button'>My Dashboard</Link>
            <Link to='/orders' className='button'>Orders</Link>
            <button className='button link' onClick={()=>{ localStorage.removeItem('auth'); window.location.reload(); }}>Logout</button>
          </>
        ):(
          <Link to='/login' className='button'>Login</Link>
        )}
      </div>
    </nav>
  )
}
