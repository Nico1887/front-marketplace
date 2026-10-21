/**
 * Mensaje para los estados de carga, error o vacío de la gestión de productos.
 *
 * Props:
 *  - tipo:     'cargando' | 'error' | 'vacio'
 *  - children: node
 */
function MensajeEstado({ tipo, children }) {
  return (
    <div className={`vendedor-estado vendedor-estado--${tipo}`} role={tipo === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  )
}

export default MensajeEstado
