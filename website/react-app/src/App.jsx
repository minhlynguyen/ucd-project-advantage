
// eslint-disable-next-line no-unused-vars 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeatmapPage from './components/HeatmapPage/HeatmapPage';

function App() {
  return (
    <Router>
      <MyRoutes />
    </Router>
  );
}

function MyRoutes() {
  let location = useLocation();

  return (
    <div>
      {/* Only show Header when not on LoginPage */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
        <Route path='/heatmap' element={<HeatmapPage />} />

        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
      {/* Only show Footer when not on LoginPage */}
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}


export default App;
