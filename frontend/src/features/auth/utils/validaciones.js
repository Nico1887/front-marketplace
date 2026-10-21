// Límites alineados con el RegistroRequest del backend.
export const LIMITES = {
  username: 50,
  nombre: 80,
  apellido: 80,
  email: 120,
  passwordMin: 8,
  passwordMax: 100,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validarTexto(valor, etiqueta, max) {
  const texto = valor.trim()
  if (!texto) return `${etiqueta} es obligatorio.`
  if (texto.length > max) return `${etiqueta} no puede superar los ${max} caracteres.`
  return ''
}

function validarEmail(valor) {
  const email = valor.trim()
  if (!email) return 'El email es obligatorio.'
  if (email.length > LIMITES.email) return `El email no puede superar los ${LIMITES.email} caracteres.`
  if (!EMAIL_REGEX.test(email)) return 'Ingresá un email válido.'
  return ''
}

function validarPassword(valor) {
  if (!valor) return 'La contraseña es obligatoria.'
  if (valor.length < LIMITES.passwordMin) return `La contraseña debe tener al menos ${LIMITES.passwordMin} caracteres.`
  if (valor.length > LIMITES.passwordMax) return `La contraseña no puede superar los ${LIMITES.passwordMax} caracteres.`
  return ''
}

/**
 * Valida los campos del registro. Devuelve un mapa campo -> mensaje
 * (solo incluye los campos con error), igual que `validationErrors` del backend.
 */
export function validarRegistro(valores) {
  const errores = {
    username: validarTexto(valores.username, 'El nombre de usuario', LIMITES.username),
    nombre: validarTexto(valores.nombre, 'El nombre', LIMITES.nombre),
    apellido: validarTexto(valores.apellido, 'El apellido', LIMITES.apellido),
    email: validarEmail(valores.email),
    password: validarPassword(valores.password),
  }
  return Object.fromEntries(Object.entries(errores).filter(([, mensaje]) => mensaje))
}
