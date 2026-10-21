const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
})

const formatoFecha = new Intl.DateTimeFormat('es-AR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatearPrecio = (valor) => formatoPrecio.format(valor)

// `fecha` llega como LocalDateTime de Java serializado: "2026-10-18T16:42:10"
export const formatearFecha = (fecha) => formatoFecha.format(new Date(fecha))

export const formatearNumeroOrden = (id) => `#${String(id).padStart(6, '0')}`

export const contarItems = (detalles) =>
  detalles.reduce((total, detalle) => total + detalle.cantidad, 0)
