//import refreshPageInterval from "./chatrooms.js"
const openAddPopupForm = document.getElementById("openAddFormBtn");
const openEditPopupForm = document.getElementById("openEditFormBtn");
const closeAddPopupForm = document.getElementById("closeAddFormBtn");
const closeEditPopupForm = document.getElementById("closeEditFormBtn");
const openedFormBefore = document.getElementById("openedForm");
const addErrorMessagesElement = document.getElementById("errorMsg");
const sidbarPopupBtn = document.getElementById("openSidbarPopup");
const clickToSend = document.getElementById("clickToSend");
sidbarPopupBtn.addEventListener("click", () => {
    if (document.body.classList.contains("theme-dark")) {
        document.body.classList.remove("theme-dark")
    }
    else {
        document.body.classList.add("theme-dark")
    }
})

if (openedFormBefore)
    openForm("addForm");

openAddPopupForm.addEventListener("click", () => {
    //console.log(refreshPageInterval);
    //clearInterval(refreshPageInterval);
    openForm("addForm")
})
closeAddPopupForm.addEventListener("click", () => {
    if (openedFormBefore) {
        if (addErrorMessagesElement)
            addErrorMessagesElement.innerText = '';
    }
    let phoneInput = document.getElementById("contactPhone");
    phoneInput.value = '';
    let nameInput = document.getElementById("contactName");
    nameInput.value = '';
    closeForm("addForm")
})

openEditPopupForm.addEventListener("click", () => {
    openForm("editForm")
})
closeEditPopupForm.addEventListener("click", () => {
    closeForm("editForm")
})
function openForm(whichForm) {
    document.getElementById("overlay").classList.add("active");
    document.getElementById(whichForm).classList.add("active");
}
function closeForm(whichForm) {
    document.getElementById("overlay").classList.remove("active");
    document.getElementById(whichForm).classList.remove("active");
    location.replace("http://127.0.0.1:5500/");
}
clickToSend.addEventListener('click', () => {
    fetch("http://127.0.0.1:5500/getRoomMessages", {
        method: 'GET', // or 'POST', 'PUT', etc. depending on your server route
        credentials: 'include'
    })
        .then(response => console.log(response))
        .catch(err => console.log(err.message))
})