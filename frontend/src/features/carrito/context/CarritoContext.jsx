import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CarritoContext = createContext(null)
const CARRITO_URL = '/data/carrito.json'

export function CarritoProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true

    fetch(CARRITO_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status} al cargar el carrito`)
        return res.json()
      })
      .then((data) => {
        if (activo) setProductos(data.detalles.map((producto) => ({ ...producto })))
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

  const actualizarCantidad = useCallback((nombre, cantidad) => {
    const cantidadValida = Math.max(1, Math.floor(Number(cantidad) || 1))

    setProductos((actuales) => actuales.map((producto) => (
      producto.nombre === nombre
        ? { ...producto, cantidad: cantidadValida, subtotal: producto.precio * cantidadValida }
        : producto
    )))
  }, [])

  const eliminarProducto = useCallback((nombre) => {
    setProductos((actuales) => actuales.filter((producto) => producto.nombre !== nombre))
  }, [])

  const vaciarCarrito = useCallback(() => {
    setProductos([])
  }, [])

  const subtotal = productos.reduce((suma, producto) => suma + producto.subtotal, 0)
  const value = useMemo(
    () => ({
      productos,
      cargando,
      error,
      subtotal,
      total: subtotal,
      actualizarCantidad,
      eliminarProducto,
      vaciarCarrito,
    }),
    [productos, cargando, error, subtotal, actualizarCantidad, eliminarProducto, vaciarCarrito],
  )

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const carrito = useContext(CarritoContext)

  if (!carrito) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider.')
  }

  return carrito
}
