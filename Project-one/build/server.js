'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const router_1 = require('./routes/router');
const express_1 = __importDefault(require('express'));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static('build/static'));
app.use('/', router_1.router);
app.listen(port, () => {
  console.log(`Image-Processing app Running at http://localhost:${port}`);
});
exports.default = app;
