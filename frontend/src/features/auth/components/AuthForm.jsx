import FormField from './FormField'
import ErrorMessage from './ErrorMessage'

/**
 * Formulario genérico de autenticación (registro y login).
 *
 * Props:
 *  - titulo, descripcion: encabezado de la tarjeta
 *  - campos:       [{ name, label, type, autoComplete, placeholder }]
 *  - valores:      { campo: valor }
 *  - errores:      { campo: mensaje }
 *  - errorGeneral: string (error del formulario completo, por ejemplo credenciales inválidas)
 *  - marcarCampos: boolean (marca todos los campos en rojo, sin mensaje propio)
 *  - exito:        string (mensaje de confirmación)
 *  - textoBoton:   string
 *  - enviando:     boolean
 *  - onChange, onBlur, onSubmit
 *  - pie:          node (links debajo del formulario)
 */
function AuthForm({
  titulo,
  descripcion,
  campos,
  valores,
  errores,
  errorGeneral,
  marcarCampos,
  exito,
  textoBoton,
  enviando,
  onChange,
  onBlur,
  onSubmit,
  pie,
}) {
  return (
    <section className="auth-tarjeta">
      <header className="auth-tarjeta__encabezado">
        <h1>{titulo}</h1>
        {descripcion && <p>{descripcion}</p>}
      </header>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <ErrorMessage>{errorGeneral}</ErrorMessage>
        {exito && <p className="auth-exito" role="status">{exito}</p>}

        {campos.map((campo) => (
          <FormField
            key={campo.name}
            {...campo}
            value={valores[campo.name]}
            error={errores[campo.name]}
            invalido={marcarCampos}
            onChange={onChange}
            onBlur={onBlur}
          />
        ))}

        <button className="auth-boton" type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : textoBoton}
        </button>
      </form>

      {pie && <footer className="auth-tarjeta__pie">{pie}</footer>}
    </section>
  )
}

export default AuthForm
