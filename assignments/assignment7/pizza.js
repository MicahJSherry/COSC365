window.onload = pageLoad;

function pageLoad() {
    calculateTotal();
    var size = document.getElementById("size");
    size.onclick = calculateTotal;


    var toppings = document.getElementById("toppings");
    toppings.onclick = calculateTotal;


    var crust = document.getElementById("crust");
    crust.onclick = calculateTotal;
}



function calculateTotal() {

    var price = 9.90;

    var XLarge = document.getElementById("XLarge");
    var Large = document.getElementById("Large");
    if (XLarge.checked) {
        price += 3.05;
        XLarge.parentNode.style.backgroundColor = "aqua";
        Large.parentNode.style.backgroundColor  = "white";
    
    } else { // large is checked by default
        XLarge.parentNode.style.backgroundColor = "white";
        Large.parentNode.style.backgroundColor  = "aqua";
    }

    var toppings = document.getElementById("toppings");


    var t = toppings.querySelectorAll("input");
    var hasTopping = false;
    for (var i = 0; i < t.length; i++) {
        if (t[i].checked) {
            price += 1.25;
            hasTopping = true;
            t[i].parentNode.style.backgroundColor = "yellow";
        } else {
            t[i].parentNode.style.backgroundColor = "white";
        }
    }

    if (hasTopping) {
        var pizzaImg = document.getElementById("pizzaImg").src = "images/pizza-pepperoni.png";

    } else {
        var pizzaImg = document.getElementById("pizzaImg").src = "images/pizza-cheese.png";
    }

    var crust = document.getElementById("crust");
    if (crust.value == "thin") {
        price += 1;
    } else if (crust.value == "deep") {
        price += 2;
    }

    var total = document.getElementById("total");
    total.innerHTML = price.toFixed(2);


}