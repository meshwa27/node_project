import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const initialState = {
  title: '',
  description: '',
  price: '',
  image: '',
  category: '',
};

const EditPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState); 

  
  const fetchProductData = () => {
    axios.get(`http://localhost:8080/getproduct/${id}`)
      .then((res) => {
        setProduct(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    fetchProductData();
  }, []);

  
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission and update the product data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:8080/updateproduct/${id}`, product)
      .then((res) => {
        console.log(res.data)
        alert('Product updated successfully');
        navigate('/');
        fetchProductData() // Navigate back to the product list after successful update
      })
      .catch((err) => {
        alert("Error..!")
        console.log(err);
      });
  };

  const {title,price,description,image,category}=product;

  return (
    <div>
      <h2 style={{textAlign:'center'}}>Edit Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={handleChange}
        />
        
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={handleChange}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditPage;
