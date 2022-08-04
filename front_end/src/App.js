import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Addcat from './Addcat';
import Showcat from './Showcat';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
const App = () => {


  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/category' element={<Addcat />} />
        <Route exact path='/showcategory' element={<Showcat />} />

      </Routes>


    </>
  );
}

export default App;