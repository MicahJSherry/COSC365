window.onload = pageLoad;

function pageLoad(){
    var button = document.getElementById("clickMe");
    //var fs = document.getElementById("fsducks");

    button.onclick = generate;
    fsducks.onclick = processDucks;
    colorButton.onclick = changeColor;
}


function generate(){
    var span = document.getElementById("showdom");
    span.innerHTML += "Href: " + location.href + "<br>";
    span.innerHTML += "Screen width: " + screen.width + "<br>";
    span.innerHTML += "Screen height: " + screen.height + "<br>";
    span.innerHTML += location.port;
}

function processDucks(){
    alert(this.id+ " is checked!")
}

function changeColor(){
    var allParas = document.getElementsByTagName("div");
    for(var i = 0; i <allParas.length; i++){
        allParas[i].style.color= "green";
    
    var p = document.createElement("p");
    p.innerHTML = "New Paragraph";
    document.getElementById("myDiv").append(p);
    }
}