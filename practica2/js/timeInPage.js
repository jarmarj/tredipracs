let seconds = 0;
let minutes = 0;
let hours = 0;
let timetext = "";
function showTime() {
  seconds++;
  if (seconds > 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes > 60) {
    hours++;
    minutes = 0;
  }

  if (minutes < 10) {
    timetext = "0" + minutes + ":";
  } else {
    timetext = minutes + ":";
  }
  if (seconds < 10) {
    timetext = timetext + "0" + seconds;
  } else {
    timetext = timetext + seconds;
  }

  document.getElementById("datetime").innerHTML = timetext;
  refreshTime();
}
function refreshTime() {
  let refresh = 1000; // Refresh in milliseconds
  mytime = setTimeout("showTime()", refresh);
}
refreshTime();
