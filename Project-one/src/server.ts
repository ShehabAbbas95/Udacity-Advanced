import { router } from './routes/router';
import express from 'express';
const app = express();
const port = 3000;
app.use(express.static('build/static'));

app.use('/', router);

app.listen(port, () => {
  console.log(`Image-Processing app Running at http://localhost:${port}`);
});

export default app;
