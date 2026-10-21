import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import NotFound from './pages/NotFound';
import CarritoPage from './pages/CarritoPage';
import CheckoutPage from './pages/CheckoutPage';
import { HomePage, CatalogoPage } from './features/catalogo';
import { CarritoProvider } from './context/CarritoContext';

// Placeholders temporales hasta que el equipo integre sus features
const Placeholder = ({ title }) => <div style={{ padding: '2rem' }}><h2>{title}</h2><p>Pantalla en desarrollo...</p></div>;

function App() {
  return (
    <Router>
      <CarritoProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />

          <main style={{ flex: 1, padding: '1rem' }}>
            <Routes>
            {/* Rutas de Enzo (Catálogo) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/producto/:id" element={<Placeholder title="Detalle del Producto" />} />

            {/* Rutas de Santiago (Auth / Usuario) */}
            <Route path="/login" element={<Placeholder title="Login" />} />
            <Route path="/registro" element={<Placeholder title="Registro" />} />
            <Route path="/perfil" element={<Placeholder title="Mi Perfil" />} />

            {/* Rutas de Ramiro (Vendedor) */}
            <Route path="/vendedor" element={<Placeholder title="Gestión del Vendedor" />} />

            {/* Rutas de Tobías y Agustín (Carrito, Checkout y Órdenes) */}
            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/ordenes" element={<Placeholder title="Historial de Órdenes" />} />
            <Route path="/ordenes/:id" element={<Placeholder title="Detalle de Orden" />} />

            {/* Manejo de Error 404 */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CarritoProvider>
    </Router>
  );
}

export default App;
