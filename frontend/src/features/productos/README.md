# Feature: Gestión de productos del vendedor (Ramiro)

Alta, edición, baja lógica, imágenes y stock de las publicaciones del vendedor. Rama `feature/front-productos`.

## Pantallas

Todo vive en una sola ruta: los formularios se abren como modales sobre el listado, así el estado
(sin backend todavía) se comparte entre todas las acciones.

| Pantalla / acción | Componente | Endpoint que simula |
|---|---|---|
| Dashboard de publicaciones | `VendedorProductosPage` (ruta `/vendedor`) | — (ver "Pendientes para integrar") |
| Publicar producto | `ProductoForm` en modal | `POST /api/productos` |
| Editar producto | `ProductoForm` en modal (reutilizado) | `PUT /api/productos/{id}` |
| Dar de baja | Modal de confirmación | `DELETE /api/productos/{id}` (baja lógica) |
| Cambiar stock | `ControlStock` en cada fila | `PATCH /api/productos/{id}/stock?cantidad=` |
| Imágenes | `GestionImagenes` | `POST /api/productos/{id}/imagenes` y `DELETE /api/productos/{id}/imagenes/{imagenId}` |

## Componentes

- `ProductosResumen`: totales de publicaciones, activas, sin stock e inactivas.
- `ProductosTabla`: listado con imagen, nombre, categorías, precio, stock, estado y acciones.
- `EstadoProducto`: badge Activo / Sin stock / Inactivo.
- `ControlStock`: sumar, restar o escribir el stock (acepta 0, como el PATCH).
- `ProductoForm`: arma un `ProductoRequest`. Se usa para alta y edición (`valoresIniciales`, `conImagenes`).
- `CampoFormulario`, `SelectorCategorias`: piezas del formulario.
- `EditorImagenes`: agregar por URL o de ejemplo, quitar y ver la portada. Lo usan el alta y `GestionImagenes`.
- `GestionImagenes`: modal de imágenes de un producto existente.
- `Modal`, `MensajeEstado`, `MiniaturaProducto`: utilidades de la feature (modal, carga/error/vacío, imagen con respaldo).
- `hooks/useProductosVendedor.js`: carga los JSON y maneja todas las acciones con un `useReducer`.
- `utils/contrato.js`: conversión `ProductoRequest` ↔ `ProductoResponse`.
- `utils/validaciones.js`: mismas reglas que las anotaciones de `ProductoRequest` / `ImagenRequest`.
- `utils/formato.js`: precio en ARS y estado de la publicación.

Las validaciones replican el backend: nombre obligatorio (máx. 150), descripción obligatoria (máx. 2000),
precio > 0 con hasta 10 enteros y 2 decimales, stock > 0 al guardar el formulario, URL de imagen obligatoria (máx. 500).

Responsive: tabla en desktop y cards apiladas hasta 960px; en mobile (≤ 640px) el formulario va a una
columna y el modal ocupa la pantalla.

## Datos

- `public/data/vendedor-productos.json`: `List<ProductoResponse>` del vendedor logueado (Juan, `jperez` en `data.sql`).
- `public/data/vendedor-categorias.json`: `List<CategoriaResponse>` (las mismas 5 categorías de `data.sql`).

```json
{
  "id": 1,
  "nombre": "Auriculares inalambricos",
  "descripcion": "Bluetooth 5.3, 30 horas de bateria.",
  "precio": 89999.99,
  "stock": 15,
  "activo": true,
  "nombreVendedor": "Juan",
  "categorias": ["Electronica"],
  "imagenes": ["https://placehold.co/600x400?text=Auriculares+1"],
  "disponibleParaCarrito": true
}
```

El formulario envía un `ProductoRequest`:

```json
{
  "nombre": "Mochila urbana 25L",
  "descripcion": "Impermeable, con compartimento para notebook.",
  "precio": 25999.9,
  "stock": 7,
  "categoriaIds": [2, 5],
  "imagenes": [{ "urlImagen": "https://placehold.co/600x400?text=Mochila" }]
}
```

En edición no se envía `imagenes`, porque `ProductoService.modificarProducto` no las modifica.

## Integración (para Nicolás)

En `App.jsx`, reemplazar el placeholder del vendedor:

```jsx
import { VendedorProductosPage } from './features/productos';

<Route path="/vendedor" element={<VendedorProductosPage />} />
```

El link "Mis Productos" del `Navbar` ya apunta a `/vendedor`.

## Pendientes para integrar con el backend

- No hay un endpoint que liste los productos de un vendedor (`GET /api/productos` es el catálogo y devuelve
  `ProductoListadoResponse`). Hace falta uno que devuelva `List<ProductoResponse>` del usuario logueado.
- `ProductoResponse.imagenes` es una lista de URLs sin id, pero `DELETE .../imagenes/{imagenId}` necesita el id.
  Por ahora la imagen se quita por posición.
- No existe un endpoint para reactivar un producto dado de baja, por eso la UI no ofrece esa acción.
- Las operaciones del vendedor requieren el header `X-Usuario-Id` con el id del usuario logueado.
