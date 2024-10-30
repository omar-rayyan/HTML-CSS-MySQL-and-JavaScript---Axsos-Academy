function pizzaOven(crust, sauce, cheeses, toppings) {
    var pizza = {};
    pizza.crust = crust;
    pizza.sauce = sauce;
    pizza.cheeses = cheeses;
    pizza.toppings = toppings;
    return pizza;
}

var p1 = pizzaOven("deep dish", "traditional", ["mozzarella"], ["pepperoni", "sausage"]);
var p2 = pizzaOven("hand tossed", "marinara", ["mozzarella", "feta"], ["mushrooms", "olives", "onions"]);
var p3 = pizzaOven("grilled", "traditional", ["mozzarella"], ["tomatoes", "olives", "peppers"]);
var p4 = pizzaOven("pan cooked", "marinara", ["feta"], ["mushrooms", "pineapples", "oregano"]);