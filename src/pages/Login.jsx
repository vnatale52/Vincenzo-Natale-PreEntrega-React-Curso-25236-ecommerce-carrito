import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLocation } from 'react-router-dom'

export default function Login(){
  const { login } = useAuth() || {}
  const [username, setUsername] = useState('user')
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const handle = (e)=>{ e.preventDefault(); login(username); }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-3">Iniciar Sesión (simulado)</h2>
      <p className="text-slate-400 mb-3">Escribe "admin" para entrar como administrador, cualquier otro nombre será usuario común.</p>
      <form onSubmit={handle} className="space-y-3">
        <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full p-2 rounded bg-slate-800" />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded btn-accent">Iniciar Sesión</button>
          <div className="px-4 py-2 rounded bg-slate-700 text-sm">Acceso demo: admin / user</div>
        </div>
      </form>
    </div>
  )
}
