import React from 'react'

/**
 * Panel lateral de filtros del catálogo.
 * Simula los parámetros de GET /api/productos del backend:
 * nombre, categoriaId / categoria, precioMin, precioMax y filtros visuales.
 */
function CatalogoFiltros({
  filtros,
  categorias = [],
  onFiltroChange,
  onLimpiarFiltros,
  hayFiltrosActivos = false,
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    onFiltroChange(name, type === 'checkbox' ? checked : value)
  }

  return (
    <aside className="catalogo-filtros" aria-label="Filtros de catálogo">
      <div className="catalogo-filtros__header">
        <h2 className="catalogo-filtros__titulo">Filtros</h2>
        {hayFiltrosActivos && (
          <button
            type="button"
            className="catalogo-filtros__limpiar"
            onClick={onLimpiarFiltros}
          >
            Limpiar todo
          </button>
        )}
      </div>

      <div className="catalogo-filtros__grupo">
        <label htmlFor="filtro-nombre" className="catalogo-filtros__label">
          Nombre del producto
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

      <div className="catalogo-filtros__grupo">
        <span className="catalogo-filtros__label">Disponibilidad y envío</span>
        <label className="catalogo-filtros__check">
          <input
            type="checkbox"
            name="soloStock"
            checked={Boolean(filtros.soloStock)}
            onChange={handleChange}
          />
          <span>Solo con stock disponible</span>
        </label>
        <label className="catalogo-filtros__check">
          <input
            type="checkbox"
            name="soloEnvioGratis"
            checked={Boolean(filtros.soloEnvioGratis)}
            onChange={handleChange}
          />
          <span>Envío gratis</span>
        </label>
      </div>
    </aside>
  )
}

export default CatalogoFiltros
