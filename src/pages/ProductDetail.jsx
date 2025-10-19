import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../services/api.js'

export default function ProductDetail(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    let mounted=true
    setLoading(true);
    setError(null);
    getProducts().then(list=>{
      if(!mounted) return;
      // Encuentra el producto por ID, asegurando que ambos sean string para comparación.
      const p = list.find(x=> String(x.id) === String(id));
      if (p) {
        setProduct(p);
      } else {
        setError('Producto no encontrado');
      }
    }).catch(e => {
      if (mounted) setError(e.message);
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return ()=> mounted=false
  },[id])

  if (loading) return <div className="text-center py-20">Cargando detalles del producto...</div>;
  if (error) return <div className="text-center py-20 text-red-400">Error: {error}</div>;
  if(!product) return <div className="text-center py-20">Producto no encontrado</div>

  return (
    <div className="max-w-3xl mx-auto bg-slate-800 p-4 rounded">
      <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
      {/* Usa product.image o un placeholder genérico */}
      <img src={product.image || '/placeholder.png'} className="w-full h-64 object-cover rounded mb-3" alt={product.name} />
      <p className="text-slate-400">{product.description}</p>
      <div className="mt-3 font-bold">${product.price}</div>
    </div>
  )
}