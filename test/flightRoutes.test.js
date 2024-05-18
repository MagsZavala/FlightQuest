const request = require('supertest');
const app = require('../server'); // Path to your server file

describe('Flight API', () => {
    it('should search flights', async () => {
        const response = await request(app)
            .get('/api/flights/search?fromId=1&toId=2&departDate=2024-12-31');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
