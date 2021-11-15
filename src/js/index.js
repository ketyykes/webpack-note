import '../scss/all.scss'
import {hello,testClass} from './all.js';

hello();
const testClass1 = new testClass();
console.log('a是私有變數所以'+testClass1.a);
console.log('b是'+testClass1.b);
(async function (){
    const a= await fetch('https://ithelp-hao-siang-v5-cheerio.herokuapp.com/allPersonPost');
    const b = await a.json();
    console.log(b);
    let getBody = document.querySelector("body");
    getBody.innerHTML += b[0][1].title;
}())
