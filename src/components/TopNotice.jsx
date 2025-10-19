import React from 'react'
export default function TopNotice(){ return <div className="text-center text-sm text-slate-400 mb-4">Fuente de datos: {localStorage.getItem('DATA_SOURCE')||'local'}</div> }
