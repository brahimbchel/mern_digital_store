
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { useSelector } from "react-redux"
import Profile from "./Profile"
import Login from "./pages/Login"
import Home from './pages/Home';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import OneProduct from './pages/OneProduct';

function App() {


  return (

    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/products" element={
          <>
            <Header />
            <Products />
            <Footer />
          </>
        } />
        <Route path="/products/:productId" element={
          <>
            <Header />
            <OneProduct />
            <Footer />
          </>
        } />
        
        <Route path="/profile" element={
        <>
        <Header />
        <Profile />
        <Footer />
      </>
        } />
      </Routes>
    </Router>

  )
}

export default App
