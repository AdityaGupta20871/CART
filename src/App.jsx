import React from 'react'
import Header from './components/Header'
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './App.css'

const App = () => {
  return (
    <div className='container'>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
  </div>
  )
}

export default App