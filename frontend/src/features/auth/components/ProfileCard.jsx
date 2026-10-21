import { formatearRol, obtenerIniciales } from '../utils/formato'

/**
 * Tarjeta con los datos del usuario.
 *
 * Props:
 *  - usuario: UsuarioResponse { id, username, nombre, apellido, email, roles }
 */
function ProfileCard({ usuario }) {
  const { username, nombre, apellido, email, roles } = usuario

  return (
    <article className="perfil-tarjeta">
      <header className="perfil-tarjeta__cabecera">
        <span className="perfil-tarjeta__avatar" aria-hidden="true">
          {obtenerIniciales(nombre, apellido)}
        </span>
        <div>
          <h1>{nombre} {apellido}</h1>
          <p>@{username}</p>
        </div>
      </header>

      <dl className="perfil-tarjeta__datos">
        <div>
          <dt>Nombre</dt>
          <dd>{nombre}</dd>
        </div>
        <div>
          <dt>Apellido</dt>
          <dd>{apellido}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{email}</dd>
        </div>
        <div>
          <dt>Roles</dt>
          <dd className="perfil-tarjeta__roles">
            {roles.map((rol) => (
              <span key={rol} className="badge badge--neutro">{formatearRol(rol)}</span>
            ))}
          </dd>
        </div>
      </dl>
    </article>
  )
}

export default ProfileCard
