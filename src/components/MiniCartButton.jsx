import React from 'react'
export default function MiniCartButton({count, onClick}){
  return (
    // Requerimiento: Se corrigió para que al hacer clic, abra el panel del carrito.
    <button onClick={onClick} className="fixed right-6 bottom-6 z-50 bg-neon text-slate-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" /></svg>
      <span className="font-medium">Carrito</span>
      <span className="bg-white text-slate-900 px-2 py-0.5 rounded-full text-sm">{count||0}</span>
    </button>
  )
}