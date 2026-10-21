import { useState } from 'react'

// Mock de la respuesta de error de POST /api/auth/login (ErrorResponse del backend).
// Al integrar el backend alcanza con cambiar esta URL y hacer POST con las credenciales.
const ERROR_LOGIN_URL = '/data/error-login.json'

/**
 * Simula un intento de login fallido leyendo un ErrorResponse.
 * Devuelve { iniciarSesion, enviando, error } donde `error` es el ErrorResponse
 * ({ message, validationErrors, ... }) o null.
 */
export function useLogin() {
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)

  const iniciarSesion = async () => {
    setEnviando(true)
    setError(null)
    try {
      const res = await fetch(ERROR_LOGIN_URL)
      if (!res.ok) throw new Error(`Error ${res.status} al iniciar sesión`)
      setError(await res.json())
    } catch (err) {
      setError({ message: err.message, validationErrors: {} })
    } finally {
      setEnviando(false)
    }
  }

  return { iniciarSesion, enviando, error }
}
