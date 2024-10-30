var currentNumber = "0";
var previousNumber = "none";
var currentOperation = "none";

function press(num) {
    if (currentNumber == "0") {
        currentNumber = "";
    }
    currentNumber += num.toString();
    updateCurrentNumber();
}
function resetCalculator() {
    currentNumber = "0";
    updateCurrentNumber();
}
function updateCurrentNumber() {
    let label = document.getElementById("display");
    label.innerText = currentNumber;
}
function setOP(operation) {
    if (currentOperation !== "none") {
        calculate();
    }
    previousNumber = currentNumber;
    currentOperation = operation;
    currentNumber = "0";
}
function calculate() {
    if (currentOperation === "+") {
        currentNumber = (Number(previousNumber) + Number(currentNumber)).toString();
        previousNumber = "none";
        currentOperation = "none";
        updateCurrentNumber();
    } else if (currentOperation === "-") {
        currentNumber = (Number(previousNumber) - Number(currentNumber)).toString();
        previousNumber = "none";
        currentOperation = "none";
        updateCurrentNumber();
    } else if (currentOperation === "*") {
        currentNumber = (Number(previousNumber) * Number(currentNumber)).toString();
        previousNumber = "none";
        currentOperation = "none";
        updateCurrentNumber();
    } else if (currentOperation === "/") {
        currentNumber = (Number(previousNumber) / Number(currentNumber)).toString();
        previousNumber = "none";
        currentOperation = "none";
        updateCurrentNumber();
    }
}