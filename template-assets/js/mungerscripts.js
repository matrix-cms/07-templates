<!-- // hide from old browsers

function focusField(element, text) { //removes default text in search field
  if (element.value == text) {
 element.value = "";
  }
}

function blurField(element, text) { //removes default text in search field if left empty
  if (element.value == "") {
 element.value = text;
  }
}


function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function sendmail(address) {
       document.write('<a href="\u006d\u0061\u0069\u006c\u0074\u006f\u003a'+address+'\u0040'+'unimelb.edu.au">');
       document.write(address+'@unimelb.edu.au</a>');
}

// -->
