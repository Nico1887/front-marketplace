/**
 * Selección múltiple de categorías (ProductoRequest.categoriaIds).
 *
 * Props:
 *  - categorias:   CategoriaResponse[]
 *  - seleccionadas: number[] (ids)
 *  - onChange:     (ids: number[]) => void
 */
function SelectorCategorias({ categorias, seleccionadas, onChange }) {
  const alternar = (id) => {
    onChange(
      seleccionadas.includes(id) ? seleccionadas.filter((s) => s !== id) : [...seleccionadas, id]
    )
  }

  return (
    <fieldset className="vendedor-categorias">
      <legend>Categorías</legend>
      <div className="vendedor-categorias__opciones">
        {categorias.map((categoria) => {
          const marcada = seleccionadas.includes(categoria.id)
          return (
            <label
              key={categoria.id}
              className={`vendedor-categorias__opcion${marcada ? ' vendedor-categorias__opcion--marcada' : ''}`}
            >
              <input type="checkbox" checked={marcada} onChange={() => alternar(categoria.id)} />
              {categoria.nombre}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default SelectorCategorias
