# Feature: Catálogo Público (Enzo)

Pantalla de inicio (Home), catálogo con búsqueda/filtros/ordenamiento y detalle de producto con galería. Rama `feature/front-catalogo`.

## Pantallas

| Pantalla | Componente | Ruta sugerida | Endpoint que simula |
|---|---|---|---|
| Home / Destacados | `HomePage` | `/` | `GET /api/categorias` y `GET /api/productos` |
| Resultados y Filtros | `CatalogoPage` | `/catalogo` | `GET /api/productos?nombre=&categoriaId=&precioMin=&precioMax=&page=&size=` |
| Detalle del Producto | `ProductoDetallePage` | `/producto/:id` | `GET /api/productos/{id}` |

## Componentes y Hooks

- `CategoryCard`: tarjeta de categoría con ícono, nombre y contador de productos activos. Navega a `/catalogo?categoria=<nombre>`.
- `ProductCard`: tarjeta de producto con imagen de portada, categoría, título, descripción, precio formateado en ARS, stock, badges y link a `/producto/:id`.
- `ProductGrid`: grilla reutilizable de tarjetas `ProductCard` y mensaje de estado vacío cuando no hay coincidencias.
- `Buscador`: barra de búsqueda por texto que actualiza el filtro local en `/catalogo` o navega a `/catalogo?nombre=<termino>` desde el Home.
- `CatalogoFiltros`: panel lateral de filtros (búsqueda por nombre, selector de categoría, rango `precioMin` / `precioMax` y disponibilidad). En desktop se muestra fijo a la izquierda y en mobile (`≤ 860px`) es desplegable/colapsable.
- `ProductoGaleria`: galería interactiva con imagen principal activa y selector de miniaturas.
- `hooks/useCatalogo.js`: provee `useCatalogo()` y `useProducto(id)` leyendo los mocks de `/data/products.json` y `/data/categories.json`.

## Datos (`/public/data/`)

Los archivos estáticos siguen exactamente el contrato de los DTOs de catálogo del backend (`CatalogoController`):

- `public/data/categories.json` (`List<CategoriaResponse>`):

```json
{
  "id": 1,
  "nombre": "Computación"
}
```

- `public/data/products.json` (`ProductoResponse` / `ProductoListadoResponse`):

```json
{
  "id": 1,
  "nombre": "Notebook Lenovo ThinkPad X1 Carbon",
  "descripcion": "Notebook ultradelgada 14\" Intel Core i7, 16GB RAM, 512GB SSD...",
  "precio": 1850000.00,
  "stock": 12,
  "activo": true,
  "nombreVendedor": "TechStore Oficial",
  "categorias": ["Computación"],
  "imagenes": [
    "https://via.placeholder.com/640x440?text=ThinkPad+X1+-+Frente"
  ],
  "imagenPortada": "https://via.placeholder.com/640x440?text=ThinkPad+X1+-+Frente",
  "disponibleParaCarrito": true
}
```

## Integración (Router y Carrito)

### 1. Conexión desde `App.jsx`

Importar las tres páginas desde el punto de entrada `src/features/catalogo/index.js` y montarlas en las rutas de catálogo:

```jsx
import { HomePage, CatalogoPage, ProductoDetallePage } from './features/catalogo';

{/* Rutas de Enzo (Catálogo) */}
<Route path="/" element={<HomePage />} />
<Route path="/catalogo" element={<CatalogoPage />} />
<Route path="/producto/:id" element={<ProductoDetallePage />} />
```

### 2. Conexión con el Carrito (`CarritoContext` - Tobías)

En `ProductoDetallePage.jsx`, el botón **"Agregar al carrito"** actualmente muestra una confirmación visual local con la cantidad seleccionada (`cantidad`) y el producto (`producto`). Durante la integración con el carrito, basta con invocar la acción correspondiente de `useCarrito()` dentro de `handleAgregarVisual`.
