const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
})

export const formatearPrecio = (valor) => formatoPrecio.format(valor)

/**
 * Estado visible de una publicación a partir de ProductoResponse.
 * Devuelve { texto, variante } para pintar el badge.
 */
export function estadoDeProducto(producto) {
  if (!producto.activo) return { texto: 'Inactivo', variante: 'neutro' }
  if (producto.stock === 0) return { texto: 'Sin stock', variante: 'internacional' }
  return { texto: 'Activo', variante: 'envio' }
}
