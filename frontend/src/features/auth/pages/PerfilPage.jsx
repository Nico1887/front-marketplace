import ProfileCard from '../components/ProfileCard'
import ErrorMessage from '../components/ErrorMessage'
import { useUsuario } from '../hooks/useUsuario'
import '../auth.css'

/**
 * Perfil del usuario. Ruta: /perfil
 * Simula GET /api/usuarios/{id} leyendo un UsuarioResponse.
 */
function PerfilPage() {
  const { usuario, cargando, error } = useUsuario()

  return (
    <main className="auth-pagina">
      {cargando && <p className="auth-estado" role="status">Cargando perfil...</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {usuario && <ProfileCard usuario={usuario} />}
    </main>
  )
}

export default PerfilPage
