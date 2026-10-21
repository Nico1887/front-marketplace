/**
 * Totales del dashboard: publicaciones, activas, sin stock e inactivas.
 *
 * Props:
 *  - productos: ProductoResponse[]
 */
function ProductosResumen({ productos }) {
  const activos = productos.filter((p) => p.activo)
  const datos = [
    { etiqueta: 'Publicaciones', valor: productos.length },
    { etiqueta: 'Activas', valor: activos.filter((p) => p.stock > 0).length },
    { etiqueta: 'Sin stock', valor: activos.filter((p) => p.stock === 0).length },
    { etiqueta: 'Inactivas', valor: productos.length - activos.length },
  ]

  return (
    <dl className="vendedor-resumen">
      {datos.map(({ etiqueta, valor }) => (
        <div key={etiqueta} className="vendedor-resumen__dato">
          <dt>{etiqueta}</dt>
          <dd>{valor}</dd>
        </div>
      ))}
    </dl>
  )
}

export default ProductosResumen
