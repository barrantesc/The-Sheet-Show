/* 
    Pulled base from w3-School and made changes as needed for project.
    SOURCE:
        https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp
*/

/* Open */
function openNav() {
  console.log('//-- openNav event')  
  document.getElementById("myNav").style.height = "100%";
}
  
  /* Close */
function closeNav() {
  console.log('//-- closeNav event')  
  document.getElementById("myNav").style.height = "0%";
}

  