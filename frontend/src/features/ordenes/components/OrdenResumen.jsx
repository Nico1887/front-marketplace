import { contarItems, formatearFecha, formatearNumeroOrden, formatearPrecio } from '../utils/formato'

/**
 * Datos principales de una orden: número, fecha, cantidad de ítems y total.
 * Se reutiliza en la compra confirmada y en el detalle de orden.
 *
 * Props:
 *  - orden: OrdenResponse
 */
function OrdenResumen({ orden }) {
  return (
    <dl className="orden-resumen">
      <div className="orden-resumen__dato">
        <dt>Número de orden</dt>
        <dd>{formatearNumeroOrden(orden.id)}</dd>
      </div>
      <div className="orden-resumen__dato">
        <dt>Fecha</dt>
        <dd>{formatearFecha(orden.fecha)}</dd>
      </div>
      <div className="orden-resumen__dato">
        <dt>Ítems</dt>
        <dd>{contarItems(orden.detalles)}</dd>
      </div>
      <div className="orden-resumen__dato orden-resumen__dato--total">
        <dt>Total</dt>
        <dd>{formatearPrecio(orden.total)}</dd>
      </div>
    </dl>
  )
}

export default OrdenResumen
