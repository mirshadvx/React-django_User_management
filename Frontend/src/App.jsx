import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin/Admin'
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
  localStorage.clear()
  return <Navigate to={"/login"} />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
 

  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute>
        <Home />
      </ProtectedRoute>} />
      <Route path='/login'  element={<Login />}/>
      <Route path='/logout'  element={<Logout />}/>
      <Route path='/register' element={<RegisterAndLogout />} />
      <Route path='/test' element={<h1>hi</h1>} />
      <Route path='/admin' element={<ProtectedRoute>
        <Admin />  </ProtectedRoute>} />
      <Route path='/*' element={<NotFound />} />
      
    </Routes>
  )
}

export default App
