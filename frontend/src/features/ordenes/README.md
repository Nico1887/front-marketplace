# Feature: Órdenes (Agustín)

Compra confirmada, historial de órdenes y detalle de una orden. Rama `feature/front-ordenes`.

## Pantallas

| Pantalla | Componente | Ruta sugerida | Endpoint que simula |
|---|---|---|---|
| Compra confirmada | `OrdenConfirmadaPage` | `/ordenes/:id/confirmada` | `POST /api/carrito/usuarios/{usuarioId}/checkout` |
| Historial | `OrdenesHistorialPage` | `/ordenes` | `GET /api/ordenes/usuarios/{usuarioId}` |
| Detalle de orden | `OrdenDetallePage` | `/ordenes/:id` | `GET /api/ordenes/{ordenId}/usuarios/{usuarioId}` |

## Componentes

- `OrdenResumen`: número, fecha, cantidad de ítems y total. Lo usan la confirmación y el detalle.
- `DetalleOrdenTabla`: ítems con precio unitario congelado, subtotal y total.
- `OrdenesTabla`: listado del historial con link al detalle.
- `EstadoCarga`: mensajes de carga, error y vacío.
- `hooks/useOrdenes.js`: `useOrdenes()` y `useOrden(id)` leen `/data/ordenes.json`.
- `utils/formato.js`: formato de precio (ARS), fecha y número de orden.

Las tablas se ven como tabla en desktop y como cards apiladas en mobile (≤ 640px).

## Datos

`public/data/ordenes.json` es una `List<OrdenResponse>` con la misma forma que el backend:

```json
{
  "id": 1004,
  "fecha": "2026-10-18T16:42:10",
  "total": 1740000.00,
  "detalles": [
    { "productoId": 2, "cantidad": 1, "precioUnitario": 1450000.00, "subtotal": 1450000.00 }
  ]
}
```

`OrdenResponse` no tiene campo de estado ni nombre de producto. Por eso el historial muestra "Confirmada" (toda orden se crea en el checkout) y el detalle muestra `Producto #id` con link a `/producto/:id`.

## Integración (para Nicolás)

En `App.jsx`, reemplazar los placeholders de órdenes:

```jsx
import { OrdenesHistorialPage, OrdenDetallePage, OrdenConfirmadaPage } from './features/ordenes';

<Route path="/ordenes" element={<OrdenesHistorialPage />} />
<Route path="/ordenes/:id" element={<OrdenDetallePage />} />
<Route path="/ordenes/:id/confirmada" element={<OrdenConfirmadaPage />} />
```

Conexión con el checkout (Tobías): al confirmar la compra, navegar con la orden creada.
Si no se pasa `state`, la pantalla busca la orden por id en el mock.

```jsx
navigate(`/ordenes/${orden.id}/confirmada`, { state: { orden } });
```

Falta un link a `/ordenes` en el `Navbar` (por ejemplo "Mis compras").
