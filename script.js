const hours = document.getElementById("hr");
const minutes = document.getElementById("min");
const seconds = document.getElementById("sec");
const am_pm = document.getElementById("ampm");

setInterval(() => {
  let date = new Date();
  let hh = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  let am = hh > 12 ? "PM" : "AM";

  // convert 24 hr t0 12 hr
  if (hh > 12) {
    hh -= 12;
  }

  //   adding zero before time
  hh = hh < 10 ? "0" + hh : hh;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  hours.innerHTML = hh;
  minutes.innerHTML = min;
  seconds.innerHTML = sec;
  am_pm.innerHTML = am;
}, 1000);


const audio = new Audio("Audio/Alarm_Clock.mp3");

audio.loop = true;  

// *********

let arr = [];
let setHour = document.getElementById("hours");
let setMin = document.getElementById("minutes");
let setSec = document.getElementById("seconds");
let setAmPm = document.getElementById("ampm1");
let UpcomingAlarmUL = document.getElementById("UpcomingAlarm");

// options for time selection

let totalHours = 12;
for (let i = 1; i <= totalHours; i++) {
  setHour.options[setHour.options.length] = new Option(i < 10 ? "0" + i : i);
}

let totalMinutes = 59;

for (let i = 0; i <= totalMinutes; i++) {
  setMin.options[setMin.options.length] = new Option(i < 10 ? "0" + i : i);
}

let totalSec = 59;
for (let i = 0; i <= totalSec; i++) {
  setSec.options[setSec.options.length] = new Option(i < 10 ? "0" + i : i);
}

let timeTeller = ["AM", "PM"];
for (let i = 0; i < timeTeller.length; i++) {
  setAmPm.options[setAmPm.options.length] = new Option(timeTeller[i]);
}

// new alarm time list element
let createNewTaskElement = function (alarmString) {
  let listItem = document.createElement("li");
  let label = document.createElement("label");
  let deleteButton = document.createElement("button");

  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  label.innerText = alarmString;

  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  return listItem;
};

// set alarm button

let setButton = document.getElementById("setButton");

setButton.addEventListener("click", function () {
  // get the index value of selected options
  let selectedHr = setHour.options[setHour.selectedIndex].value;
  let selectedMin = setMin.options[setMin.selectedIndex].value;
  let selectedSec = setSec.options[setSec.selectedIndex].value;
  let selectedTimeTeller = setAmPm.options[setAmPm.selectedIndex].value;
  let len = arr.length + 1;

  //getting todays time
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = dd + " / " + mm + " / " + yyyy;
  let alarmhr = parseInt(selectedHr);

  if (selectedTimeTeller == "PM") {
    alarmhr = 12 + alarmhr;
  }

  if (selectedTimeTeller == "AM" && alarmhr == 12) {
    alarmhr = 0;
  }

  if (alarmhr < 10) {
    alarmhr = "0" + alarmhr;
  }

  let timeForAlarm = alarmhr + ":" + selectedMin + ":" + selectedSec;

  var d = new Date(`${today} ${timeForAlarm}`);

  // getting time for milliseconds

  let milliSec = d.getTime();

  // storing alarm time data in Array;
  arr.push([
    selectedHr,
    selectedMin,
    selectedSec,
    selectedTimeTeller,
    milliSec,
    len,
  ]);

  // millisec time is used to sorting the array and the forst element in the array
  // will be the first alarm to get triggered;

  arr = arr.sort((a, b) => a[4] - b[4]);

  let val =
    len.toString() +
    ")" +
    selectedHr +
    ":" +
    selectedMin +
    ":" +
    selectedSec +
    ":" +
    selectedTimeTeller;

  // creating list item

  let listItem = createNewTaskElement(val);
  UpcomingAlarmUL.appendChild(listItem);

  

  //function to match time with current time;

  setInterval(() => {
    let date = new Date();
    let hh = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    let am = hh > 12 ? "PM" : "AM";

    // convert 24 hr t0 12 hr
    if (hh > 12) {
      hh -= 12;
    }

    //   adding zero before time
    hh = hh < 10 ? "0" + hh : hh;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    // current time matches with alarm
    for (let i = 0; i < arr.length; i++) {
      if (
        arr.length != 0 &&
        arr[i][0] == hh &&
        arr[i][1] == min &&
        arr[i][2] == sec &&
        arr[i][3] == am
      ) {
        alert("Alarm is ringing");
        audio.play();
      }
    }
  }, 1000);


  //when stop alrm button is clicked
  document.getElementById("stopButton").addEventListener('click',  ()=>{
  
    audio.pause();
  })

  let deleteIndex = 0;
   

    let deleteAlarm = function (){
      let listItem = this.parentNode;
      let ul = listItem.parentNode;
      let deleteButton = listItem.querySelector("button.delete");
      deleteIndex = parseInt(deleteButton.innerHTML[6]);
      for(let i=0; i<arr.length; i++){
        if(arr[i][5] == deleteIndex ){
          arr.splice(i, 1);
        }
      }

      ul.removeChild(listItem);

    }

    let bindAlarmEvent = function(alarmListItem){
      var deleteButton = alarmListItem.querySelector("button.delete");

      deleteButton.onclick = deleteAlarm;
    }

    // this function is used to delete  an alarm element

  bindAlarmEvent(listItem);
});





