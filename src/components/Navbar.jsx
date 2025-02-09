import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: 'var(--primary-color)', zIndex: '10' }}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">Shortify</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    
                    <ul className="navbar-nav mx-auto text-center">
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${location.pathname === '/generate-qr' ? 'active' : ''}`} to="/generate-qr">QR Code Generator</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${location.pathname === '/analytics' ? 'active' : ''}`} to="/analytics">Analytics</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link px-3 ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact">Contact</Link>
                        </li>
                    </ul>

                    
                    <div className="nav-buttons">
                        <Link to="/" className="btn btn-light me-2 btn-sm rounded">Log in</Link>
                        <Link to="/" className="btn btn-dark btn-sm rounded">Sign up</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;