import { useNavigate } from "react-router-dom"

export default function CartSummary({ cantidadProductos, subtotal, envio, total }) {
  const navigate = useNavigate()

  return (
    <aside className="cart-summary" aria-labelledby="cart-summary-title">
      <div className="cart-summary__header">
        <p className="carrito-eyebrow">TU COMPRA</p>
        <h2 id="cart-summary-title">Resumen</h2>
      </div>

      <p className="cart-summary__items">{cantidadProductos} en tu carrito</p>

      <dl className="cart-summary__details">
        <div>
          <dt>Subtotal</dt>
          <dd>{subtotal}</dd>
        </div>
        <div>
          <dt>Envío</dt>
          <dd className="cart-summary__shipping">{envio}</dd>
        </div>
      </dl>

      <div className="cart-summary__total">
        <span>Total</span>
        <strong>{total}</strong>
      </div>

      <button className="cart-summary__button" type="button" onClick={() => navigate('/checkout')}>
        Finalizar compra
        <span aria-hidden="true">→</span>
      </button>

      <p className="cart-summary__note">El costo de envío se confirma al finalizar la compra.</p>
    </aside>
  )
}
