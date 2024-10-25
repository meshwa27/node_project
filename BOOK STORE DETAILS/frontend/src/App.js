import {  Route, Routes } from 'react-router-dom';
import BookList from './component/BookList';
import BookForm from './component/BookForm';
import BookUpdate from './component/BookUpdate';
import BookDetails from './component/BookDetails';
import Navbar from './component/Navbar';


function App() {
  return (
    <>
    <Navbar />
      <Routes>
      
        <Route path="/" element={<BookList />} />
        <Route path="/book/create" element={<BookForm />} />
        <Route path="/book/edit/:id" element={<BookUpdate />} />
        <Route path="/book/detail/:id" element={<BookDetails />} />
         
      </Routes>
      </>
  );
}

export default App;
