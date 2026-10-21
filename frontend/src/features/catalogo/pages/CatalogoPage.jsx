import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CatalogoFiltros from '../components/CatalogoFiltros.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import productosData from '../../../data/productos.json'
import '../catalogo.css'

const FILTROS_INICIALES = {
  nombre: '',
  categoria: '',
  precioMin: '',
  precioMax: '',
}

/**
 * Pantalla principal del catálogo público (/catalogo).
 * Organiza el encabezado del catálogo, el panel de filtros (CatalogoFiltros)
 * y la grilla de resultados (ProductGrid).
 */
function CatalogoPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filtros, setFiltros] = useState(() => ({
    nombre: searchParams.get('nombre') || '',
    categoria: searchParams.get('categoria') || '',
    precioMin: searchParams.get('precioMin') || '',
    precioMax: searchParams.get('precioMax') || '',
  }))

  const categoriasDisponibles = useMemo(() => {
    const unicas = new Set()
    productosData.forEach((producto) => {
      if (producto.categoria) unicas.add(producto.categoria)
      if (Array.isArray(producto.categorias)) {
        producto.categorias.forEach((c) => unicas.add(c))
      }
    })
    return Array.from(unicas).sort((a, b) => a.localeCompare(b, 'es'))
  }, [])

  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => {
      const nuevos = { ...prev, [campo]: valor }
      const params = {}
      Object.entries(nuevos).forEach(([k, v]) => {
        if (v !== '') params[k] = v
      })
      setSearchParams(params, { replace: true })
      return nuevos
    })
  }

  const handleLimpiarFiltros = () => {
    setFiltros(FILTROS_INICIALES)
    setSearchParams({}, { replace: true })
  }

  const productosFiltrados = useMemo(() => {
    const termino = filtros.nombre.trim().toLowerCase()
    const min = filtros.precioMin !== '' ? Number(filtros.precioMin) : null
    const max = filtros.precioMax !== '' ? Number(filtros.precioMax) : null

    return productosData
      .filter((producto) => {
        if (termino && !producto.nombre.toLowerCase().includes(termino)) {
          return false
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
        return true
      })
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }, [filtros])

  return (
    <section className="catalogo-page">
      <header className="catalogo-header">
        <div>
          <p className="catalogo-eyebrow">MARKETPLACE UADE</p>
          <h1>Catálogo de Productos</h1>
          <p className="catalogo-intro">
            Explorá las publicaciones activas y filtrá por nombre, categoría o rango de precio.
          </p>
        </div>
        <span className="catalogo-count">
          {productosFiltrados.length}{' '}
          {productosFiltrados.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </header>

      <div className="catalogo-layout">
        <CatalogoFiltros
          filtros={filtros}
          categorias={categoriasDisponibles}
          onFiltroChange={handleFiltroChange}
          onLimpiarFiltros={handleLimpiarFiltros}
        />

        <div className="catalogo-resultados">
          <ProductGrid productos={productosFiltrados} titulo={null} />
        </div>
      </div>
    </section>
  )
}

export default CatalogoPage
