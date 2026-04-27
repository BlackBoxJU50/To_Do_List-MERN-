import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("authenticated"));

  const handleLoginSuccess = () => {
    setAuth(true);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/home" element={auth ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
