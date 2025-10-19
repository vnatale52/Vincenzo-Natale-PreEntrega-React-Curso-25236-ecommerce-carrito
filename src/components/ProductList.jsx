import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard.jsx'
import TopNotice from './TopNotice.jsx'
import MiniCartButton from './MiniCartButton.jsx'
import CartPanel from './CartPanel.jsx' // Importa CartPanel para su estado
import { useCart } from '../context/CartContext.jsx'

const DEFAULT_LOCAL = '/src/services/demo-products.json'

async function fetchFromMock(url){
  const res = await fetch(url)
  if(!res.ok) throw new Error('Bad response from MockAPI')
  return await res.json()
}

export default function ProductList(){ // Eliminamos 'openCart' de props ya que se maneja localmente
  const [products,setProducts]=useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
  const { totalItems } = useCart()||{}
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false) // Estado para el panel del carrito

  // Función para abrir el panel del carrito
  const openCartPanel = () => {
    setIsCartPanelOpen(true);
  };

  useEffect(()=>{
    let mounted=true
    setLoading(true)
    ;(async ()=>{
      try{
        const source = localStorage.getItem('DATA_SOURCE') || 'local'
        if(source === 'mock'){
          const url = localStorage.getItem('VITE_MOCKAPI_URL')
          const data = await fetchFromMock(url)
          if(mounted) setProducts(data)
        } else {
          const local = await fetch(DEFAULT_LOCAL)
          const data = await local.json()
          if(mounted) setProducts(data)
        }
      }catch(e){
        if(mounted) setError(e.message)
      }finally{
        if(mounted) setLoading(false)
      }
    })()
    return ()=> mounted=false
  },[])

  if(loading) return <div className="text-center py-20">Cargando productos…</div>
  if(error) return <div className="text-center py-20 text-red-400">Error al cargar productos: {error}</div>

  return (
    <div>
      <TopNotice />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p=> <ProductCard key={p.id} product={p} openCart={openCartPanel} />)} {/* Pasa openCartPanel a ProductCard */}
      </div>
      {/* El MiniCartButton ahora usa la función local openCartPanel */}
      <MiniCartButton count={totalItems} onClick={openCartPanel} />
      {/* El CartPanel se renderiza aquí y es controlado por el estado local */}
      <CartPanel open={isCartPanelOpen} onClose={() => setIsCartPanelOpen(false)} />
    </div>
  )
}