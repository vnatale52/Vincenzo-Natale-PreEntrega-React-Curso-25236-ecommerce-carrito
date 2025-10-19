import React from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom' // Importa Link para el botón "Inicio"

export default function CartPage(){
  const { cart, totalPrice } = useCart() || {}
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-3">Tu Carrito</h2>
      {cart && cart.length ? cart.map(item=> (
        <div key={item.id} className="flex items-center justify-between bg-slate-800 p-3 rounded mb-2">
          <div className="flex items-center gap-3"><img src={item.image||'/placeholder.png'} className="w-16 h-16 object-cover rounded"/><div><div className="font-medium">{item.name}</div>
          {/* Requerimiento: Muestra "Cantidad: " en lugar de "x" */}
          <div className="text-sm text-slate-400">Cantidad: {item.quantity}</div></div></div>
          <div className="text-right"><div className="font-bold">${(item.price*item.quantity).toFixed(2)}</div></div>
        </div>
      )) : <div className="text-slate-400">Carrito vacío</div>}
      <div className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</div>
      {/* Requerimiento: Mensaje y botón para volver a la lista de productos */}
      <div className="mt-6 p-4 bg-slate-800 rounded">
        <p className="text-slate-300 mb-3">Para continuar comprando, presione el botón "Inicio".</p>
        <Link to="/" className="px-4 py-2 rounded btn-accent inline-block">Inicio</Link>
      </div>
    </div>
  )
}