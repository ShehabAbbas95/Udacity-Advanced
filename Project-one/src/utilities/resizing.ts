const queryString  = require('querystring');
const path = require('path');
const sharp = require('sharp');
import {Request, Response} from 'express'
import QueryString from 'qs';


const welcome = (req:Request, res:Response) => {
       res.send('Hello from routes!');
     };

const imgResize =  (req: Request, res: Response) => {
     /*  const QueryData:Quering = {
        fileName: req.query.filname,
        width: req.query.width,
        height: req.query.filename

      } */
      const QueryData = req.query;
      
      let ImgWidth:unknown = QueryData.width , ImgHeight:unknown = QueryData.height,fileName:unknown = QueryData.filename;

      const filename:string = fileName as string, imgW:number = parseInt(ImgWidth as string),  imgH:number = parseInt(ImgHeight as string),
      originalImg= path.join(__dirname ,`../static/imgs/${filename}`);
   
      // function resizing the image using sharp module and it is self invoked
      (() => {
        // sharp takes the img name then apply the resize method on it that takes two params width and height whivh I got from query url
         sharp(originalImg).resize(imgW,imgH).toFile(path.join(__dirname ,`../static/imgs/new${filename}`),(err:object,info:object) => {
         })
       })()
       // Using setTimeout as res.sendFile is async so it will send file before it processed 
       setTimeout( ()=> {res.sendFile(`new${filename}`, { root: path.join(__dirname, '../static/imgs') })}, 500)
    }

  


  export {imgResize , welcome} ;
