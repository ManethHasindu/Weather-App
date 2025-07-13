import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LoginPage.css';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="weather-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 4.26L16 2L14.74 5.26L18 4L16.74 7.26L20 6L18.74 9.26L22 8L20.74 11.26L24 10L22.74 13.26L24 14L22.74 17.26L20 16L18.74 19.26L16 18L14.74 21.26L12 20L9.26 21.26L8 18L5.26 19.26L4 16L1.26 17.26L0 14L1.26 13.26L0 10L2.26 11.26L4 8L6.26 9.26L8 6L10.26 7.26L12 4L13.74 5.26L16 2Z" fill="white"/>
          </svg>
        </div>
        <h1 className="app-title">Weather App</h1>
        <p className="app-subtitle">Your personal weather companion</p>
        
        <div className="login-form">
          <button 
            className="login-button"
            onClick={() => loginWithRedirect()}
          >
            Sign In to Continue
          </button>
        </div>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🌤️</span>
            <span>Real-time Weather</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🌍</span>
            <span>Multiple Cities</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <span>Secure Access</span>
          </div>
        </div>
        
        <footer className="login-footer">
          <p>2024 Weather App - Powered by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
