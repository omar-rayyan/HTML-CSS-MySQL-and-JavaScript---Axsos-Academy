var currentSlide = 3;

function removeElement(element) {
    element.remove();
}
function displaySearchboxValue() {
    let searchbox = document.querySelector("#searchbox").value;
    alert("You're searching for: " + searchbox);
}
function addToFavorites(button) {
    let favoritesCount = document.querySelector("#favroites-count");
    favoritesCount.textContent++;
    button.remove();
}
function switchBetweenSlides(direction) {
    let slideBanner = document.querySelector("#featured-anime-cover");
    if (direction === "right") {
        if(currentSlide === 5) {
            currentSlide = 1;
        } else {
            currentSlide++;
        }
    } else {
        if(currentSlide === 1) {
            currentSlide = 5;
        } else {
            currentSlide--;
        }
    }
    let slidePath = "assets/slider/" + currentSlide + ".jpg";
    slideBanner.setAttribute("src", slidePath);
}