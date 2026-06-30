import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn, userRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SecondHand Clothes
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>

          {isLoggedIn ? (
            <>
              <Link to="/cart" className="navbar-link">Cart</Link>
              <Link to="/orders" className="navbar-link">Orders</Link>
              {userRole === 'SELLER' && (
                <Link to="/seller" className="navbar-link">Sell</Link>
              )}
              <button onClick={handleLogout} className="navbar-btn logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn">Login</Link>
              <Link to="/register" className="navbar-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;