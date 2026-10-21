export default function CartItem({ imagen, nombre, precio, cantidad, subtotal }) {
  return (
    <article className="cart-item">
      <img className="cart-item__image" src={imagen} alt={nombre} />

      <div className="cart-item__content">
        <div className="cart-item__info">
          <h2>{nombre}</h2>
          <p className="cart-item__unit-price">{precio} <span>por unidad</span></p>
        </div>

        <div className="cart-item__footer">
          <div className="cart-item__quantity" aria-label={`Cantidad: ${cantidad}`}>
            <span>Cantidad</span>
            <strong>{cantidad}</strong>
          </div>
          <div className="cart-item__subtotal">
            <span>Subtotal</span>
            <strong>{subtotal}</strong>
          </div>
        </div>
      </div>
    </article>
  )
}
