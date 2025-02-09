import React from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Analytics from './components/Analytics';
import QRCodeGenerator from "./components/QRCodeGenerator";
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/generate-qr' element={<QRCodeGenerator />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
