import PersianDate from "./ConvertToPersianDate.js";
export default function showRoomMessages(messages) {
    const chatroomMessagesContainer = document.getElementById("showMessages");
    if (chatroomMessagesContainer.firstChild)
        chatroomMessagesContainer.removeChild(chatroomMessagesContainer.firstChild);

    const chatroomMessages = document.createElement("div");
    chatroomMessages.classList.add("divScroll", "pt-3", "pe-3");
    chatroomMessages.style.position = 'relative';
    chatroomMessages.style.height = "500px";
    chatroomMessagesContainer.appendChild(chatroomMessages);

    const thisUserPhone = document.getElementById("myPhone").innerText;

    if (messages.length == 0) {
        chatroomMessages.classList.add("showMsg");
        let showNoMessageElement = document.createElement("span");
        showNoMessageElement.classList.add("noMessage");
        showNoMessageElement.innerText = "پیامی وجود ندارد...";
        chatroomMessages.appendChild(showNoMessageElement);
    }
    else {
        chatroomMessages.classList.remove("showMsg");
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].userFk != thisUserPhone) {

                let messageContainerDivElement = document.createElement("div");
                let messageNestedDivElement = document.createElement("div");
                let messagePElement = document.createElement("p");
                let messageDatePElement = document.createElement("p");

                messageContainerDivElement.classList.add("d-flex", "flex-row", "justify-content-start");
                messagePElement.classList.add("small", "p-2", "ms-3", "mb-1", "rounded-3", "othersMessage");
                messageDatePElement.classList.add("small", "ms-3", "mb-3", "rounded-3", "float-end", "messagesDateTime", "alignOtherMessagesDateTime");
                messagePElement.innerText = messages[i].message;
                const messageDateTime = new PersianDate(messages[i].created_at);
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
                messagePElement.innerText = messages[i].message;
                const messageDateTime = new PersianDate(messages[i].created_at);
                messageDatePElement.innerText = `${messageDateTime.getPersianDate()} - ${messageDateTime.getTime()}`;

                messageNestedDivElement.appendChild(messagePElement);
                messageNestedDivElement.appendChild(messageDatePElement);
                messageContainerDivElement.appendChild(messageNestedDivElement);
                chatroomMessages.appendChild(messageContainerDivElement);
            }
        }
    }
}
