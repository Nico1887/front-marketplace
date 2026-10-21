import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import carritoInicial from '../data/carrito.json'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [productos, setProductos] = useState(() =>
    carritoInicial.productos.map((producto) => ({ ...producto })),
  )

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
      subtotal,
      total: subtotal,
      actualizarCantidad,
      eliminarProducto,
      vaciarCarrito,
    }),
    [productos, subtotal, actualizarCantidad, eliminarProducto, vaciarCarrito],
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
