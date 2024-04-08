import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faShippingFast } from '@fortawesome/free-solid-svg-icons';

const MyOrders = () => {
  // State variables to store orders and product details
  const [ordersData, setOrdersData] = useState([]);
  const [productDetailsArray, setProductDetailsArray] = useState([]);

  // Request configuration with authorization header
  const reqConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch user orders and corresponding product details
  const fetchData = async () => {
    try {
      // Fetch user orders
      const orders = await axios.get(`${process.env.REACT_APP_API_ORDER}/getUserOrder`, reqConfig);
      setOrdersData(orders.data.findUserOrders);

      // Fetch product details for each product in the orders
      const productDetailsPromises = orders.data.findUserOrders.map(async (item) => {
        const productDetailsArray = await Promise.all(item.products.map(product => getProductDetails(product.productId)));
        return productDetailsArray;
      });

      // Resolve promises for product details
      const resolvedProductDetails = await Promise.all(productDetailsPromises);
      setProductDetailsArray(resolvedProductDetails.flat());
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  // Function to fetch product details based on productId
  const getProductDetails = async (productId) => {
    try {
      const product = await axios.get(`${process.env.REACT_APP_API_PRODUCT}/getProductbyId/${productId}`);
      return product.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle the error as needed
      return null;
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div className='text-center mb-5'>
        <h2 className='mt-3 text-decoration-underline text-light'>My Orders<FontAwesomeIcon icon={faShippingFast} className='ms-2 text-danger'/></h2>
        <div className='table-responsive col-md-10 mx-auto'>
          <table className='table table-light table-striped mt-3 text-center'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Address</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Ordered On</th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {ordersData.map((item, index) => {
                const productDetails = productDetailsArray[index];

                if (productDetails) {
                  return (
                    <tr key={item.id}>
                      <td>
                        <img src={productDetails.findProduct.image} alt={productDetails.findProduct.name} style={{ maxWidth: '100%', height: '150px' }} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.products.find(product => product.id === item.id)?.quantity || 0}</td>
                      <td><FontAwesomeIcon icon={faIndianRupeeSign}/>{item.amount}</td>
                      <td>{item.status}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  );
                } else {
                  return null; // Handle the case where product details cannot be fetched
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{marginTop:"310px"}}>
      <Footer/>
      </div>
      
    </div>
  );
}

export default MyOrders;
