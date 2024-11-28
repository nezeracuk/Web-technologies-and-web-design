import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../footer/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>Email: stankop97@gmail.com</p>
                <p>Phone: +380 95 083 37 97</p>
            </div>
            <div className="footer-bottom">
                <p>&copy; THE SITE WAS DEVELOPED IN DISCORD WITH PAVLO AND VILEN</p>
            </div>
        </footer>
    );
};

export default Footer;