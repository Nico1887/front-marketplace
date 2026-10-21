import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import NotFound from './pages/NotFound';
import { CarritoProvider } from './features/carrito/context/CarritoContext';
import { LoginPage, RegistroPage, PerfilPage } from './features/auth';

//Catálogo
import HomePage from './features/catalogo/pages/HomePage';
import CatalogoPage from './features/catalogo/pages/CatalogoPage';
import ProductoDetallePage from './features/catalogo/pages/ProductoDetallePage';

//Gestión Vendedor
import VendedorProductosPage from './features/productos/pages/VendedorProductosPage';

//Carrito y Checkout
import CarritoPage from './features/carrito/pages/CarritoPage';
import CheckoutPage from './features/carrito/pages/CheckoutPage';

//Órdenes
import OrdenesHistorialPage from './features/ordenes/pages/OrdenesHistorialPage';
import OrdenDetallePage from './features/ordenes/pages/OrdenDetallePage';
import OrdenConfirmadaPage from './features/ordenes/pages/OrdenConfirmadaPage';

function App() {
  return (
    <Router>
      <CarritoProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />

          <main style={{ flex: 1, padding: '1rem' }}>
            <Routes>
              {/*Catálogo*/}
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/producto/:id" element={<ProductoDetallePage />} />

              {/*autenticación y usuario */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/perfil" element={<PerfilPage />} />

              {/*Gestión Vendedor*/}
              <Route path="/vendedor" element={<VendedorProductosPage />} />

              {/*Carrito y Checkout*/}
              <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/*Órdenes*/}
              <Route path="/ordenes" element={<OrdenesHistorialPage />} />
              <Route path="/ordenes/:id" element={<OrdenDetallePage />} />
              <Route path="/ordenes/confirmada" element={<OrdenConfirmadaPage />} />

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