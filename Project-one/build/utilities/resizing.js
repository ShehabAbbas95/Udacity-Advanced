"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = exports.imgResize = void 0;
const queryString = require('querystring');
const path = require('path');
const sharp = require('sharp');
const welcome = (req, res) => {
    res.send('Hello from routes!');
};
exports.welcome = welcome;
const imgResize = (req, res) => {
    /*  const QueryData:Quering = {
       fileName: req.query.filname,
       width: req.query.width,
       height: req.query.filename

     } */
    const QueryData = req.query;
    let ImgWidth = QueryData.width;
    let ImgHeight = QueryData.height;
    const filename = QueryData.filename, imgW = parseInt(ImgWidth), imgH = parseInt(ImgHeight), originalImg = path.join(__dirname, `../static/imgs/${filename}`);
    // function resizing the image using sharp module and it is self invoked
    (function () {
            // sharp takes the img name then apply the resize method on it that takes two params width and height whivh I got from query url
            sharp(originalImg).resize(imgW, imgH).toFile(path.join(__dirname, `../static/imgs/new${filename}`), (err, info) => {
            });
        })();
    // Using setTimeout as res.sendFile is async so it will send file before it processed 
    setTimeout(() => { res.sendFile(`new${filename}`, { root: path.join(__dirname, '../static/imgs') }); }, 500);
};
exports.imgResize = imgResize;
