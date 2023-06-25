//#region import modules
import renderChatrooms, { getChatroomMessages } from "./renderChatrooms.js";
//#endregion
//#region get elements from dom
const sendMessageInputElem = document.getElementById("sendMessageInput");
const roomIdContainer = document.getElementById("roomId");
const errorMessageBoxElement = document.getElementById("ErrorMessageBox");
//#endregion
//#region functions
export function getrooms() {
    fetch("http://127.0.0.1:5500/getRooms", {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            if (data.statusCode === 200) {
                renderChatrooms(data.chatrooms);
            }
            else {
                errorMessageBoxElement.style.display = "block"
                setTimeout(() => errorMessageBoxElement.style.display = "none", 3000);
            }
        })
        .catch((err) => {
            errorMessageBoxElement.style.display = "block"
            setTimeout(() => errorMessageBoxElement.style.display = "none", 3000);
            //console.log("Error occured: ", err)
        })
}
sendMessageInputElem.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        if (sendMessageInputElem.value) {
            try {
                const response = await fetch("http://127.0.0.1:5500/sendMessage", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({
                        roomId: roomIdContainer.innerText,
                        message: sendMessageInputElem.value
                    })
                })
                const data = await response.json();
                if (data.statusCode === 200) {
                    sendMessageInputElem.value = "";
                    await getChatroomMessages(roomIdContainer.innerText);
                }
                else {
                    errorMessageBoxElement.style.display = "block"
                    setTimeout(() => errorMessageBoxElement.style.display = "none", 3000);
                }
            }
            catch (err) {
                errorMessageBoxElement.style.display = "block"
                setTimeout(() => errorMessageBoxElement.style.display = "none", 3000);
                //console.log("catched error: ", err);
            }
        }
    }
});
//#endregion
getrooms();
