import axios from 'axios';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/login", { email, password })
      .then(result => {
        console.log(result)
        if (result.data.status === "Success") {
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("email", email);
          localStorage.setItem("name", result.data.name);
          onLoginSuccess();
          navigate('/home');
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 border-0" style={{ width: '400px', borderRadius: '15px' }}>
        <h1 className="text-center mb-4 fw-bold" style={{ color: '#4a4a4a' }}>My To Do List</h1>
        <h2 className="text-center mb-4 fw-bold" style={{ color: '#4a4a4a' }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary">Email Address</label>
            <input
              type="email"
              className="form-control bg-light border-0"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '12px' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
            <input
              type="password"
              className="form-control bg-light border-0"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '12px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 mb-3 fw-bold" style={{ borderRadius: '10px', backgroundColor: '#0056b3', border: 'none' }}>
            Login
          </button>

          <div className="text-center text-muted mb-3 small">
            Don't have an account?
          </div>
          <button type="button" className="btn btn-outline-secondary w-100 py-2 fw-bold" style={{ borderRadius: '10px' }}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
