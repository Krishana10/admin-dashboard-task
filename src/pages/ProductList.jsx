// ProductList.jsx - list products with search and sort, add to cart/wishlist
import React, { useEffect, useState, useContext } from 'react'
import { fetchJSON, patchJSON } from '../api/api.js'
import ProductCard from '../components/ProductCard.jsx'
import SearchSort from '../components/SearchSort.jsx'
import { UserContext } from '../App.jsx'

export default function ProductList(){
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('newest')
  const [loading, setLoading] = useState(true)
  const { user, setUser } = useContext(UserContext)

  useEffect(()=>{
    setLoading(true)
    fetchJSON('/products').then(data=>{
      setProducts(data)
      setLoading(false)
    }).catch(()=>setLoading(false))
  },[])

  function filtered(){
    let res = products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
    if(sort === 'price_asc') res = res.sort((a,b)=>a.price-b.price)
    if(sort === 'price_desc') res = res.sort((a,b)=>b.price-a.price)
    if(sort === 'newest') res = res.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))
    return res
  }

  // Mock add to wishlist/cart by PATCHing user in API (requires user logged in)
  async function addToWishlist(product){
    if(!user){ alert('Please login first'); return }
    if(product.stock === 0){ alert('Cannot add out of stock item'); return }
    // ideal: call PATCH /users/:id to update wishlist
    try{
      const updated = await patchJSON(`/users/${user.id}`, { wishlist: [...(user.wishlist||[]), product.id] })
      setUser(updated)
      localStorage.setItem('auth', JSON.stringify(updated))
      alert('Added to wishlist')
    }catch(e){ alert('API error') }
  }

  async function addToCart(product){
    if(!user){ alert('Please login first'); return }
    if(product.stock === 0){ alert('Cannot add out of stock item'); return }
    const existing = (user.cart||[]).slice()
    const idx = existing.findIndex(i=>i.productId===product.id)
    if(idx>-1) existing[idx].qty += 1
    else existing.push({productId:product.id, qty:1})
    try{
      const updated = await patchJSON(`/users/${user.id}`, { cart: existing })
      setUser(updated)
      localStorage.setItem('auth', JSON.stringify(updated))
      alert('Added to cart')
    }catch(e){ alert('API error') }
  }

  if(loading) return <div>Loading products...</div>

  return (
    <div>
      <h2>Products</h2>
      <SearchSort q={q} setQ={setQ} sort={sort} setSort={setSort} />
      <div className='grid'>
        {filtered().map(p=>(
          <ProductCard key={p.id} product={p} onAddCart={addToCart} onAddWishlist={addToWishlist} />
        ))}
      </div>
    </div>
  )
}
