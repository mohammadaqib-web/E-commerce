import React from 'react';
import './Home.css';
import CoverImg from '../images/cover-image.jpg'

// HomeCover component for the cover section of the home page
function HomeCover() {
    return (
        <div className='bg-dark'>
            {/* Cover Image Section */}
            <div className="card text-bg-dark">
                {/* Actual Cover Image */}
                <img src={CoverImg} height="500px" className="card-img cover-image" alt="Cover Img" />

                {/* Overlay Text */}
                <div className="card-img-overlay mt-5 pt-5">
                    <h2 className="card-title text-light mt-5 pt-5">E-ShopHub</h2>
                    <h6 className="card-text cover-text">Everything you need - on a budget.</h6>
                </div>
            </div>
        </div>
    );
}

export default HomeCover;
