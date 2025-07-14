const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');
const { auth } = require('express-oauth-server');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Cache with 5 minutes TTL
const cache = new NodeCache({ stdTTL: 300 });

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 configuration
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

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


app.get('/api/weather', async (req, res) => {
  try {
    const cacheKey = 'weather_data';
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log('Serving cached data');
      return res.json(cachedData); // return from cache
    }

    const weatherData = [];

    for (const cityId of CITY_CODES) {
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
      const response = await axios.get(apiUrl);
      weatherData.push(response.data);
    }

    cache.set(cacheKey, weatherData);
    console.log('Fetched and cached individual city data');

    res.json(weatherData); // return the array of weather data
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});


app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ 
    message: 'This is a protected route',
    user: req.user 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    cache_stats: cache.getStats()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  next(error);
});

// Start server
app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Weather endpoint: http://localhost:${PORT}/api/weather`);
});
