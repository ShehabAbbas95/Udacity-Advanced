const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const sharp = require('sharp');
//const routes =  require('./routes/servertry');
const path =  require('path');
const app = express()
const port = 3000
app.use(express.static('build/static'));

app.get('/firstimage', async (req, res) => {
  /* const getImg = async() => {
    const galleryImg = await fetch('imgs/gallery-04.png');
    return galleryImg;
   } */
   /* hna ha50d el qruery mn el url filename w arg3ha  */ 
   const data = req.query;
   const filename = data.filename, orifinalImg= path.join(__dirname ,`/static/imgs/${filename}.png`) , imgW = parseInt(data.width), imgH= parseInt(data.height);

   const callImg = async () => {
       await sharp(orifinalImg).resize(imgW,imgH,{fit:'contain'}).toFile(path.join(__dirname ,`/static/imgs/new${filename}-${imgW}.png`),(err,info) => {
       console.log(`info:${JSON.stringify(info)}`)
      })
    }
    // sharp(orifinalImg).resize(imgW,imgH).toFile('./static/imgs/newImg.png',(err,info)=>{console.log(`info:${info}`,orifinalImg)});
    console.log('hello1')
    callImg()
    setTimeout( ()=> {res.sendFile(`new${filename}-${imgW}.png`, { root: path.join(__dirname, '/static/imgs') })}, 500)
    console.log('he')
   // const fileText = fs.readFile('build/avatar.png','utf8',(err,data)=>{return data})
   
    
   
  });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
