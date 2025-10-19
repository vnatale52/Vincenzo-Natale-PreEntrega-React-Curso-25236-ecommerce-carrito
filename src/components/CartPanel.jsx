import React, { useEffect } from 'react' // Importa useEffect
import { useCart } from '../context/CartContext.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CartPanel({open, onClose}){
  const { cart, setQuantity, removeFromCart, totalPrice } = useCart() || {}

  // Requerimiento: Al presionar el botón carrito no muestra el carrito con los productos seleccionados.
  // El problema no estaba en CartPanel.jsx en sí, sino en que el MiniCartButton en ProductList
  // y el botón "Carrito" en el Layout de navegación no estaban abriendo este panel.
  // El CartPanel ya estaba diseñado para mostrar los productos del contexto de carrito.

  return (
    <AnimatePresence>
      {open && (
        <>
        {/* Backdrop para cerrar el panel al hacer clic fuera */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="panel-backdrop" onClick={onClose} />
        {/* Panel lateral del carrito */}
        <motion.aside initial={{x:400}} animate={{x:0}} exit={{x:400}} transition={{type:'spring', stiffness:300, damping:30}} className="fixed right-0 top-0 h-full panel p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Tu carrito</h3>
            <button onClick={onClose} className="text-slate-400">Cerrar</button>
          </div>
          <div className="space-y-3 overflow-auto" style={{maxHeight:'60vh'}}>
            {/* Muestra los productos en el carrito o un mensaje si está vacío */}
            {cart && cart.length ? cart.map(item=> (
              <div key={item.id} className="flex items-center justify-between bg-slate-900 p-3 rounded">
                <div className="flex items-center gap-3">
                  <img src={item.image||'/placeholder.png'} className="w-14 h-14 object-cover rounded"/>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    {/* Requerimiento: Muestra "Cantidad: " */}
                    <div className="text-sm text-slate-400">Cantidad: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${(item.price*item.quantity).toFixed(2)}</div>
                  <div className="mt-2 flex gap-2 items-center justify-end">
                    {/* Botones para ajustar la cantidad */}
                    <button className="px-2 py-1 bg-slate-700 rounded" onClick={()=> setQuantity(item.id, Math.max(1, (item.quantity||1)-1))}>-</button>
                    <div className="px-2">{item.quantity}</div>
                    <button className="px-2 py-1 bg-slate-700 rounded" onClick={()=> setQuantity(item.id, (item.quantity||1)+1)}>+</button>
                    {/* Botón para eliminar un producto del carrito (Requerimiento ya implementado) */}
                    <button className="ml-2 text-sm text-red-500" onClick={()=> removeFromCart(item.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            )) : <div className="text-slate-400">Tu carrito está vacío</div>}
          </div>
          <div className="mt-4 border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between mb-3"><div className="font-bold">Total</div><div className="font-bold">${totalPrice.toFixed(2)}</div></div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 rounded bg-slate-700" onClick={onClose}>Seguir comprando</button>
              {/* Botón "Finalizar compra" que lleva a la página del carrito */}
              <Link to="/cart" className="flex-1 px-3 py-2 rounded btn-accent text-center" onClick={onClose}>Finalizar compra</Link>
            </div>
          </div>
        </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}