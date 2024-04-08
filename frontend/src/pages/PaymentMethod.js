import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const PaymentMethod = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if items in the cart exist and if shipment details are provided
        const cart = JSON.parse(localStorage.getItem("cart"))
        const ship = JSON.parse(localStorage.getItem("shipmentDetail"))

        // Redirect to the cart page if the cart is empty
        if (cart.length==0) {
            toast.error("Something went Wrong!");
            navigate('/cart');
        }
        // Redirect to the checkout page if shipment details are not provided
        if(!ship){
            navigate('/checkout')
        }
    }, []);

    // Handle payment selection and navigate to the place order page
    const payment = () => {
        localStorage.setItem("payment","COD") // Set payment method as Cash On Delivery
        navigate('/placeorder');
    }

    return (
        <div style={{height:"100vh"}}>
            <Header />
            <h2 className='text-center mt-3 text-decoration-underline text-secondary'>Select Payment Method</h2>
            <div className='container-fluid' style={{ height: "38.5vh" }}>
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
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                </div>

                <form className='text-center' onSubmit={payment}>
                    <div className="form-check d-flex justify-content-center mt-5">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" style={{ cursor: "pointer" }} required />
                        <label className="form-check-label text-light ms-2" htmlFor="flexRadioDefault2">
                            Cash On Delivery
                        </label>
                    </div>

                    <button className='btn btn-success mt-5' type='submit'>Proceed</button>
                </form>

            </div>
            <div className=''>
            <Footer />
            </div>
        </div>
    )
}

export default PaymentMethod;
