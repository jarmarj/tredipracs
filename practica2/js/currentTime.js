function showCurrentTime() {
  let newtime = new Date();

  let hour = newtime.getHours();
  let minute = newtime.getMinutes();
  let second = newtime.getSeconds();
  
 let timetext = hour + ":" + minute + ":" + second;

  document.getElementById("datetime").innerHTML = timetext;
  refreshTime();
}
function refreshTime() {
  let refresh = 1000; // Refresh in milliseconds
  mytime = setTimeout("showCurrentTime()", refresh);
}
refreshTime();
