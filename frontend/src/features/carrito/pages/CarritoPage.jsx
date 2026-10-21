import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

export default function CarritoPage() {
  const {
    productos,
    cargando,
    error,
    subtotal,
    total,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito()

  if (cargando) {
    return <main className="carrito-page"><p role="status">Cargando el carrito...</p></main>
  }

  if (error) {
    return <main className="carrito-page"><p role="alert">{error}</p></main>
  }

  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(precio)

  return (
    <main className="carrito-page">
      <header className="carrito-header">
        <div>
          <p className="carrito-eyebrow">MARKETPLACE UADE</p>
          <h1>Carrito</h1>
          <p className="carrito-intro">Revisá tu selección antes de finalizar la compra.</p>
        </div>
        <div className="carrito-header__actions">
          <span className="carrito-count">{productos.length} productos</span>
          {productos.length > 0 && (
            <button className="carrito-clear" type="button" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          )}
        </div>
      </header>

      <div className="carrito-layout">
        <section className="carrito-products" aria-label="Productos en el carrito">
          {productos.length > 0 ? productos.map((producto) => (
            <CartItem
              key={producto.nombre}
              imagen={producto.imagen}
              nombre={producto.nombre}
              precio={formatearPrecio(producto.precio)}
              cantidad={producto.cantidad}
              subtotal={formatearPrecio(producto.subtotal)}
              onCantidadChange={(cantidad) => actualizarCantidad(producto.nombre, cantidad)}
              onEliminar={() => eliminarProducto(producto.nombre)}
            />
          )) : (
            <div className="carrito-empty">
              <h2>Tu carrito está vacío</h2>
              <p>Cuando agregues productos, los vas a encontrar acá.</p>
              <Link to="/catalogo">Volver al catálogo</Link>
            </div>
          )}
        </section>

        {productos.length > 0 && (
          <CartSummary
            cantidadProductos={`${productos.length} productos`}
            subtotal={formatearPrecio(subtotal)}
            envio="Gratis"
            total={formatearPrecio(total)}
          />
        )}
      </div>
    </main>
  )
}
