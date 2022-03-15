import express from 'express';
import usersRouter from './handler(routes)/users';
import productsRouter from './handler(routes)/products';
import ordersRouter from './handler(routes)/orders';
import bodyParser from 'body-parser';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
