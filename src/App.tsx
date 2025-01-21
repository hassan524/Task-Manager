import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import StartLayout from './render/layouts/StartLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GetStart from './render/layouts/contents/GetStart';
import Login from './render/Pages/login';
import Sign from './render/Pages/sign';
import MainLayout from './render/layouts/MainLayout';
import Home from './render/Pages/Home';
import DashBoard from './render/Pages/Dashboard';
import { MyProvider } from './contexts/context';
import CompletedGroup from './render/Pages/CompletedGroup';
import CompletedProject from './render/Pages/CompletedProject';
import CompletedTask from './render/Pages/CompletedTask';

AOS.init();

const App = () => {
  return (
    <MyProvider> 
      <Routes>
        {/* Start Routes */}
        <Route path="/" element={<StartLayout />}>
          <Route index element={<GetStart />} />
          <Route path="login" element={<Login />} />
          <Route path="sign" element={<Sign />} />
        </Route>

        {/* Main Routes */}
        <Route element={<MainLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<DashBoard />} />

          <Route path="CompletedTask" element={<CompletedTask />} />
          <Route path="CompletedGroupTask" element={<CompletedGroup />} />
          <Route path="CompletedProject" element={<CompletedProject />} />
        </Route>
      </Routes>

    </MyProvider>
  );
};

export default App;
