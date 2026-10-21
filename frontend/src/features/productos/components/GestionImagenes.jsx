import Modal from './Modal'
import EditorImagenes from './EditorImagenes'

/**
 * Modal para administrar las imágenes de una publicación existente.
 * Cada cambio se aplica en el momento, como los endpoints de imágenes del backend.
 *
 * Props:
 *  - producto:  ProductoResponse
 *  - onAgregar: (url: string) => void
 *  - onQuitar:  (indice: number) => void
 *  - onCerrar:  () => void
 */
function GestionImagenes({ producto, onAgregar, onQuitar, onCerrar }) {
  return (
    <Modal titulo={`Imágenes de ${producto.nombre}`} ancho="grande" onCerrar={onCerrar}>
      <p className="vendedor-form__nota">Los cambios se guardan al instante.</p>
      <EditorImagenes
        imagenes={producto.imagenes}
        textoDeEjemplo={producto.nombre}
        onAgregar={onAgregar}
        onQuitar={onQuitar}
      />
      <div className="vendedor-modal__acciones">
        <button type="button" className="vendedor-boton vendedor-boton--primario" onClick={onCerrar}>
          Listo
        </button>
      </div>
    </Modal>
  )
}

export default GestionImagenes
