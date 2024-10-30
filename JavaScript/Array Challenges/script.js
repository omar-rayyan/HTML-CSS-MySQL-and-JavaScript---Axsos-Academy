// Always Hungry

function alwaysHungry(arr) {
    let foodFound = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "food") {
            console.log("yummy");
            foodFound = true;
        }
    }
    if (foodFound === false) {
        console.log("I'm hungry");
    }
}
   
alwaysHungry([3.14, "food", "pie", true, "food"]);
alwaysHungry([4, 1, 5, 7, 2]);

// High Pass Filter

function highPass(arr, cutoff) {
    var filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > cutoff) {
            filteredArr.push(arr[i]);
        }
    }
    return filteredArr;
}
var result = highPass([6, 8, 3, 10, -2, 5, 9], 5);
console.log(result);

// Better than average

function betterThanAverage(arr) {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    
    var avg = sum / arr.length;
    var count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > avg) {
            count++;
        }
    }
    return count;
}
var result = betterThanAverage([6, 8, 3, 10, -2, 5, 9]);
console.log(result);

// Array Reverse

function reverse(arr) {
    var newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    return newArr;
}
   
var result = reverse(["a", "b", "c", "d", "e"]);
console.log(result);

// Fibonacci Array

function fibonacciArray(n) {
    var fibArr = [];
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            fibArr.push(0);
        } else if (i === 1) {
            fibArr.push(1);
        } else {
            fibArr.push(fibArr[i - 1] + fibArr[i - 2]);
        }
    }
    return fibArr;
}
   
var result = fibonacciArray(10);
console.log(result);