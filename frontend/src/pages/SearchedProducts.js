import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SearchedProducts = () => {
    // State variables for searched products, current page, and posts per page
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(8);

    // Calculate indexes for pagination
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = products.slice(firstPostIndex, lastPostIndex);

    // Fetch data when products state changes
    useEffect(() => {
        fetchData()
    }, [products])

     // Get the search parameter from the URL
    const params = useParams()

    // Fetch products based on the search parameter
    const fetchData = async () => {
        try {
            const searching = await axios.get(`${process.env.REACT_APP_API_PRODUCT}/getProductbyName/${params.name}`);
            // Check if findProduct is defined before setting state
            if (searching.data.findProduct !== undefined) {
                setProducts(searching.data.findProduct);
            } else {
                // Handle case when product is not found (findProduct is undefined)
                setProducts([]);
                toast.error("Product not found");
            }
        } catch (error) {
            toast.error("Product not found!");
        }
    };

    const dispatch = useDispatch();

    // Add product to cart function
    const addToCart = async (product) => {
        if (product.quantity == 0) {
            toast.error("Out of Stock");
        }
        if (product.quantity !== 0) {
            dispatch({ type: "ADD_TO_CART_SUCCESS", payload: { id: product._id, name: product.productName, amount: product.amount, quantity: 1, available_quantity: product.quantity, image: product.image } });
            toast.success("Item added to Cart");
        }
    }

    return (
        <div>
            <Header />
            <div className='container mt-3'>
                <h2 className='text-center text-decoration-underline text-light'>Searched Products</h2>
                <div className='row row-cols-1 row-cols-md-4 g-4 mt-2'>
                    {currentPosts.map((product) => (
                        <div key={product._id} className='col'>
                            <div className='card'>
                                <Link to={`/product/${product._id}`}>
                                    <img src={product.image} className='card-img-top' alt='...' />
                                </Link>
                                <div className='card-body'>
                                    <h5 className='card-title text-center'>{product.productName}</h5>
                                    <p className='card-text text-secondary'>{product.description}</p>
                                    <p className='card-text text-dark'><FontAwesomeIcon icon={faIndianRupeeSign} />{product.amount}</p>
                                    <a href='#' className='btn btn-warning' onClick={() => addToCart(product)}>
                                        Add to Cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination component */}
                <Pagination totalPost={products.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            <div style={{ marginTop: "350px" }}>
                <Footer />
            </div>

        </div>
    )
}

export default SearchedProducts