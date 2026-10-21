import { Link, useLocation, useParams } from 'react-router-dom'
import { useOrden } from '../hooks/useOrdenes'
import OrdenResumen from '../components/OrdenResumen'
import DetalleOrdenTabla from '../components/DetalleOrdenTabla'
import EstadoCarga from '../components/EstadoCarga'
import '../ordenes.css'

/**
 * Compra confirmada. Ruta sugerida: /ordenes/:id/confirmada
 *
 * Al integrar el checkout, la pantalla de Tobías puede navegar acá pasando
 * la respuesta de POST /api/carrito/usuarios/{usuarioId}/checkout:
 *   navigate(`/ordenes/${orden.id}/confirmada`, { state: { orden } })
 * Si no llega por state, se busca en el mock por id.
 */
function OrdenConfirmadaPage() {
  const { id } = useParams()
  const ordenRecibida = useLocation().state?.orden
  const busqueda = useOrden(id)
  const orden = ordenRecibida ?? busqueda.orden

  if (!orden && busqueda.cargando) return <EstadoCarga tipo="cargando">Cargando orden...</EstadoCarga>
  if (!orden && busqueda.error) return <EstadoCarga tipo="error">{busqueda.error}</EstadoCarga>
  if (!orden) {
    return (
      <EstadoCarga tipo="vacio">
        <p>No encontramos la orden {id}.</p>
        <Link to="/ordenes">Ver mis órdenes</Link>
      </EstadoCarga>
    )
  }

  return (
    <section className="ordenes-pagina">
      <header className="orden-confirmada__cabecera">
        <span className="orden-confirmada__icono" aria-hidden="true">✓</span>
        <div>
          <h1>¡Compra confirmada!</h1>
          <p>Gracias por tu compra. Te dejamos el resumen de tu orden.</p>
        </div>
      </header>

      <OrdenResumen orden={orden} />

      <h2 className="ordenes-pagina__subtitulo">Detalle de la compra</h2>
      <DetalleOrdenTabla detalles={orden.detalles} total={orden.total} />

      <div className="ordenes-acciones">
        <Link className="ordenes-boton" to="/ordenes">Ver mis órdenes</Link>
        <Link className="ordenes-boton ordenes-boton--secundario" to="/catalogo">Seguir comprando</Link>
      </div>
    </section>
  )
}

export default OrdenConfirmadaPage
