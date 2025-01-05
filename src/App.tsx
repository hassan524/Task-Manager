import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loginlayout from './render/layouts/loginlayout';

const App = () => {
  return (
    
    <Routes>
      <Route path='/' element={<Loginlayout />}/> 
    </Routes>

  );
}

export default App;
