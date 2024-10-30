var nicoleLikes = 0;
var jimLikes = 0;
var neilLikes = 0;

function addLike(labelID) {
    var label = document.getElementById(labelID);
    if (labelID === "nicole-likes") {
        nicoleLikes++;
        label.innerText = nicoleLikes + " like(s)";
    } else if (labelID === "jim-likes") {
        jimLikes++;
        label.innerText = jimLikes + " like(s)";
    } else if (labelID === "neil-likes") {
        neilLikes++;
        label.innerText = neilLikes + " like(s)";
    }
}