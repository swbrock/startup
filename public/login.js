function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("userName");
    window.location.href = "login.html";
}

function getUserName() {
    return localStorage.getItem("userName") ?? "Anonymous";
}

export { login, logout, getUserName };

