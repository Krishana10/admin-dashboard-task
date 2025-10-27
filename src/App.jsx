// App.jsx - main SPA routes and context
import React, { createContext, useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductList from './pages/ProductList.jsx'
import Admin from './pages/Admin.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderHistory from './pages/OrderHistory.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import { fetchJSON } from './api/api.js'

// Basic user context (stores minimal user info after "login")
export const UserContext = createContext(null)

export default function App(){
  // load auth from localStorage if present
  useEffect(()=>{
    const auth = localStorage.getItem('auth')
    if(auth) setUser(JSON.parse(auth))
  },[])

  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    // load categories at app start
    fetchJSON('/categories').then(setCategories).catch(()=>setCategories([]))
  },[])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className='app'>
        <Navbar categories={categories} />
        <main className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/orders' element={<OrderHistory />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  )
}
