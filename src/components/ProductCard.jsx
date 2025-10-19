import React from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'

export default function ProductCard({product, openCart}){
  const { addToCart } = useCart() || {}
  return (
    <article className="bg-slate-800 rounded-xl overflow-hidden card-hover">
      <Link to={`/product/${product.id}`}>
        {/* Usamos product.image si está disponible, de lo contrario, '/placeholder.png' */}
        {/* Las imágenes ahora se referencian desde /img/ que está en la carpeta public */}
        <img src={product.image || '/placeholder.png'} alt={product.name} className="w-full h-48 object-cover"/>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-slate-400 mt-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold">${product.price}</div>
          <button onClick={()=>{ addToCart(product); openCart && openCart(); }} className="px-3 py-1 rounded-md btn-accent">Agregar</button>
        </div>
      </div>
    </article>
  )
}