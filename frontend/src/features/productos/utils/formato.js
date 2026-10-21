const formatoEntero = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const formatoConDecimales = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 2,
})

// $ 145.000 si es entero, $ 25.999,90 si tiene centavos.
export const formatearPrecio = (valor) =>
  (Number.isInteger(valor) ? formatoEntero : formatoConDecimales).format(valor)

/**
 * Estado visible de una publicación a partir de ProductoResponse.
 * Devuelve { texto, variante } para pintar el badge.
 */
export function estadoDeProducto(producto) {
  if (!producto.activo) return { texto: 'Inactivo', variante: 'neutro' }
  if (producto.stock === 0) return { texto: 'Sin stock', variante: 'internacional' }
  return { texto: 'Activo', variante: 'envio' }
}
