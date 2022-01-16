"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router_1 = require("./routes/router");
const app = express();
const port = 3000;
app.use(express.static('build/static'));
app.use('/', router_1.router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
