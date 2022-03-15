import client from '../database';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  hash: string;
  role: string;
  username: string;
  token: string;
};
export type Admin = {
  role: string;
};
export class UserStore {
  /*
   * show all users info only for admins
   * should pass Authadmin (admin should pass token and role in the auth header)
   */
  async index (): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT  * FROM users';
      const result = await conn.query(sql);
      const all_users_info = result.rows;
      conn.release();
      return all_users_info;
    } catch (err) {
      throw new Error(`index error ${err}`);
    }
  }

  /*
   * Admin sign in for admins auth
   */
  async admin (token: string): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT  role FROM users where token = ($1)';

      const result = await conn.query(sql, [token]);
      const user_role = result.rows[0].role;
      console.log(user_role);
      conn.release();
      return user_role;
    } catch (err) {
      throw new Error(`admin error ${err}`);
    }
  }

  /*
   * Show Individual User Info
   */

  async show (username: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE username= ($1)';
      const result = await conn.query(sql, [username]);
      const user_info = result.rows[0];
      conn.release();
      return user_info;
    } catch (err) {
      throw new Error(`no users to show ${err}`);
    }
  }

  /*
   * Register User
   * Create User By Admin will be the same but admin should be verified by verfiyAdminToken
   */
  async addUser (
    firstName: string,
    lastName: string,
    hash: unknown,
    username: string,
    JWT: string,
    role: string
  ): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users ( username,hash,token, firstname, lastname,role) VALUES($1, $2, $3, $4, $5,$6) RETURNING *';
      const result = await conn.query(sql, [
        username,
        hash,
        JWT,
        firstName,
        lastName,
        role,
      ]);
      const user_info = result.rows[0];
      conn.release();
      return user_info;
    } catch (err) {
      throw new Error(`no users added to DB ${err}`);
    }
  }
  /*
   * SignIn a user
   * return token to be used in other routes
   */

  async signin (username: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users  WHERE  username =($1)';
      const result = await conn.query(sql, [username]);
      const user_info = result.rows[0];
      /*  const x = JSON.stringify(user_info)
      const compare = bcrypt.compareSync(
        password + pepper ,
        user_info.hash as string
      );
      if (!compare) {
        throw new Error(`YOUR Password Isn't Correct @ ${username} is ${user_info.hash} is ${x} , ${compare}`);
      } */
      conn.release();
      return user_info;
    } catch (err) {
      throw new Error(`Invalid username  ${err}`);
    }
  }
}
