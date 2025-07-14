import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from './WeatherCard';
import WeatherDetailCard from './WeatherDetailCard';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const { logout, user } = useAuth0();
  const [weatherData, setWeatherData] = useState([]);
  const [availableWeatherData, setAvailableWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchAllWeatherData();
  }, []);

  const fetchAllWeatherData = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/weather');
      const data = await res.json();
      if (Array.isArray(data)) {
        setAvailableWeatherData(data);
        setWeatherData([data[0]]);
      } else {
        throw new Error('Invalid weather data format');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: 'http://localhost:3000/',
      },
    });
  };

  const handleCardClick = (city) => {
    setSelectedCity(city);
    setShowDetailView(true);
  };

  const handleBackClick = () => {
    setSelectedCity(null);
    setShowDetailView(false);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setCityInput(input);
    if (!input.trim()) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const suggestions = availableWeatherData
      .map(c => c.name)
      .filter(name => name.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5);
    setFilteredSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setCityInput(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleAddCity = () => {
    const input = cityInput.trim();
    if (!input) return;

    const matchedCity = availableWeatherData.find(
      city => city.name.toLowerCase() === input.toLowerCase()
    );

    if (!matchedCity) {
      alert('City not found in available data.');
      return;
    }

    const alreadyExists = weatherData.some(
      city => city.name.toLowerCase() === matchedCity.name.toLowerCase()
    );
    if (alreadyExists) {
      alert('City already exists.');
      return;
    }

    setWeatherData(prev => [...prev, matchedCity]);
    setCityInput('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleRemoveCity = (cityToRemove) => {
    if (weatherData.length <= 1) {
      alert('At least one city must remain.');
      return;
    }
    setWeatherData(prev =>
      prev.filter(city => city.name !== cityToRemove.name)
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddCity();
  };

  if (showDetailView && selectedCity) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="weather-icon">
                <img src={require('../assets/icon.png')} alt="Weather Icon" className="weather-icon-img" />
            </div>
            <h1>Weather App</h1>
          </div>
          <div className="header-right">
            <img src={user?.picture} alt={user?.name} className="user-avatar" />
            <span className="user-name">{user?.name}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </header>
        <main className="dashboard-main detail-main">
          <WeatherDetailCard city={selectedCity} onBack={handleBackClick} />
        </main>
        <footer className="dashboard-footer"><p>2025 Fidenz Technologies</p></footer>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="weather-icon">
              <img src={require('../assets/icon.png')} alt="Weather Icon" className="weather-icon-img" />
          </div>
          <h1>Weather App</h1>
        </div>
        <div className="header-right">
          <img src={user?.picture} alt={user?.name} className="user-avatar" />
          <span className="user-name">{user?.name}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="search-section">
          <div className="search-container" style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Enter a city"
              value={cityInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="city-input"
              disabled={searchLoading}
            />
            <button
              onClick={handleAddCity}
              className="add-city-button"
              disabled={searchLoading || !cityInput.trim()}
            >
              {searchLoading ? 'Adding...' : 'Add City'}
            </button>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="weather-grid">
          {weatherData.map((city, idx) => (
            <WeatherCard
              key={city.id || city.name || `city-${idx}`}
              city={city}
              onClick={() => handleCardClick(city)}
              onRemove={() => handleRemoveCity(city)}
              showRemoveButton={weatherData.length > 1}
            />
          ))}
        </div>
      </main>

      <footer className="dashboard-footer"><p>2025 Fidenz Technologies</p></footer>
    </div>
  );
};

export default WeatherDashboard;
