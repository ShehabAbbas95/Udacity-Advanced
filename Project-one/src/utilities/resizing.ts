import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Request, Response } from 'express';

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
  if (!fileName || !ImgWidth || !ImgHeight ){
    throw new Error('Missing Query Data \n You have to specify an existed filename and positive value for width and height\n')
  }
  const filename: string = fileName as string;
  const imgW: number = parseInt(ImgWidth as string);
  const imgH: number = parseInt(ImgHeight as string);
  const originalImg = path.join(__dirname, `../static/imgs/${filename}`);
  // split the requested file name to use the name and the exten 
  const fullfilename = filename.split('.');
  const dirName = fullfilename[0];
  const fileExtn = fullfilename[1];
  // get the directory of the requested thumb
  const thumbDir = path.join(__dirname, `../static/thumbnails/${dirName}`);
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
      console.log('Newly Processed Image is sent');
    } catch (err) {
      console.log(
        'You should specify an existed filename & positive value for width and height'
        , typeof(err), err
        );
    }
  };
  /*  resize function
   * first checks if the size requested is already exist (caching)
   * if its a new size so resize the image and sent it
  */
  ( async () => {
    /* 
      * the next try block functionality is as follow
      * first try to find a directory with the name of the img requested using fs.readFileSync()
      * if there is a directory then it goes to the next try/catch block
      * if there is no directory then it make it dynamically with the name of the requested img using fs.mkdir()
    */
    try {
      fs.readdirSync(thumbDir);
    } catch (err) {
      console.log(`\n There is no previous cropped sizes for Your ${fullfilename} `);
      ( async () => {
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
      const readImg = fs.readFileSync(newImg);
      // using sharp module to get the size from meta-data of the img and then compare it with the requested size
      const imgData = await sharp(readImg).metadata();
      const preW = imgData.width;
      const preH = imgData.height;
      if (preH === imgH && preW === imgW) {
        res.sendFile(`(${imgW}-${imgH}).${fileExtn}`, {
          root: path.join(__dirname, `../static/thumbnails/${dirName}`)
        });
        console.log('Cropped stored image has been sent');
      } else {
        resizeImg(originalImg, imgW, imgH);
      }
    } catch (err) {
      console.log(`No cropped img found\nProcessing Your Image`);
      resizeImg(originalImg, imgW, imgH);
    }
  })();
};

export { imgProcessing, welcome };
