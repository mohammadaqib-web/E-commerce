import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js';
import Loader from '../components/Loader.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'

function Login() {
    // State variables for email, password, loading status, and API link
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const userLink = process.env.REACT_APP_API_USER;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect to check if the user is already logged in
    useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("user")) {
            // If already logged in, redirect to the home page
            toast.success("You are already Logged In!");
            navigate('/');
        }
    }, []);

    // Function to handle login
    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        const reqData = { email, password }

        try {

            const result = await axios.post(`${userLink}/login`, reqData);

            if (result.status === 201) {
                setLoading(false);
                toast.success(result.data.message);

                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                dispatch({type:"LOGIN_SUCCESS",payload:result.data.user});
                setLoading(false);
                navigate('/');
            } else {
                setLoading(false);
                toast.error(result.data.message);
            }
            setEmail("");
            setPassword("");
        } catch (error) {
            setLoading(false);
            setEmail("");
            setPassword("");
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Header />

            <div>
                <h2 className='mt-5 text-secondary text-center'>LogIn Form</h2>
                {/* Login Form Container */}
                <div className='container-fluid col-md-3 rounded mt-4'>
                    {/* Login Form */}
                    <form className='p-2' onSubmit={(e) => login(e)}>
                        {/* Email Input */}
                        <label className='text-light mt-2'>E-mail</label>
                        <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}></input>

                        {/* Password Input */}
                        <label className='text-light mt-4'>Password</label>
                        <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                        {/* Submit Button */}
                        <button className='container-fluid btn btn-danger mt-5 mb-3' type='submit'>
                            {loading ? <Loader /> : 'Log In'}
                        </button>
                        <p style={{ color: "gray" }}>Don't have an account? <Link to='/register' className='text-decoration-none'>Sign Up</Link></p>
                    </form>
                </div>
            </div>


            <Footer />
        </div>
    );
}

export default Login;