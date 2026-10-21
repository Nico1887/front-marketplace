import { useState } from 'react'
import { useProductosVendedor } from '../hooks/useProductosVendedor'
import ProductosResumen from '../components/ProductosResumen'
import ProductosTabla from '../components/ProductosTabla'
import MensajeEstado from '../components/MensajeEstado'
import Modal from '../components/Modal'
import ProductoForm from '../components/ProductoForm'
import GestionImagenes from '../components/GestionImagenes'
import { aValoresFormulario } from '../utils/contrato'
import '../productos.css'

/**
 * Dashboard de publicaciones del vendedor. Ruta: /vendedor
 * Simula POST / PUT / DELETE /api/productos sobre el estado local.
 */
function VendedorProductosPage() {
  const {
    productos,
    categorias,
    cargando,
    error,
    crearProducto,
    editarProducto,
    darDeBaja,
    actualizarStock,
    agregarImagen,
    quitarImagen,
  } = useProductosVendedor()
  const [creando, setCreando] = useState(false)
  const [productoAEditar, setProductoAEditar] = useState(null)
  // Se guarda el id para leer siempre la versión actualizada del producto.
  const [idImagenes, setIdImagenes] = useState(null)
  const productoImagenes = productos.find((p) => p.id === idImagenes)
  const [productoABajar, setProductoABajar] = useState(null)
  const [aviso, setAviso] = useState(null)

  if (cargando) return <MensajeEstado tipo="cargando">Cargando tus publicaciones...</MensajeEstado>
  if (error) return <MensajeEstado tipo="error">{error}</MensajeEstado>

  const guardarNuevo = (request) => {
    crearProducto(request)
    setAviso(`"${request.nombre}" se publicó correctamente.`)
    setCreando(false)
  }

  const guardarEdicion = (request) => {
    editarProducto(productoAEditar.id, request)
    setAviso(`Los cambios en "${request.nombre}" se guardaron.`)
    setProductoAEditar(null)
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
        <ProductosTabla
          productos={productos}
          onEditar={setProductoAEditar}
          onGestionarImagenes={(producto) => setIdImagenes(producto.id)}
          onCambiarStock={(producto, nuevoStock) => actualizarStock(producto.id, nuevoStock)}
          onDarDeBaja={setProductoABajar}
        />
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

      {productoAEditar && (
        <Modal titulo="Editar producto" ancho="grande" onCerrar={() => setProductoAEditar(null)}>
          <p className="vendedor-form__nota">
            Las imágenes se administran desde el botón “Imágenes” del listado.
          </p>
          <ProductoForm
            categorias={categorias}
            valoresIniciales={aValoresFormulario(productoAEditar, categorias)}
            conImagenes={false}
            textoGuardar="Guardar cambios"
            onGuardar={guardarEdicion}
            onCancelar={() => setProductoAEditar(null)}
          />
        </Modal>
      )}

      {productoImagenes && (
        <GestionImagenes
          producto={productoImagenes}
          onAgregar={(url) => agregarImagen(productoImagenes.id, url)}
          onQuitar={(indice) => quitarImagen(productoImagenes.id, indice)}
          onCerrar={() => setIdImagenes(null)}
        />
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
