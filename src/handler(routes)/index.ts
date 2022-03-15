import { Response, Request } from 'express';
const router = require('express').Router();

const home = (_req: Request, res: Response) => {
  res.send('hello');
};

router.get('/', home);
