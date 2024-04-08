import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HomeCover from './HomeCover';
import Slider from './Slider';
import { useSelector } from 'react-redux';

// Home component representing the main page of the website
function Home() {

    return ( 
        <div>
            {/* Include Header Component */}
            <Header/>

            {/* Include HomeCover Component */}
            <HomeCover/>

            {/* Include Slider Component */}
            <Slider/>

            {/* Include Footer Component */}
            <Footer/>
        </div>
     );
}

export default Home;
