// OrderHistory.jsx - lists user's orders and shows statuses
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App.jsx'
import { fetchJSON } from '../api/api.js'

export default function OrderHistory(){
  const { user } = useContext(UserContext)
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    async function load(){
      const all = await fetchJSON('/orders')
      if(user) setOrders(all.filter(o=>o.userId === user.id))
      else setOrders([])
    }
    // attempt to get user from localStorage too
    const auth = localStorage.getItem('auth')
    if(auth && !user) {
      const parsed = JSON.parse(auth)
      // filter after a moment
      fetchJSON('/orders').then(all=>{
        setOrders(all.filter(o=>o.userId===parsed.id))
      })
    } else load()
  },[user])

  if(!user) return <div>Please login to view order history.</div>

  return (
    <div>
      <h2>Order History</h2>
      {orders.length===0 ? <div>No orders yet</div> : (
        orders.map(o=>(
          <div key={o.id} className='card' style={{marginBottom:8}}>
            <div><strong>Order #{o.id}</strong> — {new Date(o.createdAt).toLocaleString()}</div>
            <div className='small-muted'>Status: {o.status}</div>
          </div>
        ))
      )}
    </div>
  )
}
