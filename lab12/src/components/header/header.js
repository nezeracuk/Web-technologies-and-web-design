import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../context/images/logo.jpg';
import './header.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authOperations';
import { clearCart } from '../../redux/cartAction';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="header">
            <img src={logo} alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><Link to="/">Home page</Link></li>
                    <li><Link to="/description">How this happened?</Link></li>
                    <li><Link to="/services">I wanna...</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li>
                        <button className="logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;