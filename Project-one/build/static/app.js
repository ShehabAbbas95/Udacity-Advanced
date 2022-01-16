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
const chan = document.getElementById('gg');
if (chan) {
    chan.innerHTML = 'hello from my index through app';
}
const ourImg = document.getElementById("firstImg");
/*
const getFirstImg = async  ():Promise<void> =>{
    const downloadImg = await fetch('imgs/gallery-04.png');
    const image:string =  downloadImg["url"];
    ourImg.src = image
    console.log(ourImg.src)
}
getFirstImg() */
const imgFunc = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const callServer = yield fetch(url);
    /* const getQuery: object = callServer.data; */
    console.log(callServer);
});
imgFunc('/firstimage');
