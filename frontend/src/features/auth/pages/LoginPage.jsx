import { Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useFormulario } from '../hooks/useFormulario'
import { useLogin } from '../hooks/useLogin'
import { validarLogin } from '../utils/validaciones'
import '../auth.css'

const CAMPOS = [
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'password', label: 'Contraseña', type: 'password', autoComplete: 'current-password' },
]

const VALORES_INICIALES = { email: '', password: '' }

/**
 * Inicio de sesión. Ruta: /login
 * Simula POST /api/auth/login: con datos válidos muestra el ErrorResponse del mock.
 */
function LoginPage() {
  const { valores, errores, handleChange, handleBlur, handleSubmit } =
    useFormulario(VALORES_INICIALES, validarLogin)
  const { iniciarSesion, enviando, error } = useLogin()

  // Si el backend no detalla campos (credenciales inválidas), se marcan ambos en rojo.
  const erroresServidor = error?.validationErrors ?? {}
  const sinDetalle = Boolean(error) && Object.keys(erroresServidor).length === 0
  const erroresCampos = { ...erroresServidor, ...errores }

  return (
    <main className="auth-pagina">
      <AuthForm
        titulo="Iniciar sesión"
        descripcion="Ingresá con tu email y contraseña."
        campos={CAMPOS}
        valores={valores}
        errores={erroresCampos}
        errorGeneral={error?.message}
        marcarCampos={sinDetalle}
        textoBoton="Ingresar"
        enviando={enviando}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit(iniciarSesion)}
        pie={<>¿No tenés cuenta? <Link to="/registro">Registrate</Link></>}
      />
    </main>
  )
}

export default LoginPage
