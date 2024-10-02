// Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaHome, FaSignInAlt, FaCloudSun, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from '../UserContext';

function Header() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <h1 className="logo">ClimaConnect</h1>
                <nav>
                    <ul className="nav-menu">
                        <li>
                            <Link className="nav-link" to="/home">
                                <FaHome /> Home
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/weather">
                                <FaCloudSun /> Clima
                            </Link>
                        </li>
                        <li>
                            {user ? (
                                <button onClick={handleLogout} className="logout-btn">
                                    <FaSignOutAlt /> Logout
                                </button>
                            ) : (
                                <Link className="nav-link" to="/login">
                                    <FaSignInAlt /> Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
