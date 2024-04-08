import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function MyProfile() {

    const USER_API = process.env.REACT_APP_API_USER;

    // State variables for user data and edited user data
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
    const [editedUser,setEditedUser] = useState({firstName:"",lastName:"",email:""});

    const reqConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }

    // State variable for modal visibility
    const [show, setShow] = useState(false);

    // Function to close the modal
    const handleClose = () => {
        setShow(false);
        setEditedUser({ firstName: user.firstName, lastName: user.lastName, email: user.email });
    };

    // Function to handle changes and update user information
    const handleChange = async() => {
        try {
            const resData = {firstName:editedUser.firstName,lastName:editedUser.lastName,email:editedUser.email};
            const result = await axios.put(`${USER_API}/modifyUser`,resData,reqConfig);
            setUser({
                firstName: editedUser.firstName,
                lastName: editedUser.lastName,
                email: editedUser.email
              });
            toast.success(result.data.message);
            setShow(false);
            
        } catch (error) {
            toast.error(error.response.message);
            setShow(false);
        }
    }

    // Function to show the modal
    const handleShow = () => setShow(true);

    // Fetch user data when the component mounts
    useEffect(() => {
        fetchData();
    }, [])

    // Function to fetch user details
    const fetchData = async () => {
        const user = await axios.get(`${USER_API}/getUserDetails`, reqConfig);
        const userDetail = await user.data.userId;
        setUser({ firstName: userDetail.firstName, lastName: userDetail.lastName, email: userDetail.email });
            setEditedUser({ firstName: userDetail.firstName, lastName: userDetail.lastName, email: userDetail.email });
    }


    return (
        <div style={{height:"100vh"}}>
            <Header />
            <div className='text-center'>
                <h1 className='mt-3 text-decoration-underline'>My Profile<FontAwesomeIcon icon={faUser} className='text-danger fs-2 mb-1 ms-2' /></h1>
                <h4 className='text-danger mt-5'>First Name</h4>
                <h5 className='text-light'>{user.firstName}</h5>
                <h4 className='text-danger mt-4'>Last Name</h4>
                <h5 className='text-light'>{user.lastName}</h5>
                <h4 className='text-danger mt-4'>Email</h4>
                <h5 className='text-light'>{user.email}</h5>
                {/*edit button*/}
                <button className='btn btn-danger mt-4' onClick={handleShow}>Edit<FontAwesomeIcon icon={faPen} className='ms-2'/></button>
                {/*edit functionality*/}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Your Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='fw-bold'>First Name: </label>
                        <input type='text' value={editedUser.firstName} className='form-control bg-dark text-light' onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })}/>
                        <label className='fw-bold mt-3'>Last Name: </label>
                        <input type='text' value={editedUser.lastName} className='form-control bg-dark text-light' onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })}/>
                        <label className='fw-bold mt-3'>E-mail: </label>
                        <input type='email' value={editedUser.email} className='form-control bg-dark text-light' onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleChange}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Footer />
        </div>
    );
}

export default MyProfile;