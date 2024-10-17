import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const fetchdatafromserver = () => {
    axios.get("http://localhost:8080/getproduct")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchdatafromserver();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/addproduct", newProduct)
      .then((res) => {
        console.log(res.data);
        fetchdatafromserver();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/deleteproduct/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchdatafromserver();
        alert("Product deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const {title,price,description,category,image}=newProduct

  return (
    <div>
      <h2 style={{textAlign:'center',marginTop:'50px'}}>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" name="title" placeholder="Title" value={title} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={price} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={description} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={category} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={image} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <div className="product-list">
        {data.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} height={250} width={200} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">${product.price}</p>

            <div className="btn">
            <Link to={`/edit/${product.id}`}>
              <button className='product-btn'>Edit</button>
            </Link>
            <button className='product-btn' onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
