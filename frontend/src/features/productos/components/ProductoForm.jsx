import { useId, useState } from 'react'
import CampoFormulario from './CampoFormulario'
import SelectorCategorias from './SelectorCategorias'
import EditorImagenes from './EditorImagenes'
import { MAX_DESCRIPCION, MAX_NOMBRE, validarProducto } from '../utils/validaciones'

const VALORES_VACIOS = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoriaIds: [],
  imagenes: [],
}

// Acepta "1500,50" además de "1500.50".
const normalizar = (valores) => ({
  ...valores,
  precio: valores.precio.trim().replace(',', '.'),
  stock: valores.stock.trim(),
})

const ORDEN_CAMPOS = ['nombre', 'descripcion', 'precio', 'stock']

/**
 * Formulario de producto. Arma un ProductoRequest y se lo pasa a onGuardar.
 *
 * Props:
 *  - categorias:        CategoriaResponse[]
 *  - valoresIniciales:  { nombre, descripcion, precio, stock, categoriaIds, imagenes } (opcional)
 *  - conImagenes:       boolean, muestra el editor de imágenes (default true)
 *  - textoGuardar:      string
 *  - onGuardar:         (request: ProductoRequest) => void
 *  - onCancelar:        () => void
 */
function ProductoForm({
  categorias,
  valoresIniciales = VALORES_VACIOS,
  conImagenes = true,
  textoGuardar,
  onGuardar,
  onCancelar,
}) {
  const id = useId()
  const [valores, setValores] = useState(valoresIniciales)
  const [intentoGuardar, setIntentoGuardar] = useState(false)

  // Los errores se muestran recién después del primer intento de guardar.
  const errores = intentoGuardar ? validarProducto(normalizar(valores)) : {}

  const cambiar = (campo) => (e) => setValores((v) => ({ ...v, [campo]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault()
    const normalizados = normalizar(valores)
    const encontrados = validarProducto(normalizados)

    if (Object.keys(encontrados).length > 0) {
      setIntentoGuardar(true)
      const primero = ORDEN_CAMPOS.find((campo) => encontrados[campo])
      document.getElementById(`${id}-${primero}`)?.focus()
      return
    }

    const request = {
      nombre: normalizados.nombre.trim(),
      descripcion: normalizados.descripcion.trim(),
      precio: Number(normalizados.precio),
      stock: Number(normalizados.stock),
      categoriaIds: normalizados.categoriaIds,
    }
    if (conImagenes) {
      request.imagenes = normalizados.imagenes.map((urlImagen) => ({ urlImagen }))
    }
    onGuardar(request)
  }

  const propsDeControl = (campo) => ({
    id: `${id}-${campo}`,
    value: valores[campo],
    onChange: cambiar(campo),
    'aria-invalid': Boolean(errores[campo]),
    'aria-describedby': `${id}-${campo}-mensaje`,
  })

  return (
    <form className="vendedor-form" onSubmit={enviar} noValidate>
      <div className="vendedor-form__grilla">
        <CampoFormulario
          etiqueta="Nombre"
          htmlFor={`${id}-nombre`}
          error={errores.nombre}
          ayuda={`${valores.nombre.length}/${MAX_NOMBRE}`}
          ancho
        >
          <input type="text" maxLength={MAX_NOMBRE} {...propsDeControl('nombre')} />
        </CampoFormulario>

        <CampoFormulario
          etiqueta="Descripción"
          htmlFor={`${id}-descripcion`}
          error={errores.descripcion}
          ayuda={`${valores.descripcion.length}/${MAX_DESCRIPCION}`}
          ancho
        >
          <textarea rows={4} maxLength={MAX_DESCRIPCION} {...propsDeControl('descripcion')} />
        </CampoFormulario>

        <CampoFormulario etiqueta="Precio (ARS)" htmlFor={`${id}-precio`} error={errores.precio} ayuda="Ej: 15999,99">
          <input type="text" inputMode="decimal" {...propsDeControl('precio')} />
        </CampoFormulario>

        <CampoFormulario etiqueta="Stock" htmlFor={`${id}-stock`} error={errores.stock} ayuda="Unidades disponibles">
          <input type="text" inputMode="numeric" {...propsDeControl('stock')} />
        </CampoFormulario>
      </div>

      <SelectorCategorias
        categorias={categorias}
        seleccionadas={valores.categoriaIds}
        onChange={(categoriaIds) => setValores((v) => ({ ...v, categoriaIds }))}
      />

      {conImagenes && (
        <fieldset className="vendedor-form__seccion">
          <legend>Imágenes</legend>
          <EditorImagenes
            imagenes={valores.imagenes}
            textoDeEjemplo={valores.nombre.trim()}
            onAgregar={(url) => setValores((v) => ({ ...v, imagenes: [...v.imagenes, url] }))}
            onQuitar={(indice) =>
              setValores((v) => ({ ...v, imagenes: v.imagenes.filter((_, i) => i !== indice) }))
            }
          />
        </fieldset>
      )}

      <div className="vendedor-modal__acciones">
        <button type="button" className="vendedor-boton" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="vendedor-boton vendedor-boton--primario">
          {textoGuardar}
        </button>
      </div>
    </form>
  )
}

export default ProductoForm
