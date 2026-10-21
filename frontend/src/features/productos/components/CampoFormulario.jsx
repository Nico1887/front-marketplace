/**
 * Etiqueta + control + mensaje de error/ayuda de un campo del formulario.
 *
 * Props:
 *  - etiqueta: string
 *  - htmlFor:  string (id del control)
 *  - error:    string (opcional)
 *  - ayuda:    string (opcional, se oculta si hay error)
 *  - ancho:    boolean (ocupa toda la fila)
 *  - children: node (input, textarea, etc.)
 */
function CampoFormulario({ etiqueta, htmlFor, error, ayuda, ancho = false, children }) {
  return (
    <div className={`vendedor-campo${ancho ? ' vendedor-campo--ancho' : ''}${error ? ' vendedor-campo--error' : ''}`}>
      <label htmlFor={htmlFor}>{etiqueta}</label>
      {children}
      {error ? (
        <span id={`${htmlFor}-mensaje`} className="vendedor-campo__error">{error}</span>
      ) : (
        ayuda && <span id={`${htmlFor}-mensaje`} className="vendedor-campo__ayuda">{ayuda}</span>
      )}
    </div>
  )
}

export default CampoFormulario
