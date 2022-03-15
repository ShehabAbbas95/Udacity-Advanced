import { Request, Response } from 'express';
import { verfiyAuthToken, verfiyAdminToken } from '../handler(routes)/auth';
import bcrypt from 'bcrypt';
import { UserStore } from '../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
const pepper = BCRYPT_PASSWORD as string;
const saltRounds: string = SALT_ROUNDS as string;
const secretToken = TOKEN_SECRET as string;

const usersRouter = require('express').Router();

const store = new UserStore();
/*
 * only for admins
 * call the user model
 * access all users info
 */
const indexUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const INFO = await store.index();
    res.send(INFO);
  } catch (err) {
    res.json(`Error index: ${err}`);
  }
};
/*
 * call the user model
 * access individual user info
 */
const showUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get the username from the req body
    const username = req.body;
    const INFO = await store.show(username);
    res.send(INFO);
  } catch (err) {
    res.json(`Error index: ${err}`);
  }
};
/*
 * call the user model
 * register a new user
 */
const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    // the data from the front end  will be from (req.body)
    const firstname = data.firstname;
    const lastname = data.lastname;
    const password = data.password;
    const username = data.username;
    const role = data.role;
    const hash = bcrypt.hashSync(password + pepper, parseInt(saltRounds));
    const userInfo = {
      username: username as string,
      role: role as string,
    };
    const JWT = jwt.sign({ sub: username, role: userInfo.role }, secretToken);

    await store.addUser(firstname, lastname, hash, username, JWT, role);
    res.json(JWT);
    res.send(`user ${firstname} added successfully `);
  } catch (err) {
    res.status(400);
    res.json(`Error creating new user${err}`);
  }
};
/*
 * call user model
 * check if the user exists
 * check provided username and password matches the ones in the DB
 * return token for the user
 */
const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const get_user_data = await store.signin(username);
    const Info = {
      role: get_user_data.role,
      token: get_user_data.token,
      userId: get_user_data.id,
    };
    const compare = bcrypt.compareSync(password + pepper, get_user_data.hash);
    if (!compare) {
      throw new Error(`YOUR Password Isn't Correct @ ${username}  `);
    }
    res.json(Info);
  } catch (err) {
    res.json(`Password Not Match: ${err}`);
  }
};

usersRouter.post('/', signIn);
usersRouter.get('/all_user_info', verfiyAdminToken, indexUsers);
usersRouter.post('/create', verfiyAdminToken, addUser);
usersRouter.get('/user_info', verfiyAuthToken, showUser);
usersRouter.post('/adduser', addUser);

export default usersRouter;
