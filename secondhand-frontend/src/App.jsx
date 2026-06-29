import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import SellerDashboard from './pages/SellerDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  const SellerRoute = ({ element }) => {
    return isLoggedIn && userRole === 'SELLER' ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userRole={userRole} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
          <Route path="/seller" element={<SellerRoute element={<SellerDashboard />} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;