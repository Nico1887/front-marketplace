import { useEffect, useReducer, useState } from 'react'
import { aProductoResponse } from '../utils/contrato'

// Mocks de la feature. Al integrar el backend se reemplazan por las llamadas
// reales: la forma de los datos es la misma (ProductoResponse / CategoriaResponse).
const PRODUCTOS_URL = '/data/vendedor-productos.json'
const CATEGORIAS_URL = '/data/vendedor-categorias.json'

// Vendedor logueado del mock (usuario jperez de data.sql).
const NOMBRE_VENDEDOR = 'Juan'

function productosReducer(productos, accion) {
  switch (accion.tipo) {
    case 'cargar':
      return accion.productos
    // Simula POST /api/productos: el backend asigna el id y lo deja activo.
    case 'crear': {
      const id = productos.reduce((max, p) => Math.max(max, p.id), 0) + 1
      const base = { id, activo: true, nombreVendedor: NOMBRE_VENDEDOR, imagenes: [] }
      return [...productos, aProductoResponse(accion.request, accion.categorias, base)]
    }
    // Simula PUT /api/productos/{id}: actualiza los datos, no toca imágenes ni estado.
    case 'editar':
      return productos.map((p) =>
        p.id === accion.id ? aProductoResponse(accion.request, accion.categorias, p) : p
      )
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

  const crearProducto = (request) => dispatch({ tipo: 'crear', request, categorias })
  const editarProducto = (id, request) => dispatch({ tipo: 'editar', id, request, categorias })
  const darDeBaja = (id) => dispatch({ tipo: 'darDeBaja', id })

  return { productos, categorias, cargando, error, crearProducto, editarProducto, darDeBaja }
}
