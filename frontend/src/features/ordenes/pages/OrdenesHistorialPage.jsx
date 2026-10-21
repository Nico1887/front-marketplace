import { Link } from 'react-router-dom'
import { useOrdenes } from '../hooks/useOrdenes'
import OrdenesTabla from '../components/OrdenesTabla'
import EstadoCarga from '../components/EstadoCarga'
import '../ordenes.css'

/**
 * Historial de órdenes del usuario. Ruta: /ordenes
 * Simula GET /api/ordenes/usuarios/{usuarioId} (ya viene ordenado por fecha desc).
 */
function OrdenesHistorialPage() {
  const { ordenes, cargando, error } = useOrdenes()

  if (cargando) return <EstadoCarga tipo="cargando">Cargando tus órdenes...</EstadoCarga>
  if (error) return <EstadoCarga tipo="error">{error}</EstadoCarga>

  return (
    <section className="ordenes-pagina">
      <h1>Mis órdenes</h1>
      <p className="ordenes-pagina__bajada">
        {ordenes.length} {ordenes.length === 1 ? 'compra realizada' : 'compras realizadas'}
      </p>

      {ordenes.length === 0 ? (
        <EstadoCarga tipo="vacio">
          <p>Todavía no hiciste ninguna compra.</p>
          <Link to="/catalogo">Ir al catálogo</Link>
        </EstadoCarga>
      ) : (
        <OrdenesTabla ordenes={ordenes} />
      )}
    </section>
  )
}

export default OrdenesHistorialPage
