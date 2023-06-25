//#region get elements from DOM
const togglePassIcon = document.getElementById('togglePassword');
const toggleRePassIcon = document.getElementById('toggleRePassword');
const password = document.getElementById('pass');
const rePassword = document.getElementById('rePass');
//#endregion
//#region event listeners
togglePassIcon.addEventListener("click", (event) => {
    let thisElement = document.getElementById('togglePassword');
    if (password.getAttribute('type') === 'password') {
        password.setAttribute('type', "text");
        thisElement.classList.remove("fa-eye");
        thisElement.classList.add("fa-eye-slash");
    }
    else {
        password.setAttribute('type', "password");
        thisElement.classList.remove("fa-eye-slash");
        thisElement.classList.add("fa-eye");
    }
});
toggleRePassIcon.addEventListener("click", (event) => {

    let thisElement = document.getElementById('toggleRePassword');
    if (rePassword.getAttribute('type') === 'password') {
        rePassword.setAttribute('type', "text");

        thisElement.classList.remove("fa-eye");
        thisElement.classList.add("fa-eye-slash");
    }
    else {
        rePassword.setAttribute('type', "password");
        thisElement.classList.remove("fa-eye-slash");
        thisElement.classList.add("fa-eye");
    }

})
//#endregion