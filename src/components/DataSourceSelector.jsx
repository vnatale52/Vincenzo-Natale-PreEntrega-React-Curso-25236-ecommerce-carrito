import React from 'react'

export default function DataSourceSelector({onChoose}){
  const mockUrl = 'https://68eaf2d176b3362414cc8557.mockapi.io/products'

  const chooseMock = ()=>{
    localStorage.setItem('DATA_SOURCE', 'mock')
    localStorage.setItem('VITE_MOCKAPI_URL', mockUrl)
    onChoose && onChoose()
  }
  const chooseLocal = ()=>{
    localStorage.setItem('DATA_SOURCE', 'local')
    localStorage.removeItem('VITE_MOCKAPI_URL')
    onChoose && onChoose()
  }

  return (
    <div className="bg-slate-900 p-8 rounded-xl max-w-2xl text-center">
      <h2 className="text-2xl font-semibold mb-4">Seleccione origen de productos</h2>
      <p className="text-slate-400 mb-6">Elija cómo desea cargar los productos para esta sesión.</p>
      <div className="flex gap-4 justify-center">
        <button onClick={chooseMock} className="px-6 py-3 rounded btn-accent">a) Cargar desde MockAPI (da error porque excedido el límite de sesión gratuita)</button>
        <button onClick={chooseLocal} className="px-6 py-3 rounded bg-slate-700">b) Cargar desde demo local</button>
      </div>
      <div className="mt-6 text-sm text-slate-400">Nota: la opción MockAPI usa el archivo config.ini incluido en el proyecto.</div>
    </div>
  )
}
