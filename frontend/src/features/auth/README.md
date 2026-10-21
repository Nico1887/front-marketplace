# Feature: Auth y usuario (Santiago)

Registro, inicio de sesión y perfil del usuario. Rama `feature/front-auth`.

## Pantallas

| Pantalla | Componente | Ruta | Endpoint que simula |
|---|---|---|---|
| Registro | `RegistroPage` | `/registro` | `POST /api/auth/registro` |
| Login | `LoginPage` | `/login` | `POST /api/auth/login` |
| Perfil | `PerfilPage` | `/perfil` | `GET /api/usuarios/{id}` |

## Componentes

- `AuthForm`: tarjeta con título, formulario genérico a partir de una lista de campos, error general, mensaje de éxito y pie con links. Lo usan registro y login.
- `FormField`: label + input + mensaje de error. Se marca en rojo con `error` (mensaje) o `invalido` (sin mensaje).
- `ErrorMessage`: texto de error con `role="alert"`. No renderiza nada si no hay mensaje.
- `ProfileCard`: datos de un `UsuarioResponse` con avatar de iniciales y roles como badges.
- `hooks/useFormulario.js`: valores, errores y submit. El error de un campo aparece al salir del campo o al intentar enviar.
- `hooks/useLogin.js`: simula un login fallido leyendo `/data/error-login.json`.
- `hooks/useUsuario.js`: lee `/data/usuario.json`.
- `utils/validaciones.js`: reglas de registro y login (`LIMITES` con los máximos del backend).
- `utils/formato.js`: etiqueta de rol (`ROLE_USER` → "Usuario") e iniciales.

## Validaciones del registro

| Campo | Regla |
|---|---|
| `username` | obligatorio, hasta 50 caracteres |
| `nombre` | obligatorio, hasta 80 caracteres |
| `apellido` | obligatorio, hasta 80 caracteres |
| `email` | obligatorio, formato válido, hasta 120 caracteres |
| `password` | entre 8 y 100 caracteres |

El login solo exige email con formato válido y contraseña no vacía.

## Datos

Las pantallas leen con `fetch` desde `/data/`. Para integrar el backend solo cambia la URL (constante al inicio de cada hook).

- `public/data/usuario.json`: `UsuarioResponse`.

```json
{
  "id": 1,
  "username": "santiagob",
  "nombre": "Santiago",
  "apellido": "Briteez",
  "email": "santiago@marketplace.com",
  "roles": ["ROLE_USER"]
}
```

- `public/data/error-login.json`: `ErrorResponse`. Si `validationErrors` trae campos, cada mensaje se muestra bajo su campo; si viene vacío (caso de credenciales inválidas), se muestra `message` arriba del formulario y se marcan email y contraseña en rojo.

```json
{
  "timestamp": "2026-10-21T10:15:30",
  "status": 401,
  "error": "Unauthorized",
  "message": "Email o contraseña incorrectos",
  "path": "/api/auth/login",
  "validationErrors": {}
}
```

Por ahora el login con datos válidos siempre muestra este error, y el registro válido muestra un mensaje de confirmación. No hay sesión ni token todavía.

## Integración (para Nicolás)

En `App.jsx`, reemplazar los placeholders de Santiago:

```jsx
import { LoginPage, RegistroPage, PerfilPage } from './features/auth';

<Route path="/login" element={<LoginPage />} />
<Route path="/registro" element={<RegistroPage />} />
<Route path="/perfil" element={<PerfilPage />} />
```

Los estilos están en `auth.css` (se importa desde las páginas y usa las variables de `styles.css`), no hay que tocar estilos globales. Es responsive: las tarjetas pasan a una columna en pantallas de 640px o menos.
