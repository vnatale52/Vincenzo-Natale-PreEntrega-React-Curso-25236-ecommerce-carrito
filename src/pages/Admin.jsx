import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/api.js' // Para obtener la lista actual de productos
import { useAuth } from '../context/AuthContext.jsx' // Para obtener el usuario actual y su rol

export default function Admin(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null) // Producto que se está editando
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' }) // Para nuevos productos
  const { user } = useAuth() // Obtener el usuario actual
  const isAdmin = user && user.role === 'admin'

  // Función para cargar los productos
  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAdmin) { // Solo carga productos si el usuario es admin
      loadProducts()
    }
  }, [isAdmin])

  // Lógica para simular altas, bajas y modificaciones
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      // Simula la eliminación filtrando la lista de productos
      setProducts(products.filter(p => String(p.id) !== String(id)))
      alert(`Producto con ID ${id} eliminado (simulado).`)
      // En una aplicación real, aquí harías una llamada a la API para eliminar el producto.
      // await deleteProduct(id);
    }
  }

  const handleEdit = (product) => {
    setEditingProduct({...product}) // Copia el producto para edición
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setProducts(products.map(p =>
      String(p.id) === String(editingProduct.id) ? editingProduct : p
    ))
    alert(`Producto con ID ${editingProduct.id} actualizado (simulado).`)
    setEditingProduct(null) // Cierra el formulario de edición
    // En una aplicación real, aquí harías una llamada a la API para actualizar el producto.
    // await updateProduct(editingProduct);
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const newId = Math.max(...products.map(p => p.id)) + 1 // Genera un nuevo ID simple
    const productToAdd = { ...newProduct, id: newId, price: parseFloat(newProduct.price).toFixed(2) }
    setProducts([...products, productToAdd])
    alert(`Producto "${newProduct.name}" agregado (simulado).`)
    setNewProduct({ name: '', description: '', price: '', image: '' }) // Resetea el formulario
    // En una aplicación real, aquí harías una llamada a la API para agregar el producto.
    // await addProduct(productToAdd);
  }

  if (!isAdmin) {
    // Esto ya lo maneja ProtectedRoute, pero es una capa adicional.
    return <div className="max-w-3xl mx-auto"><h2 className="text-2xl font-semibold mb-3">Acceso Denegado</h2><p className="text-slate-400">No tienes permisos para ver esta página.</p></div>
  }

  if (loading) return <div className="text-center py-20">Cargando productos para administración…</div>
  if (error) return <div className="text-center py-20 text-red-400">Error al cargar productos: {error}</div>

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Administración de Productos</h2>

      {/* Formulario para agregar nuevo producto */}
      <div className="bg-slate-800 p-4 rounded mb-6">
        <h3 className="text-xl font-semibold mb-3">Agregar Nuevo Producto</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <input
            type="text"
            className="w-full p-2 rounded bg-slate-700"
            placeholder="Nombre del Producto"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <textarea
            className="w-full p-2 rounded bg-slate-700"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.01"
            className="w-full p-2 rounded bg-slate-700"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="text"
            className="w-full p-2 rounded bg-slate-700"
            placeholder="URL de Imagen (e.g., /img/new_product.png)"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <button type="submit" className="px-4 py-2 rounded btn-accent">Agregar Producto</button>
        </form>
      </div>

      {/* Formulario para editar producto (condicional) */}
      {editingProduct && (
        <div className="bg-blue-800 p-4 rounded mb-6">
          <h3 className="text-xl font-semibold mb-3">Editar Producto: {editingProduct.name}</h3>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              className="w-full p-2 rounded bg-blue-700"
              placeholder="Nombre del Producto"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              required
            />
            <textarea
              className="w-full p-2 rounded bg-blue-700"
              placeholder="Descripción"
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              className="w-full p-2 rounded bg-blue-700"
              placeholder="Precio"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              required
            />
            <input
              type="text"
              className="w-full p-2 rounded bg-blue-700"
              placeholder="URL de Imagen (e.g., /img/product_edited.png)"
              value={editingProduct.image}
              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
            />
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 rounded bg-green-600">Guardar Cambios</button>
              <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 rounded bg-red-600">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de productos para administrar */}
      <h3 className="text-xl font-semibold mb-3">Lista de Productos</h3>
      <div className="space-y-3">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="flex items-center justify-between bg-slate-800 p-3 rounded">
              <div className="flex items-center gap-3">
                <img src={product.image || '/placeholder.png'} alt={product.name} className="w-16 h-16 object-cover rounded"/>
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-slate-400">${product.price}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Editar</button>
                <button onClick={() => handleDelete(product.id)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-400">No hay productos disponibles.</div>
        )}
      </div>
    </div>
  )
}