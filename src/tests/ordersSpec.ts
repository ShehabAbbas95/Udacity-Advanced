import { OrderStore } from '../models/order';

const store = new OrderStore();

describe('test orders methods', () => {
  it('test index method to be defined ', () => {
    expect(store.ordersindex).toBeDefined();
  });
  it('test adding order', async () => {
    const user_id = 1 as number;
    const result = await store.addOrder(user_id);
    expect(result.id).toEqual(1);
  });
  it('add order_products', async () => {
    const order_id = 1,
      product_details = [
        { id: '2', quantity: 2 },
        { id: '1', quantity: 5 },
      ],
      completed = true;
    const result = await store.addOrder_products(
      order_id,
      product_details,
      completed
    );
    expect(result.completed).toBe(true);
  });
});
