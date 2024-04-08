import React from 'react';

const Pagination = ({ totalPost, postPerPage,setCurrentPage,currentPage }) => {
    // Calculate the total number of pages
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='d-flex mt-4 justify-content-center'>
            {pages.map((page, index) => (
                <div key={index} className='m-3'>
                    <button className={page == currentPage?'active btn btn-danger':'btn btn-dark'} onClick={()=>setCurrentPage(page)}>{page}</button>
                </div>
            ))}
        </div>
    );
};

export default Pagination;
