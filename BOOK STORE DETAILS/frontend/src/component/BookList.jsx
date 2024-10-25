import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const getbookdata = () => {
    axios.get('http://localhost:8000/book/getbook')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/book/delete/${id}`)
      .then((res) => {
        getbookdata();  // Refresh book list after deletion
        alert('Book deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    navigate(`/book/edit/${id}`);  // Navigate to the BookUpdate component
  };

  const handleViewDetails = (id) => {
    navigate(`/book/detail/${id}`);  // Navigate to the BookDetail component
  };

  useEffect(() => {
    getbookdata();
  }, []);

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="container book-card" key={book._id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>${book.price}</p>
          <p>{book.description}</p>
          <button onClick={() => handleViewDetails(book._id)}>View Details</button>
          <button style={{backgroundColor:'black'}} onClick={() => handleEdit(book._id)}>Edit</button>
          <button onClick={() => handleDelete(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
