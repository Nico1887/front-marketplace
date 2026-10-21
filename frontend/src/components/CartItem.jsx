export default function CartItem({
  imagen,
  nombre,
  precio,
  cantidad,
  subtotal,
  onCantidadChange,
  onEliminar,
}) {
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
            <div className="cart-item__quantity-control">
              <button
                type="button"
                onClick={() => onCantidadChange(cantidad - 1)}
                disabled={cantidad <= 1}
                aria-label={`Disminuir cantidad de ${nombre}`}
              >
                −
              </button>
              <strong aria-live="polite">{cantidad}</strong>
              <button
                type="button"
                onClick={() => onCantidadChange(cantidad + 1)}
                aria-label={`Aumentar cantidad de ${nombre}`}
              >
                +
              </button>
            </div>
          </div>
          <div className="cart-item__subtotal">
            <span>Subtotal</span>
            <strong>{subtotal}</strong>
          </div>
        </div>
      </div>
      <button
        className="cart-item__remove"
        type="button"
        onClick={onEliminar}
        aria-label={`Eliminar ${nombre} del carrito`}
      >
        Eliminar
      </button>
    </article>
  )
}
