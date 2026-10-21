import { useEffect, useState } from 'react'

// Mock de GET /api/ordenes/usuarios/{usuarioId}. Al integrar el backend
// alcanza con cambiar esta URL: la forma de los datos es la misma.
const ORDENES_URL = '/data/ordenes.json'

/**
 * Historial de órdenes del usuario (List<OrdenResponse>).
 * Devuelve { ordenes, cargando, error }.
 */
export function useOrdenes() {
  const [ordenes, setOrdenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true
    fetch(ORDENES_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status} al cargar las órdenes`)
        return res.json()
      })
      .then((data) => activo && setOrdenes(data))
      .catch((err) => activo && setError(err.message))
      .finally(() => activo && setCargando(false))
    return () => {
      activo = false
    }
  }, [])

  return { ordenes, cargando, error }
}

/**
 * Una orden puntual (OrdenResponse), simula GET /api/ordenes/{ordenId}/usuarios/{usuarioId}.
 * `orden` es null si no existe.
 */
export function useOrden(id) {
  const { ordenes, cargando, error } = useOrdenes()
  const orden = ordenes.find((o) => String(o.id) === String(id)) ?? null
  return { orden, cargando, error }
}
