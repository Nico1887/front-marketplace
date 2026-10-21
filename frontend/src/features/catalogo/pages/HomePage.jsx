import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Buscador from '../components/Buscador.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import productosData from '../../../data/productos.json'
import categoriasData from '../../../data/categorias.json'
import '../catalogo.css'

/**
 * Pantalla de inicio (Home) del Marketplace. Ruta: /
 * Muestra el hero con el buscador principal, la grilla de categorías (CategoryCard)
 * y los productos destacados (ProductGrid + ProductCard).
 */
function HomePage() {
  const categoriasConConteo = useMemo(() => {
    return categoriasData.map((categoria) => {
      const cantidadProductos = productosData.filter(
        (p) =>
          p.categoria === categoria.nombre ||
          (Array.isArray(p.categorias) &&
            p.categorias.includes(categoria.nombre)),
      ).length

      return {
        ...categoria,
        cantidadProductos,
      }
    })
  }, [])

  const productosDestacados = useMemo(() => {
    const disponibles = productosData.filter((p) => p.stock > 0)
    return (disponibles.length > 0 ? disponibles : productosData).slice(0, 6)
  }, [])

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

        <div className="category-grid">
          {categoriasConConteo.map((categoria) => (
            <CategoryCard
              key={categoria.id}
              id={categoria.id}
              nombre={categoria.nombre}
              descripcion={categoria.descripcion}
              icono={categoria.icono}
              cantidadProductos={categoria.cantidadProductos}
            />
          ))}
        </div>
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

        <ProductGrid productos={productosDestacados} />
      </section>
    </div>
  )
}

export default HomePage
