"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = exports.imgResize = void 0;
const queryString = require('querystring');
const path = require('path');
const sharp = require('sharp');
//import QueryString from 'qs';
const fs_1 = __importDefault(require("fs"));
const ts_exif_parser_1 = require("ts-exif-parser");
const welcome = (req, res) => {
    res.send('Hello from routes!');
};
exports.welcome = welcome;
const imgResize = (req, res) => {
    // get the query data from the url 
    const QueryData = req.query;
    let ImgWidth = QueryData.width, ImgHeight = QueryData.height, fileName = QueryData.filename;
    const filename = fileName, imgW = parseInt(ImgWidth), imgH = parseInt(ImgHeight), originalImg = path.join(__dirname, `../static/imgs/${filename}`), newImg = path.join(__dirname, `../static/imgs/thumb-${filename}`);
    /*
      * function to resize the img with the requested dimension using sharp module
      * it takes the name and the path of the img using path module (look at originalImg variable)
      * send the resizedImg to the user using res.sendFile
    */
    const resizeImg = (img) => {
        sharp(img).resize(imgW, imgH).toFile(path.join(__dirname, `../static/imgs/thumb-${filename}`), (err, info) => { });
        setTimeout(() => { res.sendFile(`thumb-${filename}`, { root: path.join(__dirname, '../static/imgs') }); }, 500);
        console.log('newly resized img is sent');
    };
    // function resizing the image using sharp module and it is self invoked
    (() => {
        var _a, _b;
        try {
            const readImg = fs_1.default.readFileSync(newImg), 
            // using exif-parser module to get the meta data of the img and the compare it for the requested one
            parser = ts_exif_parser_1.ExifParserFactory.create(readImg), imgData = (parser.parse());
            const preW = (_a = imgData.imageSize) === null || _a === void 0 ? void 0 : _a.width, preH = (_b = imgData.imageSize) === null || _b === void 0 ? void 0 : _b.height;
            if (preH != imgH || preW != imgW) {
                resizeImg(originalImg);
            }
            else {
                res.sendFile(`thumb-${filename}`, { root: path.join(__dirname, '../static/imgs') });
                console.log('previous img has been sent');
            }
        }
        catch (err) {
            console.log(`${err} \n no thumbnail img found`);
            // sharp takes the img name then apply the resize method on it that takes two params width and height whivh I got from query url
            resizeImg(originalImg);
            // Using setTimeout as res.sendFile is async so it will send file before it processed 
        }
    })();
};
exports.imgResize = imgResize;
