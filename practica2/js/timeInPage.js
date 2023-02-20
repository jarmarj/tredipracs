let seconds = 60;
let minutes = 29;
let timetext = "";
function showTime() {
  seconds--;
  if (seconds < 0) {
    minutes--;
    seconds = 59
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
