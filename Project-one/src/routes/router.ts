import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import resizeImg from '../utilities/resizeFunc';

const router = require('express').Router();
/* const queryString =  require('query-string');
const path = require('path');
const sharp = require('sharp'); */
const welcome = (_req: Request, res: Response) => {
  res.send(
    'Welcom to you image processing api \n You can test our Api by accessing this url http://localhost:3000/image ?filename=choose from (index, index-01 index-02)  &width= (your desired width)&height=(your desired height)\n and here is an example to crop our index.jpg image to 200 * 200 size  \n http://localhost:3000/image?filename=index&width=200&height=200  '
  );
};

router.get('/', welcome);

const imgProcessing = (req: Request, res: Response): void => {
  // get the query data from the url
  const QueryData = req.query;
  const filename: string = QueryData.filename as unknown as string;

  const imgW: number = parseInt(QueryData.width as unknown as string);
  const imgH: number = parseInt(QueryData.height as unknown as string);
  if (!filename) {
    throw new Error(
      'Missing Query Data \n You have to specify an existed filename\n'
    );
  }
  if (!imgW) {
    throw new Error(
      'Missing Query Data \n You have to specify a positive value for width ( i.e width=100 or width=200 )\n'
    );
  }
  if (!imgH) {
    throw new Error(
      'Missing Query Data \n You have to specify positive value for height (i.e height=100 or height=50 )\n'
    );
  }
  const FileName = filename.split('');
  const filenameLen = FileName.length - 4;
  const filenameDot = FileName[filenameLen];
  if (!filename.includes('.') || !filenameDot) {
    throw new Error(
      'Invalid filename extension \n You have to specify an existed filename i.e(filename.ext) and positive value for width and height\n'
    );
  }
  const originalImg = path.join(__dirname, `../../images/imgs/${filename}`);
  // split the requested file name to use the name and the exten
  const fullfilename = filename.split('.');
  const dirName = fullfilename[0];
  const fileExtn = fullfilename[1];
  // get the directory of the requested thumb
  const thumbDir = path.join(__dirname, `../../images/thumbnails/${dirName}`);
  const newImg = path.join(
    __dirname,
    `../../images/thumbnails/${dirName}/(${imgW}-${imgH}).${fileExtn}`
  );

  // function to send the img to the user
  const sendingImg = (): void => {
    setTimeout(() => {
      res.sendFile(`(${imgW}-${imgH}).${fileExtn}`, {
        root: path.join(__dirname, `../../images/thumbnails/${dirName}`)
      });
    }, 500);
  };

  /*  resize function
   * first checks if the size requested is already exist (caching)
   * if its a new size so resize the image and sent it
   */
  (async (): Promise<void> => {
    /*
     * the next try block functionality is as follow
     * first try to find a directory with the name of the img requested using fs.readFileSync()
     * if there is a directory then it goes to the next try/catch block
     * if there is no directory then it make it dynamically with the name of the requested img using fs.mkdir()
     */
    try {
      fs.readdirSync(thumbDir);
    } catch (err) {
      console.log(
        `\n There is no previous cropped sizes for Your ${fullfilename} `
      );
      (async () => {
        fs.mkdirSync(thumbDir);
      })();
    }
    /*
     * the next try block functionality is as follow
     * first try to find a previously processed img (stored thumb) with the name of the  requested img using fs.readFileSync()
     * if there is an img then it sent to the user without need of regenerating a new img using fs caching
     * if there is no stored img with same size stored it generates a thumb img using resizeImg()
     * then send it to the user using fileSend()
     */
    try {
      fs.readFileSync(newImg);
      // using sharp module to get the size from meta-data of the img and then compare it with the requested size
      sendingImg();
      console.log('Cropped stored image has been sent');
    } catch (err) {
      console.log('No cropped img found\nProcessing Your Image');
      resizeImg(originalImg, filename, imgW, imgH);
      sendingImg();
    }
  })();
};

router.get('/image', imgProcessing);

export { router };
