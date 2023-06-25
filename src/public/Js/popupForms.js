//#region import modules"
import { getrooms } from "./chatrooms.js";
//#endregion
//#region get Elements from Dom
const openAddPopupForm = document.getElementById("openAddFormBtn");
const openEditPopupForm = document.getElementById("openEditFormBtn");
const closeAddPopupForm = document.getElementById("closeAddFormBtn");
const closeEditPopupForm = document.getElementById("closeEditFormBtn");
const addErrorMessagesElement = document.getElementById("errorMsg");
const editContactMessage = document.getElementById("messageOfEditContact");
const sidbarBtn = document.getElementById("openSidbar");
const addContactButton = document.getElementById("addContactBtn");
const editContactButton = document.getElementById("editContactBtn");
const add_Contact_Phone_Input = document.getElementById("contactPhone");
const add_Contact_Name_Input = document.getElementById("contactName");
const edit_Contact_Name_Input = document.getElementById("editContactNameInput");
const contactPhone = document.getElementById("selectedChatroomPhone");
//#endregion
//#region Event Listeners
sidbarBtn.addEventListener("click", () => {
    if (document.body.classList.contains("theme-dark")) {
        document.body.classList.remove("theme-dark")
    }
    else {
        document.body.classList.add("theme-dark")
    }
})

openAddPopupForm.addEventListener("click", () => {
    openForm("addForm")
})
closeAddPopupForm.addEventListener("click", () => {
    if (addErrorMessagesElement) {
        addErrorMessagesElement.innerText = '';
    }
    add_Contact_Phone_Input.value = '';
    add_Contact_Name_Input.value = '';
    closeForm("addForm")
})

openEditPopupForm.addEventListener("click", () => {
    openForm("editForm")
})
closeEditPopupForm.addEventListener("click", () => {
    editContactMessage.innerText = '';
    edit_Contact_Name_Input.value = '';
    closeForm("editForm");
})
addContactButton.addEventListener('click', () => {
    addErrorMessagesElement.classList.add("ErrorMessage");
    if (add_Contact_Phone_Input.value === "") {

        addErrorMessagesElement.innerText = "شماره همراه مخاطب را وارد کنید"
    }
    else if (add_Contact_Name_Input.value === "") {

        addErrorMessagesElement.innerText = "نام مخاطب را وارد کنید"
    }
    else {
        const data = {
            contactPhone: add_Contact_Phone_Input.value,
            contactName: add_Contact_Name_Input.value
        }
        fetch("http://127.0.0.1:5500/contact/addContact", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.statusCode === 200) {
                    addErrorMessagesElement.innerText = '';
                    add_Contact_Phone_Input.value = '';
                    add_Contact_Name_Input.value = '';
                    closeForm("addForm")
                    getrooms();
                }
                else if (data.statusCode === 400 || data.statusCode === 404)
                    addErrorMessagesElement.innerText = data.message
            })
            .catch(err => {
                //console.log("Catched Error: ", err)
                addErrorMessagesElement.innerText = "مشکلی پیش آمده است لطفا بعدا امتحان کنید"
            })
    }
})
editContactButton.addEventListener('click', async () => {
    editContactMessage.classList.add("ErrorMessage");
    try {
        const response = await fetch("http://127.0.0.1:5500/contact/editContact", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                contactNewName: edit_Contact_Name_Input.value,
                contactPhone: contactPhone.innerText
            })
        });
        const data = await response.json();
        if (data.statusCode === 200) {
            editContactMessage.innerText = "";
            edit_Contact_Name_Input.value = '';
            closeForm("editForm");
            getrooms();
        }
        else
            editContactMessage.innerText = data.message;
    }
    catch (err) {
        editContactMessage.innerText = "مشکلی پیش آمده است لطفا بعدا امتحان کنید"
        //console.log("catched error: ", err);
    }
})
//#endregion
//#region functions
function openForm(whichForm) {
    document.getElementById("overlay").classList.add("active");
    document.getElementById(whichForm).classList.add("active");
}
function closeForm(whichForm) {
    document.getElementById("overlay").classList.remove("active");
    document.getElementById(whichForm).classList.remove("active");
}
//#endregion
