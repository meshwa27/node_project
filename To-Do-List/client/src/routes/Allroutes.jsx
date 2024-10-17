import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../component/Home';
import EditPage from '../component/EditPage';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Routes>
  );
};

export default AllRoutes;
