"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    /*  const FirstImage = 'gallery-04.png'
     res.sendFile('gallery-04.png', { root: path.join(__dirname ) }); */
    res.send('Hello from routes!');
});
routes.get('/asd', (_req, res) => {
    /* const getImg = async() => {
      const galleryImg = await fetch('imgs/gallery-04.png');
      return galleryImg;
     } */
    res.sendFile('gallery-04.png', { root: path_1.default.join(__dirname, '../static') });
});
routes.get('/firstimage', (req, res) => {
    /* const getImg = async() => {
      const galleryImg = await fetch('imgs/gallery-04.png');
      return galleryImg;
     } */
    const data = req.query;
    console.log(data);
    res.sendFile('gallery-04.png', { root: path_1.default.join(__dirname, '../static') });
    return data;
});
exports.default = routes;
