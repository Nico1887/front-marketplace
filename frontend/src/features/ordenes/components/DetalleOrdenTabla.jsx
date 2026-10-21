import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'

/**
 * Ítems de una orden con los precios congelados al momento de la compra.
 * DetalleOrdenResponse solo trae `productoId`, por eso se muestra el id
 * con un link al detalle del producto (pantalla del catálogo).
 *
 * Props:
 *  - detalles: DetalleOrdenResponse[]
 *  - total:    number
 */
function DetalleOrdenTabla({ detalles, total }) {
  return (
    <table className="ordenes-tabla">
      <thead>
        <tr>
          <th>Producto</th>
          <th className="ordenes-tabla__num">Cantidad</th>
          <th className="ordenes-tabla__num">Precio unitario</th>
          <th className="ordenes-tabla__num">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {detalles.map((detalle) => (
          <tr key={detalle.productoId}>
            <td data-label="Producto">
              <Link to={`/producto/${detalle.productoId}`}>Producto #{detalle.productoId}</Link>
            </td>
            <td data-label="Cantidad" className="ordenes-tabla__num">{detalle.cantidad}</td>
            <td data-label="Precio unitario" className="ordenes-tabla__num">
              {formatearPrecio(detalle.precioUnitario)}
            </td>
            <td data-label="Subtotal" className="ordenes-tabla__num">
              {formatearPrecio(detalle.subtotal)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colSpan={3}>Total</th>
          <td className="ordenes-tabla__num">{formatearPrecio(total)}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default DetalleOrdenTabla
