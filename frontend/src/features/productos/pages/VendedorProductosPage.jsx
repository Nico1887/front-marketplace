import { useState } from 'react'
import { useProductosVendedor } from '../hooks/useProductosVendedor'
import ProductosResumen from '../components/ProductosResumen'
import ProductosTabla from '../components/ProductosTabla'
import MensajeEstado from '../components/MensajeEstado'
import Modal from '../components/Modal'
import ProductoForm from '../components/ProductoForm'
import '../productos.css'

/**
 * Dashboard de publicaciones del vendedor. Ruta: /vendedor
 * Simula POST / PUT / DELETE /api/productos sobre el estado local.
 */
function VendedorProductosPage() {
  const { productos, categorias, cargando, error, crearProducto, darDeBaja } = useProductosVendedor()
  const [creando, setCreando] = useState(false)
  const [productoABajar, setProductoABajar] = useState(null)
  const [aviso, setAviso] = useState(null)

  if (cargando) return <MensajeEstado tipo="cargando">Cargando tus publicaciones...</MensajeEstado>
  if (error) return <MensajeEstado tipo="error">{error}</MensajeEstado>

  const guardarNuevo = (request) => {
    crearProducto(request)
    setAviso(`"${request.nombre}" se publicó correctamente.`)
    setCreando(false)
  }

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
        <button type="button" className="vendedor-boton vendedor-boton--primario" onClick={() => setCreando(true)}>
          + Publicar producto
        </button>
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

      {creando && (
        <Modal titulo="Publicar producto" ancho="grande" onCerrar={() => setCreando(false)}>
          <ProductoForm
            categorias={categorias}
            textoGuardar="Publicar"
            onGuardar={guardarNuevo}
            onCancelar={() => setCreando(false)}
          />
        </Modal>
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
