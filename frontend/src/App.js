// Import necessary modules and styles
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProfile from './pages/MyProfile';
import AdminDashboard from './pages/AdminDashboard';
import AllProducts from './pages/AllProducts';
import Women from './pages/Women';
import Men from './pages/Men';
import Kids from './pages/Kids';
import Cart from './pages/Cart';
import DeliveryDetails from './pages/DeliveryDetails';
import PaymentMethod from './pages/PaymentMethod';
import MyOrders from './pages/MyOrders';
import Product from './pages/Product';
import SeedUsers from './pages/SeedUsers';
import SeedProducts from './pages/SeedProducts';
import NotFound from './pages/OtherPages';
import PlaceOrder from './pages/PLaceOrder';
import SearchedProducts from './pages/SearchedProducts';

// Main App component
function App() {
  return (
    <div className="App">
      {/* Set up the React Router with BrowserRouter */}
      <Router>
        <Routes>
          {/* Define a route for the home page, rendering the Home component */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/myprofile' element={<MyProfile/>}/>
          <Route path='/admindashboard' element={<AdminDashboard/>}/>
          <Route path='/allproducts' element={<AllProducts/>}/>
          <Route path='/women' element={<Women/>}/>
          <Route path='/men' element={<Men/>}/>
          <Route path='/kids' element={<Kids/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<DeliveryDetails/>}/>
          <Route path='/paymentmethod' element={<PaymentMethod/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/search/:name' element={<SearchedProducts/>}/>
          <Route path='/seeduser' element={<SeedUsers/>}/>
          <Route path='/seedproducts' element={<SeedProducts/>}/>
          <Route path='/placeorder' element={<PlaceOrder/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

// Export the App component as the default export
export default App;
