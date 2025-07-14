import React from 'react';
import './WeatherDetailCard.css';

const WeatherDetailCard = ({ city, onBack }) => {
    console.log(city);
  if (!city) {
    return null;
  }

  const cityName = city.name+", "+city.sys.country || city.city+", "+city.sys.country ;
  const weatherCondition = city.weather?.[0]?.main || city.condition ;
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


  const getWindIcon = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L16 6L12 10L8 6L12 2Z" fill="white"/>
        <path d="M12 10V22" stroke="white" strokeWidth="2"/>
      </svg>
    );
  };

  return (
    <div className="weather-detail-container">
      <div className="detail-weather-card">
        <div className="detail-card-header">
          <button className="detail-back-button" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="detail-location-info">
            <h2 className="detail-city-name">{cityName}</h2>
            <p className="detail-time">{currentTime}, {currentDate}</p>
          </div>
        </div>

        <div className="detail-weather-display">
          <div className="detail-weather-left">
            <div className="detail-weather-icon">
              {getWeatherIcon(weatherCondition)}
            </div>
            <p className="detail-weather-condition">{weatherCondition}</p>
          </div>
          
          <div className="detail-weather-right">
            <div className="detail-main-temp">{Math.round(temperature)}°C</div>
            <div className="detail-temp-range">
              <p>Temp Min: {Math.round(tempMin)}°C</p>
              <p>Temp Max: {Math.round(tempMax)}°C</p>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-info-container">
        <div className="detail-info-row">
          <div className="detail-info-section">
            <div className="detail-info-item">
              <span className="info-label">Pressure:</span>
              <span className="info-value">{pressure}hPa</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Humidity:</span>
              <span className="info-value">{humidity}%</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Visibility:</span>
              <span className="info-value">{visibility}km</span>
            </div>
          </div>

          <div className="detail-info-section wind-section">
            <div className="wind-display">
              <div className="wind-icon">
                {getWindIcon()}
              </div>
              <div className="wind-text">
                <p>{windSpeed}m/s {windDeg} Degree</p>
              </div>
            </div>
          </div>

          <div className="detail-info-section">
            <div className="detail-info-item">
              <span className="info-label">Sunrise:</span>
              <span className="info-value">{sunrise ? new Date(sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
            </div>
            <div className="detail-info-item">
              <span className="info-label">Sunset:</span>
              <span className="info-value">{sunset ? new Date(sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailCard;