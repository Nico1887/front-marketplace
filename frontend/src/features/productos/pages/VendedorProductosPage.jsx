import { useState } from 'react'
import { useProductosVendedor } from '../hooks/useProductosVendedor'
import ProductosResumen from '../components/ProductosResumen'
import ProductosTabla from '../components/ProductosTabla'
import MensajeEstado from '../components/MensajeEstado'
import Modal from '../components/Modal'
import '../productos.css'

/**
 * Dashboard de publicaciones del vendedor. Ruta: /vendedor
 * Simula POST / PUT / DELETE /api/productos sobre el estado local.
 */
function VendedorProductosPage() {
  const { productos, cargando, error, darDeBaja } = useProductosVendedor()
  const [productoABajar, setProductoABajar] = useState(null)
  const [aviso, setAviso] = useState(null)

  if (cargando) return <MensajeEstado tipo="cargando">Cargando tus publicaciones...</MensajeEstado>
  if (error) return <MensajeEstado tipo="error">{error}</MensajeEstado>

  const confirmarBaja = () => {
    darDeBaja(productoABajar.id)
    setAviso(`"${productoABajar.nombre}" se dio de baja.`)
    setProductoABajar(null)
  }

  return (
    <section className="vendedor-pagina">
      <header className="vendedor-pagina__cabecera">
        <div>
          <h1>Mis publicaciones</h1>
          <p className="vendedor-pagina__bajada">Administrá tus productos, su stock y sus imágenes.</p>
        </div>
      </header>

      {aviso && (
        <p className="vendedor-aviso" role="status">
          {aviso}
          <button type="button" onClick={() => setAviso(null)} aria-label="Cerrar aviso">×</button>
        </p>
      )}

      <ProductosResumen productos={productos} />

      {productos.length === 0 ? (
        <MensajeEstado tipo="vacio">Todavía no publicaste ningún producto.</MensajeEstado>
      ) : (
        <ProductosTabla productos={productos} onDarDeBaja={setProductoABajar} />
      )}

      {productoABajar && (
        <Modal titulo="Dar de baja publicación" onCerrar={() => setProductoABajar(null)}>
          <p>
            ¿Querés dar de baja <strong>{productoABajar.nombre}</strong>? Deja de mostrarse en el
            catálogo, pero las órdenes que ya lo incluyen no se modifican.
          </p>
          <div className="vendedor-modal__acciones">
            <button type="button" className="vendedor-boton" onClick={() => setProductoABajar(null)}>
              Cancelar
            </button>
            <button type="button" className="vendedor-boton vendedor-boton--peligro-lleno" onClick={confirmarBaja}>
              Dar de baja
            </button>
          </div>
        </Modal>
      )}
    </section>
  )
}

export default VendedorProductosPage
