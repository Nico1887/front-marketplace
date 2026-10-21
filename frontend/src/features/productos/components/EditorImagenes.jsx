import { useId, useState } from 'react'
import MiniaturaProducto from './MiniaturaProducto'
import { validarUrlImagen } from '../utils/validaciones'

const urlDeEjemplo = (texto, numero) =>
  `https://placehold.co/600x400?text=${encodeURIComponent(`${texto || 'Producto'} ${numero}`).replace(/%20/g, '+')}`

/**
 * Lista de imágenes con vista previa, para agregar (por URL o de ejemplo) y quitar.
 * Solo maneja la interfaz: quien lo usa decide qué hacer con cada cambio.
 *
 * Props:
 *  - imagenes:        string[] (URLs)
 *  - onAgregar:       (url: string) => void
 *  - onQuitar:        (indice: number) => void
 *  - textoDeEjemplo:  string (texto para la imagen de ejemplo, ej. el nombre del producto)
 */
function EditorImagenes({ imagenes, onAgregar, onQuitar, textoDeEjemplo }) {
  const inputId = useId()
  const [url, setUrl] = useState('')
  const [error, setError] = useState(null)

  const agregarUrl = () => {
    const mensaje = validarUrlImagen(url)
    if (mensaje) {
      setError(mensaje)
      return
    }
    onAgregar(url.trim())
    setUrl('')
    setError(null)
  }

  const alPresionarTecla = (e) => {
    // Enter agrega la imagen en lugar de enviar el formulario que lo contiene.
    if (e.key === 'Enter') {
      e.preventDefault()
      agregarUrl()
    }
  }

  return (
    <div className="vendedor-imagenes">
      {imagenes.length === 0 ? (
        <p className="vendedor-imagenes__vacio">Sin imágenes. La primera que agregues será la portada.</p>
      ) : (
        <ul className="vendedor-imagenes__lista">
          {imagenes.map((imagen, indice) => (
            <li key={`${indice}-${imagen}`} className="vendedor-imagenes__item">
              <MiniaturaProducto className="vendedor-imagenes__miniatura" src={imagen} alt={`Imagen ${indice + 1}`} />
              {indice === 0 && <span className="vendedor-imagenes__portada">Portada</span>}
              <button
                type="button"
                className="vendedor-imagenes__quitar"
                onClick={() => onQuitar(indice)}
                aria-label={`Quitar imagen ${indice + 1}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <label htmlFor={inputId} className="vendedor-imagenes__etiqueta">Agregar imagen por URL</label>
      <div className="vendedor-imagenes__agregar">
        <input
          id={inputId}
          type="url"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={alPresionarTecla}
          aria-invalid={Boolean(error)}
        />
        <button type="button" className="vendedor-boton" onClick={agregarUrl}>
          Agregar
        </button>
        <button
          type="button"
          className="vendedor-boton"
          onClick={() => onAgregar(urlDeEjemplo(textoDeEjemplo, imagenes.length + 1))}
        >
          Usar imagen de ejemplo
        </button>
      </div>
      {error && <span className="vendedor-campo__error" role="alert">{error}</span>}
    </div>
  )
}

export default EditorImagenes
