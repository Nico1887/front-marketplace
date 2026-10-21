import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useCarrito } from '../context/CarritoContext'

const metodosPago = [
  { id: 'visa', nombre: 'Visa' },
  { id: 'mastercard', nombre: 'Mastercard' },
  { id: 'mercado-pago', nombre: 'Mercado Pago' },
]

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)
}

export default function CheckoutPage() {
  const { productos, total, cargando, error } = useCarrito()
  const [paso, setPaso] = useState(1)
  const [direccion, setDireccion] = useState(null)
  const [metodoPago, setMetodoPago] = useState('visa')
  const [tipoTarjeta, setTipoTarjeta] = useState('credito')

  function continuarAlPago(event) {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)

    setDireccion({
      calle: datos.get('calle'),
      altura: datos.get('altura'),
      piso: datos.get('piso'),
      codigoPostal: datos.get('codigoPostal'),
    })
    setPaso(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (cargando) {
    return <main className="checkout-page"><p role="status">Cargando el carrito...</p></main>
  }

  if (error) {
    return <main className="checkout-page"><p role="alert">{error}</p></main>
  }

  if (productos.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <p className="checkout-eyebrow">CHECKOUT</p>
          <h1>Tu carrito está vacío</h1>
          <p>Agregá algún producto antes de continuar con la compra.</p>
          <Link className="checkout-button" to="/carrito">Volver al carrito</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <div>
          <p className="checkout-eyebrow">MARKETPLACE UADE · FINALIZAR COMPRA</p>
          <h1>Un paso más.</h1>
          <p>Completá tus datos para revisar y confirmar el pedido.</p>
        </div>
        <Link className="checkout-back-link" to="/carrito">← Volver al carrito</Link>
      </header>

      <nav className="checkout-steps" aria-label="Pasos del checkout">
        <div className={`checkout-steps__step${paso === 1 ? ' is-current' : ' is-complete'}`}>
          <span>{paso > 1 ? '✓' : '01'}</span>
          <strong>Entrega</strong>
        </div>
        <span className="checkout-steps__line" aria-hidden="true" />
        <div className={`checkout-steps__step${paso === 2 ? ' is-current' : ''}`}>
          <span>02</span>
          <strong>Pago</strong>
        </div>
      </nav>

      <div className="checkout-layout">
        <section className="checkout-main">
          {paso === 1 ? (
            <form className="checkout-card" onSubmit={continuarAlPago}>
              <div className="checkout-card__heading">
                <span className="checkout-card__number">01</span>
                <div>
                  <h2>¿A dónde lo enviamos?</h2>
                  <p>Ingresá la dirección para la entrega de tu pedido.</p>
                </div>
              </div>

              <div className="checkout-fields">
                <label className="checkout-field checkout-field--wide">
                  Calle
                  <input name="calle" autoComplete="address-line1" placeholder="Ej. Avenida Santa Fe" required />
                </label>
                <label className="checkout-field">
                  Altura
                  <input name="altura" autoComplete="address-line2" inputMode="numeric" placeholder="Ej. 1234" required />
                </label>
                <label className="checkout-field">
                  Piso <span>(opcional)</span>
                  <input name="piso" placeholder="Ej. 4° B" />
                </label>
                <label className="checkout-field checkout-field--wide">
                  Código Postal
                  <input name="codigoPostal" autoComplete="postal-code" inputMode="numeric" placeholder="Ej. C1425" required />
                </label>
              </div>

              <div className="checkout-card__actions">
                <span>Paso 1 de 2</span>
                <button className="checkout-button" type="submit">
                  Continuar al pago <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          ) : (
            <form className="checkout-card" onSubmit={(event) => event.preventDefault()}>
              <div className="checkout-card__heading">
                <span className="checkout-card__number">02</span>
                <div>
                  <h2>¿Cómo querés pagar?</h2>
                  <p>Elegí un medio de pago.</p>
                </div>
              </div>

              <fieldset className="checkout-payment-methods">
                <legend>Medio de pago</legend>
                {metodosPago.map((metodo) => (
                  <label
                    className={`checkout-payment-method${metodoPago === metodo.id ? ' is-selected' : ''}`}
                    key={metodo.id}
                  >
                    <input
                      type="radio"
                      name="metodoPago"
                      value={metodo.id}
                      checked={metodoPago === metodo.id}
                      onChange={() => setMetodoPago(metodo.id)}
                    />
                    <strong>{metodo.nombre}</strong>
                    <span className="checkout-payment-method__check" aria-hidden="true">✓</span>
                  </label>
                ))}
              </fieldset>

              {metodoPago === 'mercado-pago' ? (
                <div className="checkout-mercado-pago-qr">
                  <QRCodeSVG
                    value="https://www.mercadopago.com.ar/"
                    size={184}
                    level="M"
                    includeMargin
                    title="Código QR para abrir Mercado Pago"
                  />
                  <p>Escaneá el código para abrir Mercado Pago.</p>
                </div>
              ) : (
                <>
                  <fieldset className="checkout-card-types">
                    <legend>Tipo de tarjeta</legend>
                    {[
                      { id: 'credito', nombre: 'Crédito' },
                      { id: 'debito', nombre: 'Débito' },
                    ].map((tipo) => (
                      <label
                        className={`checkout-card-type${tipoTarjeta === tipo.id ? ' is-selected' : ''}`}
                        key={tipo.id}
                      >
                        <input
                          type="radio"
                          name="tipoTarjeta"
                          value={tipo.id}
                          checked={tipoTarjeta === tipo.id}
                          onChange={() => setTipoTarjeta(tipo.id)}
                        />
                        <span className="checkout-card-type__radio" aria-hidden="true" />
                        <strong>{tipo.nombre}</strong>
                      </label>
                    ))}
                  </fieldset>

                  <div className="checkout-fields">
                    <label className="checkout-field checkout-field--wide">
                      Nombre del titular
                      <input name="titular" autoComplete="cc-name" placeholder="Como aparece en la tarjeta" required />
                    </label>
                    <label className="checkout-field checkout-field--wide">
                      Número de tarjeta
                      <input
                        name="numeroTarjeta"
                        autoComplete="cc-number"
                        inputMode="numeric"
                        pattern="[0-9]{13,19}"
                        maxLength="19"
                        placeholder="Solo números, sin espacios"
                        title="Ingresá entre 13 y 19 dígitos, sin espacios."
                        required
                      />
                    </label>
                    <label className="checkout-field">
                      Fecha de vencimiento
                      <input
                        name="vencimiento"
                        autoComplete="cc-exp"
                        inputMode="numeric"
                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                        placeholder="MM/AA"
                        title="Usá el formato MM/AA."
                        required
                      />
                    </label>
                    <label className="checkout-field">
                      CVV
                      <input
                        name="cvv"
                        type="password"
                        autoComplete="cc-csc"
                        inputMode="numeric"
                        pattern="[0-9]{3,4}"
                        maxLength="4"
                        placeholder="3 o 4 dígitos"
                        title="Ingresá 3 o 4 dígitos."
                        required
                      />
                    </label>
                    {tipoTarjeta === 'credito' && (
                      <label className="checkout-field checkout-field--wide">
                        Cantidad de cuotas
                        <select name="cuotas" autoComplete="off" defaultValue="1">
                          <option value="1">1 cuota</option>
                          <option value="3">3 cuotas</option>
                          <option value="6">6 cuotas</option>
                          <option value="12">12 cuotas</option>
                        </select>
                      </label>
                    )}
                  </div>
                </>
              )}

              <div className="checkout-card__actions">
                <button className="checkout-button checkout-button--secondary" type="button" onClick={() => setPaso(1)}>
                  ← Volver a entrega
                </button>
                <button className="checkout-button" type="submit">
                  Continuar <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          )}
        </section>

        <aside className="checkout-order" aria-labelledby="checkout-order-title">
          <div className="checkout-order__heading">
            <div>
              <p className="checkout-eyebrow">TU SELECCIÓN</p>
              <h2 id="checkout-order-title">Resumen del pedido</h2>
            </div>
            <span>{productos.length}</span>
          </div>

          <div className="checkout-order__products">
            {productos.map((producto) => (
              <article className="checkout-order__product" key={producto.nombre}>
                <img src={producto.imagen} alt="" />
                <div>
                  <h3>{producto.nombre}</h3>
                  <p>Cantidad: {producto.cantidad}</p>
                </div>
                <strong>{formatearPrecio(producto.subtotal)}</strong>
              </article>
            ))}
          </div>

          {direccion && paso === 2 && (
            <div className="checkout-order__address">
              <span>ENTREGA</span>
              <p>
                {direccion.calle} {direccion.altura}
                {direccion.piso ? `, ${direccion.piso}` : ''}
                <br />CP {direccion.codigoPostal}
              </p>
              <button type="button" onClick={() => setPaso(1)}>Editar dirección</button>
            </div>
          )}

          <div className="checkout-order__total">
            <span>Total</span>
            <strong>{formatearPrecio(total)}</strong>
          </div>
          <p className="checkout-order__shipping">Envío gratis</p>
        </aside>
      </div>
    </main>
  )
}
