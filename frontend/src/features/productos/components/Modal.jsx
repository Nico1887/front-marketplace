import { useEffect, useId, useRef } from 'react'

/**
 * Ventana modal de la feature. Se cierra con Escape, con la X o clickeando afuera.
 *
 * Props:
 *  - titulo:   string
 *  - onCerrar: () => void
 *  - ancho:    'chico' | 'grande' (default 'chico')
 *  - children: node
 */
function Modal({ titulo, onCerrar, ancho = 'chico', children }) {
  const tituloId = useId()
  const ventanaRef = useRef(null)
  const onCerrarRef = useRef(onCerrar)
  onCerrarRef.current = onCerrar

  useEffect(() => {
    const alPresionarTecla = (e) => {
      if (e.key === 'Escape') onCerrarRef.current()
    }
    document.addEventListener('keydown', alPresionarTecla)
    // Evita que la página de fondo scrollee mientras el modal está abierto.
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ventanaRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', alPresionarTecla)
      document.body.style.overflow = overflowAnterior
    }
  }, [])

  return (
    <div
      className="vendedor-modal__fondo"
      onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}
    >
      <div
        ref={ventanaRef}
        className={`vendedor-modal vendedor-modal--${ancho}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
      >
        <header className="vendedor-modal__cabecera">
          <h2 id={tituloId}>{titulo}</h2>
          <button type="button" className="vendedor-modal__cerrar" onClick={onCerrar} aria-label="Cerrar">
            ×
          </button>
        </header>
        <div className="vendedor-modal__cuerpo">{children}</div>
      </div>
    </div>
  )
}

export default Modal
