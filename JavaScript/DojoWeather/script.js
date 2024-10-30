var displayedCity = "San Jose";

function removeElement(elementID) {
    var element = document.getElementById(elementID);
    element.remove();
}
function cityChange(element) {
    alert("Loading weather report for " + element.textContent + "...");
}
function updateTemperatures() {
    let temperatureLabels = document.querySelectorAll('.temperature-value');
    let temperature = document.getElementById("temperature-selection");
    let currentTemperature, newTemperature = 0;
    console.log(temperature.value);

    if (temperature.value === "celsius") {
        temperatureLabels.forEach(label => {
            currentTemperature = parseInt((label.textContent).replace("°", ""));
            newTemperature = celsiusToFahrenheit(currentTemperature);
            label.textContent = newTemperature + "°";
        });
    } else {
        temperatureLabels.forEach(label => {
            currentTemperature = parseInt((label.textContent).replace("°", ""));
            newTemperature = fahrenheitToCelsius(currentTemperature);
            label.textContent = newTemperature + "°";
        });
    }
}
function celsiusToFahrenheit(num) {
    return Math.round((num - 32) * 5 / 9);
}
function fahrenheitToCelsius(num) {
    return Math.round((num * 9 / 5) + 32);
}