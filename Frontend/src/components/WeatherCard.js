import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ city, onClick }) => {
  // Add safety checks and default values
  if (!city || typeof city !== 'object') {
    console.warn('Invalid city data:', city);
    return (
      <div className="weather-card error-card">
        <div className="card-header">
          <h3 className="city-name">Invalid Data</h3>
        </div>
        <div className="card-body">
          <p>Unable to load weather data</p>
        </div>
      </div>
    );
  }

  // Log the actual city data to debug
  console.log('City data in WeatherCard:', city);

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Mist': '🌫️',
      'Fog': '🌫️'
    };
    return icons[condition] || '☁️';
  };

  // Handle click event
  const handleCardClick = () => {
    if (onClick) {
      onClick(city);
    }
  };

  // Handle keyboard events for accessibility
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  // Safe data extraction with fallbacks
  const cityName = city.name+", "+city.sys.country || city.city+", "+city.sys.country ;
  const weatherCondition = city.weather?.[0]?.main || city.condition ;
  const weatherDescription = city.weather?.[0]?.description || city.description ;
  const temperature = city.main?.temp || city.temp || city.temperature ;
  const tempMin = city.main?.temp_min || city.temp_min ;
  const tempMax = city.main?.temp_max || city.temp_max ;
  const pressure = city.main?.pressure || city.pressure ;
  const humidity = city.main?.humidity || city.humidity ;
  const visibility = city.visibility ;
  const windSpeed = city.wind?.speed || city.wind_speed ;
  const windDeg = city.wind?.deg || city.wind_deg ;
  const sunrise = city.sys?.sunrise || city.sunrise ;
  const sunset = city.sys?.sunset || city.sunset ;

  // Format current time
  const now = new Date();
  const currentTime = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const currentDate = now.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <div 
      className="modern-weather-card"
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View detailed weather for ${cityName}`}
      style={{ cursor: 'pointer' }}
    >
      {/* Header Section */}
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-title">{cityName}</h2>
          <p className="current-time">{currentTime}, {currentDate}</p>
        </div>
      </div>

      {/* Main Weather Section */}
      <div className="weather-main-section">
        <div className="weather-icon-section">
          <div className="weather-icon-large">
            {getWeatherIcon(weatherCondition)}
          </div>
          <p className="weather-description">{weatherDescription}</p>
        </div>
        
        <div className="temperature-section">
          <div className="main-temperature">{Math.round(temperature)}°C</div>
          <div className="temp-range">
            <p>Temp Min: {Math.round(tempMin)}°C</p>
            <p>Temp Max: {Math.round(tempMax)}°C</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="weather-details-section">
        <div className="details-left">
          <div className="detail-row">
            <span className="detail-label">Pressure:</span>
            <span className="detail-value">{pressure}hPa</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Humidity:</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Visibility:</span>
            <span className="detail-value">{(visibility / 1000).toFixed(1)}km</span>
          </div>
        </div>
        
        <div className="details-center">
          <div className="wind-info">
            <div className="wind-icon">🧭</div>
            <div className="wind-details">
              <p>{windSpeed}m/s {windDeg} Degree</p>
            </div>
          </div>
        </div>
        
        <div className="details-right">
          <div className="sun-times">
            <div className="sun-item">
              <span className="sun-label">Sunrise:</span>
              <span className="sun-time">{new Date(sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div className="sun-item">
              <span className="sun-label">Sunset:</span>
              <span className="sun-time">{new Date(sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;