import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://champions-b6b11-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsements")

const inputFieldEL = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")
const endorseListEL = document.getElementById("endorse-lists")

publishBtn.addEventListener("click", function(){
    let inputValue = inputFieldEL.value;
push(endorsementListInDB,inputValue)
  clearInputFieldEl()  
})

onValue(endorsementListInDB,function(snapshot){
        if (snapshot.exists()) {
        let endorsementArray = Object.entries(snapshot.val())
    
       clearendorsementListEl()
        
        for (let i = 0; i < endorsementArray.length; i++) {
            let currentItem = endorsementArray[i]
            let currentItemID = endorsementArray[0]
            let currentItemValue = endorsementArray[1]
            
            appendItemToEndorsementListEl(currentItem)
        }    
    } else {
        endorseListEL.innerHTML = "No endorsmenets here... yet"
    }
})

function clearendorsementListEl() {
    endorseListEL.innerHTML = ""
}

function clearInputFieldEl() {
   inputFieldEL.value = ""
}

function appendItemToEndorsementListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    endorseListEL.append(newEl)
}