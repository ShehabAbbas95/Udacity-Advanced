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
const resizeFunc_1 = __importDefault(require("../utilities/resizeFunc"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const originalImg = path_1.default.join(__dirname, '../static/imgs/index.jpg');
const newImg = path_1.default.join(__dirname, '../static/thumbnails/index/(50-50).jpg');
const croppedWidth = 50;
const croppedHeight = 50;
it(' resize the img with a desired width and height ', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, resizeFunc_1.default)(originalImg, 'index.jpg', croppedWidth, croppedHeight);
    const croppedImg = () => __awaiter(void 0, void 0, void 0, function* () {
        yield fs_1.default.readFileSync(newImg, 'utf8');
    });
    expect(croppedImg).toBeTruthy();
}));
