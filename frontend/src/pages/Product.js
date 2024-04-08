import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Product = () => {
    // Extracts the 'id' parameter from the URL using React Router
    const { id } = useParams();

    // State to store product data
    const [productData, setProductData] = useState();

    useEffect(() => {
        // Function to fetch product details from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_PRODUCT}/getProductbyId/${id}`);
                setProductData(response.data.findProduct);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchData(); // Call the fetchData function to initiate the API call
    }, [id]);

    const dispatch = useDispatch();

    // Function to add the product to the cart
    const addToCart = async (product) => {
        if (productData.quantity == 0) {
            toast.error("Out of Stock");
        }
        if (productData.quantity !== 0) {

            dispatch({ type: "ADD_TO_CART_SUCCESS", payload: { id: product._id, name: product.productName, amount: product.amount, quantity: 1, available_quantity: product.quantity, image: product.image } });
            toast.success("Item added to Cart");
        }
    }

    return (
        <div style={{ height: "100vh" }}>
            <Header />
            <h1 className='text-center text-secondary mt-3 text-decoration-underline'>Product Details</h1>
            <div className='d-flex justify-content-between mt-4 container-fluid row mb-5'>
                {productData && (
                    <div className='col-md-8 text-center'>
                        <img id='product-Img' src={productData.image} alt={productData.productName} style={{ height: "300px", maxWidth: "100%" }} />
                    </div>
                )}
                {productData && (
                    <div className='col-md-4 border-start'>
                        <h2 className='text-light'>{productData.productName}</h2>
                        <h5 className='text-secondary mt-4'>Category : <span className='text-danger'>{productData.category}</span></h5>
                        <h5 className='text-secondary text-wrap'>Description : <span className='text-danger'>{productData.description}</span></h5>
                        <h5 className='text-secondary'>Available Quantity : <span className='text-danger'>{productData.quantity}</span></h5>
                        <h5 className='text-secondary'>Price : <FontAwesomeIcon icon={faIndianRupeeSign} className='text-light' /><span className='text-danger'>{productData.amount}</span></h5>
                        <div className='text-center'>
                        <button className='btn btn-warning mt-5' onClick={() => addToCart(productData)}>Add to Cart</button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Product;
