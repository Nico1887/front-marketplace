// Conversión entre los DTOs del backend que usa la feature:
// ProductoRequest (lo que envía el formulario) y ProductoResponse (lo que se lista).

/**
 * Arma el ProductoResponse que devolvería el backend al guardar un ProductoRequest.
 * `base` trae los campos que el request no tiene (id, activo, nombreVendedor, imagenes).
 */
export function aProductoResponse(request, categorias, base) {
  const imagenes = request.imagenes ? request.imagenes.map((img) => img.urlImagen) : base.imagenes
  return {
    id: base.id,
    nombre: request.nombre,
    descripcion: request.descripcion,
    precio: request.precio,
    stock: request.stock,
    activo: base.activo,
    nombreVendedor: base.nombreVendedor,
    categorias: categorias
      .filter((c) => request.categoriaIds.includes(c.id))
      .map((c) => c.nombre),
    imagenes,
    // Misma regla que ProductoService.convertirAResponse
    disponibleParaCarrito: request.stock > 0,
  }
}

/**
 * Valores iniciales del formulario a partir de un ProductoResponse.
 * ProductoResponse trae nombres de categorías y el request usa ids.
 */
export function aValoresFormulario(producto, categorias) {
  return {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    // 47999.9 -> "47999,90", igual que el ejemplo del campo
    precio: Number.isInteger(producto.precio)
      ? String(producto.precio)
      : producto.precio.toFixed(2).replace('.', ','),
    stock: String(producto.stock),
    categoriaIds: categorias
      .filter((c) => producto.categorias.includes(c.nombre))
      .map((c) => c.id),
    imagenes: producto.imagenes,
  }
}
