import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

const DeliveryDetails = () => {
    // Initialize navigation hook
    const navigate = useNavigate()

    // Check user login and cart status on component mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem("token");
        const cart = JSON.parse(localStorage.getItem("cart"));

        // Redirect if user is not logged in or the cart is empty
        if (!user || !token) {
            toast.error("Login to Checkout your Cart");
            navigate('/login');
        }
        if (!cart || cart.length == 0) {
            toast.error("Your Cart is Empty!");
            navigate('/cart');
        }
    }, [])

    // Retrieve saved shipment details from local storage
    const addressLocal = localStorage.getItem("shipmentDetail")?JSON.parse(localStorage.getItem("shipmentDetail")):"";
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const userData = JSON.parse(localStorage.getItem("user"));

    // State variables for name and address
    const [name, setName] = useState(userData.firstName + " " + userData.lastName);
    const [address, setAddress] = useState(addressLocal.address);

    // Handle form submission to update shipment details
    const formSubmit = (e) => {
        e.preventDefault();

        // Construct shipment details object
        const shipmentDetails = {
            name: name,
            address: address,
            products: cartData.map((item) => ({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
            })),
        };

        // Store shipment details in local storage
        localStorage.setItem("shipmentDetail", JSON.stringify(shipmentDetails));
        toast.success("Your details are saved!");

    };

    // Proceed to the payment method page
    const proceed = () => {
        // Check if shipment details are updated
        if (!localStorage.getItem("shipmentDetail")) {
            toast.error("You have not updated your delivery details!");
        }
        navigate('/paymentmethod');
    }

    return (
        <div>
            <Header />
            <h2 className='text-center mt-3 text-decoration-underline text-secondary'>Shipment Details</h2>
            <div className='container-fluid mb-5'>
                <div className='fs-6 mt-4 d-flex justify-content-center'>
                    <div>
                        <FontAwesomeIcon icon={faCircle} className='text-danger' />
                    </div>
                    <div className='p-1' style={{ marginTop: "-8px" }}>
                        <hr style={{ color: "white", height: "1px", width: "50px", border: "1px solid white" }} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                    <div className='p-1' style={{ marginTop: "-8px" }}>
                        <hr style={{ color: "white", height: "1px", width: "50px", border: "1px solid white" }} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                </div>

                <div className='text-center mt-3 d-flex justify-content-between container-fluid row'>
                    <div className='col-md-4'>
                        <h3 className='mt-3'>Items</h3>
                        {cartData.map((item) => (
                            <div key={item.id}>
                                <img src={item.image} alt={item.name} style={{ maxWidth: '100%', height: '260px' }} />
                                <p className='text-danger'>Product Name: <span className='text-light'>{item.name}</span></p>
                                <p className='text-danger'>Quantity: <span className='text-light'>{item.quantity}</span></p>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-4'>
                        <h3 className='mt-3'>Your Details</h3>
                        <form onSubmit={(e) => formSubmit(e)}>
                            <label className='text-light'>Name:</label>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='form-control' required />
                            <label className='text-light'>Address:</label>
                            <textarea className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} required />
                            <button className='btn btn-danger mt-4' type='submit'>Update</button>
                        </form>
                    </div>
                    <div className='col-md-4'>
                        <h3 className='mt-3'>Cart Value</h3>
                        {cartData.map((item) => (
                            <div key={item.id}>
                                <p className='text-light'>{item.name}: <FontAwesomeIcon icon={faIndianRupeeSign} className='text-danger ms-3' />{item.amount * item.quantity}</p>
                            </div>
                        ))}
                        <hr style={{ color: "white", height: "1px", border: "1px solid white" }} />
                        <p className='text-light'>Total Amount: <FontAwesomeIcon icon={faIndianRupeeSign} className='text-danger ms-3' />{cartData.reduce((acc, item) => acc + item.amount * item.quantity, 0)}</p>
                        <button className='btn btn-success mt-4' onClick={proceed}>Proceed</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DeliveryDetails;