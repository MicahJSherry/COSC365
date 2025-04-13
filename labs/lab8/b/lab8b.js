window.onload = pageLoad;

function pageLoad(){
    
    var blue = document.getElementById("blue");
    blue.onclick = blueText;
    
    var green = document.getElementById("green");
    green.onclick = greenText;
    
    var size = document.getElementById("sizeid");
    size.onclick = changeSize;

}

function blueText(){
    var p = document.getElementById("myText");
    p.style.color = "blue";
}

function greenText(){
    var p = document.getElementById("myText");
    p.style.color = "green";
}

function changeSize(){
    var size = document.getElementById("sizeid");
    p = document.getElementById("myText");
    p.style.fontSize = size.value+"pt";
}