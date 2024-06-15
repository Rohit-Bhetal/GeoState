//Imports
import app from './../firebase/firebase';
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from 'firebase/auth';
import { getFirestore , collection, getDocs, addDoc} from "firebase/firestore";
//reference variable
const signup_cont=document.querySelector(".sign-up");
const signin_cont=document.querySelector(".sign-in");
const form_box=document.querySelector(".form-box");
const wrapper=document.querySelector(".wrapper");
const action_show=document.querySelector(".action-show");
const signin_form=document.querySelector(".login-container");
const signup_form=document.querySelector(".register-container");
const signinButton=document.querySelector(".signInButton");
const signupButton=document.querySelector(".signUpButton");

//Register page
function RegisterGo(){
    signin_cont.style.display="none";
    signup_cont.style.display="block";
    signin_form.style.display="none";
    signup_form.style.display="block";
    form_box.style.flexDirection ="row-reverse";
    action_show.style.borderRadius="0 20px  20px 0";
}

//Upload data in firestore
async function uploadFirestore(name,email){
  try{
    const db=getFirestore(app);
    const docRef=await addDoc(collection(db,'users'),{
      name:`${name}`,
      email:`${email}`
    });
    console.log("Document written with Id")
  }catch{
    console.error("Error adding Document:",e)
  }
}

//SignIn page

function SignGo(){
    signin_cont.style.display="block";
    signup_cont.style.display="none"
    signin_form.style.display="block";
    signup_form.style.display="none"
    form_box.style.flexDirection ="row";
    action_show.style.borderRadius=" 20px 0 0 20px ";
}
document.querySelector(".auth-change-in").addEventListener('click',RegisterGo);


document.querySelector(".auth-change-up").addEventListener('click',SignGo);

let loginForm=document.getElementById("loginform");

//signIn Authentication

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    var pattern=/\S+@\S+\.\S+/;
    
    if(email.value==""|| !pattern.test(email.value)){
      Popup("Wrong Email Format!");
        return;
    }
    if(password.value==""){
        Popup("Password Missing!");
        return;
    }
    let loadDiv=document.createElement('div');
    loadDiv.className="loader";

    signinButton.innerHTML=``
    signinButton.appendChild(loadDiv);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("Signed In");
      const user = userCredential.user;
      sessionStorage.setItem('authenticated','true')
      window.history.replaceState(null, '', './../home/homepage.html');
      window.location.href='./../home/homepage.html';
      signinButton.removeChild(loadDiv);
      signinButton.innerHTML=`Sign in`;
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      signinButton.removeChild(loadDiv);
      signinButton.innerHTML=`Sign in`;
      Popup(errorMessage);
      console.error(errorMessage);
      
    });
  });
 
//Register
let registerForm=document.getElementById('registerform');
  registerForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  let reg_name=document.getElementById("reg-name")
  let reg_email=document.getElementById("reg-email");
  let reg_password=document.getElementById("reg-password");
  var pattern=/\S+@\S+\.\S+/;
  
  if(reg_name.value==""){
    Popup("Name Missing!");
      return;
  }
  if(reg_email.value==""|| !pattern.test(reg_email.value)){
    Popup("Wrong Email Format!");
      return;
  }
  if(reg_password.value==""){
      Popup("Password Missing!");
      return;
  }
  let loadDiv=document.createElement('div');
  loadDiv.className="loader";
  signupButton.innerHTML=``
  signupButton.appendChild(loadDiv);
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, reg_email.value, reg_password.value)
  .then((userCredential) => {
    uploadFirestore(reg_name.value,reg_email.value);
    console.log("Signed In");
    const user = userCredential.user;

    sessionStorage.setItem('authenticated','true')
    window.history.replaceState(null, '', './../home/homepage.html');
    window.location.href='./../home/homepage.html';
    signupButton.removeChild(loadDiv);
    signupButton.innerHTML=`Sign up`;
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    signupButton.removeChild(loadDiv);
    signupButton.innerHTML=`Sign up`;
    Popup(errorMessage);
    console.error(errorMessage);
    
  });



});

  //googleSignIn:
  
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  const googleLink = document.querySelector("#googleLink");
  googleLink.addEventListener('click',function(event){
  let loadDiv=document.createElement('div');
  loadDiv.className="loader";
  signupButton.innerHTML=``
  signupButton.appendChild(loadDiv);
  const auth = getAuth(app);
    signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    
    console.log("Signed In");
    const user = result.user;

    sessionStorage.setItem('authenticated','true')
    uploadFirestore(user.displayName,user.email);
    window.history.replaceState(null, '', './../home/homepage.html');
    window.location.href='./../home/homepage.html';
    signupButton.removeChild(loadDiv);
    signupButton.innerHTML=`Sign up`;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // The AuthCredential type that was used.
    console.log(errorMessage);
    const credential = GoogleAuthProvider.credentialFromError(error);
    signupButton.removeChild(loadDiv);
    signupButton.innerHTML=`Sign up`;
    Popup(errorMessage);
    console.error(errorMessage);
    // ...
  });
  })
//Error PopUp
function Popup(input){
  let node=document.createElement('div');
  node.className='pop-up';
  node.innerHTML=`${input}`;
  wrapper.prepend(node);
  setTimeout(()=>{
    node.remove();
  },3000);
}
export default getAuth;