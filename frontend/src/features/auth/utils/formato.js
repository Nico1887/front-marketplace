const ETIQUETAS_ROL = {
  ROLE_USER: 'Usuario',
  ROLE_ADMIN: 'Administrador',
}

/** 'ROLE_USER' -> 'Usuario'. Si el rol no está mapeado, lo muestra sin el prefijo ROLE_. */
export function formatearRol(rol) {
  return ETIQUETAS_ROL[rol] ?? rol.replace(/^ROLE_/, '')
}

/** Iniciales para el avatar: 'Santiago' + 'Briteez' -> 'SB'. */
export function obtenerIniciales(nombre, apellido) {
  return `${nombre?.[0] ?? ''}${apellido?.[0] ?? ''}`.toUpperCase()
}
