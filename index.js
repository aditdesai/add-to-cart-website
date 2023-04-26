import { add } from "./functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

// console.log(add(2, 3));


const appSettings = {

    databaseURL: "https://add-to-cart-519e5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsinDB = ref(database, "items");

const inp = document.querySelector("#input-field");
const addBut = document.querySelector("#add-button");
const list = document.querySelector("#shopping-list");

onValue(itemsinDB, function(snapshot) {
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
