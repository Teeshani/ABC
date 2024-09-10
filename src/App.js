import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Overview from './components/Overview';
import Gallery from './components/Gallery';
import ProductDetails from './components/ProductDetails';
import NewArrivals from './components/NewArrivals';
import ReservationPage from './components/ReservationPage'; // Import ReservationPage

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/overview" element={<Overview/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/" element={<NewArrivals />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/reserve" element={<ReservationPage />} /> {/* Add route for reservation */}
  
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
