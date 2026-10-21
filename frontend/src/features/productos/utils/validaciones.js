// Mismas reglas que las anotaciones de ProductoRequest e ImagenRequest en el backend.

export const MAX_NOMBRE = 150
export const MAX_DESCRIPCION = 2000
export const MAX_URL_IMAGEN = 500

// @Digits(integer = 10, fraction = 2)
const FORMATO_PRECIO = /^\d{1,10}(\.\d{1,2})?$/
const FORMATO_ENTERO = /^\d+$/

/**
 * Valida los valores del formulario de producto.
 * Devuelve un objeto { campo: mensaje } vacío si todo está bien.
 */
export function validarProducto({ nombre, descripcion, precio, stock }) {
  const errores = {}

  if (!nombre.trim()) errores.nombre = 'El nombre es obligatorio.'
  else if (nombre.trim().length > MAX_NOMBRE) errores.nombre = `Máximo ${MAX_NOMBRE} caracteres.`

  if (!descripcion.trim()) errores.descripcion = 'La descripción es obligatoria.'
  else if (descripcion.trim().length > MAX_DESCRIPCION)
    errores.descripcion = `Máximo ${MAX_DESCRIPCION} caracteres.`

  if (precio === '') errores.precio = 'El precio es obligatorio.'
  else if (!FORMATO_PRECIO.test(precio)) errores.precio = 'Hasta 10 dígitos enteros y 2 decimales.'
  else if (Number(precio) <= 0) errores.precio = 'El precio debe ser mayor a 0.'

  if (stock === '') errores.stock = 'El stock es obligatorio.'
  else if (!FORMATO_ENTERO.test(stock)) errores.stock = 'Ingresá un número entero.'
  else if (Number(stock) <= 0) errores.stock = 'El stock debe ser mayor a 0.'

  return errores
}

/** Valida una URL de imagen (ImagenRequest.urlImagen). Devuelve el mensaje de error o null. */
export function validarUrlImagen(url) {
  const valor = url.trim()
  if (!valor) return 'Ingresá la URL de la imagen.'
  if (valor.length > MAX_URL_IMAGEN) return `Máximo ${MAX_URL_IMAGEN} caracteres.`
  try {
    const { protocol } = new URL(valor)
    if (protocol !== 'http:' && protocol !== 'https:') return 'La URL debe empezar con http:// o https://'
  } catch {
    return 'La URL no es válida.'
  }
  return null
}
