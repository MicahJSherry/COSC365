window.onload = pageLoad;

function pageLoad(){

    
    var add = document.getElementById("addItem");
    add.onclick = addList; 
}

function addList(){
    var categories = document.getElementById("itemCategory").querySelectorAll("input");
    
    for (var i = 0; i< categories.length; i++){
        if (categories[i].checked){
            var category = categories[i].value;
        }    
    }
    if (category ===undefined){   
        alert("No category selected.");
        return;
    }
    var item = document.getElementById("itemName");
    var itemName = item.querySelectorAll("input")[0].value;

    var quantity = document.getElementById("itemQty");
    var itemQty = quantity.querySelectorAll("input")[0].value;
    
    var total = document.getElementById("total");
    total.innerHTML = Number(total.innerHTML) + Number(itemQty);
    
    var listItem = document.createElement("li");
    listItem.innerHTML = itemQty+" "+itemName;
    if (itemQty>5){
        listItem.style.color = "red";
    }
    var list = document.getElementById(category);
    list.appendChild(listItem);
    
}


