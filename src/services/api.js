// src/services/api.js
export async function getProducts(){
  const source = localStorage.getItem('DATA_SOURCE') || 'local'
  if(source === 'mock'){
    const url = localStorage.getItem('VITE_MOCKAPI_URL') || 'https://68eaf2d176b3362414cc8557.mockapi.io/products'
    const res = await fetch(url)
    if(!res.ok) throw new Error('MockAPI returned bad response')
    return await res.json()
  } else {
    // Si la fuente es local, se cargan los productos del archivo JSON estático.
    const res = await fetch('/dist/demo-products.json')    //  probado también con:   fetch('/src/services/demo-products.json' y en /public)
    if(!res.ok) throw new Error('Failed to load local demo products')
    return await res.json()
  }
}

// Función para agregar un producto (solo funciona con MockAPI para persistencia real)
export async function addProduct(product) {
  const source = localStorage.getItem('DATA_SOURCE') || 'local';
  if (source === 'mock') {
    const url = localStorage.getItem('VITE_MOCKAPI_URL') || 'https://68eaf2d176b3362414cc8557.mockapi.io/products';
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error('Failed to add product to MockAPI');
    return await res.json();
  } else {
    // Para la fuente local, no hay persistencia, solo se simula la operación.
    console.log('Simulating add product for local source:', product);
    return { ...product, id: Date.now().toString() }; // Asigna un ID ficticio
  }
}

// Función para actualizar un producto (solo funciona con MockAPI para persistencia real)
export async function updateProduct(id, product) {
  const source = localStorage.getItem('DATA_SOURCE') || 'local';
  if (source === 'mock') {
    const url = `${localStorage.getItem('VITE_MOCKAPI_URL') || 'https://68eaf2d176b3362414cc8557.mockapi.io/products'}/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error('Failed to update product on MockAPI');
    return await res.json();
  } else {
    // Para la fuente local, no hay persistencia.
    console.log(`Simulating update product for local source: ${id}`, product);
    return { ...product, id };
  }
}

// Función para eliminar un producto (solo funciona con MockAPI para persistencia real)
export async function deleteProduct(id) {
  const source = localStorage.getItem('DATA_SOURCE') || 'local';
  if (source === 'mock') {
    const url = `${localStorage.getItem('VITE_MOCKAPI_URL') || 'https://68eaf2d176b3362414cc8557.mockapi.io/products'}/${id}`;
    const res = await fetch(url, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete product from MockAPI');
    return true; // Devuelve true si la eliminación fue exitosa
  } else {
    // Para la fuente local, no hay persistencia.
    console.log(`Simulating delete product for local source: ${id}`);
    return true;
  }
}