const router = require('express').Router();
import * as resize from '../utilities/resizing';
/* const queryString =  require('query-string');
const path = require('path');
const sharp = require('sharp'); */

router.get('/', resize.welcome );
/* routes.get('/', (req, res) => {
   //  const FirstImage = 'gallery-04.png'
  //  res.sendFile('gallery-04.png', { root: path.join(__dirname ) }); 
    

    res.send('Hello from routes!');
  }) */

 router.get('/image',resize.imgResize) 
  
 /*  routes.get('/image', (req, res) => {
   // hna ha50d el qruery mn el url filename w arg3ha  
    const QueryData = queryString.parse(req.query);
    const filename:string = QueryData["filename"], originalImg= path.join(__dirname ,`/static/imgs/${filename}`) , 
    imgW:number = parseInt(QueryData.width), imgH:number = parseInt(QueryData.height);
 
    // function resizing the image using sharp module and it is self invoked
    (() => {
      // sharp takes the img name then apply the resize method on it that takes two params width and height whivh I got from query url
       sharp(originalImg).resize(imgW,imgH).toFile(path.join(__dirname ,`/static/imgs/new${filename}`),(err,info) => {
       })
     })()
     // Using setTimeout as res.sendFile is async so it will send file before it processed 
     setTimeout( ()=> {res.sendFile(`new${filename}`, { root: path.join(__dirname, '/static/imgs') })}, 500)
  })
  */
  export {router};
