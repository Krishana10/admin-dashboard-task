// Login.jsx - Google sign-in with Firebase (falls back to mock if firebaseConfig not set)
import React, { useContext } from 'react'
import { UserContext } from '../App.jsx'
import { signInWithGooglePopup } from '../firebase.js'
import { fetchJSON, postJSON } from '../api/api.js'

export default function Login(){
  const { setUser } = useContext(UserContext)

  async function doGoogleLogin(){
    try{
      const user = await signInWithGooglePopup()
      // user contains displayName, email, uid, etc.
      const payload = { name: user.displayName || 'Unnamed', email: user.email }
      // Check if user exists in API
      const existing = await fetchJSON(`/users?email=${encodeURIComponent(payload.email)}`)
      if(existing && existing.length > 0){
        // use first existing
        setUser(existing[0])
        localStorage.setItem('auth', JSON.stringify(existing[0]))
      } else {
        // create user in json-server
        const created = await postJSON('/users', { ...payload, addresses: [], wishlist: [], cart: [], orders: [] })
        setUser(created)
        localStorage.setItem('auth', JSON.stringify(created))
      }
      alert('Logged in with Google')
    }catch(err){
      console.error(err)
      alert('Google sign-in failed or Firebase not configured. Using mock login instead.')
      mockLogin()
    }
  }

  function mockLogin(){
    // Simple mock user (in real app, replace with Firebase Google OAuth)
    const mock = { id:1, name:'Alice', email:'alice@example.com', addresses:[], wishlist:[], cart:[], orders:[] }
    setUser(mock)
    localStorage.setItem('auth', JSON.stringify(mock))
    alert('Logged in (mock). For real Google login, paste firebase config in src/firebase.js and enable Google sign-in.')
  }

  return (
    <div>
      <h2>Login</h2>
      <p>Sign in with Google (requires Firebase config in <code>src/firebase.js</code> and Google sign-in enabled in Firebase console).</p>
      <div className='flex' style={{gap:12}}>
        <button className='button' onClick={doGoogleLogin}>Sign in with Google</button>
        <button className='button' onClick={mockLogin}>Mock Login</button>
      </div>
    </div>
  )
}
