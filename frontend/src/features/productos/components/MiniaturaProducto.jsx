import { useState } from 'react'

// Se muestra cuando el producto no tiene imágenes o la URL no carga.
const SIN_IMAGEN =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="90" viewBox="0 0 120 90">' +
      '<rect width="120" height="90" fill="#f3f4f6"/>' +
      '<text x="60" y="50" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">Sin imagen</text>' +
      '</svg>'
  )

/**
 * Imagen de un producto con respaldo si la URL falla.
 *
 * Props:
 *  - src:       string (URL de la imagen, puede venir vacía)
 *  - alt:       string
 *  - className: string
 */
function MiniaturaProducto({ src, alt, className }) {
  const [fallo, setFallo] = useState(false)
  const url = src && !fallo ? src : SIN_IMAGEN

  return (
    <img
      className={className}
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => setFallo(true)}
    />
  )
}

export default MiniaturaProducto
