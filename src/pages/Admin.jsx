// Admin.jsx - simple admin interface to manage products/categories and update orders
import React, { useEffect, useState } from 'react'
import { fetchJSON, postJSON, patchJSON, deleteJSON } from '../api/api.js'

export default function Admin(){
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({title:'', price:0, categoryId:1, stock:1})

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const [ps, cs, os] = await Promise.all([fetchJSON('/products'), fetchJSON('/categories'), fetchJSON('/orders')])
      setProducts(ps); setCategories(cs); setOrders(os); setLoading(false)
    }
    load()
  },[])

  async function createProduct(){
    const body = {...newProduct, description:'', image:'', createdAt:new Date().toISOString()}
    await postJSON('/products', body)
    const ps = await fetchJSON('/products'); setProducts(ps)
  }

  async function removeProduct(id){
    await deleteJSON(`/products/${id}`)
    setProducts(await fetchJSON('/products'))
  }

  async function updateOrderStatus(orderId, nextStatus){
    await patchJSON(`/orders/${orderId}`, { status: nextStatus })
    setOrders(await fetchJSON('/orders'))
  }

  if(loading) return <div>Loading admin...</div>

  return (
    <div>
      <h2>Admin Panel</h2>
      <section>
        <h3>Products</h3>
        <div style={{marginBottom:8}}>
          <input className='input' placeholder='Title' value={newProduct.title} onChange={e=>setNewProduct({...newProduct, title:e.target.value})} />
          <input className='input' type='number' placeholder='Price' value={newProduct.price} onChange={e=>setNewProduct({...newProduct, price: Number(e.target.value)})} />
          <select className='input' value={newProduct.categoryId} onChange={e=>setNewProduct({...newProduct, categoryId: Number(e.target.value)})}>
            {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className='button' onClick={createProduct}>Add Product</button>
        </div>
        <div className='grid'>
          {products.map(p=>(
            <div key={p.id} className='card'>
              <div><strong>{p.title}</strong></div>
              <div className='small-muted'>${p.price}</div>
              <div className='flex'>
                <button className='button' onClick={()=>removeProduct(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginTop:16}}>
        <h3>Orders</h3>
        {orders.map(o=>(
          <div key={o.id} className='card flex' style={{marginBottom:8}}>
            <div>
              <div>Order #{o.id} — User {o.userId}</div>
              <div className='small-muted'>Status: {o.status}</div>
            </div>
            <div className='right'>
              {o.status === 'On Process' && <button className='button' onClick={()=>updateOrderStatus(o.id,'Shipped')}>Mark Shipped</button>}
              {o.status === 'Shipped' && <button className='button' onClick={()=>updateOrderStatus(o.id,'Delivered')}>Mark Delivered</button>}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
