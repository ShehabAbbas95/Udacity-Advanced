import client from '../database';

export type Order = {
  id: number;
};
export type Order_Products = {
  order_id: number;
  product_id: number;
  quantity: number;
  completed: boolean;
};
export class OrderStore {
  // show current orders
  async ordersindex (user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM orders join orders_products ON orders.id= orders_products.order_id WHERE orders.user_id=($1) and orders_products.completed="false"';
      const result = await conn.query(sql, [user_id]);
      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`You Didn't make any orders yet ${err}`);
    }
  }

  // show completed orders
  async ordersDone (user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM orders join orders_products ON orders.id= orders_products.order_id WHERE orders.user_id=($1) and orders_products.completed="true"';
      const result = await conn.query(sql, [user_id]);
      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`no users found ${err}`);
    }
  }

  // Add order
  async addOrder (user_id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING id';
      const result_one = await conn.query(sql, [user_id]);
      const user_info = result_one.rows[0];
      conn.release();
      return user_info;
    } catch (err) {
      throw new Error(`error on adding order in orders ${err}`);
    }
  }

  async addOrder_products (
    order_id: number | Order,
    products_details: any[],
    status: boolean
  ): Promise<Order_Products> {
    try {
      const conn = await client.connect();
      let user_info: unknown;
      for (let i: number = 0; i < products_details.length; i++) {
        const product_id = products_details[i].id;
        const product_quantity = products_details[i].quantity;

        const sql =
          'INSERT INTO orders_products (order_id,product_id, quantity, completed) VALUES($1,$2,$3,$4) RETURNING *';
        const result_one = await conn.query(sql, [
          order_id,
          product_id,
          product_quantity,
          status,
        ]);
        user_info = result_one.rows[0];
      }
      conn.release();
      return user_info as Order_Products;
    } catch (err) {
      throw new Error(`error on adding order in order_products ${err}`);
    }
  }
}
