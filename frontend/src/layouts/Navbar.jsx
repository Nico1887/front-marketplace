import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="marketplace-nav">
      <Link className="marketplace-nav__brand" to="/">Marketplace UADE</Link>
      <Link className="marketplace-nav__link" to="/catalogo">Catálogo</Link>
      <Link className="marketplace-nav__link" to="/carrito">Carrito</Link>
      <Link className="marketplace-nav__link" to="/vendedor">Mis Productos</Link>
      <div className="marketplace-nav__auth">
        <Link className="marketplace-nav__link" to="/login">Ingresar</Link>
        <Link className="marketplace-nav__register" to="/registro">Registrarse</Link>
      </div>
    </nav>
  );
}