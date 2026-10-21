import { Link, useParams } from 'react-router-dom'
import { useOrden } from '../hooks/useOrdenes'
import { formatearNumeroOrden } from '../utils/formato'
import OrdenResumen from '../components/OrdenResumen'
import DetalleOrdenTabla from '../components/DetalleOrdenTabla'
import EstadoCarga from '../components/EstadoCarga'
import '../ordenes.css'

/**
 * Detalle de una orden. Ruta: /ordenes/:id
 * Simula GET /api/ordenes/{ordenId}/usuarios/{usuarioId}.
 * Los precios son los congelados al momento de la compra (precioUnitario).
 */
function OrdenDetallePage() {
  const { id } = useParams()
  const { orden, cargando, error } = useOrden(id)

  if (cargando) return <EstadoCarga tipo="cargando">Cargando orden...</EstadoCarga>
  if (error) return <EstadoCarga tipo="error">{error}</EstadoCarga>
  if (!orden) {
    return (
      <EstadoCarga tipo="vacio">
        <p>No encontramos la orden {id}.</p>
        <Link to="/ordenes">Volver a mis órdenes</Link>
      </EstadoCarga>
    )
  }

  return (
    <section className="ordenes-pagina">
      <Link className="ordenes-volver" to="/ordenes">← Mis órdenes</Link>
      <h1>Orden {formatearNumeroOrden(orden.id)}</h1>

      <OrdenResumen orden={orden} />

      <h2 className="ordenes-pagina__subtitulo">Productos</h2>
      <DetalleOrdenTabla detalles={orden.detalles} total={orden.total} />
      <p className="ordenes-nota">Los precios corresponden al momento de la compra.</p>
    </section>
  )
}

export default OrdenDetallePage
