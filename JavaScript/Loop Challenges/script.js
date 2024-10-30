// Display Odd Numbers

for (let i = 0; i <= 20; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}

// Decreasing multiples of 3

for (let i = 100; i >= 0; i--) {
    if (i % 3 !== 0) {
        console.log(i);
    }
}

// Print the given sequence

for (let i = 4; i >= -3.5; i-= 1.5) {
    console.log(i);
}

// Sigma

var sum = 0;

for (let i = 1; i <= 100; i++) {
    sum += i;
}

console.log(sum);

// Factorial

var product = 0;

for (let i = 1; i <= 12; i++) {
    if (product === 0) {
        product = i;
    } else {
        product *= i;
    }
}

console.log(product);