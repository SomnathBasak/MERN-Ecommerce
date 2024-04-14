import React from 'react';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories=useCategory()
    return (
        <>
            <div className='container'>
                <div className='row'>
                    {categories.map((c)=>(
                        <div className='col-md-6 mt-5 mb-3' key={c._id}>
                       <Link className='btn btn-secondary' to={`/category/${c.slug}`}>{c.name}</Link>  
                    </div>
                    ))}
                    
                </div>
        </div>
        </>
    );
};

export default Categories;