import React from 'react';
import './App.css';
import NavBar from './components/NavBar.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
