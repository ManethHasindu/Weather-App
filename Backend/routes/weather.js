const express = require('express');
const NodeCache = require('node-cache');
const WeatherService = require('../services/weatherService');

const router = express.Router();
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

// City codes from cities.json
const CITY_CODES = [
  "1248991", // Colombo
  "1850147", // Tokyo
  "2644210", // Liverpool
  "2988507", // Paris
  "2147714", // Sydney
  "4930956", // Boston
  "1796236", // Shanghai
  "3143244"  // Oslo
];

// Get weather data for all cities
router.get('/', async (req, res) => {
  try {
    const cacheKey = 'weather_data_all';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      console.log('Serving cached weather data');
      return res.json({
        data: cachedData,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY);
    const weatherResponse = await weatherService.getWeatherByGroup(CITY_CODES);
    
    // Cache the data
    cache.set(cacheKey, weatherResponse.list);
    console.log('Weather data cached for 5 minutes');
    
    res.json({
      data: weatherResponse.list,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in weather route:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

// Get weather data for specific city
router.get('/:cityId', async (req, res) => {
  try {
    const { cityId } = req.params;
    const cacheKey = `weather_data_${cityId}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      console.log(`Serving cached weather data for city ${cityId}`);
      return res.json({
        data: cachedData,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    const weatherService = new WeatherService(process.env.OPENWEATHER_API_KEY);
    const weatherData = await weatherService.getWeatherByCity(cityId);
    
    // Cache the data
    cache.set(cacheKey, weatherData);
    console.log(`Weather data for city ${cityId} cached for 5 minutes`);
    
    res.json({
      data: weatherData,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in weather route:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

module.exports = router;