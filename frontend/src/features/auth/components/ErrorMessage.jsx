/**
 * Mensaje de error de un campo o de un formulario.
 *
 * Props:
 *  - id:       string (opcional, para aria-describedby del input)
 *  - children: node (si está vacío no renderiza nada)
 */
function ErrorMessage({ id, children }) {
  if (!children) return null

  return (
    <p id={id} className="auth-error" role="alert">
      {children}
    </p>
  )
}

export default ErrorMessage
