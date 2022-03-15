import { UserStore } from '../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const store = new UserStore();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
const pepper = BCRYPT_PASSWORD as string;
const saltRounds: string = SALT_ROUNDS as string;
const secretToken = TOKEN_SECRET as string;

let username: string, password: string;

describe('test users methods', () => {
  beforeAll(async () => {
    password = 'hell123';
    const firstName = 'ahmed',
      lastName = 'mohamed',
      hash = bcrypt.hashSync(password + pepper, parseInt(saltRounds)),
      role = 'admin',
      JWT = jwt.sign({ sub: username, role: role }, secretToken);
    username = 'test_ahmed';
    await store.addUser(firstName, lastName, hash, username, JWT, role);
  });
  it('test index method to be defined ', () => {
    expect(store.index).toBeDefined();
  });
  it('test sign in  ', async () => {
    const result = await store.signin(username);
    const compare = bcrypt.compareSync(password + pepper, result.hash);
    expect(compare).toBeTrue();
  });

  /* it('test show all users info  ', async () => {
    const result = await store.index();
    expect(result[0].lastName).toBe('mohamed');
  }); */
  it('test show user info  ', async () => {
    const username = 'test_ahmed',
      result = await store.show(username);
    expect(result.id).toEqual(1);
  });
});
