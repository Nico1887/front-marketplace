import React, { useEffect, useState } from 'react'

/**
 * Galería de imágenes para la vista de detalle de producto (ProductoGaleria).
 * Muestra la imagen principal activa y las miniaturas seleccionables.
 */
function ProductoGaleria({ imagenes = [], nombre = 'Producto' }) {
  const listaImagenes =
    Array.isArray(imagenes) && imagenes.length > 0
      ? imagenes
      : ['https://via.placeholder.com/640x440?text=Sin+Imagen']

  const [indiceActivo, setIndiceActivo] = useState(0)

  useEffect(() => {
    setIndiceActivo(0)
  }, [imagenes])

  const imagenPrincipal = listaImagenes[indiceActivo] || listaImagenes[0]

  return (
    <div className="producto-galeria">
      <div className="producto-galeria__principal">
        <img
          src={imagenPrincipal}
          alt={`${nombre} - imagen ${indiceActivo + 1}`}
          className="producto-galeria__imagen-activa"
        />
      </div>

      {listaImagenes.length > 1 && (
        <div
          className="producto-galeria__miniaturas"
          role="list"
          aria-label="Imágenes del producto"
        >
          {listaImagenes.map((url, idx) => (
            <button
              key={`${url}-${idx}`}
              type="button"
              onClick={() => setIndiceActivo(idx)}
              className={`producto-galeria__miniatura ${
                idx === indiceActivo ? 'is-active' : ''
              }`}
              aria-label={`Ver imagen ${idx + 1} de ${nombre}`}
              aria-pressed={idx === indiceActivo}
            >
              <img src={url} alt={`${nombre} miniatura ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductoGaleria
