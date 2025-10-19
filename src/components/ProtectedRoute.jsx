import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({children, requireAdmin=false}){
  const { isAuthenticated, user, setErrorMessage } = useAuth() || {}
  const location = useLocation()

  // Si no está autenticado, redirige a la página de login.
  if(!isAuthenticated){
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  // Si requiere ser admin y el usuario no lo es, muestra un mensaje y redirige a la página de login.
  if(requireAdmin && user?.role !== 'admin'){
    // Requerimiento: Muestra el mensaje “No tiene permiso de Administrador”
    // Usamos useEffect para setear el mensaje de error de forma segura.
    useEffect(() => {
      setErrorMessage('No tiene permiso de Administrador');
    }, [setErrorMessage]);
    return <Navigate to="/login" replace /> // Redirige a /login para que el usuario pueda intentar iniciar sesión correctamente.
  }
  return children
}