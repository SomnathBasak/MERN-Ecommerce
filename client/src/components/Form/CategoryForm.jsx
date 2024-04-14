import React from 'react';

const CategoryForm = ({handleSubmit,value,setValue}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label">Enter New Category</label>
    <input type="text" className="form-control" value={value} onChange={(e)=>setValue(e.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

        </>
    );
};

export default CategoryForm;