import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut 
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";


const appSettings = {
    apiKey: "AIzaSyBSJNTto4HFI0a59nZmz96Dg2r2rsCGxuU",
    authDomain: "add-to-cart-519e5.firebaseapp.com",
    databaseURL: "https://add-to-cart-519e5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "add-to-cart-519e5",
    storageBucket: "add-to-cart-519e5.appspot.com",
    messagingSenderId: "632342147589",
    appId: "1:632342147589:web:c90c085f22f3954c99a26c"
};

const app = initializeApp(appSettings);

const auth = getAuth(app);

const userEmail = document.querySelector("#email-field");
const userPass = document.querySelector("#password-field");
const authForm = document.querySelector("#authForm");
const homePage = document.querySelector("#homePage");
//const signUpButton = document.querySelector("#signup-button");
const logInButton = document.querySelector("#login-button");
const logOutButton = document.querySelector("#logout-button");

homePage.style.display = "none";

/*
signUpButton.addEventListener("click", function() {
    createUserWithEmailAndPassword(auth, userEmail.value, userPass.value)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("Account created.");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    })
});
*/

logInButton.addEventListener("click", function() {
    signInWithEmailAndPassword(auth, userEmail.value, userPass.value)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    })
});

logOutButton.addEventListener("click", function() {
    signOut(auth);
});

onAuthStateChanged(auth, user => {
    if (user)
    {
        authForm.style.display = "none";
        homePage.style.display = "flex";
    }
    else
    {
        authForm.style.display = "flex";
        homePage.style.display = "none";
    }
});



const database = getDatabase(app);
const itemsinDB = ref(database, "items");

const inp = document.querySelector("#input-field");
const addBut = document.querySelector("#add-button");
const list = document.querySelector("#shopping-list");



onValue(itemsinDB, function(snapshot) {
    console.log("changed");
    if (snapshot.exists())
    {
        let items = Object.entries(snapshot.val()); //wrapper for Object.keys() and Object.values()
        list.innerHTML = "";
        
        
        for (let i=0; i < items.length; ++i)
        {
            let newItem = document.createElement("li"); //eventlistener doesn't work if "innerHTML +=" is used here
            newItem.textContent = items[i][1];
            list.append(newItem);

            newItem.addEventListener("dblclick", function() {
                let location = ref(database, `items/${items[i][0]}`);
                remove(location);
            });
        }
    }
    else
    {
        list.innerHTML = "No items here...yet";
    }
});

addBut.addEventListener("click", function() {
    let inpValue = inp.value;
    if (inpValue && inpValue.length !== 0)
        push(itemsinDB, inpValue);
    inp.value = "";
});
