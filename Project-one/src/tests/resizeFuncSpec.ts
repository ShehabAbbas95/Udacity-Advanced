import resizeImg from '../utilities/resizeFunc';
import path from 'path';
import fs from 'fs';

const originalImg = path.join(__dirname, '../static/imgs/index.jpg');
const newImg = path.join(__dirname, '../static/thumbnails/index/(50-50).jpg');
const croppedWidth = 50;
const croppedHeight = 50;
it(' resize the img with a desired width and height ', async () => {
  resizeImg(originalImg, 'index.jpg', croppedWidth, croppedHeight);

  const croppedImg = async () => {
    await fs.readFileSync(newImg, 'utf8');
  };
  expect(croppedImg).toBeTruthy();
});
