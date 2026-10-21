import { useEffect, useState } from 'react'

// Mocks en /public/data/ con el contrato exacto de los DTOs de catálogo del backend:
// - GET /api/productos  & GET /api/productos/{id} -> ProductoListadoResponse / ProductoResponse
// - GET /api/categorias                           -> List<CategoriaResponse>
const PRODUCTS_URL = '/data/products.json'
const CATEGORIES_URL = '/data/categories.json'

/**
 * Obtiene el listado de productos y categorías desde /public/data/.
 * Devuelve { productos, categorias, cargando, error }.
 */
export function useCatalogo() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true

    Promise.all([
      fetch(PRODUCTS_URL).then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status} al cargar productos`)
        return res.json()
      }),
      fetch(CATEGORIES_URL).then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status} al cargar categorías`)
        return res.json()
      }),
    ])
      .then(([productosData, categoriasData]) => {
        if (!activo) return
        setProductos(productosData)
        setCategorias(categoriasData)
      })
      .catch((err) => {
        if (activo) setError(err.message)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  return { productos, categorias, cargando, error }
}

/**
 * Obtiene un producto puntual (ProductoResponse) simulando GET /api/productos/{id}.
 */
export function useProducto(id) {
  const { productos, cargando, error } = useCatalogo()
  const producto =
    productos.find((p) => String(p.id) === String(id)) ?? null
  return { producto, productos, cargando, error }
}

