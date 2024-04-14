import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <div className='pnf'>
                <h1 className='pnf-title'>404</h1>
                <h2 className='pnf-heading'>Oops !! Page Not Found</h2>
                <NavLink to='/' className='pnf-btn'>Go Back</NavLink>
            </div>
        </>
    );
};

export default Error;