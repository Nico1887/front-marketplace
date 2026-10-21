import { estadoDeProducto } from '../utils/formato'

/**
 * Badge con el estado de la publicación: Activo, Sin stock o Inactivo.
 *
 * Props:
 *  - producto: ProductoResponse
 */
function EstadoProducto({ producto }) {
  const { texto, variante } = estadoDeProducto(producto)
  return <span className={`badge badge--${variante}`}>{texto}</span>
}

export default EstadoProducto
