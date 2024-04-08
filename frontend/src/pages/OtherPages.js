// NotFound.js
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const NotFound = () => {
  return (
    <div style={{height:"100vh"}} className='text-center text-light'>
        <FontAwesomeIcon icon={faBan} className='fs-1 mt-5'/>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the requested page does not exist.</p>
    </div>
  );
};

export default NotFound;
