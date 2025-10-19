
Mi Tienda - Versión v24 (Selector de origen + mensajes)
======================================================

Novedades:
- Al iniciar la app se muestra una pantalla para elegir origen de productos:
  a) MockAPI (config.ini contiene la URL indicada)
  b) Demo local (src/services/demo-products.json)
- Imágenes ilustrativas para los productos incluidas en src/assets/products y public/product*.png
- Mensajes:
  - Al Iniciar Sesión: muestra "Sesión iniciada por: <usuario>"
  - Al Cerrar Sesión: muestra "Se eliminarán del carrito todos los productos seleccionados" y vacía el carrito

Ejecución (Windows):
1. Descomprime
2. rmdir /s /q node_modules
3. del package-lock.json
4. npm cache clean --force
5. npm install --force
6. npm run dev
