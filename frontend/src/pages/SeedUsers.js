import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SeedUsers = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        {/*Function to seed users */}
        const seedUser = async() => {
            try {
                const seeding = await axios.post(`${process.env.REACT_APP_API_SEED_USER}`);
                if(!seeding){
                    toast.error("User seeding failed");
                    navigate('/')
                }
                toast.success("Users seeded successfully!");
                navigate('/');
            } catch (error) {
                console.log(error);
                toast.error("Error Occurred!");
                navigate('/')
            }
        }
        // Call the seedUser function when the component mounts
        seedUser();
    },[])

  return (
    <div style={{backgroundColor:"black",height:"100vh"}}>
        <h1 className='text-center pt-3 text-light'>Please wait for 10 seconds while the users are seeding.....</h1>
    </div>
  )
}

export default SeedUsers