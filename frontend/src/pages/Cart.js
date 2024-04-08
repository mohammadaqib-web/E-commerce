import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faIndianRupeeSign, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    // Retrieve the cart state from Redux
    const cart = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Recalculate total amount when the cart changes
        calculateTotalAmount();
    }, [cart]);

    // Remove an item from the cart
    const removeItem = (productId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: productId });
        toast.success("Item removed from Cart");
    };

    // Increment the quantity of an item in the cart
    const counterIncrement = (productId) => {
        // Check if the quantity is already at the maximum
        const itemInCart = cart.find(item => item.id === productId);
        
        // Retrieve the product details from localStorage
        const productDetails = JSON.parse(localStorage.getItem("cart")) || [];
      
        // Find the product in the details array
        const product = productDetails.find(item => item.id === productId);
      
        if (itemInCart && product && itemInCart.quantity >= product.available_quantity) {
          toast.warning(`Maximum quantity (${product.available_quantity}) reached for ${itemInCart.name}`);
        } else {
          dispatch({ type: "INCREMENT_QUANTITY", payload: productId });
        }
      };
      
    // Decrement the quantity of an item in the cart
    const counterDecrement = (productId) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: productId });
    };

    // Calculate the total amount of items in the cart
    const calculateTotalAmount = () => {
        const total = cart.reduce((acc, item) => acc + item.amount * item.quantity, 0);
        setTotalAmount(total);
    };

    const navigate = useNavigate();

    // Proceed to checkout or display an error if the cart is empty
    const cartValue = () => {
        const cartData = JSON.parse(localStorage.getItem("cart"));
        if (!cartData || cartData.length === 0) {
            toast.error("Add some products to continue");
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div style={{  height: "100vh" }}>
            {/* Header Component */}
            <Header />
            <div className='table-responsive col-md-8 mx-auto mt-3'>
                <h2 className='text-center text-light'>Cart<FontAwesomeIcon icon={faCartShopping} className='ms-2 text-danger' /></h2>

                {/* Cart Items Table */}
                <table className='table table-light table-striped mt-3 text-center mb-5'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td style={{maxWidth:"260px"}}>
                                    <img src={item.image} alt={item.name} style={{ maxWidth: '100%', height: '260px' }} />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                    <button className='btn' onClick={() => counterDecrement(item.id)}>-</button>
                                    {item.quantity}
                                    <button className='btn' onClick={() => counterIncrement(item.id)}>+</button>
                                </td>
                                <td><FontAwesomeIcon icon={faIndianRupeeSign} />{item.amount * item.quantity}</td>
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => removeItem(item.id)} style={{ cursor: "pointer" }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Total Amount and Checkout Button */}
                <div className='d-flex justify-content-end align-items-center' style={{ backgroundColor: "black" }}>
                    <div className='text-end me-3'>
                        <p className='fs-5 text-light'>Total : <span><FontAwesomeIcon icon={faIndianRupeeSign} className='text-danger' />
                            {totalAmount}
                        </span></p>
                        <button className='btn btn-success mb-3' onClick={cartValue}>CheckOut</button>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "190px" }}> </div>
            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Cart;
