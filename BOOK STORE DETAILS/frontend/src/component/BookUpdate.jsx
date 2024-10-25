
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: 0,
    description: '',
    isbn: '',
  });

  useEffect(() => {
    // Fetch the existing book details
    axios.get(`http://localhost:8000/book/singledata/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated book data to the backend
    axios.patch(`http://localhost:8000/book/update/${id}`, book)
      .then((res) => {
        console.log(res.data);
        alert('Book updated successfully!');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="book-update-form">
      <h2>Update Book</h2>
      <input name="title" value={book.title} placeholder="Title" onChange={handleChange} />
      <input name="author" value={book.author} placeholder="Author" onChange={handleChange} />
      <input name="price" value={book.price} type="number" placeholder="Price" onChange={handleChange} />
      <textarea name="description" value={book.description} placeholder="Description" onChange={handleChange}></textarea>
      <input name="isbn" value={book.isbn} placeholder="ISBN" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookUpdate;
