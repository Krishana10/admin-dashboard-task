// api.js - simple fetch helpers (assumes json-server at localhost:4000)
const BASE = 'http://localhost:4000'

export async function fetchJSON(path){
  const res = await fetch(BASE + path)
  if(!res.ok) throw new Error('API error')
  return res.json()
}

export async function postJSON(path, body){
  const res = await fetch(BASE + path, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(body)
  })
  if(!res.ok) throw new Error('API error')
  return res.json()
}

export async function patchJSON(path, body){
  const res = await fetch(BASE + path, {
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(body)
  })
  if(!res.ok) throw new Error('API error')
  return res.json()
}

export async function deleteJSON(path){
  const res = await fetch(BASE + path, { method:'DELETE' })
  if(!res.ok) throw new Error('API error')
  return res.json()
}
