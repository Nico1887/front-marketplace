import { useEffect, useState } from 'react'

// Mock de GET /api/usuarios/{id} (UsuarioResponse). Al integrar el backend
// alcanza con cambiar esta URL: la forma de los datos es la misma.
const USUARIO_URL = '/data/usuario.json'

/**
 * Usuario autenticado (UsuarioResponse).
 * Devuelve { usuario, cargando, error }.
 */
export function useUsuario() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true
    fetch(USUARIO_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status} al cargar el perfil`)
        return res.json()
      })
      .then((data) => activo && setUsuario(data))
      .catch((err) => activo && setError(err.message))
      .finally(() => activo && setCargando(false))
    return () => {
      activo = false
    }
  }, [])

  return { usuario, cargando, error }
}
