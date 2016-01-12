function tableruler() {
 if (document.getElementById && document.createTextNode) {
  var tables=document.getElementsByTagName('table');
  for (var i=0;i<tables.length;i++)   {
   if(tables[i].className=='stripedtable') {
    var trs=tables[i].getElementsByTagName('tr');
    for(var j=0;j<trs.length;j++) {
     if(trs[j].className=='stheader') { }
     else {
      trs[j].onmouseover=function(){this.className='ruled';return false}
      trs[j].onmouseout=function(){this.className='';return false}
     }
    }
   }
  }
 }
}
