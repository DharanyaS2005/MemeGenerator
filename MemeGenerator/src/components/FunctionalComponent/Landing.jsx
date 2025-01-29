import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Meme Generator</h1>
      <div className="button-container">
        <button
          className="signup-btn"
          onClick={() => navigate('/signup')} 
        >
          Signup
        </button>
        <button
          className="login-btn"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Landing;
