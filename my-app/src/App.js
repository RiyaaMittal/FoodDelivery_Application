
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Placeorder from './pages/placeorder/Placeorder';
import Footer from './Components/footer/Footer';
import { useState } from 'react';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Myorders from './pages/Myorders/Myorders';

function App() {
  const [showlogin,setshowlogin]=useState(false);


  return (
    <>
    {showlogin?<LoginPopup setshowlogin={setshowlogin}/>:<></>}
    <div className="App">
      <Navbar setshowlogin={setshowlogin} /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Placeorder />} />
        <Route path='/order' element={<Placeorder />} />
        <Route path='/myorders' element={<Myorders />} />
        {/* <Route path='/myorders' element={</>} /> */}
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;
