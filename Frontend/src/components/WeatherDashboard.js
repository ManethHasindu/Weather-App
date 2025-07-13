import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from './WeatherCard';
import WeatherDetailCard from './WeatherDetailCard';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const { logout, user } = useAuth0();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3001/api/weather');
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      
      // Debug: Log the actual response structure
      console.log('API Response:', data);
      console.log('Type of data:', typeof data);
      console.log('Is Array?', Array.isArray(data));
      
      // Always ensure weatherData is an array
      let processedData = [];
      
      if (Array.isArray(data)) {
        processedData = data;
      } else if (data && Array.isArray(data.cities)) {
        processedData = data.cities;
      } else if (data && Array.isArray(data.data)) {
        processedData = data.data;
      } else if (data && Array.isArray(data.weather)) {
        processedData = data.weather;
      } else if (data && Array.isArray(data.results)) {
        processedData = data.results;
      } else if (data && typeof data === 'object') {
        // If it's a single object, wrap it in an array
        processedData = [data];
      } else {
        console.warn('Unexpected API response format:', data);
        processedData = [];
      }
      
      console.log('Processed data:', processedData);
      setWeatherData(processedData);
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setWeatherData([]); // Always reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const handleCardClick = (city) => {
    setSelectedCity(city);
    setShowDetailView(true);
  };

  const handleBackClick = () => {
    setShowDetailView(false);
    setSelectedCity(null);
  };

  const handleAddCity = async () => {
    if (cityInput.trim()) {
      try {
        // Add logic to fetch weather for the new city
        const response = await fetch(`http://localhost:3001/api/weather/${cityInput}`);
        if (response.ok) {
          const newCityData = await response.json();
          setWeatherData(prev => [...prev, newCityData]);
        }
        setCityInput('');
      } catch (err) {
        console.error('Error adding city:', err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCity();
    }
  };

  if (showDetailView && selectedCity) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="weather-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" fill="white"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h1>Weather App</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <img
                src={user?.picture}
                alt={user?.name}
                className="user-avatar"
              />
              <span className="user-name">{user?.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="dashboard-main detail-main">
          <WeatherDetailCard 
            city={selectedCity} 
            onBack={handleBackClick}
          />
        </main>

        <footer className="dashboard-footer">
          <p>2021 Fidenz Technologies</p>
        </footer>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading weather data</h2>
        <p>{error}</p>
        <button onClick={fetchWeatherData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="weather-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" fill="white"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h1>Weather App</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <img
              src={user?.picture}
              alt={user?.name}
              className="user-avatar"
            />
            <span className="user-name">{user?.name}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter a city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="city-input"
            />
            <button 
              onClick={handleAddCity}
              className="add-city-button"
            >
              Add City
            </button>
          </div>
        </div>

        <div className="weather-grid">
          {Array.isArray(weatherData) && weatherData.length > 0 ? (
            weatherData.map((city, index) => (
              <WeatherCard 
                key={city?.id || `city-${index}`} 
                city={city} 
                onClick={() => handleCardClick(city)}
              />
            ))
          ) : (
            <div className="no-data-message">
              <p>No weather data available</p>
              <p>Check console for API response details</p>
            </div>
          )}
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>2024 Fidenz Technologies</p>
      </footer>
    </div>
  );
};

export default WeatherDashboard;