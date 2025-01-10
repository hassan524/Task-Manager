import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import StartLayout from './render/layouts/StartLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GetStart from './render/layouts/contents/GetStart';
import Login from './render/Pages/login';
import Sign from './render/Pages/sign';
import MainLayout from './render/layouts/MainLayout';

AOS.init();

const App = () => {

  return (
      
    <Routes>
      
      {/* Start Routes  */}
      <Route path="/" element={<StartLayout />}>
        <Route index element={<GetStart />} />
        <Route path="login" element={<Login />} />
        <Route path="Sign" element={<Sign />} />
      </Route>
      
      {/* Main Routes */}
      <Route path="home" element={<MainLayout />}>
      
      </Route>
      
    </Routes>
      
  );
};

export default App;