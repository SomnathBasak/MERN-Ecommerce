import React from "react";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate=useNavigate();
  const [values, setValues] = useSearch();
  return (
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} results`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button onClick={()=>navigate(`/product/${p.slug}`)} className="btn btn-info ms-1">See Details</button>
                  <button className="btn btn-secondary ms-1">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Search;
