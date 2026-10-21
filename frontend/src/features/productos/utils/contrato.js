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
