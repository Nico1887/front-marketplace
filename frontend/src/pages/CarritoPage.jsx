import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'
import carrito from '../data/carrito.json'

export default function CarritoPage() {
  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(precio)

  const subtotal = carrito.productos.reduce((acumulado, producto) => acumulado + producto.subtotal, 0)

  return (
    <main className="carrito-page">
      <header className="carrito-header">
        <div>
          <p className="carrito-eyebrow">MARKETPLACE UADE</p>
          <h1>Carrito</h1>
          <p className="carrito-intro">Revisá tu selección antes de finalizar la compra.</p>
        </div>
        <span className="carrito-count">{carrito.productos.length} productos</span>
      </header>

      <div className="carrito-layout">
        <section className="carrito-products" aria-label="Productos en el carrito">
          {carrito.productos.map((producto) => (
            <CartItem
              key={producto.nombre}
              imagen={producto.imagen}
              nombre={producto.nombre}
              precio={formatearPrecio(producto.precio)}
              cantidad={producto.cantidad}
              subtotal={formatearPrecio(producto.subtotal)}
            />
          ))}
        </section>

        <CartSummary
          cantidadProductos={`${carrito.productos.length} productos`}
          subtotal={formatearPrecio(subtotal)}
          envio="Gratis"
          total={formatearPrecio(carrito.total)}
        />
      </div>
    </main>
  )
}
