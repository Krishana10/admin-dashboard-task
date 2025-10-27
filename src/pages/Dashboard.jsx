// Dashboard.jsx - shows wishlist, cart and quick actions (reads user from local API)
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App.jsx'
import { fetchJSON, patchJSON, postJSON } from '../api/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Dashboard(){
  const { user, setUser } = useContext(UserContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const ps = await fetchJSON('/products')
      setProducts(ps)
      setLoading(false)
    }
    load()
    // load user from localStorage if present
    const auth = localStorage.getItem('auth')
    if(auth && !user) setUser(JSON.parse(auth))
  },[])

  function productById(id){ return products.find(p=>p.id===id) }

  async function updateCartItem(productId, qty){
    if(!user) return alert('Login required')
    const cart = (user.cart||[]).map(i=> i.productId===productId ? {...i, qty} : i)
    const updated = await patchJSON(`/users/${user.id}`, { cart })
    setUser(updated); localStorage.setItem('auth', JSON.stringify(updated))
  }

  async function confirmOrder(addressId){
    if(!user) return alert('Login required')
    // create order object and POST
    const order = {
      userId: user.id,
      items: user.cart || [],
      addressId,
      status: 'On Process',
      createdAt: new Date().toISOString()
    }
    await postJSON('/orders', order)
    // clear cart
    const updated = await patchJSON(`/users/${user.id}`, { cart: [] })
    setUser(updated); localStorage.setItem('auth', JSON.stringify(updated))
    alert('Order placed')
  }

  if(!user) return <div>Please login to view your dashboard.</div>
  if(loading) return <div>Loading...</div>

  return (
    <div>
      <h2>My Dashboard</h2>
      <section>
        <h3>Wishlist</h3>
        <div className='grid'>
          {(user.wishlist||[]).map(id=>{
            const p = productById(id)
            return p ? <ProductCard key={p.id} product={p} /> : null
          })}
        </div>
      </section>

      <section style={{marginTop:16}}>
        <h3>Cart</h3>
        {(user.cart||[]).length === 0 ? <div>No items in cart</div> : (
          <div>
            {user.cart.map(item=>{
              const p = productById(item.productId)
              if(!p) return null
              return (
                <div key={p.id} className='card flex' style={{marginBottom:8}}>
                  <div>
                    <strong>{p.title}</strong>
                    <div className='small-muted'>${p.price.toFixed(2)} x {item.qty}</div>
                  </div>
                  <div className='right'>
                    <input className='input' type='number' min='1' max={p.stock} value={item.qty} onChange={e=>updateCartItem(p.id, Number(e.target.value))} />
                  </div>
                </div>
              )
            })}
            <div style={{marginTop:8}}>
              <h4>Addresses</h4>
              {(user.addresses||[]).map(a=>(
                <div key={a.id} className='card flex'>
                  <div>{a.label} — {a.line1}, {a.city} {a.zip}</div>
                  <div className='right'><button className='button' onClick={()=>confirmOrder(a.id)}>Confirm Order to this address</button></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
