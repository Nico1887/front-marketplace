import React from 'react'

/**
 * Panel de filtros del catálogo.
 * Alineado con los parámetros de GET /api/productos del backend:
 * nombre, categoriaId / categoria, precioMin y precioMax.
 */
function CatalogoFiltros({
  filtros,
  categorias = [],
  onFiltroChange,
  onLimpiarFiltros,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onFiltroChange(name, value)
  }

  return (
    <aside className="catalogo-filtros" aria-label="Filtros de catálogo">
      <div className="catalogo-filtros__header">
        <h2 className="catalogo-filtros__titulo">Filtros</h2>
        <button
          type="button"
          className="catalogo-filtros__limpiar"
          onClick={onLimpiarFiltros}
        >
          Limpiar
        </button>
      </div>

      <div className="catalogo-filtros__grupo">
        <label htmlFor="filtro-nombre" className="catalogo-filtros__label">
          Buscar por nombre
        </label>
        <input
          id="filtro-nombre"
          type="search"
          name="nombre"
          value={filtros.nombre}
          onChange={handleChange}
          placeholder="Ej: Notebook, iPhone..."
          className="catalogo-filtros__input"
        />
      </div>

      <div className="catalogo-filtros__grupo">
        <label htmlFor="filtro-categoria" className="catalogo-filtros__label">
          Categoría
        </label>
        <select
          id="filtro-categoria"
          name="categoria"
          value={filtros.categoria}
          onChange={handleChange}
          className="catalogo-filtros__select"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat.id || cat} value={cat.nombre || cat}>
              {cat.nombre || cat}
            </option>
          ))}
        </select>
      </div>

      <div className="catalogo-filtros__grupo">
        <span className="catalogo-filtros__label">Rango de precio (ARS)</span>
        <div className="catalogo-filtros__rango">
          <input
            type="number"
            name="precioMin"
            value={filtros.precioMin}
            onChange={handleChange}
            placeholder="Mínimo"
            min="0"
            className="catalogo-filtros__input"
            aria-label="Precio mínimo"
          />
          <input
            type="number"
            name="precioMax"
            value={filtros.precioMax}
            onChange={handleChange}
            placeholder="Máximo"
            min="0"
            className="catalogo-filtros__input"
            aria-label="Precio máximo"
          />
        </div>
      </div>
    </aside>
  )
}

export default CatalogoFiltros

