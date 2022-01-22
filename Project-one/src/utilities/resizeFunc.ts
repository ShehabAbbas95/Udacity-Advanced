import path from 'path';
import sharp from 'sharp';

const resizeImg = async (
  imgPath: string,
  imgfullname: string,
  imgW: number,
  imgH: number
) => {
  const imgFullname = imgfullname.split('.');
  const imgName = imgFullname[0];
  const imgExt = imgFullname[1];
  /*
   * function to resize the img with the requested dimension using sharp module
   * it takes the name, the path of the img using path module (look at originalImg variable), the width and the height
   */
  try {
    await sharp(imgPath)
      .resize(imgW, imgH)
      .toFile(
        path.join(
          __dirname,
          `../../images/thumbnails/${imgName}/(${imgW}-${imgH}).${imgExt}`
        ),
        (_err: object, _info: object) => {}
      );

    console.log('Newly Processed Image is sent');
  } catch (err) {
    console.log(
      'You should specify an existed filename & positive value for width and height'
    );
  }
};

export default resizeImg;
