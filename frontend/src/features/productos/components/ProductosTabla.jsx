import EstadoProducto from './EstadoProducto'
import MiniaturaProducto from './MiniaturaProducto'
import ControlStock from './ControlStock'
import { formatearPrecio } from '../utils/formato'

/**
 * Listado de publicaciones del vendedor.
 *
 * Props:
 *  - productos:           ProductoResponse[]
 *  - onEditar:            (producto) => void
 *  - onGestionarImagenes: (producto) => void
 *  - onCambiarStock:      (producto, nuevoStock) => void
 *  - onDarDeBaja:         (producto) => void
 */
function ProductosTabla({ productos, onEditar, onGestionarImagenes, onCambiarStock, onDarDeBaja }) {
  return (
    <table className="vendedor-tabla">
      <thead>
        <tr>
          <th>Producto</th>
          <th className="vendedor-tabla__num">Precio</th>
          <th className="vendedor-tabla__num">Stock</th>
          <th>Estado</th>
          <th><span className="vendedor-oculto">Acciones</span></th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id} className={producto.activo ? undefined : 'vendedor-tabla__fila--inactiva'}>
            <td className="vendedor-tabla__producto">
              <MiniaturaProducto
                className="vendedor-tabla__imagen"
                src={producto.imagenes[0]}
                alt={producto.nombre}
              />
              <div>
                <strong>{producto.nombre}</strong>
                <span className="vendedor-tabla__categorias">
                  {producto.categorias.length > 0 ? producto.categorias.join(' · ') : 'Sin categoría'}
                </span>
              </div>
            </td>
            <td data-label="Precio" className="vendedor-tabla__num">{formatearPrecio(producto.precio)}</td>
            <td data-label="Stock" className="vendedor-tabla__num">
              <ControlStock
                stock={producto.stock}
                etiqueta={producto.nombre}
                onCambiar={(nuevoStock) => onCambiarStock(producto, nuevoStock)}
              />
            </td>
            <td data-label="Estado"><EstadoProducto producto={producto} /></td>
            <td className="vendedor-tabla__acciones">
              <button type="button" className="vendedor-boton" onClick={() => onEditar(producto)}>
                Editar
              </button>
              <button type="button" className="vendedor-boton" onClick={() => onGestionarImagenes(producto)}>
                Imágenes ({producto.imagenes.length})
              </button>
              {producto.activo && (
                <button
                  type="button"
                  className="vendedor-boton vendedor-boton--peligro"
                  onClick={() => onDarDeBaja(producto)}
                >
                  Dar de baja
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductosTabla
