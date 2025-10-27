// firebase.js — Initializes Firebase and provides Google Sign-In helpers
// This file is used by Login.jsx for real Google OAuth login.

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth'

// ✅ Your Firebase web app configuration (from your Firebase Console)
export const firebaseConfig = {
  apiKey: "AIzaSyBUuYFzxqODyvvFDIvp5zlMC4WwWfbiDsU",
  authDomain: "admin-18d11.firebaseapp.com",
  projectId: "admin-18d11",
  storageBucket: "admin-18d11.firebasestorage.app",
  messagingSenderId: "242319018337",
  appId: "1:242319018337:web:db0c7108703fe94404dd20",
  measurementId: "G-W9JFB433JQ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// 🔹 Function: sign in with Google popup
export async function signInWithGooglePopup() {
  const result = await signInWithPopup(auth, provider)
  return result.user // returns the Firebase user object
}

// 🔹 Function: sign out
export async function signOut() {
  await fbSignOut(auth)
}

export { auth }
