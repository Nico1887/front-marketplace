import { useState } from 'react'

/**
 * Estado de un formulario con validación visual.
 * Un campo muestra su error recién cuando fue tocado (blur) o se intentó enviar.
 *
 * - valoresIniciales: { campo: '' }
 * - validar: (valores) => { campo: 'mensaje' } (vacío si todo está bien)
 * Devuelve { valores, errores, handleChange, handleBlur, handleSubmit }.
 */
export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales)
  const [tocados, setTocados] = useState({})

  const erroresTodos = validar(valores)
  const errores = Object.fromEntries(
    Object.entries(erroresTodos).filter(([campo]) => tocados[campo]),
  )

  const handleChange = (evento) => {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
  }

  const handleBlur = (evento) => {
    const { name } = evento.target
    setTocados((actuales) => ({ ...actuales, [name]: true }))
  }

  // Marca todos los campos como tocados y solo ejecuta onValido si no hay errores.
  const handleSubmit = (onValido) => (evento) => {
    evento.preventDefault()
    setTocados(Object.fromEntries(Object.keys(valores).map((campo) => [campo, true])))
    if (Object.keys(erroresTodos).length === 0) onValido(valores)
  }

  return { valores, errores, handleChange, handleBlur, handleSubmit }
}
