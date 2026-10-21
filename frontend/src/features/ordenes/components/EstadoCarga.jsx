/**
 * Mensaje para los estados de carga, error o vacío de las pantallas de órdenes.
 *
 * Props:
 *  - tipo:     'cargando' | 'error' | 'vacio'
 *  - children: node (texto o acciones a mostrar)
 */
function EstadoCarga({ tipo, children }) {
  return (
    <div className={`ordenes-estado ordenes-estado--${tipo}`} role={tipo === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  )
}

export default EstadoCarga
