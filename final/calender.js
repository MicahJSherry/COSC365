window.onload = pageLoad;

var month_offset=0;
var year_offset=0;
var events ={};

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

function clearChildDivs(parentSelector){
    var divs = $$(parentSelector + " div");
    divs.forEach(element => {
        element.remove()
    });
}
function calenderDiv(day, month,  year){
    var div = document.createElement("div");    
    var head = document.createElement("h4"); 
    head.innerHTML = day;
    div.appendChild(head);
    div.onclick = () => renderDay(day, month, year);
    return div;

}
function renderCalender(){
    clearChildDivs("#calender");
    var calender = $("calender");
    
    var today = new Date();
    const monthIndex = (today.getMonth()+month_offset); 
    
    const year = (today.getFullYear()+ Math.floor(monthIndex / 12));
    
    var firstDay = new Date(year, monthIndex%12, 1);
    var offset = firstDay.getDay();

    var lastDay = new Date(year, (monthIndex + 1)%12, 0);
    var lastDate = lastDay.getDate();
    
    $("month").innerHTML = monthNames[monthIndex%12];
    $("year").innerHTML  = year;

    var bufferDiv = document.createElement("div");
    bufferDiv.style.gridColumn= 1 + " / " + (offset+1);
    calender.appendChild(bufferDiv);
    if (offset==0){
        bufferDiv.style.display="none";
        bufferDiv.style.visibility="hidden";
        
    }
    
    for (var i = 1; i<=lastDate; i++){
        var div = calenderDiv(i, monthIndex%12, year);
        calender.appendChild(div);
        
    }
    displayEvents(monthIndex%12, year);
    var initDay = month_offset==0 ? today.getDate() : 1;
    renderDay(initDay, monthIndex%12, year)

}

function renderDay(day, month, year){
    
    clearChildDivs("#day");
    var dayDiv = $("day");
    var hr = document.createElement("hr");
    $("monthHeader").innerHTML = monthNames[month];
    $("dayHeader").innerHTML = day
    $("yearHeader").innerHTML = year;
    
    var dailyEvents = events[year][month+1][day];
    if(dailyEvents){
        for (var e of dailyEvents){
            var div = renderEventDiv(e);
            dayDiv.appendChild(div);
        }
    }
        
    
    var addButton = $("addButton");

    addButton.onclick = () => createEvent(day, month, year)
}

function renderEventDiv(e){
    var div = document.createElement("div");
    var h4 = document.createElement("h4");
    h4.innerHTML = e.title;
    div.appendChild(h4);
    for (var key in e) {
        if (e.hasOwnProperty(key) && key!= "title") {
            var p = document.createElement("p");
            p.innerHTML = `${key}: ${e[key]}`;
            div.appendChild(p);
        }
    }
    
    return div;
}


function createEvent(day, month, year){
    

    var newEvent = {
        "title": $("eventTitle").value,
        "Description": $("eventDesc").value,
        "Location": $("eventLoc").value,
        "Time": convert24toAmPm($("eventTime").value)
    };
    
    if (!events[year]){
        
        events[year] = {};
    }
    if (!events[year][month+1]){
        
        events[year][month+1]= {};
    }
    if (!events[year][month+1][day]){
        
        events[year][month+1][day]= [];
    }
    
    events[year][month+1][day].push(newEvent);
    
    renderCalender();
    renderDay(day,month,year);
}

function displayEvents(month, year){
    monthEvents = events[year][month+1];
    var days = $$("#calender div");
    for (var day in monthEvents){
        var dayEvents= monthEvents[day];
        
        var len = dayEvents.length;
        if (len>=4){
            var p = document.createElement("p");
            p.innerHTML = len + " events";
            p.classList.add("nEvents");
        
            days[Number(day)].appendChild(p);
        } else {
            for (var item of dayEvents){
            
                var p = document.createElement("p");
                p.innerHTML = item.title;
                days[Number(day)].appendChild(p);
            }
        }

    }
    
}
function convert24toAmPm(time24) {
    var [hours, minutes] = time24.split(":").map(Number); 
    var period = hours >= 12 ? "pm" : "am"; 
    hours = hours % 12 || 12; 
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}



function pageLoad(){
    
    var next = $("nextbutton");
    var prev = $("prevbutton");
    next.onclick = () => {month_offset+=1; renderCalender()};
    prev.onclick = () => {month_offset-=1; renderCalender()};

    
    new Ajax.Request("events.json", {
        method: "get",
        onSuccess: function (ajax) {
            events = JSON.parse(ajax.responseText); 
            renderCalender(); 
        },
        onFailure: function () {
            alert("Failed to load events.json");
        }
    });
}     

