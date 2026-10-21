import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Tarjeta de categoría para la pantalla Home y navegación del catálogo.
 * Al hacer clic navega a /catalogo filtrando por la categoría seleccionada.
 */
function CategoryCard({ id, nombre, descripcion, icono = '📦', cantidadProductos }) {
  const destino = `/catalogo?categoria=${encodeURIComponent(nombre)}`

  return (
    <Link to={destino} className="category-card" data-category-id={id}>
      <span className="category-card__icono" aria-hidden="true">
        {icono}
      </span>
      <div className="category-card__cuerpo">
        <h3 className="category-card__nombre">{nombre}</h3>
        {descripcion && (
          <p className="category-card__descripcion">{descripcion}</p>
        )}
        {typeof cantidadProductos === 'number' && (
          <span className="category-card__cantidad">
            {cantidadProductos} {cantidadProductos === 1 ? 'producto' : 'productos'}
          </span>
        )}
      </div>
      <span className="category-card__flecha" aria-hidden="true">
        →
      </span>
    </Link>
  )
}

export default CategoryCard
