import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginPage from './components/LoginPage';
import WeatherDashboard from './components/WeatherDashboard';
import './App.css';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? <WeatherDashboard /> : <LoginPage />}
    </div>
  );
}

export default App;

