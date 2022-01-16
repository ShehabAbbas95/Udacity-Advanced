const express = require('express');
import {router} from './routes/router';
const app = express()
const port = 3000
app.use(express.static('build/static'));

app.use('/', router) 

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
