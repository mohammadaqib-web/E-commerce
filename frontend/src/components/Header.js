import React, { useState } from 'react';
import logo from '../images/graylogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'

// Header component
const Header = () => {

    const checkAdmin = JSON.parse(localStorage.getItem("user"));

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("You are Logged Out!");
    }

    const [searchProduct,setSearchProduct] = useState();
    const navigate = useNavigate()

    const search = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PRODUCT}/getProductbyName/${searchProduct}`);
    
            if (response.data.findProduct.length > 0) {
                toast.success("Products Found!");
                navigate(`/search/${searchProduct}`);
            } else {
                toast.error("Product not found!");
            }
        } catch (error) {
            toast.error("Product not found!");
        }
    }
    

    return (
        <div>
            {/* Top Header Section */}
            <div className='pb-3 container-fluid' style={{ backgroundColor: "black" }}>
                <div className='row container-fluid'>
                    {/* Logo */}
                    <div className='col-md-4 mt-3'>
                        <img src={logo} alt='logo' height="35px" width="200px" />
                    </div>
                    {/* Search Bar */}
                    <div className='col-md-4 mt-3'>
                        <form className="d-flex" role="search" onSubmit={search}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchProduct} onChange={(e)=>setSearchProduct(e.target.value)}/>
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                    {/* Login and Cart */}
                    <div className='col-md-4 mt-3 d-flex justify-content-end login-cart'>

                        <Link to='/cart'><FontAwesomeIcon className='cart me-3 mt-1 fs-3 text-danger' icon={faCartShopping} /></Link>


                        {checkAdmin ?
                            <div className="dropdown">
                                <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser} className='fs-4 text-danger' />
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to='/myprofile'>Profile</Link></li>
                                    <li><Link className="dropdown-item" to='/myorders'>My Orders</Link></li>
                                    {checkAdmin.isAdmin===true?<li><Link className="dropdown-item" to='/admindashboard'>Admin Dashboard</Link></li>:""}
                                    <li><Link className="dropdown-item" onClick={() => Logout()} to='/login'>Log Out</Link></li>
                                </ul>
                            </div>
                            : <button className='btn btn-danger'><Link to='/login' className='text-light text-decoration-none'>Log In</Link></button>}

                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-sm bg-danger">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            {/* Navigation Links */}
                            <li className="nav-item">
                                <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/allproducts">All Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/women">Women</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/men">Men</Link>
                            </li>
                            {/* Other Navigation Links */}
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/kids">Kids</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Responsive Styles */}
            <style>
                {`
                    @media (max-width: 768px) {
                        .login-cart {
                            justify-content:start !important;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Header;
