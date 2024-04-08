// Import necessary modules and components
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import Loader from '../components/Loader';

// AdminDashboard component
const AdminDashboard = () => {
    // State variables
    const [activeTab, setActiveTab] = useState(null);
    const [dataToShow, setDataToShow] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const user = useSelector(state => state.userReducer.user);
    const [show, setShow] = useState(false);
    const [editProduct, setEditProduct] = useState({
        _id: '',
        productName: '',
        quantity: 0,
        amount: 0,
        category: '',
        description: ''
    });
    const [addProduct, setAddProduct] = useState({
        _id: '',
        productName: '',
        quantity: 0,
        amount: 0,
        category: '',
        description: '',
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // Modal show and close functions
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);


    // Axios request configuration with authorization header
    const reqConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }

    // Fetch data function
    const fetchData = async () => {
        // Fetch users, products, and orders
        const getUsers = await axios.get(`${process.env.REACT_APP_API_USER}/getAllUser`, reqConfig);
        setAllUsers(getUsers.data.allUser);

        const getProducts = await axios.get(`${process.env.REACT_APP_API_PRODUCT}/allProduct`);
        setAllProducts(getProducts.data.allProducts);

        const getOrders = await axios.get(`${process.env.REACT_APP_API_ORDER}/getAllOrders`, reqConfig);
        setAllOrders(getOrders.data.allOrders);
    }

    // Handle tab click function
    const handleTabClick = async (tab) => {
        // Set the active tab
        setActiveTab(tab);

        // Fetch and set data based on the clicked tab
        switch (tab) {
            case 'Listed Products':
                setDataToShow(allProducts);
                break;

            case 'Add Products':
                setDataToShow(null);
                break;

            case 'Orders':
                setDataToShow(allOrders);
                break;

            case 'Users':
                setDataToShow(allUsers);
                break;

            default:
                setDataToShow(null);
        }
    };

    // Delete user function
    const deleteUser = async (userId) => {

        try {
            // Check if the user being deleted is not the currently logged-in user
            const detail = JSON.parse(localStorage.getItem("user"));
            if (userId !== user._id && userId !== detail._id) {
                const deletedUser = await axios.delete(`${process.env.REACT_APP_API_USER}/deleteUser/${userId}`, reqConfig);
                fetchData();
                toast.success(deletedUser.data.message);
            } else if (userId === user._id || userId === detail._id) {
                toast.error("You cannot delete your own Profile");
            }
        } catch (error) {
            toast.error(error.data.message);
        }
    }

    // Change order status function
    const changeStatus = async (Status, itemId) => {

        try {
            const statusResult = await axios.put(`${process.env.REACT_APP_API_ORDER}/orderStatus/${itemId}`, { status: Status }, reqConfig);
            toast.success(statusResult.data.message);
            fetchData();


        } catch (error) {
            toast.error(error.data.message);
        }
    }

    // Delete product function
    const deleteProduct = async (productId) => {

        toast.warn("Please wait while the product is deleting!");

        try {
            const delProduct = await axios.delete(`${process.env.REACT_APP_API_PRODUCT}/deleteProduct/${productId}`, reqConfig);
            toast.success(delProduct.data.message);
            fetchData();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    // Show the modal for editing a product
    const handleEditProduct = (productId) => {
        // Find the product to edit
        const productToEdit = allProducts.find((product) => product._id === productId);
        if (productToEdit) {
            // Set the state for editing
            setEditProduct({
                _id: productToEdit._id,
                productName: productToEdit.productName,
                quantity: productToEdit.quantity,
                amount: productToEdit.amount,
                category: productToEdit.category,
                description: productToEdit.description
            });
            // Show the modal
            handleShow();
        }
    };

    // Handle change in edited product input
    const handleEditProductChange = (e) => {
        const { name, value } = e.target;

        // Use the spread operator to ensure you don't lose the existing state
        setEditProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Save changes to edited product
    const saveChanges = async () => {
        try {
            const resData = { productName: editProduct.productName, quantity: editProduct.quantity, amount: editProduct.amount, category: editProduct.category, description: editProduct.description };

            // Send an Axios request to update the product
            const updatedProduct = await axios.put(
                `${process.env.REACT_APP_API_PRODUCT}/editProduct/${editProduct._id}`, resData, reqConfig);

            toast.success(updatedProduct.data.message);
            // Close the modal
            handleClose();
            // Refresh the data
            fetchData();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Handle form submission for adding a new product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!addProduct.productName || !addProduct.quantity || !addProduct.amount || !addProduct.category || !addProduct.description || !addProduct.image) {
            toast.error("All fields are mandatory!");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('productName', addProduct.productName);
        formData.append('quantity', addProduct.quantity);
        formData.append('amount', addProduct.amount);
        formData.append('category', addProduct.category);
        formData.append('description', addProduct.description);
        formData.append('image', addProduct.image);


        try {
            const productDetail = await axios.post(`${process.env.REACT_APP_API_PRODUCT}/addProduct`, formData, reqConfig);
            setLoading(false);
            toast.success(productDetail.data.message);
            setAddProduct({ productName: "", quantity: "", amount: "", category: "", description: "", image: null });
            setImagePreview(null)
            fetchData();
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message)
        }

    }

    // Handle image change for adding a new product
    const handleImageChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0];

        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
            setAddProduct({ ...addProduct, image: file });
        } else {
            setImagePreview(null);
            setAddProduct({ ...addProduct, image: null });
        }
    };


    return (
        <div style={{ backgroundColor: "black" }}>
            <Header />

            <div style={{ backgroundColor: "black" }} className='mb-1 pb-5'>
                <h1 className='text-center mt-4 text-light'>Admin Dashboard</h1>
                <hr style={{ border: "2px solid red" }} />
                <div className='row g-0 mt-4'>
                    <div className='col-md-2 ps-5 text-light border-end'>
                        {/* Handle click events and pass the tab name */}
                        <h4 className='p-3 mt-2' style={{ cursor: "pointer" }} onClick={() => handleTabClick('Add Products')}>Add Products</h4>
                        <h4 className='p-3 mt-2' style={{ cursor: "pointer" }} onClick={() => handleTabClick('Listed Products')}>Listed Products</h4>
                        <h4 className='p-3 mt-2' style={{ cursor: "pointer" }} onClick={() => handleTabClick('Orders')}>Orders</h4>
                        <h4 className='p-3 mt-2' style={{ cursor: "pointer" }} onClick={() => handleTabClick('Users')}>Users</h4>
                    </div>
                    <div className='col-md-10 container'>
                        {/*Render Add Product data*/}
                        {dataToShow == null && (
                            <div className='d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: "black" }}>
                                <h2 className='text-center text-danger'>Add Products</h2>
                                <form className='col-md-6' onSubmit={handleAddProduct} >
                                    <label className='text-light mt-2'>Product Name:</label>
                                    <input type='text' className='form-control' value={addProduct.productName} onChange={(e) => setAddProduct({ ...addProduct, productName: e.target.value })} />

                                    <label className='text-light mt-2'>Quantity:</label>
                                    <input type='number' className='form-control' value={addProduct.quantity} onChange={(e) => setAddProduct({ ...addProduct, quantity: e.target.value })} />

                                    <label className='text-light mt-2'>Amount:</label>
                                    <input type='number' className='form-control' value={addProduct.amount} onChange={(e) => setAddProduct({ ...addProduct, amount: e.target.value })} />

                                    <label className='text-light mt-2'>Category:</label>
                                    <div className="dropdown" style={{ cursor: "pointer" }}>
                                        <a className="btn btn-light dropdown-toggle container-fluid" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {addProduct.category}
                                        </a>

                                        <ul className="dropdown-menu container-fluid">

                                            <li><a className='dropdown-item' onClick={() => setAddProduct({ ...addProduct, category: "Men" })}>Men</a></li>
                                            <li><a className='dropdown-item' onClick={() => setAddProduct({ ...addProduct, category: "Women" })}>Women</a></li>
                                            <li><a className='dropdown-item' onClick={() => setAddProduct({ ...addProduct, category: "Kids" })}>Kids</a></li>

                                        </ul>
                                    </div>

                                    <label className='text-light mt-2'>Description:</label>
                                    <textarea type='text' className='form-control' value={addProduct.description} onChange={(e) => setAddProduct({ ...addProduct, description: e.target.value })} />

                                    <label className='text-light mt-2'>Image:</label>
                                    <input type='file' className='form-control' accept='image/jpg, image/png, image/jpeg' onChange={(e) => handleImageChange(e)} />

                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt='Preview'
                                            style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                                        />
                                    )}

                                    <button className='btn btn-danger mt-5 container-fluid' type='submit'>
                                        {loading ? <Loader /> : "Submit"}
                                    </button>
                                </form>
                            </div>
                        )}


                        {/*Render Orders data*/}
                        {dataToShow == allOrders && (
                            <div className='d-flex flex-column align-items-center'>
                                <h2 className='text-danger'>{activeTab}</h2>
                                <div className='table-responsive '>
                                    <table className='table table-dark table-striped text-center'>
                                        <thead>
                                            <tr>
                                                <th>Buyer Id</th>
                                                <th>Buyer Name</th>
                                                <th>Product Id</th>
                                                <th>Quantity</th>
                                                <th>Address</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-group-divider'>
                                            {dataToShow.map((item) => (
                                                <tr>
                                                    <td>{item.orderedBy}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.products.find(product => product.id === item.id)?._id || 0}</td>
                                                    <td>{item.products.find(product => product.id === item.id)?.quantity}</td>
                                                    <td>{item.address}</td>
                                                    <td><div className="dropup">
                                                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            {item.status}
                                                        </a>

                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">{item.status == "Processing" ?
                                                                <li><a className="dropdown-item" href="#" onClick={() => changeStatus("Delivered", item._id)}>Delivered</a></li>
                                                                :
                                                                <li><a className="dropdown-item" href="#" onClick={() => changeStatus("Processing", item._id)}>Processing</a></li>}</a></li>
                                                        </ul>
                                                    </div></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}


                        {/* Render Users data */}
                        {dataToShow == allUsers && (
                            <div className='d-flex flex-column align-items-center'>
                                <h2 className='text-danger'>{activeTab}</h2>
                                <div className='table-responsive col-12'>
                                    <table className='table table-dark table-striped text-center'>
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>E-mail</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-group-divider'>
                                            {dataToShow.map((item) => (
                                                <tr>
                                                    <td>{item.firstName}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.email}</td>
                                                    <td style={{ cursor: "pointer" }}><FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(item._id)} />

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}


                        {/* Render Products data */}
                        {dataToShow == allProducts && (
                            <div className='d-flex flex-column align-items-center'>
                                <h2 className='text-danger'>{activeTab}</h2>
                                <div className='table-responsive col-12'>
                                    <table className='table table-dark table-striped text-center'>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Amount</th>
                                                <th>Category</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-group-divider'>
                                            {dataToShow.map((item) => (<>
                                                <tr>
                                                    <td><img src={item.image} alt={`Product: ${item.productName}`} style={{ maxWidth: '100px', maxHeight: '100px' }} /></td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.description}</td>
                                                    <td className='fs-5'><FontAwesomeIcon icon={faPen} onClick={() => handleEditProduct(item._id)} style={{ cursor: "pointer" }} className='text-warning' />
                                                        <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} className='ms-2 text-danger' onClick={() => deleteProduct(item._id)} />

                                                    </td>
                                                </tr>

                                                {/*edit functionality*/}
                                                <Modal show={show} onHide={handleClose} centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Product Info</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <label className='fw-bold'>Product Name: </label>
                                                        <input
                                                            type='text'
                                                            value={editProduct.productName}
                                                            onChange={(e) => handleEditProductChange(e)}
                                                            className='form-control bg-dark text-light'
                                                            name='productName'
                                                        />
                                                        <label className='fw-bold'>Quantity: </label>
                                                        <input
                                                            type='number'
                                                            value={editProduct.quantity}
                                                            onChange={(e) => handleEditProductChange(e)}
                                                            className='form-control bg-dark text-light'
                                                            name='quantity'
                                                        />
                                                        <label className='fw-bold'>Amount: </label>
                                                        <input
                                                            type='number'
                                                            value={editProduct.amount}
                                                            onChange={(e) => handleEditProductChange(e)}
                                                            className='form-control bg-dark text-light'
                                                            name='amount'
                                                        />
                                                        <label className='fw-bold'>Category: </label>
                                                        <div className="dropdown" style={{ cursor: "pointer" }}>
                                                            <a className="btn btn-dark dropdown-toggle container-fluid" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {editProduct.category}
                                                            </a>

                                                            <ul className="dropdown-menu container-fluid">
                                                                <li><a className='dropdown-item' onClick={() => setEditProduct({ ...editProduct, category: "Men" })}>Men</a></li>
                                                                <li><a className='dropdown-item' onClick={() => setEditProduct({ ...editProduct, category: "Women" })}>Women</a></li>
                                                                <li><a className='dropdown-item' onClick={() => setEditProduct({ ...editProduct, category: "Kids" })}>Kids</a></li>
                                                            </ul>
                                                        </div>

                                                        <label className='fw-bold'>Description: </label>
                                                        <input
                                                            type='text'
                                                            value={editProduct.description}
                                                            onChange={(e) => handleEditProductChange(e)}
                                                            className='form-control bg-dark text-light'
                                                            name='description'
                                                        />

                                                    </Modal.Body>

                                                    <Modal.Footer>
                                                        <Button variant="danger" onClick={saveChanges}>
                                                            Save Changes
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default AdminDashboard;