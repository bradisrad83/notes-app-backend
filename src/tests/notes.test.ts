import request from 'supertest';
import app from '../index';

describe('Notes API', () => {
  it('should return an empty array initially', async () => {
    const response = await request(app).get('/notes');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
