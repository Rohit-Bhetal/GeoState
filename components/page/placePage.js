//Imports 
import { checkAuthentication } from './../../js/userAuthentication';
import app from './../firebase/firebase';
import { getFirestore , collection, getDocs} from "firebase/firestore";
checkAuthentication('/components/page/placepage.html');



//Findinf the parameter by URLSearchParams
let currentUrl = window.location.href;
let searchString = currentUrl.split('?')[1];
var params=new URLSearchParams(searchString);
let dataName=params.get('placeName');

//
let currData;
window.addEventListener('DOMContentLoaded',async function(){
    const db=getFirestore(app);
    const snapShot=await getDocs(collection(db,"location"));
    snapShot.forEach(el => {
        if(el.data().name===dataName){
            //console.log(el.data())
            document.querySelector('.imageSection').style.backgroundImage=`url(${el.data().imageURL})`;
            document.querySelector('.title').textContent=el.data().name;
            document.querySelector('.description').textContent=el.data().description;
        }
    });
});
//backButton
document.querySelector('.backButton').addEventListener('click',function(){
    history.back();
});
