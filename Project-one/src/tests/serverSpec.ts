import supertest from 'supertest';
import app from '../server';

const requestTest = supertest(app);

describe('test our main server api', () => {
  it('test welcome api', async (done) => {
    const apiResponse = await requestTest.get('/');
    expect(apiResponse.status).toBe(200);
    done();
  });
  it('test our image processing api if no query data is given ', async (done) => {
    const apiResponse = await requestTest.get('/image');
    expect(apiResponse.status).toBe(500);
    const apiResponses = await requestTest.get('/image?filename=index.jpg');
    expect(apiResponses.status).toBe(500);
    console.log('you should specify positive value for width and height');
    done();
  });
  it('test our image processing api ', async (done) => {
    const apiResponse = await requestTest.get(
      '/image?filename=index.jpg&width=200&height=200'
    );
    expect(apiResponse.status).toBe(200);
    done();
  });
});
