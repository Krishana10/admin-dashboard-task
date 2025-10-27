// SearchSort.jsx - search input and sort dropdown
import React from 'react'

export default function SearchSort({q, setQ, sort, setSort}){
  return (
    <div className='flex' style={{marginBottom:12}}>
      <input className='input' placeholder='Search title...' value={q} onChange={e=>setQ(e.target.value)} />
      <select className='input' value={sort} onChange={e=>setSort(e.target.value)} style={{marginLeft:8}}>
        <option value='newest'>Newest</option>
        <option value='price_asc'>Price: Low → High</option>
        <option value='price_desc'>Price: High → Low</option>
      </select>
    </div>
  )
}
