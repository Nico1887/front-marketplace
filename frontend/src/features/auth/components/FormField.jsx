import ErrorMessage from './ErrorMessage'

/**
 * Campo de formulario: label + input + mensaje de error.
 *
 * Props:
 *  - name, label, type, value, onChange, onBlur
 *  - error:        string (mensaje debajo del campo; también lo marca en rojo)
 *  - invalido:     boolean (marca en rojo sin mensaje propio)
 *  - autoComplete: string (opcional)
 *  - placeholder:  string (opcional)
 */
function FormField({ name, label, type = 'text', value, onChange, onBlur, error, invalido, autoComplete, placeholder }) {
  const errorId = `${name}-error`
  const conError = Boolean(error) || Boolean(invalido)

  return (
    <div className={`auth-campo${conError ? ' auth-campo--error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={conError}
        aria-describedby={error ? errorId : undefined}
      />
      <ErrorMessage id={errorId}>{error}</ErrorMessage>
    </div>
  )
}

export default FormField
