import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { useFormulario } from '../hooks/useFormulario'
import { validarRegistro } from '../utils/validaciones'
import '../auth.css'

const CAMPOS = [
  { name: 'username', label: 'Nombre de usuario', autoComplete: 'username' },
  { name: 'nombre', label: 'Nombre', autoComplete: 'given-name' },
  { name: 'apellido', label: 'Apellido', autoComplete: 'family-name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'password', label: 'Contraseña', type: 'password', autoComplete: 'new-password' },
]

const VALORES_INICIALES = { username: '', nombre: '', apellido: '', email: '', password: '' }

/**
 * Registro de usuario. Ruta: /registro
 * Simula POST /api/auth/registro: valida en el cliente y confirma en pantalla.
 */
function RegistroPage() {
  const { valores, errores, handleChange, handleBlur, handleSubmit } =
    useFormulario(VALORES_INICIALES, validarRegistro)
  const [registrado, setRegistrado] = useState(false)

  return (
    <main className="auth-pagina">
      <AuthForm
        titulo="Crear cuenta"
        descripcion="Completá tus datos para empezar a comprar y vender."
        campos={CAMPOS}
        valores={valores}
        errores={errores}
        exito={registrado ? 'Cuenta creada. Ya podés iniciar sesión.' : ''}
        textoBoton="Registrarme"
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit(() => setRegistrado(true))}
        pie={<>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></>}
      />
    </main>
  )
}

export default RegistroPage
