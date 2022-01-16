"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const router = require('express').Router();
exports.router = router;
const resize = __importStar(require("../utilities/resizing"));
/* const queryString =  require('query-string');
const path = require('path');
const sharp = require('sharp'); */
router.get('/', resize.welcome);
/* routes.get('/', (req, res) => {
   //  const FirstImage = 'gallery-04.png'
  //  res.sendFile('gallery-04.png', { root: path.join(__dirname ) });
    

    res.send('Hello from routes!');
  }) */
router.get('/image', resize.imgResize);
