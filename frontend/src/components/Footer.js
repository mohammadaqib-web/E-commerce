import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

// Footer component for the bottom section of the website
function Footer() {
    return (
        <div style={{ backgroundColor: "black",marginTop:"44px" }} >
            <hr style={{ color: "#dc4545", border: "2px solid" }} />

            {/* Footer Content */}
            <div className="row footer g-0 text-center text-light">
                {/* Women Section */}
                <div className="col mt-2 footer-col d-flex flex-column">
                    <h3><Link to="/women" className='text-decoration-none text-danger'>Women</Link></h3>
                    <Link to="/women" className="footer-menu text-decoration-none text-light">Dresses</Link>
                    <Link to="/women" className="footer-menu text-decoration-none text-light">Pants</Link>
                    <Link to="/women" className="footer-menu text-decoration-none text-light">Skirts</Link>
                </div>

                {/* Men Section */}
                <div className="col mt-2 footer-col d-flex flex-column">
                    <h3><Link to="/men" className='text-decoration-none text-danger'>Men</Link></h3>
                    <Link to="/men" className="footer-menu text-decoration-none text-light">Shirts</Link>
                    <Link to="/men" className="footer-menu text-decoration-none text-light">Pants</Link>
                    <Link to="/men" className="footer-menu text-decoration-none text-light">Hoodies</Link>
                </div>

                {/* Kids Section */}
                <div className="col mt-2 footer-col">
                    <h3><Link to="/kids" className='text-decoration-none text-danger'>Kids</Link></h3>
                </div>

                {/* Links Section */}
                <div className="col mt-2 mb-3 footer-col d-flex flex-column">
                    <h3 className='text-danger'>Links</h3>
                    <Link to="/" className="footer-menu text-decoration-none text-light">Home</Link>
                    <Link to="/login" className="footer-menu text-decoration-none text-light">LogIn</Link>
                </div>

                {/* Copyright Section */}
                <hr />
                <h6>
                    Copyright <FontAwesomeIcon icon={faCopyright} className='text-danger' /> E-commerce 2022-2023
                </h6>
            </div>

            {/* Custom Styling */}
            <style>
                {`
                    Link{
                        color:white !important;
                    }
                `}
            </style>
        </div>
    );
}

export default Footer;
