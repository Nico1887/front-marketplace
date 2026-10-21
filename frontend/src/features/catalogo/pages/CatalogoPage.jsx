import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Buscador from '../components/Buscador.jsx'
import CatalogoFiltros from '../components/CatalogoFiltros.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import productosData from '../../../data/productos.json'
import categoriasData from '../../../data/categorias.json'
import '../catalogo.css'

const FILTROS_INICIALES = {
  nombre: '',
  categoria: '',
  precioMin: '',
  precioMax: '',
  soloStock: false,
  soloEnvioGratis: false,
}

const OPCIONES_ORDEN = [
  { valor: 'nombre-asc', etiqueta: 'Nombre: A - Z (por defecto)' },
  { valor: 'nombre-desc', etiqueta: 'Nombre: Z - A' },
  { valor: 'precio-asc', etiqueta: 'Precio: menor a mayor' },
  { valor: 'precio-desc', etiqueta: 'Precio: mayor a menor' },
]

const TAMANO_PAGINA = 6

/**
 * Pantalla de resultados del catálogo (/catalogo).
 * Usa estado local y mock data (productos.json y categorias.json) para simular
 * el comportamiento previsto por los endpoints GET /api/productos y GET /api/categorias,
 * incluyendo búsqueda por nombre, filtro por categoría y rango de precios,
 * ordenamiento visual y paginación.
 */
function CatalogoPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filtros, setFiltros] = useState(() => ({
    nombre: searchParams.get('nombre') || '',
    categoria: searchParams.get('categoria') || '',
    precioMin: searchParams.get('precioMin') || '',
    precioMax: searchParams.get('precioMax') || '',
    soloStock: searchParams.get('soloStock') === 'true',
    soloEnvioGratis: searchParams.get('soloEnvioGratis') === 'true',
  }))

  const [orden, setOrden] = useState(
    () => searchParams.get('orden') || 'nombre-asc',
  )
  const [paginaActual, setPaginaActual] = useState(0)

  // Sincroniza estado local si cambian los query params desde navegación externa (ej. Home)
  useEffect(() => {
    setFiltros({
      nombre: searchParams.get('nombre') || '',
      categoria: searchParams.get('categoria') || '',
      precioMin: searchParams.get('precioMin') || '',
      precioMax: searchParams.get('precioMax') || '',
      soloStock: searchParams.get('soloStock') === 'true',
      soloEnvioGratis: searchParams.get('soloEnvioGratis') === 'true',
    })
    setOrden(searchParams.get('orden') || 'nombre-asc')
  }, [searchParams])

  const sincronizarUrl = (nuevosFiltros, nuevoOrden) => {
    const params = {}
    if (nuevosFiltros.nombre) params.nombre = nuevosFiltros.nombre
    if (nuevosFiltros.categoria) params.categoria = nuevosFiltros.categoria
    if (nuevosFiltros.precioMin !== '') params.precioMin = nuevosFiltros.precioMin
    if (nuevosFiltros.precioMax !== '') params.precioMax = nuevosFiltros.precioMax
    if (nuevosFiltros.soloStock) params.soloStock = 'true'
    if (nuevosFiltros.soloEnvioGratis) params.soloEnvioGratis = 'true'
    if (nuevoOrden && nuevoOrden !== 'nombre-asc') params.orden = nuevoOrden
    setSearchParams(params, { replace: true })
  }

  const handleFiltroChange = (campo, valor) => {
    const nuevos = { ...filtros, [campo]: valor }
    setFiltros(nuevos)
    setPaginaActual(0)
    sincronizarUrl(nuevos, orden)
  }

  const handleOrdenChange = (e) => {
    const nuevoOrden = e.target.value
    setOrden(nuevoOrden)
    setPaginaActual(0)
    sincronizarUrl(filtros, nuevoOrden)
  }

  const handleLimpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES)
    setOrden('nombre-asc')
    setPaginaActual(0)
    setSearchParams({}, { replace: true })
  }

  const hayFiltrosActivos = Boolean(
    filtros.nombre ||
      filtros.categoria ||
      filtros.precioMin !== '' ||
      filtros.precioMax !== '' ||
      filtros.soloStock ||
      filtros.soloEnvioGratis,
  )

  // Simulación de filtrado y ordenamiento de GET /api/productos
  const productosFiltradosYOrdenados = useMemo(() => {
    const termino = filtros.nombre.trim().toLowerCase()
    const min = filtros.precioMin !== '' ? Number(filtros.precioMin) : null
    const max = filtros.precioMax !== '' ? Number(filtros.precioMax) : null

    const resultado = productosData.filter((producto) => {
      if (producto.activo === false) return false

      if (termino) {
        const coincideNombre = producto.nombre.toLowerCase().includes(termino)
        const coincideDesc = producto.descripcion
          ?.toLowerCase()
          .includes(termino)
        if (!coincideNombre && !coincideDesc) return false
      }

      if (filtros.categoria) {
        const coincideCategoria =
          producto.categoria === filtros.categoria ||
          (Array.isArray(producto.categorias) &&
            producto.categorias.includes(filtros.categoria))
        if (!coincideCategoria) return false
      }

      if (min !== null && !Number.isNaN(min) && producto.precio < min) {
        return false
      }

      if (max !== null && !Number.isNaN(max) && producto.precio > max) {
        return false
      }

      if (filtros.soloStock && !(producto.stock > 0)) {
        return false
      }

      if (filtros.soloEnvioGratis && !producto.envioGratis) {
        return false
      }

      return true
    })

    return [...resultado].sort((a, b) => {
      switch (orden) {
        case 'nombre-desc':
          return b.nombre.localeCompare(a.nombre, 'es')
        case 'precio-asc':
          return a.precio - b.precio
        case 'precio-desc':
          return b.precio - a.precio
        case 'nombre-asc':
        default:
          return a.nombre.localeCompare(b.nombre, 'es')
      }
    })
  }, [filtros, orden])

  // Simulación de objeto Page<ProductoListadoResponse> del backend
  const totalElements = productosFiltradosYOrdenados.length
  const totalPages = Math.max(1, Math.ceil(totalElements / TAMANO_PAGINA))
  const paginaSegura = Math.min(paginaActual, totalPages - 1)

  const productosPaginados = useMemo(() => {
    const inicio = paginaSegura * TAMANO_PAGINA
    return productosFiltradosYOrdenados.slice(inicio, inicio + TAMANO_PAGINA)
  }, [productosFiltradosYOrdenados, paginaSegura])

  return (
    <section className="catalogo-page">
      <header className="catalogo-header">
        <div>
          <p className="catalogo-eyebrow">MARKETPLACE UADE</p>
          <h1>Catálogo de Productos</h1>
          <p className="catalogo-intro">
            Explorá las publicaciones activas, filtrá por categoría o precio y ordená los resultados.
          </p>
        </div>
        <span className="catalogo-count">
          {totalElements} {totalElements === 1 ? 'resultado' : 'resultados'}
        </span>
      </header>

      <div className="catalogo-layout">
        <CatalogoFiltros
          filtros={filtros}
          categorias={categoriasData}
          onFiltroChange={handleFiltroChange}
          onLimpiarFiltros={handleLimpiarFiltros}
          hayFiltrosActivos={hayFiltrosActivos}
        />

        <div className="catalogo-resultados">
          {/* Barra superior de búsqueda rápida y ordenamiento visual */}
          <div className="catalogo-toolbar">
            <Buscador
              key={filtros.nombre}
              valorInicial={filtros.nombre}
              placeholder="Buscar por nombre o descripción..."
              onSearch={(termino) => handleFiltroChange('nombre', termino)}
            />

            <div className="catalogo-orden">
              <label htmlFor="select-orden" className="catalogo-orden__label">
                Ordenar por:
              </label>
              <select
                id="select-orden"
                value={orden}
                onChange={handleOrdenChange}
                className="catalogo-orden__select"
              >
                {OPCIONES_ORDEN.map((op) => (
                  <option key={op.valor} value={op.valor}>
                    {op.etiqueta}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chips de filtros aplicados */}
          {hayFiltrosActivos && (
            <div className="catalogo-chips" aria-label="Filtros aplicados">
              {filtros.nombre && (
                <button
                  type="button"
                  className="catalogo-chip"
                  onClick={() => handleFiltroChange('nombre', '')}
                >
                  Búsqueda: &ldquo;{filtros.nombre}&rdquo; <span>×</span>
                </button>
              )}
              {filtros.categoria && (
                <button
                  type="button"
                  className="catalogo-chip"
                  onClick={() => handleFiltroChange('categoria', '')}
                >
                  Categoría: {filtros.categoria} <span>×</span>
                </button>
              )}
              {filtros.precioMin !== '' && (
                <button
                  type="button"
                  className="catalogo-chip"
                  onClick={() => handleFiltroChange('precioMin', '')}
                >
                  Desde ${Number(filtros.precioMin).toLocaleString('es-AR')} <span>×</span>
                </button>
              )}
              {filtros.precioMax !== '' && (
                <button
                  type="button"
                  className="catalogo-chip"
                  onClick={() => handleFiltroChange('precioMax', '')}
                >
                  Hasta ${Number(filtros.precioMax).toLocaleString('es-AR')} <span>×</span>
                </button>
              )}
              {filtros.soloStock && (
                <button
                  type="button"
                  className="catalogo-chip"
                  onClick={() => handleFiltroChange('soloStock', false)}
                >
                  Con stock <span>×</span>
                </button>
              )}
              {filtros.soloEnvioGratis && (
                <button
                  type="button"
                  className="catalogo-chip"
                  onClick={() => handleFiltroChange('soloEnvioGratis', false)}
                >
                  Envío gratis <span>×</span>
                </button>
              )}
            </div>
          )}

          <ProductGrid productos={productosPaginados} titulo={null} />

          {/* Paginación simulando Page<ProductoListadoResponse> */}
          {totalElements > TAMANO_PAGINA && (
            <nav
              className="catalogo-paginacion"
              aria-label="Paginación de productos"
            >
              <button
                type="button"
                className="catalogo-paginacion__btn"
                disabled={paginaSegura === 0}
                onClick={() => setPaginaActual((p) => Math.max(0, p - 1))}
              >
                ← Anterior
              </button>
              <span className="catalogo-paginacion__info">
                Página <strong>{paginaSegura + 1}</strong> de{' '}
                <strong>{totalPages}</strong>
              </span>
              <button
                type="button"
                className="catalogo-paginacion__btn"
                disabled={paginaSegura >= totalPages - 1}
                onClick={() =>
                  setPaginaActual((p) => Math.min(totalPages - 1, p + 1))
                }
              >
                Siguiente →
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}

export default CatalogoPage
