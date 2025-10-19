import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import CartPage from './pages/Cart.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DataSourceSelector from './components/DataSourceSelector.jsx'

export default function App(){
  // El estado 'sourceChosen' ahora se inicializa comprobando si 'DATA_SOURCE' existe en localStorage.
  // Esto asegura que la pantalla de selección aparezca solo si el usuario no ha elegido una fuente antes.
  const [sourceChosen, setSourceChosen] = useState(() => localStorage.getItem('DATA_SOURCE') !== null)

  // Función para reestablecer la elección de la fuente de datos, útil al cerrar sesión.
  const resetDataSourceChoice = () => {
    localStorage.removeItem('DATA_SOURCE');
    localStorage.removeItem('VITE_MOCKAPI_URL'); // También limpia la URL de mockapi
    setSourceChosen(false);
  };

  return (
    <Router>
      {/* AuthProvider envuelve toda la aplicación para manejar la autenticación */}
      <AuthProvider resetDataSourceChoice={resetDataSourceChoice}> {/* Pasa la función para resetear la fuente de datos */}
        {/* CartProvider envuelve la aplicación para manejar el carrito de compras */}
        <CartProvider>
          {!sourceChosen ? (
            // Si 'sourceChosen' es falso (no se ha seleccionado una fuente), muestra el selector de fuente de datos.
            <div className="min-h-screen flex items-center justify-center">
              <DataSourceSelector onChoose={()=> setSourceChosen(true)} />
            </div>
          ) : (
            // Una vez que se ha seleccionado una fuente de datos, se muestran las rutas de la aplicación.
            <Routes>
              {/* La ruta principal utiliza el componente Layout para el diseño común de la aplicación */}
              <Route path='/' element={<Layout />} >
                <Route index element={<Home />} /> {/* Ruta de inicio */}
                <Route path='about' element={<About />} /> {/* Ruta "Acerca de" */}
                <Route path='contact' element={<Contact />} /> {/* Ruta de contacto */}
                <Route path='product/:id' element={<ProductDetail />} /> {/* Ruta de detalle de producto */}
                <Route path='login' element={<Login />} /> {/* Ruta de inicio de sesión */}
                {/* Ruta del carrito, protegida para que solo usuarios autenticados puedan acceder */}
                <Route path='cart' element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />
                {/* Ruta de administración, protegida y solo accesible por usuarios con rol 'admin' */}
                <Route path='admin' element={
                  <ProtectedRoute requireAdmin={true}>
                    <Admin />
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          )}
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}