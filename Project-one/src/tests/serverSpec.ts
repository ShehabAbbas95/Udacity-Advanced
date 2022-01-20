import supertest from 'supertest';
import app from '../server';

const requestTest = supertest(app);

describe('test our main server api', () => {
  it('test welcome api', async () => {
    const apiResponse = await requestTest.get('/');
    expect(apiResponse.status).toBe(200);
    ;
  });
  it('test our image processing api ', async () => {
    const apiResponse = await requestTest.get(
      '/image?filename=index.jpg&width=200&height=200'
      );
      expect(apiResponse.status).toBe(200);
    });
  it('test our image processing api if  query data is missing ', async (done) => {
    const apiResponse = await requestTest.get('/image');
    expect(apiResponse.status).toBe(500);
    const apiResponses = await requestTest.get('/image?filename=index.jpg');
    expect(apiResponses.status).toBe(500);
    console.log('\n \nyou should specify positive value for width and height');
    done();
  });
});
