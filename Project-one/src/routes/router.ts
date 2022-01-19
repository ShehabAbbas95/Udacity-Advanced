import * as resize from '../utilities/resizing';
const router = require('express').Router();
/* const queryString =  require('query-string');
const path = require('path');
const sharp = require('sharp'); */

router.get('/', resize.welcome);

router.get('/image', resize.imgProcessing);

export { router };
