'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.welcome = exports.imgProcessing = void 0;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const sharp_1 = __importDefault(require('sharp'));
const ts_exif_parser_1 = require('ts-exif-parser');
const welcome = (_req, res) => {
  res.send(
    'Welcom to you image processing api \n You can test our Api by accessing this url http://localhost:3000/image ?filename=choose from (index, index-01 index-02)  &width= (your desired width)&height=(your desired height)\n and here is an example to crop our index.jpg image to 200 * 200 size  \n http://localhost:3000/image?filename=index&width=200&height=200  '
  );
};
exports.welcome = welcome;
const imgProcessing = (req, res) => {
  // get the query data from the url
  const QueryData = req.query;
  const ImgWidth = QueryData.width;
  const ImgHeight = QueryData.height;
  const fileName = QueryData.filename;
  const filename = fileName;
  const imgW = parseInt(ImgWidth);
  const imgH = parseInt(ImgHeight);
  const originalImg = path_1.default.join(
    __dirname,
    `../static/imgs/${filename}`
  );
  const fullfilename = filename.split('.');
  const dirName = fullfilename[0];
  const fileExtn = fullfilename[1];
  const newImg = path_1.default.join(
    __dirname,
    `../static/thumbnails/${dirName}/(${imgW}-${imgH}).${fileExtn}`
  );
  /*
   * function to resize the img with the requested dimension using sharp module
   * it takes the name and the path of the img using path module (look at originalImg variable)
   * send the resizedImg to the user using res.sendFile()
   */
  const resizeImg = (img, imgW, imgH) => {
    try {
      (0, sharp_1.default)(img)
        .resize(imgW, imgH)
        .toFile(
          path_1.default.join(
            __dirname,
            `../static/thumbnails/${dirName}/(${imgW}-${imgH}).${fileExtn}`
          ),
          (_err, _info) => {}
        );
      // using setTimeout as res.sendFile is async func so we want to put it in the timer stage
      setTimeout(() => {
        res.sendFile(`(${imgW}-${imgH}).${fileExtn}`, {
          root: path_1.default.join(
            __dirname,
            `../static/thumbnails/${dirName}`
          ),
        });
      }, 500);
      console.log('newly cropped img is sent');
    } catch (err) {
      console.log(
        'You should specify an existed filename & positive value for width and height'
      );
    }
  };
  /*  resize function
   * first checks if the size requested is already exist (caching)
   * if its a new size so resize the image and sent it
   */
  (() => {
    var _a, _b;
    try {
      const readImg = fs_1.default.readFileSync(newImg);
      // using exif-parser module to get the size from meta-data of the img and then compare it with the requested size
      const parser = ts_exif_parser_1.ExifParserFactory.create(readImg);
      const imgData = parser.parse();
      const preW =
        (_a = imgData.imageSize) === null || _a === void 0 ? void 0 : _a.width;
      const preH =
        (_b = imgData.imageSize) === null || _b === void 0 ? void 0 : _b.height;
      if (preH === imgH && preW === imgW) {
        res.sendFile(`(${imgW}-${imgH}).${fileExtn}`, {
          root: path_1.default.join(
            __dirname,
            `../static/thumbnails/${dirName}`
          ),
        });
        console.log('previous cropped img has been sent');
      } else {
        resizeImg(originalImg, imgW, imgH);
      }
    } catch (err) {
      console.log(`${err} \n no cropped img found\n`);
      resizeImg(originalImg, imgW, imgH);
    }
  })();
};
exports.imgProcessing = imgProcessing;
