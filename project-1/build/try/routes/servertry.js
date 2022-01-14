const express = require('express');
//import querystring from 'querystring';
// import path from 'path';
const routes = express.Router();

routes.get('/', (req, res) => {
   /*  const FirstImage = 'gallery-04.png'
    res.sendFile('gallery-04.png', { root: path.join(__dirname ) }); */
    

    res.send('Hello from routes!');
  })
  routes.get('/asd', (_req, res) => {
    /* const getImg = async() => {
      const galleryImg = await fetch('imgs/gallery-04.png');
      return galleryImg;
     } */
     res.sendFile('gallery-04.png', { root: path.join(__dirname , '../static' ) })
  })
  routes.get('/firstimage?filename=', (req, res) => {
    /* const getImg = async() => {
      const galleryImg = await fetch('imgs/gallery-04.png');
      return galleryImg;
     } */
     /* hna ha50d el qruery mn el url filename w arg3ha  */ 
     const data = req.query;
     console.log(data)
     res.sendFile('gallery-04.png', { root: path.join(__dirname , '../static' ) })
     
     return data
  })
  module.exports= {routes};