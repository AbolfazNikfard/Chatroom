import PersianDate from "./ConvertToPersianDate.js";
export default function showRoomMessages(chatroom, selectedroom) {
    let chatroomMessages = document.getElementById("showMessages");
    while (chatroomMessages.hasChildNodes())
        chatroomMessages.removeChild(chatroomMessages.lastChild);

    if (selectedroom.messages.length == 0) {
        chatroomMessages.classList.add("showMsg");
        let showNoMessageElement = document.createElement("span");
        showNoMessageElement.classList.add("noMessage");
        showNoMessageElement.innerText = "پیامی وجود ندارد...";
        chatroomMessages.appendChild(showNoMessageElement);
    }
    else {
        chatroomMessages.classList.remove("showMsg");
        for (let i = 0; i < selectedroom.messages.length; i++) {
            if (selectedroom.messages[i].userFk != chatroom.userPhone) {

                let messageContainerDivElement = document.createElement("div");
                let messageNestedDivElement = document.createElement("div");
                let messagePElement = document.createElement("p");
                let messageDatePElement = document.createElement("p");

                messageContainerDivElement.classList.add("d-flex", "flex-row", "justify-content-start");
                messagePElement.classList.add("small", "p-2", "ms-3", "mb-1", "rounded-3", "othersMessage");
                messageDatePElement.classList.add("small", "ms-3", "mb-3", "rounded-3", "float-end", "messagesDateTime", "alignOtherMessagesDateTime");
                messagePElement.innerText = selectedroom.messages[i].message;
                const messageDateTime = new PersianDate(selectedroom.messages[i].created_at);
                messageDatePElement.innerText = `${messageDateTime.getPersianDate()} - ${messageDateTime.getTime()}`;

                messageNestedDivElement.appendChild(messagePElement);
                messageNestedDivElement.appendChild(messageDatePElement);
                messageContainerDivElement.appendChild(messageNestedDivElement);
                chatroomMessages.appendChild(messageContainerDivElement);
            }
            else {
                let messageContainerDivElement = document.createElement("div");
                let messageNestedDivElement = document.createElement("div");
                let messagePElement = document.createElement("p");
                let messageDatePElement = document.createElement("p");

                messageContainerDivElement.classList.add("d-flex", "flex-row", "justify-content-end", "pl-3");
                messagePElement.classList.add("small", "p-2", "me-3", "mb-1", "rounded-3", "mySelfMessage");
                messageDatePElement.classList.add("small", "ms-3", "mb-3", "rounded-3", "messagesDateTime", "alignMyselfMessagesDateTime");
                messagePElement.innerText = selectedroom.messages[i].message;
                const messageDateTime = new PersianDate(selectedroom.messages[i].created_at);
                messageDatePElement.innerText = `${messageDateTime.getPersianDate()} - ${messageDateTime.getTime()}`;

                messageNestedDivElement.appendChild(messagePElement);
                messageNestedDivElement.appendChild(messageDatePElement);
                messageContainerDivElement.appendChild(messageNestedDivElement);
                chatroomMessages.appendChild(messageContainerDivElement);
            }
        }
    }
}
/*
<div class="d-flex flex-row justify-content-start">
    <img src="./style/images/user-default-image.png" alt="avatar" style="width: 45px; height: 100%;">
    <div>
        <p class="small p-2 ms-3 mb-1 rounded-3 othersMessage">سلام
            خوبی چخبر ؟
        </p>
        <p class="small ms-3 mb-3 rounded-3 float-end messagesDateTime alignOtherMessagesDateTime">
            <span>20 </span><span>فروردین </span><span>1402</span> - <span>14:10</span>
        </p>
    </div>
</div>

<div class="d-flex flex-row justify-content-end pl-3">
    <div>
        <p class="small p-2 me-3 mb-1 text-white rounded-3 mySelfMessage">سلام مرسی
            من خوبم تو چخبر ؟
        </p>
        <p class="small me-3 mb-3 rounded-3 messagesDateTime alignMyselfMessagesDateTime">
            <span>14:10</span><span> - 20</span><span> فروردین</span><span> 1402</span>
        </p>
    </div>
</div>*/
