const request = require('supertest');
const app = require('../server');

describe('Weather API Tests', () => {
  describe('GET /api/weather', () => {
    it('should return weather data for all cities', async () => {
      const response = await request(app)
        .get('/api/weather')
        .expect(200);
      
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});
