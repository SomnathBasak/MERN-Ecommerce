import React from "react";
import { useSearch } from '../../context/Search'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
        await axios({
         method:"GET",
         url:`http://localhost:8080/api/v1/product/search/${values.keyword}`
        }).then((res)=>{
            setValues({ ...values, results: res.data });
            navigate("/search");
        }).catch((err)=>{
            console.log(err);
        })
  };

  return (
    <>
      <form className="d-flex ms-3" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}/>
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
