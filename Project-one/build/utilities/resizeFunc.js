"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const resizeImg = (imgPath, imgfullname, imgW, imgH) => __awaiter(void 0, void 0, void 0, function* () {
    const imgFullname = imgfullname.split('.');
    const imgName = imgFullname[0];
    const imgExt = imgFullname[1];
    /*
     * function to resize the img with the requested dimension using sharp module
     * it takes the name, the path of the img using path module (look at originalImg variable), the width and the height
     */
    try {
        yield (0, sharp_1.default)(imgPath)
            .resize(imgW, imgH)
            .toFile(path_1.default.join(__dirname, `../../images/thumbnails/${imgName}/(${imgW}-${imgH}).${imgExt}`), (_err, _info) => { });
        console.log('Newly Processed Image is sent');
    }
    catch (err) {
        console.log('You should specify an existed filename & positive value for width and height');
    }
});
exports.default = resizeImg;
