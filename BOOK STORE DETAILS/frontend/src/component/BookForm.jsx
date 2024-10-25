import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BookForm = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: 0,
    description: '',
    isbn: '',
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/book/create", book)
      .then((res) => {
        console.log(res.data);
        alert("Book added successfully!");
        navigate('/');

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <h2 style={{textAlign:'center'}}>Add Books</h2>
    <form onSubmit={handleSubmit} className="book-form">
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="author" placeholder="Author" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input name="isbn" placeholder="ISBN" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default BookForm;
