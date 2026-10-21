import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Componente Buscador de productos.
 * Si recibe `onSearch`, ejecuta ese callback; de lo contrario navega
 * a `/catalogo?nombre=...` con el término ingresado.
 */
function Buscador({
  valorInicial = '',
  placeholder = 'Buscar productos, marcas y más...',
  onSearch,
}) {
  const [termino, setTermino] = useState(valorInicial)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const limpio = termino.trim()

    if (onSearch) {
      onSearch(limpio)
      return
    }

    if (limpio) {
      navigate(`/catalogo?nombre=${encodeURIComponent(limpio)}`)
    } else {
      navigate('/catalogo')
    }
  }

  return (
    <form className="catalogo-buscador" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        className="catalogo-buscador__input"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar productos"
      />
      <button type="submit" className="catalogo-buscador__boton">
        Buscar
      </button>
    </form>
  )
}

export default Buscador
