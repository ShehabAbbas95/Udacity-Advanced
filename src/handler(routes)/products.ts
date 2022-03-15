import { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { verfiyAuthToken } from '../handler(routes)/auth';

const productsRouter = require('express').Router();

const store = new ProductStore();
/*
 * call the product model
 * show all products availabe in the DB
 */
const index = async (_req: Request, res: Response): Promise<void> => {
  const INFO = await store.index();
  res.send(INFO);
};
const showProduct = async (req: Request, res: Response): Promise<void> => {
  const productName = req.params.productName;
  const INFO = await store.showProduct(productName);
  res.send(INFO);
};
/*
 * call the product model
 * Add new product to the DB
 */
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const name = data.name as string;
    const price = data.price as unknown as number;
    const category = data.category as unknown as string;
    await store.addProduct(name, price, category);
    res.send(`Product ${name} added succesfully`);
  } catch (err) {
    res.json(`Unable to create product:${err}`);
  }
};
/*
 * call the product model
 * Delete a product from the DB
 */
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.body.name as string;
    await store.deleteProduct(name);
    res.send(`Product ${name} deleted succesfully`);
  } catch (err) {
    res.json(`Unable to delete product:${err}`);
  }
};

productsRouter.get('/', index);
productsRouter.get('/product_info/:productName', showProduct);
productsRouter.post('/addproduct', verfiyAuthToken, addProduct);
productsRouter.post('/deleteproduct', verfiyAuthToken, deleteProduct);

/* const store = new UserStore()

const addUser = async (req: Request, res: Response) => {

    try{
        const user= await store.addUser(firstname,lastname,password,phone,address)
    }
}

const add_User_route = (app: express.Application) => {
    app.post('/add', addUser)
} */

export default productsRouter;
