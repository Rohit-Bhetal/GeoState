//Imports
import { getAuth, signOut } from "firebase/auth";
import { checkAuthentication } from './../../js/userAuthentication';
import app from './../firebase/firebase';
import { getFirestore , collection, getDocs} from "firebase/firestore";
checkAuthentication('/components/home/homepage.html');


//query selectors
var mainPage=document.querySelector(".mainPage");
var prevBtn=document.querySelector(".prev");
var nextBtn=document.querySelector(".next");
var nextBtn=document.querySelector(".next");
var items=document.querySelectorAll('.item');
var runningTime=document.querySelector(".timeRunning");
var list=document.querySelector(".list");

let timeRunning=3000;
let timeAutoNext=7000;



//Logout-Firebase
document.querySelector(".fa-sign-out").addEventListener('click',(e)=>{
    const auth = getAuth(app);
    signOut(auth).then(() => {
        sessionStorage.removeItem("authenticated");
        window.location.href='./../sign_in/signin.html';
    }).catch((error) => {
        console.log(error);
    });
});
document.querySelector("#mobile-log").addEventListener('click',(e)=>{
    const auth = getAuth(app);
    signOut(auth).then(() => {
        sessionStorage.removeItem("authenticated");
        window.location.href='./../sign_in/signin.html';
    }).catch((error) => {
        console.log(error);
    });
});

//Fetching Data From Firestore

async function dataGet(){
    const db=getFirestore(app);
    const snapShot=await getDocs(collection(db,"location"));
    return snapShot;

}

//Displaying the Data in Carousel

window.addEventListener('DOMContentLoaded', async (e)=>{
    let data= await dataGet();
    
    data.forEach((el) => {
        console.log(el.data());
        let item=document.createElement('div');
        let content=document.createElement('div');
        let name=document.createElement('div');
        let des=document.createElement('div');
        let btn=document.createElement('button');
        item.className='item';
        content.className='content';
        name.className='name';
        des.className='des';
        btn.className='btn';
        name.innerHTML=`${el.data().name}`;
        des.innerHTML=`${el.data().description}`;
        btn.textContent='Book Now!';
        btn.onclick=function(){
            redirectPage(el.data().name);
        }
        content.appendChild(name);
        content.appendChild(des);
        content.appendChild(btn);
        item.append(content);
        item.style.backgroundImage=`url(${el.data().imageURL})`;
        list.appendChild(item);
    });
})
//Cards
let cardpage=document.querySelector('.cardpage');
window.addEventListener('DOMContentLoaded', async (e)=>{
    let data= await dataGet();
    
    data.forEach((el) => {
        let card=document.createElement('div');
        let title=document.createElement('h2');
        card.className='card';
        title.className='cardTitle';
        title.textContent=`${el.data().name}`;
        card.appendChild(title);
        card.style.backgroundImage=`url(${el.data().imageURL})`;
        cardpage.appendChild(card);
        card.addEventListener('click',()=>{
            redirectPage(el.data().name);
        })
    });
})

document.querySelector('.nextCardBtn').addEventListener('click',()=>{
    let cardAll=document.querySelectorAll('.cardpage .card');
    cardpage.appendChild(cardAll[0]);
})

//Redirect to pay page 
function redirectPage(name){

    if(sessionStorage.getItem('authenticated')){
        window.location.href=`./../page/placepage.html?placeName=${name}`;
    }
}

//button controls

nextBtn.onclick=function(){
    showSlider('next');
}

prevBtn.onclick=function(){
    showSlider('prev');
}

//Timer 
let runTimeOut;

let runNextAuto=setTimeout(()=>{
    nextBtn.click()
},timeAutoNext);

function resetTimeAnimation(){
    runningTime.style.animation='none';
    runningTime.offsetHeight
    runningTime.style.animation=null;
    runningTime.style.animation='runningTime 7s linear 1 forwards'
}

//Slider
function showSlider(type){
    let sliderItemsDom=list.querySelectorAll('.mainPage .list .item');
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0]);
        mainPage.classList.add('next');
        
    }else{
        list.prepend(sliderItemsDom[sliderItemsDom.length-1]);
        mainPage.classList.add('prev');
        
    }
     clearTimeout(runTimeOut)
     runTimeOut=setTimeout(()=>{
        mainPage.classList.remove('next');
        mainPage.classList.remove('prev');
        
     },timeAutoNext)

     clearTimeout(runNextAuto)
     runNextAuto=setTimeout(()=>{
        nextBtn.click();
     },timeAutoNext)

     resetTimeAnimation();
}

//Miscellenous Works
const nextSecondBtn=document.querySelector(".downBtn");
nextSecondBtn.addEventListener('click',function(){
    document.querySelector(".secTwo").scrollIntoView({
        behavior:'smooth'
    });
})
const nextthreeBtn=document.querySelector(".secdownBtn");
nextthreeBtn.addEventListener('click',function(){
    document.querySelector(".secThree").scrollIntoView({
        behavior:'smooth'
    });
})