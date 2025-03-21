import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Test from '../pages/Test';

const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/test" element={<Test />} />
  </Routes>
);

export default RouterComponent;
