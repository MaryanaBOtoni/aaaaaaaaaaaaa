// src/components/Header.jsx
import React from 'react';
import { FaHome, FaSun, FaSignInAlt } from 'react-icons/fa'; // Ícones
import './Header.css'; // Para estilização do cabeçalho
import { Link } from 'react-router-dom'; // Para navegação

function Header() {
    return (
        <header className="app-header">
            <h1>Clima Pessoal</h1> {/* Nome do aplicativo */}
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="nav-link">
                            <FaHome /> Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/weather" className="nav-link">
                            <FaSun /> Clima
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="nav-link">
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
