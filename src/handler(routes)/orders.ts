import { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import { verfiyAuthToken } from '../handler(routes)/auth';

const ordersRouter = require('express').Router();
const store = new OrderStore();
/*
 * call the order model
 * show the current (Incompleted Orders) by the user
 */
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id = req.body.user_id as string;
    const INFO = await store.ordersindex(user_id);
    res.send(INFO);
  } catch (err) {
    res.json(`You should Pass your user_id ${err}`);
  }
};
/*
 * call the order model
 * show the completed Orders by the user
 */
const showDoneOrder = async (req: Request, res: Response): Promise<void> => {
  const user_id = req.body.user_id as string;
  console.log(user_id);
  const INFO = await store.ordersDone(user_id);
  res.send(INFO);
};
/*
 * Call the order model
 * Add a new  Order to the DB
 * Call the orders_products model
 * Add the products details to the order in the orders_products table
 */
const addOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const user_id = data.user_id;
    const products_details = data.products_details as object[];
    const status = data.status;
    const order_info = await store.addOrder(user_id);
    await store.addOrder_products(order_info, products_details, status);
    res.send('Order  added succesfully');
  } catch (err) {
    res.json(`Unable to add order:${err}`);
  }
};

ordersRouter.get('/current_orders', verfiyAuthToken, index);
ordersRouter.get('/orders_completed/', verfiyAuthToken, showDoneOrder);
ordersRouter.post('/addorder', verfiyAuthToken, addOrder);

export default ordersRouter;
