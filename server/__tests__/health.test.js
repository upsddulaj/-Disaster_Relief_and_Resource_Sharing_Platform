import request from 'supertest';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.json({ status: 'ok' }));

describe('Health check', () => {
  it('returns ok', async () => {
    const response = await request(app).get('/');
    expect(response.body.status).toBe('ok');
  });
});
