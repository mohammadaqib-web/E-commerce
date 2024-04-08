import axios from 'axios';
import './placeorder.css'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = JSON.parse(localStorage.getItem("cart"));
    const shipmentDetail = JSON.parse(localStorage.getItem("shipmentDetail"));

    useEffect(() => {
        // Check if items in the cart exist, if shipment details are provided, and if payment is selected
        const cart = JSON.parse(localStorage.getItem("cart"))
        const ship = JSON.parse(localStorage.getItem("shipmentDetail"))
        const payment = localStorage.getItem("payment")

        // Redirect to the cart page if the cart is empty
        if (cart.length == 0) {
            toast.error("Something went Wrong!");
            navigate('/cart');
        } 
        // Redirect to the checkout page if shipment details are missing
        if (!ship) {
            navigate('/checkout')
        } 
        // Redirect to the cart page if the payment method is not selected
        if (!payment) {
            navigate('/cart')
            toast.error("Something went wrong!");
        }
    }, []);

    const reqConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            // Retrieve data from local storage

            // Extract product IDs and quantities
            const productIds = cart.map((item) => item.id);
            const quantities = cart.map((item) => item.quantity);

            // Prepare payload
            const payload = {
                productIds: productIds,
                quantity: quantities,
                address: shipmentDetail.address,
                name: shipmentDetail.name,
                amount: cart.reduce((acc, item) => acc + item.amount * item.quantity, 0)
            };
            // Send the request
            const payment = await axios.post(`${process.env.REACT_APP_API_ORDER}/order`, payload, reqConfig);
            dispatch({ type: "RESET_CART" });
            // Handle the response as needed
            localStorage.removeItem("shipmentDetail");
            localStorage.removeItem("cart");
            localStorage.removeItem("payment");
            toast.success(payment.data.message);
            navigate('/myorders');

        } catch (error) {
            toast.error("Not enough quantity available!");
            localStorage.removeItem("shipmentDetail");
            navigate('/cart')
        }
    }

    // Calculate the total amount
    const totalAmount = cart.reduce((acc, item) => acc + item.amount * item.quantity, 0);

    return (
        <div>
            <Header />
            <h1 className='text-center text-secondary mt-3 text-decoration-underline'>Order Review</h1>
            <div className='fs-6 mt-4 d-flex justify-content-center'>
                    <div>
                        <FontAwesomeIcon icon={faCircle} className='text-danger' />
                    </div>
                    <div className='p-1' style={{ marginTop: "-8px" }}>
                        <hr style={{ color: "white", height: "1px", width: "50px", border: "1px solid white" }} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCircle} className='text-danger'/>
                    </div>
                    <div className='p-1' style={{ marginTop: "-8px" }}>
                        <hr style={{ color: "white", height: "1px", width: "50px", border: "1px solid white" }} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCircle} className='text-danger'/>
                    </div>
                </div>
            <div className='mt-3 text-center d-flex division'>
                <div className='col-md-3'>
                    <h1 className='text-danger'>Shipment Details</h1>
                    <h5 className='text-light'><span className='text-secondary'>Name:</span> {shipmentDetail.name}</h5>
                    <h5 className='text-light'><span className='text-secondary'>Address: </span>{shipmentDetail.address}</h5>
                    <h3 className='mt-5 text-danger'>Total Amount</h3>
                    <h5 className='text-light'><FontAwesomeIcon icon={faIndianRupeeSign} className='text-secondary'/>{totalAmount}</h5>
                    <h3 className='mt-5 text-danger'>Payment Method</h3>
                    <h5 className='text-light'>Cash On Delivery</h5>
                </div>
                <div className='col-md-8 text-center'>
                    <h1 className='text-danger div-product'>Products</h1>
                    {cart.map((item) => (<>
                        <div key={item.id} className='mt-2 d-flex justify-content-center'>
                                <div className=' text-center'>
                                    <img src={item.image} style={{ width: '200px', height: '200px' }} />
                                </div>
                                <div className=' text-center ms-4'>
                                    <h4 className='text-light'>{item.name}</h4>
                                    <h5 className='text-secondary'>Quantity: {item.quantity}</h5>
                                    <h5 className='text-secondary'>Amount: {item.quantity * item.amount}</h5>
                                </div>
                            <hr/>
                        </div>
                    </>))}

                </div>
                <div>
                    
                </div>           
                 


            </div>
            <div className='text-center'>
            <button onClick={submitForm} className='btn btn-success mt-4'>Place Order</button>
            </div>
             <div style={{marginTop:"152px"}}></div>
            <Footer />
        </div>
    )
}

export default PlaceOrder