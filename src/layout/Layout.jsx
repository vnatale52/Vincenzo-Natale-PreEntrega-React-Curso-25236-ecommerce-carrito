import React, { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import CartPanel from '../components/CartPanel.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout(){
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false) // Cambiado a 'isCartPanelOpen' para mayor claridad
  const { totalItems, clearCart } = useCart() || {}
  const { isAuthenticated, user, logout, loginMessage, logoutMessage, setLogoutMessage, errorMessage, setErrorMessage } = useAuth() || {}
  const [toast, setToast] = useState('')

  useEffect(()=>{
    if(loginMessage){
      setToast(loginMessage)
      setTimeout(()=> setToast(''), 2500)
    }
  },[loginMessage])

  useEffect(()=>{
    if(logoutMessage){
      clearCart && clearCart() // Asegúrate de limpiar el carrito al cerrar sesión
      setToast(logoutMessage)
      setTimeout(()=>{ setToast(''); setLogoutMessage('') }, 3000)
    }
  },[logoutMessage])

  // Efecto para mostrar mensajes de error desde AuthContext
  useEffect(()=>{
    if(errorMessage){
      setToast(errorMessage)
      setTimeout(()=>{ setToast(''); setErrorMessage('') }, 3000) // Limpia el mensaje de error después de mostrarlo
    }
  },[errorMessage])

  return (
    <div>
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-bold">Mi Tienda</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm">Inicio</Link>
            <Link to="/about" className="text-sm">About</Link>
            <Link to="/contact" className="text-sm">Contact</Link>
            {/* Requerimiento: Al presionar el botón carrito, debe mostrar el carrito con los productos seleccionados.
                Ahora se abre el CartPanel al hacer clic en este botón. */}
            <button onClick={() => setIsCartPanelOpen(true)} className="text-sm relative">
              Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-neon text-slate-900 text-xs px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/admin" className="text-sm">Admin</Link>
            {isAuthenticated ? (
              <>
                <div className="text-sm">Hola, {user?.username}</div>
                <button onClick={logout} className="text-sm">Cerrar sesión</button>
              </>
            ) : (
              <Link to="/login" className="text-sm">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="py-8 container">
        <Outlet />
      </main>
      {/* El CartPanel ahora usa 'isCartPanelOpen' para controlar su visibilidad */}
      <CartPanel open={isCartPanelOpen} onClose={()=>setIsCartPanelOpen(false)} />
      {/* Toast para mensajes de login/logout/error */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}