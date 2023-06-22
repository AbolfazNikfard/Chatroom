import showRoomMessages from "./roomMessages.js";
const ulElement = document.querySelector('#contact');
const ChatroomHeaderName = document.querySelector('#selectedChatroomName');
const ChatroomHeaderPhone = document.getElementById("selectedChatroomPhone");
const chatSectionElement = document.getElementById("chatSection");
const whichRoomWannaAddMsg = document.getElementById("whichRoomWannaAddMsg");
const chatroom = JSON.parse(document.getElementById("chatroomsContainerElement").dataset.chatrooms);
const editContactPhone = document.getElementById("editContactPhoneInput");
let selectedRoom;
let Interval;
console.log("chatrooms : ", chatroom);
chatSectionElement.style.display = "none";

for (let i = 0; i < ulElement.children.length; i++) {
    if (i === 0) {
        ulElement.children[0].classList.add("selected");
        const ElementThatContainChatroomName = ulElement.children[0].children[0].children[1].children[0];
        const ElementThatContainChatroomPhone = ulElement.children[0].children[0].children[1].children[1];
        ChatroomHeaderName.innerHTML = ElementThatContainChatroomName.innerText;
        ChatroomHeaderPhone.innerHTML = ElementThatContainChatroomPhone.innerText;
        chatSectionElement.style.display = "block";
        selectedRoom = chatroom.rooms.find(chtroom => chtroom.otherSidePhone == ElementThatContainChatroomPhone.innerText);
        whichRoomWannaAddMsg.value = selectedRoom.roomId;
        showRoomMessages(chatroom, selectedRoom);
        editContactPhone.value = ElementThatContainChatroomPhone.innerText;
        // Interval = setInterval(() => {
        //     let xhttp = new XMLHttpRequest();
        //     console.log("xhttp : ", xhttp);
        //     xhttp.onreadystatechange = function () {
        //         if (this.readyState == 4 && this.status == 200)
        //             console.log(this.responseText);
        //     }
        //     const requestUrl = `getRoomMessages/?roomId=${chatroom.rooms[0].roomId}`;
        //     xhttp.open("GET", requestUrl, true);
        //     xhttp.send();
        // }, 5000)
    }
    ulElement.children[i].addEventListener("click", () => {
        chatSectionElement.style.display = "block";
        for (let j = 0; j < ulElement.children.length; j++) {
            ulElement.children[j].classList.remove("selected");
        }
        ulElement.children[i].classList.add("selected");
        const ElementThatContainChatroomName = ulElement.children[i].children[0].children[1].children[0];
        const ElementThatContainChatroomPhone = ulElement.children[i].children[0].children[1].children[1];
        ChatroomHeaderName.innerHTML = ElementThatContainChatroomName.innerText;
        ChatroomHeaderPhone.innerHTML = ElementThatContainChatroomPhone.innerHTML;
        selectedRoom = chatroom.rooms.find(chtroom => chtroom.otherSidePhone == ElementThatContainChatroomPhone.innerText);
        whichRoomWannaAddMsg.value = selectedRoom.roomId;
        showRoomMessages(chatroom, selectedRoom);
        editContactPhone.value = ElementThatContainChatroomPhone.innerText;
        // clearInterval(Interval);
        // Interval = setInterval(() => {
        //     let xhttp = new XMLHttpRequest();
        //     console.log("xhttp : ", xhttp);
        //     xhttp.onreadystatechange = function () {
        //         if (this.readyState == 4 && this.status == 200)
        //             console.log(this.responseText);
        //     }
        //     const requestUrl = `getRoomMessages/?roomId=${chatroom.rooms[i].roomId}`;
        //     xhttp.open("GET", requestUrl, true);
        //     xhttp.send();
        // }, 5000)
    })
}

