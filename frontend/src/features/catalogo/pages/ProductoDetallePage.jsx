import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductoGaleria from '../components/ProductoGaleria.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { useProducto } from '../hooks/useCatalogo.js'
import '../catalogo.css'

/**
 * Pantalla de detalle de producto (/producto/:id).
 * Consume /data/products.json mediante useProducto(id), simulando GET /api/productos/{id}
 * con el contrato de ProductoResponse.
 */
function ProductoDetallePage() {
  const { id } = useParams()
  const { producto, productos, cargando, error } = useProducto(id)

  const [cantidad, setCantidad] = useState(1)
  const [avisoVisual, setAvisoVisual] = useState('')

  useEffect(() => {
    setCantidad(1)
    setAvisoVisual('')
  }, [id])

  const formatearPrecio = (valor) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(valor)

  const productosRelacionados = useMemo(() => {
    if (!producto) return []
    const catPrincipal = producto.categorias?.[0]
    const mismos = productos.filter(
      (p) =>
        p.id !== producto.id &&
        p.activo !== false &&
        Array.isArray(p.categorias) &&
        p.categorias.includes(catPrincipal),
    )
    if (mismos.length >= 3) return mismos.slice(0, 3)

    const otros = productos.filter(
      (p) =>
        p.id !== producto.id &&
        p.activo !== false &&
        !mismos.some((m) => m.id === p.id),
    )
    return [...mismos, ...otros].slice(0, 3)
  }, [producto, productos])

  if (cargando) {
    return (
      <section className="producto-detalle-page">
        <div className="catalogo-vacio">
          <p>Cargando detalle del producto...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="producto-detalle-page">
        <div className="catalogo-vacio" role="alert">
          <h2>Error al cargar el producto</h2>
          <p>{error}</p>
          <Link to="/catalogo" className="producto-detalle__volver-btn">
            ← Volver al catálogo
          </Link>
        </div>
      </section>
    )
  }

  if (!producto || producto.activo === false) {
    return (
      <section className="producto-detalle-page">
        <div className="catalogo-vacio">
          <h2>Producto no encontrado</h2>
          <p>
            No encontramos la publicación solicitada o ya no se encuentra activa.
          </p>
          <Link to="/catalogo" className="producto-detalle__volver-btn">
            ← Volver al catálogo
          </Link>
        </div>
      </section>
    )
  }

  const categorias =
    Array.isArray(producto.categorias) && producto.categorias.length > 0
      ? producto.categorias
      : ['General']

  const imagenesGaleria =
    Array.isArray(producto.imagenes) && producto.imagenes.length > 0
      ? producto.imagenes
      : [producto.imagenPortada]

  const disponible =
    Boolean(producto.disponibleParaCarrito) && producto.stock > 0

  const handleAgregarVisual = () => {
    if (!disponible) return
    setAvisoVisual(
      `Se seleccionaron ${cantidad} ${
        cantidad === 1 ? 'unidad' : 'unidades'
      } de "${producto.nombre}" (vista previa de acción).`,
    )
  }

  const handleComprarAhoraVisual = () => {
    if (!disponible) return
    setAvisoVisual(
      `Compra rápida iniciada para ${cantidad} ${
        cantidad === 1 ? 'unidad' : 'unidades'
      } de "${producto.nombre}" (vista previa de acción).`,
    )
  }

  return (
    <section className="producto-detalle-page">
      <nav className="producto-detalle__breadcrumb" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo">Catálogo</Link>
        <span>/</span>
        <Link to={`/catalogo?categoria=${encodeURIComponent(categorias[0])}`}>
          {categorias[0]}
        </Link>
        <span>/</span>
        <span aria-current="page">{producto.nombre}</span>
      </nav>

      <div className="producto-detalle__card">
        <ProductoGaleria imagenes={imagenesGaleria} nombre={producto.nombre} />

        <div className="producto-detalle__info">
          <div className="producto-detalle__badges">
            {categorias.map((cat) => (
              <Link
                key={cat}
                to={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                className="producto-detalle__categoria-pill"
              >
                {cat}
              </Link>
            ))}
          </div>

          <h1 className="producto-detalle__titulo">{producto.nombre}</h1>

          {producto.nombreVendedor && (
            <p className="producto-detalle__vendedor">
              Vendido por <strong>{producto.nombreVendedor}</strong> · Publicación #{producto.id}
            </p>
          )}

          <div className="producto-detalle__bloque-precio">
            <p className="producto-detalle__precio">
              {formatearPrecio(producto.precio)}
            </p>
            <p className="producto-detalle__cuotas">
              Mismo precio en 6 cuotas de {formatearPrecio(Math.round(producto.precio / 6))}
            </p>
          </div>

          <div className="producto-detalle__stock-box">
            <span
              className={`producto-detalle__estado-stock ${
                disponible ? 'is-available' : 'is-empty'
              }`}
            >
              {disponible ? '● Disponible para carrito' : '● Sin stock disponible'}
            </span>
            {disponible && (
              <span className="producto-detalle__unidades">
                ({producto.stock} {producto.stock === 1 ? 'disponible' : 'disponibles'})
              </span>
            )}
          </div>

          {disponible && (
            <div className="producto-detalle__cantidad">
              <label htmlFor="detalle-cantidad">Cantidad:</label>
              <div className="producto-detalle__cantidad-controles">
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  disabled={cantidad <= 1}
                  aria-label="Disminuir cantidad"
                >
                  −
                </button>
                <input
                  id="detalle-cantidad"
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    if (!Number.isNaN(val)) {
                      setCantidad(Math.min(producto.stock, Math.max(1, val)))
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setCantidad((c) => Math.min(producto.stock, c + 1))
                  }
                  disabled={cantidad >= producto.stock}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="producto-detalle__acciones">
            <button
              type="button"
              className="producto-detalle__btn producto-detalle__btn--primario"
              disabled={!disponible}
              onClick={handleAgregarVisual}
            >
              {disponible ? 'Agregar al carrito' : 'Sin stock para agregar'}
            </button>

            <button
              type="button"
              className="producto-detalle__btn producto-detalle__btn--secundario"
              disabled={!disponible}
              onClick={handleComprarAhoraVisual}
            >
              Comprar ahora
            </button>
          </div>

          {avisoVisual && (
            <div className="producto-detalle__feedback" role="status">
              <span>✓ {avisoVisual}</span>
            </div>
          )}

          <div className="producto-detalle__descripcion-bloque">
            <h2>Descripción del producto</h2>
            <p>{producto.descripcion}</p>
          </div>

          <dl className="producto-detalle__ficha">
            <div>
              <dt>Vendedor</dt>
              <dd>{producto.nombreVendedor || 'Marketplace UADE'}</dd>
            </div>
            <div>
              <dt>Categorías</dt>
              <dd>{categorias.join(', ')}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>{producto.activo ? 'Activo' : 'Inactivo'}</dd>
            </div>
          </dl>
        </div>
      </div>

      {productosRelacionados.length > 0 && (
        <div className="producto-detalle__relacionados">
          <div className="home-seccion__encabezado">
            <div>
              <p className="catalogo-eyebrow">TAMBIÉN TE PUEDE INTERESAR</p>
              <h2 className="home-seccion__titulo">Productos relacionados</h2>
            </div>
            <Link to="/catalogo" className="home-seccion__link">
              Ver catálogo completo →
            </Link>
          </div>
          <ProductGrid productos={productosRelacionados} />
        </div>
      )}
    </section>
  )
}

export default ProductoDetallePage
