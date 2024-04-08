import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// Slider component to showcase featured products
function Slider() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_PRODUCT}/allProduct`);
            // API endpoint returns an array of featured products
            setProducts(response.data.allProducts || []);
        } catch (error) {
            console.error("Error fetching featured products:", error);
        }
    };
    

    // Display only 4 products
    const featuredProducts = products.slice(0, 4);

    const dispatch = useDispatch();

    const addToCart = async(product) => {
        dispatch({type:"ADD_TO_CART_SUCCESS",payload:{id:product._id,name:product.productName,amount:product.amount,quantity:1,available_quantity:product.quantity,image:product.image}});
        toast.success("Item added to Cart");
    }

    return (
        <div className='container mt-3'>
            <h2 className='text-center text-decoration-underline text-secondary'>Featured Products</h2>
            <div className='row row-cols-1 row-cols-md-4 g-4 mt-2'>
                {featuredProducts.map((product) => (
                    <div key={product._id} className='col'>
                        <div className='card'>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} className='card-img-top' alt='...' />
                        </Link>
                            <div className='card-body'>
                                <h5 className='card-title text-center'>{product.productName}</h5>
                                <p className='card-text text-secondary'>{product.description}</p>
                                <p className='card-text text-dark'>
                                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                                    {product.amount}
                                </p>
                                {/* Add to Cart functionality */}
                                <a href='#' className='btn btn-warning' onClick={() => addToCart(product)}>
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slider;
