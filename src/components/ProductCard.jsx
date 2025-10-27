// ProductCard.jsx - displays product info with add to cart/wishlist
import React from 'react'

export default function ProductCard({product, onAddCart, onAddWishlist}){
  const oos = product.stock === 0
  return (
    <div className='card'>
      <h3>{product.title}</h3>
      <p className='small-muted'>{product.description}</p>
      <div className='flex'>
        <div><strong>${product.price.toFixed(2)}</strong></div>
        <div className='right small-muted'>Stock: {product.stock}</div>
      </div>
      {oos && <div className='out'>Out of stock</div>}
      <div className='flex' style={{marginTop:8}}>
        <button className='button' disabled={oos} onClick={()=>onAddCart && onAddCart(product)}>Add to cart</button>
        <button className='button' disabled={oos} onClick={()=>onAddWishlist && onAddWishlist(product)}>Wishlist</button>
      </div>
    </div>
  )
}
