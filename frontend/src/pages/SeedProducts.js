import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SeedProducts = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        // Function to seed products
        const seedProduct = async() => {
            try {
                // Request configuration including authorization header with JWT token
                const reqConfig = {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                }

                // Making a POST request to the product seeding endpoint
                const seeding = await axios.post(`${process.env.REACT_APP_API_SEED_PRODUCTS}`,{},reqConfig);

                // Check if seeding was successful
                if(!seeding){
                    toast.error("Products seeding failed");
                    navigate('/')
                }
                // Display success message and navigate to the home page
                toast.success("Products seeded successfully!");
                navigate('/');
            } catch (error) {
                toast.error("Error Occurred!");
                navigate('/')
            }
        }
        // Call the seedProduct function when the component mounts
        seedProduct();
    },[]) // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div style={{backgroundColor:"black",height:"100vh"}}>
        <h1 className='text-center pt-3 text-light'>Please wait for 10 seconds while the products are seeding.....</h1>
    </div>
  )
}

export default SeedProducts