import React from 'react'
import ProductoCard from './ProductoCard.jsx'
import productosMock from '../../../data/productos.json'

/**
 * Componente que lista los productos del catálogo.
 * Para cada producto renderiza una ProductoCard, pasándole como `children`
 * los condicionales de envío gratis y compra internacional.
 */
function ProductoList({ productos = productosMock, titulo = 'Listado de Productos' }) {
  if (!productos || productos.length === 0) {
    return (
      <section className="catalogo-vacio">
        <h2>No se encontraron productos</h2>
        <p>Probá ajustando los filtros de búsqueda o seleccionando otra categoría.</p>
      </section>
    )
  }

  return (
    <section className="producto-list">
      {titulo && <h2 className="producto-list__titulo">{titulo}</h2>}
      <div className="producto-list__grid">
        {productos.map((producto) => (
          <ProductoCard
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.imagenPortada || producto.imagen}
            stock={producto.stock}
            categoria={producto.categoria || producto.categorias?.[0]}
          >
            {/* Children con condicionales */}
            {producto.envioGratis && (
              <span className="badge badge--envio">Envío gratis</span>
            )}
            {producto.compraInternacional && (
              <span className="badge badge--internacional">
                Compra internacional
              </span>
            )}
            {!producto.envioGratis && !producto.compraInternacional && (
              <span className="badge badge--neutro">Envío estándar</span>
            )}
          </ProductoCard>
        ))}
      </div>
    </section>
  )
}

export default ProductoList

