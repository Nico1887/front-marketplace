import React from 'react'
import ProductCard from './ProductCard.jsx'

/**
 * Grilla de productos (ProductGrid).
 * Renderiza una lista de productos utilizando ProductCard con los campos
 * de los DTOs del backend (ProductoListadoResponse / ProductoResponse).
 */
function ProductGrid({ productos = [], titulo = null }) {
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
        {productos.map((producto) => {
          const disponible =
            producto.disponibleParaCarrito ?? (producto.stock > 0)
          const imagen =
            producto.imagenPortada ||
            producto.imagenes?.[0] ||
            producto.imagen

          return (
            <ProductCard
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={imagen}
              stock={producto.stock}
              categoria={producto.categorias?.[0] || producto.categoria}
            >
              {disponible ? (
                <span className="badge badge--envio">Disponible</span>
              ) : (
                <span className="badge badge--neutro">Sin stock</span>
              )}
              {producto.nombreVendedor && (
                <span className="badge badge--neutro">
                  {producto.nombreVendedor}
                </span>
              )}
            </ProductCard>
          )
        })}
      </div>
    </section>
  )
}

export default ProductGrid
