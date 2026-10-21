import { Link } from 'react-router-dom'
import { contarItems, formatearFecha, formatearNumeroOrden, formatearPrecio } from '../utils/formato'

/**
 * Listado de órdenes del usuario.
 * OrdenResponse no tiene campo de estado: toda OrdenCompra se crea al
 * confirmar el checkout, así que se muestra siempre "Confirmada".
 *
 * Props:
 *  - ordenes: OrdenResponse[]
 */
function OrdenesTabla({ ordenes }) {
  return (
    <table className="ordenes-tabla">
      <thead>
        <tr>
          <th>Orden</th>
          <th>Fecha</th>
          <th className="ordenes-tabla__num">Ítems</th>
          <th className="ordenes-tabla__num">Total</th>
          <th>Estado</th>
          <th><span className="visualmente-oculto">Acciones</span></th>
        </tr>
      </thead>
      <tbody>
        {ordenes.map((orden) => (
          <tr key={orden.id}>
            <td data-label="Orden"><strong>{formatearNumeroOrden(orden.id)}</strong></td>
            <td data-label="Fecha">{formatearFecha(orden.fecha)}</td>
            <td data-label="Ítems" className="ordenes-tabla__num">{contarItems(orden.detalles)}</td>
            <td data-label="Total" className="ordenes-tabla__num">{formatearPrecio(orden.total)}</td>
            <td data-label="Estado"><span className="badge badge--envio">Confirmada</span></td>
            <td className="ordenes-tabla__accion">
              <Link to={`/ordenes/${orden.id}`}>Ver detalle</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrdenesTabla
