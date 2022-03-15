import { ProductStore } from '../models/product';

const store = new ProductStore();

describe('test products methods', () => {
  it('test index method to be defined ', () => {
    expect(store.index).toBeDefined();
  });
  it('test adding product', async () => {
    const name = 'XBox',
      price = 10000,
      category = 'Gaming Platform';
    const result = await store.addProduct(name, price, category);
    const name1 = 'PS5',
      price1 = 15000,
      category1 = 'Gaming Platform';
    await store.addProduct(name1, price1, category1);
    expect(result.name).withContext('XBox');
  });
  it('test deleting product', async () => {
    const name = 'Test',
      price = 10000,
      category = 'Gaming Platform';
    await store.addProduct(name, price, category);
    const result = await store.deleteProduct(name);
    expect(result).toBeTrue();
  });
  it('show product', async () => {
    const productName = 'XBox';
    const result = await store.showProduct(productName);
    expect(result.price).toBe(10000);
  });
});
