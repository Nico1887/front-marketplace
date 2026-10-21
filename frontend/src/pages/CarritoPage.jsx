import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'

export default function CarritoPage() {
  return (
    <main className="carrito-page">
      <header className="carrito-header">
        <div>
          <p className="carrito-eyebrow">MARKETPLACE UADE</p>
          <h1>Carrito</h1>
          <p className="carrito-intro">Revisá tu selección antes de finalizar la compra.</p>
        </div>
        <span className="carrito-count">3 productos</span>
      </header>

      <div className="carrito-layout">
        <section className="carrito-products" aria-label="Productos en el carrito">
          <CartItem
            imagen="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=320&q=80"
            nombre="Notebook Lenovo ThinkPad X1 Carbon"
            precio="$1.850.000"
            cantidad="1"
            subtotal="$1.850.000"
          />
          <CartItem
            imagen="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=320&q=80"
            nombre="Auriculares Sony WH-1000XM5"
            precio="$389.000"
            cantidad="1"
            subtotal="$389.000"
          />
          <CartItem
            imagen="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=320&q=80"
            nombre="Teclado Mecánico Keychron K2"
            precio="$145.000"
            cantidad="1"
            subtotal="$145.000"
          />
        </section>

        <CartSummary
          cantidadProductos="3 productos"
          subtotal="$2.384.000"
          envio="Gratis"
          total="$2.384.000"
        />
      </div>
    </main>
  )
}
