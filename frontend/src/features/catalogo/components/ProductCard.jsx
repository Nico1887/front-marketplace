import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Componente tarjeta de producto (ProductCard).
 * Muestra imagen, categoría, título, descripción, precio y stock del producto,
 * y navega al detalle (/producto/:id) al hacer clic.
 */
function ProductCard({
  id,
  nombre,
  descripcion,
  precio,
  imagen,
  stock,
  categoria,
  children,
}) {
  const formatearPrecio = (valor) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(valor)

  return (
    <article className="producto-card">
      {id ? (
        <Link to={`/producto/${id}`} className="producto-card__link-imagen">
          <img className="producto-card__imagen" src={imagen} alt={nombre} />
        </Link>
      ) : (
        <img className="producto-card__imagen" src={imagen} alt={nombre} />
      )}

      <div className="producto-card__cuerpo">
        {categoria && (
          <span className="producto-card__categoria">{categoria}</span>
        )}

        <h3 className="producto-card__nombre">
          {id ? (
            <Link to={`/producto/${id}`} className="producto-card__link-titulo">
              {nombre}
            </Link>
          ) : (
            nombre
          )}
        </h3>

        {descripcion && (
          <p className="producto-card__descripcion">{descripcion}</p>
        )}

        <p className="producto-card__precio">{formatearPrecio(precio)}</p>

        {typeof stock === 'number' && (
          <p className="producto-card__stock">
            {stock > 0 ? `Stock: ${stock} unidades` : 'Sin stock disponible'}
          </p>
        )}

        {/* children: contenido condicional (envío gratis / compra internacional) */}
        <div className="producto-card__condicionales">{children}</div>

        {id && (
          <Link to={`/producto/${id}`} className="producto-card__ver-detalle">
            Ver detalle →
          </Link>
        )}
      </div>
    </article>
  )
}

export default ProductCard

