import { useNavigate, Link} from "react-router-dom";
import React, {useState} from "react";
import { useAuth } from "./AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout} = useAuth();
  const [showToast, setShowToast] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowToast(true); 
      setTimeout(() => {
        setShowToast(false); 
        navigate('/'); 
      }, 3000);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <header>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/exhibition">Create Exhibition</Link>
          <Link to="/search">Search</Link>
        </div>
        <div className="nav-right">
          <Link to="/account">Account</Link>
          {user && <button onClick={handleLogout}>Logout</button>}
        </div>
      </nav>
      {showToast && (
        <div className="toast-notification">
          You have been logged out successfully!
        </div>
      )}
    </header>
  );
};

export default Header;
