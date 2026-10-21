import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Buscador from '../components/Buscador.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { useCatalogo } from '../hooks/useCatalogo.js'
import '../catalogo.css'

const ICONOS_CATEGORIA = {
  Computación: '💻',
  Celulares: '📱',
  Audio: '🎧',
  Electrodomésticos: '☕',
  Televisores: '📺',
  Periféricos: '⌨️',
}

/**
 * Pantalla de inicio (Home) del Marketplace. Ruta: /
 * Consume /data/products.json y /data/categories.json a través de useCatalogo().
 */
function HomePage() {
  const { productos, categorias, cargando, error } = useCatalogo()

  const categoriasConConteo = useMemo(() => {
    return categorias.map((categoria) => {
      const cantidadProductos = productos.filter(
        (p) =>
          p.activo !== false &&
          Array.isArray(p.categorias) &&
          p.categorias.includes(categoria.nombre),
      ).length

      return {
        ...categoria,
        icono: ICONOS_CATEGORIA[categoria.nombre] || '📦',
        cantidadProductos,
      }
    })
  }, [categorias, productos])

  const productosDestacados = useMemo(() => {
    const activos = productos.filter((p) => p.activo !== false)
    const disponibles = activos.filter((p) => p.disponibleParaCarrito)
    return (disponibles.length > 0 ? disponibles : activos).slice(0, 6)
  }, [productos])

  return (
    <div className="home-page">
      {/* Hero con Buscador */}
      <section className="home-hero">
        <div className="home-hero__contenido">
          <p className="catalogo-eyebrow">MARKETPLACE UADE</p>
          <h1 className="home-hero__titulo">
            Encontrá tecnología, audio y equipamiento en un solo lugar
          </h1>
          <p className="home-hero__subtitulo">
            Buscá productos por nombre o explorá nuestras categorías destacadas con envío a todo el país.
          </p>
          <Buscador placeholder="Buscar notebooks, celulares, auriculares..." />
        </div>
      </section>

      {error && (
        <div className="catalogo-vacio" role="alert">
          <h2>Error al cargar el catálogo</h2>
          <p>{error}</p>
        </div>
      )}

      {/* Sección de Categorías */}
      <section className="home-seccion" aria-labelledby="home-categorias-titulo">
        <div className="home-seccion__encabezado">
          <div>
            <p className="catalogo-eyebrow">EXPLORAR</p>
            <h2 id="home-categorias-titulo" className="home-seccion__titulo">
              Categorías
            </h2>
          </div>
          <Link to="/catalogo" className="home-seccion__link">
            Ver todas →
          </Link>
        </div>

        {cargando ? (
          <div className="catalogo-vacio">
            <p>Cargando categorías...</p>
          </div>
        ) : (
          <div className="category-grid">
            {categoriasConConteo.map((categoria) => (
              <CategoryCard
                key={categoria.id}
                id={categoria.id}
                nombre={categoria.nombre}
                icono={categoria.icono}
                cantidadProductos={categoria.cantidadProductos}
              />
            ))}
          </div>
        )}
      </section>

      {/* Sección de Productos Destacados */}
      <section className="home-seccion" aria-labelledby="home-destacados-titulo">
        <div className="home-seccion__encabezado">
          <div>
            <p className="catalogo-eyebrow">SELECCIÓN DESTACADA</p>
            <h2 id="home-destacados-titulo" className="home-seccion__titulo">
              Productos Destacados
            </h2>
          </div>
          <Link to="/catalogo" className="home-seccion__link">
            Ver catálogo completo →
          </Link>
        </div>

        {cargando ? (
          <div className="catalogo-vacio">
            <p>Cargando productos destacados...</p>
          </div>
        ) : (
          <ProductGrid productos={productosDestacados} />
        )}
      </section>
    </div>
  )
}

export default HomePage
