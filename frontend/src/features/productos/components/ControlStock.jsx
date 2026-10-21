import { useEffect, useState } from 'react'

const FORMATO_ENTERO = /^\d+$/

/**
 * Control para sumar, restar o escribir el stock de un producto.
 * Lo escrito se aplica al salir del campo o con Enter; si no es válido vuelve al valor anterior.
 *
 * Props:
 *  - stock:     number
 *  - etiqueta:  string (nombre del producto, para lectores de pantalla)
 *  - onCambiar: (nuevoStock: number) => void
 */
function ControlStock({ stock, etiqueta, onCambiar }) {
  const [borrador, setBorrador] = useState(String(stock))

  useEffect(() => {
    setBorrador(String(stock))
  }, [stock])

  const aplicar = () => {
    const valor = borrador.trim()
    if (FORMATO_ENTERO.test(valor) && Number(valor) !== stock) {
      onCambiar(Number(valor))
    } else {
      setBorrador(String(stock))
    }
  }

  return (
    <div className="vendedor-stock">
      <button
        type="button"
        onClick={() => onCambiar(stock - 1)}
        disabled={stock === 0}
        aria-label={`Restar una unidad de ${etiqueta}`}
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={borrador}
        onChange={(e) => setBorrador(e.target.value)}
        onBlur={aplicar}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
        aria-label={`Stock de ${etiqueta}`}
      />
      <button type="button" onClick={() => onCambiar(stock + 1)} aria-label={`Sumar una unidad de ${etiqueta}`}>
        +
      </button>
    </div>
  )
}

export default ControlStock
