import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Request, Response } from 'express';
import { ExifParserFactory } from 'ts-exif-parser';

const welcome = (_req: Request, res: Response) => {
  res.send(
    'Welcom to you image processing api \n You can test our Api by accessing this url http://localhost:3000/image ?filename=choose from (index, index-01 index-02)  &width= (your desired width)&height=(your desired height)\n and here is an example to crop our index.jpg image to 200 * 200 size  \n http://localhost:3000/image?filename=index&width=200&height=200  '
  );
};

const imgProcessing = (req: Request, res: Response) => {
  // get the query data from the url
  const QueryData = req.query;
  const ImgWidth: unknown = QueryData.width;
  const ImgHeight: unknown = QueryData.height;
  const fileName: unknown = QueryData.filename;
  const filename: string = fileName as string;
  const imgW: number = parseInt(ImgWidth as string);
  const imgH: number = parseInt(ImgHeight as string);
  const originalImg = path.join(__dirname, `../static/imgs/${filename}`);
  const fullfilename = filename.split('.');
  const dirName = fullfilename[0];
  const fileExtn = fullfilename[1]
  const newImg = path.join(__dirname, `../static/thumbnails/${dirName}/(${imgW}-${imgH}).${fileExtn}`);
  /*
   * function to resize the img with the requested dimension using sharp module
   * it takes the name and the path of the img using path module (look at originalImg variable)
   * send the resizedImg to the user using res.sendFile()
   */
  const resizeImg = (img: string, imgW: number, imgH: number) => {
    try {
      sharp(img)
        .resize(imgW, imgH)
        .toFile(
          path.join(__dirname, `../static/thumbnails/${dirName}/(${imgW}-${imgH}).${fileExtn}`),
          (_err: object, _info: object) => {}
        );
     
      // using setTimeout as res.sendFile is async func so we want to put it in the timer stage
      setTimeout(() => {
        res.sendFile(`(${imgW}-${imgH}).${fileExtn}`, {
          root: path.join(__dirname, `../static/thumbnails/${dirName}`)
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
    try {
      const readImg = fs.readFileSync(newImg);
      // using exif-parser module to get the size from meta-data of the img and then compare it with the requested size
      const parser = ExifParserFactory.create(readImg);
      const imgData = parser.parse();
      const preW = imgData.imageSize?.width;
      const preH = imgData.imageSize?.height;
      if (preH === imgH && preW === imgW) {
        res.sendFile(`(${imgW}-${imgH}).${fileExtn}`, {
          root: path.join(__dirname, `../static/thumbnails/${dirName}`)
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

export { imgProcessing, welcome };
