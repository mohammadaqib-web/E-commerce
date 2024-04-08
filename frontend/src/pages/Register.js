import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
  // API endpoint for user-related operations
  const API_USER = process.env.REACT_APP_API_USER;

  // State variables to store form input values and loading status
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // React Router hook for navigation
  const navigate = useNavigate();

  // useEffect to check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      toast.success("You are already Logged In!");
      navigate('/');
    }
  }, []);

  // Function to handle user registration
  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Request data containing user input
    const reqData = { firstName, lastName, email, password };

    try {
      // Making a POST request to the register endpoint
      const result = await axios.post(`${API_USER}/register`, reqData);

      // Handling the response based on the HTTP status
      if (result.status === 201) {
        setLoading(false);
        toast.success(result.data.message);
        navigate('/login');
      } else {
        setLoading(false);
        toast.error(result.data.message);
        navigate('/login');
      }

      // Clearing the form input values after registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handling errors and displaying an error toast
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {/* Include Header */}
      <Header/>

      {/* Content Container */}
      <div>
        {/* Page Title */}
        <h2 className='mt-5 text-secondary text-center'>Registration Form</h2>

        {/* Registration Form Container */}
        <div className='container-fluid col-md-4 mt-4'>
          {/* Registration Form */}
          <form className='p-4' onSubmit={(e) => register(e)}>
            {/* First Name Input */}
            <label className='text-light'>First Name</label>
            <input type='text' className='form-control' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>

            {/* Last Name Input */}
            <label className='text-light mt-4'>Last Name</label>
            <input type='text' className='form-control' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>

            {/* Email Input */}
            <label className='text-light mt-4'>E-mail</label>
            <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}></input>

            {/* Password Input */}
            <label className='text-light mt-4'>Password</label>
            <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}></input>

            {/* Submit Button */}
            <button type='submit' className='container-fluid btn btn-danger mt-5 mb-3'>
              {loading ? <Loader/>:  "Submit"}
            </button>
            <p style={{color:"gray"}}>Already have an account? <Link to='/login' className='text-decoration-none'>Log In</Link></p>
          </form>
        </div>
      </div>

      {/*Include Footer */}
      <Footer/>
    </div>
  );
};

export default Register;
