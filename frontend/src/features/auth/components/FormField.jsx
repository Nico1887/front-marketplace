import ErrorMessage from './ErrorMessage'

/**
 * Campo de formulario: label + input + mensaje de error.
 *
 * Props:
 *  - name, label, type, value, onChange, onBlur
 *  - error:        string (si hay, el campo se marca en rojo)
 *  - autoComplete: string (opcional)
 *  - placeholder:  string (opcional)
 */
function FormField({ name, label, type = 'text', value, onChange, onBlur, error, autoComplete, placeholder }) {
  const errorId = `${name}-error`

  return (
    <div className={`auth-campo${error ? ' auth-campo--error' : ''}`}>
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
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      <ErrorMessage id={errorId}>{error}</ErrorMessage>
    </div>
  )
}

export default FormField
