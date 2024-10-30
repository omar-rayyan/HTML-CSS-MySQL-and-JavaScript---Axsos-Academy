var likes = 0;

function addLike() {
    likes++
    var likesLabel = document.querySelector("#likes");
    likesLabel.innerText = likes + " like(s)"
}