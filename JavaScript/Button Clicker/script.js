var ninjaLikes = 0;
var programmerLikes = 0;

function addLike(element) {
    if (element === document.getElementById("ninja-likes")) {
        ninjaLikes++;
        element.innerText = ninjaLikes + " like(s)";
        alert("Ninja was liked!");
    } else if (element === document.getElementById("programmer-likes")) {
        programmerLikes++;
        element.innerText = programmerLikes + " like(s)";
        alert("Programmer was liked!");
    }
}

function swapLoginText(element) {
    if (element.innerText === "Login") {
        element.innerText = "Logout";
    } else {
        element.innerText = "Login";
    }
}

function removeElement(element) {
    element.remove();
}