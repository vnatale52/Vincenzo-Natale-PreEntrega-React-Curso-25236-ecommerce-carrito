import React, { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()

export const AuthProvider = ({children, resetDataSourceChoice})=>{ // Recibe resetDataSourceChoice
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loginMessage, setLoginMessage] = useState('')
  const [logoutMessage, setLogoutMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // Nuevo estado para mensajes de error
  const navigate = useNavigate()

  const login = (username)=>{
    const role = username === 'admin' ? 'admin' : 'user'
    setUser({ username, role })
    setIsAuthenticated(true)
    setLoginMessage(`Sesión iniciada por: ${username}`)
    setLogoutMessage('')
    setErrorMessage('') // Limpia cualquier mensaje de error anterior
    navigate('/')
  }

  const logout = ()=>{
    setUser(null)
    setIsAuthenticated(false)
    setLogoutMessage('Se eliminarán del carrito todos los productos seleccionados')
    // Requerimiento #4: Al cerrar sesión, se debe volver a la página de selección de fuente de datos.
    // Para ello, eliminamos la preferencia de localStorage.
    localStorage.removeItem('DATA_SOURCE');
    localStorage.removeItem('VITE_MOCKAPI_URL'); // Asegura que también se limpie la URL del mock
    // Si la función resetDataSourceChoice fue proporcionada, la llamamos.
    if (resetDataSourceChoice) {
      resetDataSourceChoice();
    }
    navigate('/login') // Redirige a /login, que a su vez redirigirá al selector si DATA_SOURCE no está.
  }

  return <AuthContext.Provider value={{isAuthenticated, user, login, logout, loginMessage, logoutMessage, setLoginMessage, setLogoutMessage, errorMessage, setErrorMessage}}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)
export default AuthContext