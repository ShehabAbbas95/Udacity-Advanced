const queryString  = require('querystring');
const path = require('path');
const sharp = require('sharp');
import {Request, Response} from 'express';
//import QueryString from 'qs';
import fs,{promises as fsPromise}   from 'fs';
import { buffer } from 'stream/consumers';
import {ExifParserFactory}  from 'ts-exif-parser';


const welcome = (req:Request, res:Response) => {
       res.send('Hello from routes!');
     };

const imgResize =  (req: Request, res: Response) => {
      // get the query data from the url 
      const QueryData = req.query;
      let ImgWidth:unknown = QueryData.width , ImgHeight:unknown = QueryData.height,fileName:unknown = QueryData.filename;
      const filename:string = fileName as string, imgW:number = parseInt(ImgWidth as string),  imgH:number = parseInt(ImgHeight as string),
      originalImg= path.join(__dirname ,`../static/imgs/${filename}`), newImg = path.join(__dirname ,`../static/imgs/thumb-${filename}`);
      /*
        * function to resize the img with the requested dimension using sharp module 
        * it takes the name and the path of the img using path module (look at originalImg variable)
        * send the resizedImg to the user using res.sendFile 
      */
      const resizeImg =   (img:string) => {
        sharp(img).resize(imgW,imgH).toFile(path.join(__dirname ,`../static/imgs/thumb-${filename}`),(err:object,info:object) => {} )
        setTimeout( ()=> {res.sendFile(`thumb-${filename}`, { root: path.join(__dirname, '../static/imgs') })}, 500)
        console.log('newly resized img is sent')
      }

        // function resizing the image using sharp module and it is self invoked
        ( () => {
          try{
            const readImg = fs.readFileSync(newImg),
            // using exif-parser module to get the meta data of the img and the compare it for the requested one
            parser = ExifParserFactory.create(readImg),
            imgData = (parser.parse());
            const preW = imgData.imageSize?.width, preH = imgData.imageSize?.height;
            if (preH != imgH || preW != imgW){
              resizeImg(originalImg);
            }
            else{
              res.sendFile(`thumb-${filename}`, { root: path.join(__dirname, '../static/imgs') });
              console.log('previous img has been sent')
            }
          
          }
          catch(err){
            console.log(`${err} \n no thumbnail img found`)
            
            // sharp takes the img name then apply the resize method on it that takes two params width and height whivh I got from query url
            resizeImg(originalImg);
            
            // Using setTimeout as res.sendFile is async so it will send file before it processed 
           
          }
            
          })();
          
    }

  


  export {imgResize , welcome} ;

