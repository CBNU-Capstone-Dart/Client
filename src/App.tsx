import React from 'react';
import './App.css';
import NavBar from './components/NavBar.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Portfolio from './pages/Portfolio.tsx';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from './pages/AuthContext.tsx';


function App() {
  return (
    <RecoilRoot>
    <AuthProvider> 
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
