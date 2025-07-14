import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LoginPage.css';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="weather-icon">
        
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
          <p>2025 Weather App - Powered by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
