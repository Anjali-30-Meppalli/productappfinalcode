import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './components/Product'
import Cart from './components/Cart'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Order from './components/Order'
import Transaction from './components/Transaction'
import UserDashboard from './other/UserDashboard'
import AdminDashboard from './other/AdminDashboard'
import AddProductForm from './components/AddProductForm'
import EditProduct from './components/EditProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
  
      <AuthProvider>
        <CartProvider>
        <div className='app-container'>
      <Navbar/>
      <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/log' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order/:id' element={<Order/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
        <Route path='/userdash' element={<UserDashboard/>}/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/add-product' element={<AddProductForm/>}/>
        <Route path='/add-product/:id' element={<EditProduct/>}/>
      </Routes>
      </main>
      <footer className='footer'>
        <p>© {new Date().getFullYear()}Your Company Name.All Rights Reserved.</p>
        <p>Instagram:Raada_mart | Facebook: Raada_mart</p>
        <p>Phone:+91 9894343294</p>
      </footer>
      </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
