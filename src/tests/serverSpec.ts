import supertest from 'supertest';
import app from '../server';

const requestTest = supertest(app);

describe('testing server \n test users api', () => {
  it('test index api', async () => {
    const apiResponse_index = await requestTest.post('/users');
    expect(apiResponse_index.status).toBe(200);

    const apiResponse_all = await requestTest.get('/users/all_user_info');
    expect(apiResponse_all.status).toBe(401);
  });
});

describe('test products api', () => {
  it('test index api', async () => {
    const apiResponse_index = await requestTest.get('/products');
    expect(apiResponse_index.status).toBe(200);
  });
  it('test add product api', async () => {
    const apiResponse = await requestTest.post('/products/addproduct');
    expect(apiResponse.status).toBe(401);
  });
  it('test add product api', async () => {
    const apiResponse = await requestTest.post('/products/deleteproduct');
    expect(apiResponse.status).toBe(401);
  });
  it('test show product api', async () => {
    const apiResponse = await requestTest.get('/products/product_info/:XBox');
    expect(apiResponse.status).toBe(200);
  });
});
describe('test orders api', () => {
  it('test index api', async () => {
    const apiResponse_index = await requestTest.get('/orders/current_orders');
    expect(apiResponse_index.status).toBe(401);
    const apiResponse_all = await requestTest.get('/orders/orders_completed');
    expect(apiResponse_all.status).toBe(401);
  });
  it('test add orders api', async () => {
    const apiResponse = await requestTest.post('/orders/addorder');
    expect(apiResponse.status).toBe(401);
  });
});
