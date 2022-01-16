const chan: HTMLElement | null = document.getElementById('gg');
if (chan){chan.innerHTML= 'hello from my index through app';}

const ourImg = <HTMLImageElement>document.getElementById("firstImg");

/* 
const getFirstImg = async  ():Promise<void> =>{
    const downloadImg = await fetch('imgs/gallery-04.png');
    const image:string =  downloadImg["url"];
    ourImg.src = image
    console.log(ourImg.src)
}
getFirstImg() */

const imgFunc = async (url:string) =>{
    const callServer = await fetch(url);
    /* const getQuery: object = callServer.data; */
    console.log(callServer)
    
}
imgFunc('/firstimage')