import client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};
export class ProductStore {
  /*
   * Show all products in the DB
   */

  async index (): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      const product_info = result.rows;
      conn.release();
      return product_info;
    } catch (err) {
      throw new Error(`no users found ${err}`);
    }
  }

  /*
   * Show individual product in the DB
   * it takes the name of the product
   */
  async showProduct (productName: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE name=($1)';
      const result = await conn.query(sql, [productName]);
      const product_info = result.rows[0];
      conn.release();
      return product_info;
    } catch (err) {
      throw new Error(`no users found ${err}`);
    }
  }

  /*
   * Add new Product to the DB
   * it takes name, price, category of the product
   */
  async addProduct (
    name: string,
    price: number,
    category: string
  ): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [name, price, category]);
      const product_info = result.rows[0];
      conn.release();
      return product_info;
    } catch (err) {
      throw new Error(`no products found ${err}`);
    }
  }

  /*
   * Delete a Product to the DB
   * it takes the name of the product
   */
  async deleteProduct (name: string): Promise<void> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products where name =($1)';
      await conn.query(sql, [name]);
      conn.release();
    } catch (err) {
      throw new Error(`no products found ${err}`);
    }
  }
}
