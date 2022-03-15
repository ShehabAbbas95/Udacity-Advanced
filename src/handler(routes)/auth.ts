import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserStore } from '../models/user';

const store = new UserStore();

export const verfiyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    console.log(token, authorizationHeader);
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Unable to authenticate Invalid token:${err}`);
  }
};
export const verfiyAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    const role_check = await store.admin(token);
    if (role_check.includes('admin')) {
      console.log('admin if');
      next();
    }
  } catch (err) {
    res.status(401);
    res.json(`Unable to authenticate Invalid token admin:${err}`);
  }
};
