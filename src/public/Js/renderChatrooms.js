//#region import modules
import showRoomMessages from "./renderChatroomMessages.js";
//#endregion
//#region get Elements from DOM
const chatSectionElement = document.getElementById("chatSection");
const ChatroomHeaderName = document.getElementById('selectedChatroomName');
const ChatroomHeaderPhone = document.getElementById("selectedChatroomPhone");
const editContactIcon = document.getElementById("openEditFormBtn");
const contactContainer = document.getElementById("contactContainer");
const roomIdContainerElement = document.getElementById("roomId");
const errorMessageBoxElement = document.getElementById("ErrorMessageBox");
const IntervalContainer = [];
//#endregion
//#region functions
export async function getChatroomMessages(roomId) {
    try {
        const response = await fetch(`http://127.0.0.1:5500/getchatroomMessages/${roomId}`, {
            method: "GET",
            credentials: 'include',
        });
        const data = await response.json();
        if (data.statusCode === 200) {
            showRoomMessages(data.messages);
        }
        else {
            errorMessageBoxElement.style.display = "block"
            setTimeout(() => errorMessageBoxElement.style.display = "none", 3000);
        }

    }
    catch (err) {
        //console.log("catched error: ", err);
        errorMessageBoxElement.style.display = "block"
        setTimeout(() => errorMessageBoxElement.style.display = "none", 3000);
        const interval = IntervalContainer.pop();
        if (interval)
            clearInterval(interval);

    }
}
export default function renderChatrooms(rooms) {

    chatSectionElement.style.display = "none";
    if (contactContainer.hasChildNodes()) {
        contactContainer.removeChild(contactContainer.firstChild);
    }
    const chatroomsList = document.createElement("ul");
    chatroomsList.setAttribute("id", "chatrooms");
    rooms.forEach(room => {
        const liElement = document.createElement("li");
        liElement.classList.add("p-0");

        const containerDivElement = document.createElement("div");
        containerDivElement.classList.add("d-flex", "flex-row");

        const firstDivElement = document.createElement("div");

        const iconElement = document.createElement("i");
        iconElement.classList.add("fa-solid", "fa-user", "fa-xl", "mt-4", "mr-3");

        const secondDivElement = document.createElement("div");
        secondDivElement.classList.add("p-3");

        const pElementContainRoomName = document.createElement("p");
        pElementContainRoomName.classList.add("fw-bold", "mb-0");
        pElementContainRoomName.setAttribute("id", "contactName");

        pElementContainRoomName.innerText = room.roomName;

        const spanElementContainRoomPhone = document.createElement("span");

        spanElementContainRoomPhone.innerText = room.otherSidePhone;

        spanElementContainRoomPhone.style.display = "none";


        secondDivElement.appendChild(pElementContainRoomName);
        secondDivElement.appendChild(spanElementContainRoomPhone);

        firstDivElement.appendChild(iconElement);

        containerDivElement.appendChild(firstDivElement);
        containerDivElement.appendChild(secondDivElement);

        liElement.appendChild(containerDivElement);

        liElement.addEventListener('click', async () => {
            for (let i = 0; i < chatroomsList.childElementCount; i++)
                if (chatroomsList.children[i].classList.contains("selected"))
                    chatroomsList.children[i].classList.remove("selected");

            liElement.classList.add("selected");
            roomIdContainerElement.innerText = room.roomId;
            chatSectionElement.style.display = "block";
            if (room.otherSidePhone == undefined)
                editContactIcon.style.display = 'none';
            else
                editContactIcon.style.display = 'block';
            ChatroomHeaderName.innerText = room.roomName;
            ChatroomHeaderPhone.innerText = room.otherSidePhone;
            try {
                if (IntervalContainer.length !== 0) {
                    const lastInterval = IntervalContainer.pop();
                    clearInterval(lastInterval);
                }
                await getChatroomMessages(room.roomId);
                const newInterval = setInterval(() => {
                    getChatroomMessages(room.roomId);
                }, 3000);

                IntervalContainer.push(newInterval);

            }
            catch (err) {
                console.log("catched error: ", err);
            }

        })
        chatroomsList.appendChild(liElement);
    })
    contactContainer.appendChild(chatroomsList);
}
//#endregion