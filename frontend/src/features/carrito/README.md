# Feature: Carrito y Checkout

Módulo responsable de la gestión de ítems en el carrito de compras y el flujo visual de checkout[cite: 6].

## Componentes a integrar en App.jsx (Router)
Al momento de realizar la integración final, Nicolás debe conectar estas dos páginas en el router principal:
1. `<CarritoPage />` → Conectar a la ruta `/carrito`
2. `<CheckoutPage />` → Conectar a la ruta `/checkout`

## Componentes internos reutilizables
- `CartItem`: Fila de producto con controles para aumentar/disminuir cantidad o eliminar ítem.
- `CartSummary`: Panel lateral con subtotal, total y botón de redirección al checkout.

## Mock de Datos
Los datos se obtienen de `/data/carrito.json` utilizando la estructura DTO `CarritoResponse` requerida por la API.