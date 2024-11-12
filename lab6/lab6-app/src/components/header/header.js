import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../context/images/logo.jpg';

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><Link to="/">Home page</Link></li>
                    <li><Link to="/about">How this happened?</Link></li>
                    <li><Link to="/services">I wanna...</Link></li>
                    <li><Link to="/contact">Write your ideas</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;