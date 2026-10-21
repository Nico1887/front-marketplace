import { useEffect, useReducer, useState } from 'react'

// Mocks de la feature. Al integrar el backend se reemplazan por las llamadas
// reales: la forma de los datos es la misma (ProductoResponse / CategoriaResponse).
const PRODUCTOS_URL = '/data/vendedor-productos.json'
const CATEGORIAS_URL = '/data/vendedor-categorias.json'

function productosReducer(productos, accion) {
  switch (accion.tipo) {
    case 'cargar':
      return accion.productos
    // Simula DELETE /api/productos/{id}: baja lógica, el producto queda inactivo.
    case 'darDeBaja':
      return productos.map((p) => (p.id === accion.id ? { ...p, activo: false } : p))
    default:
      throw new Error(`Acción desconocida: ${accion.tipo}`)
  }
}

async function leerJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Error ${res.status} al cargar ${url}`)
  return res.json()
}

/**
 * Publicaciones del vendedor logueado y categorías disponibles.
 * Los cambios se guardan solo en el estado de React (no hay backend todavía).
 */
export function useProductosVendedor() {
  const [productos, dispatch] = useReducer(productosReducer, [])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true
    Promise.all([leerJson(PRODUCTOS_URL), leerJson(CATEGORIAS_URL)])
      .then(([productosData, categoriasData]) => {
        if (!activo) return
        dispatch({ tipo: 'cargar', productos: productosData })
        setCategorias(categoriasData)
      })
      .catch((err) => activo && setError(err.message))
      .finally(() => activo && setCargando(false))
    return () => {
      activo = false
    }
  }, [])

  const darDeBaja = (id) => dispatch({ tipo: 'darDeBaja', id })

  return { productos, categorias, cargando, error, darDeBaja }
}
