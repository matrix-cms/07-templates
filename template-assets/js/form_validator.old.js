function initForm(formName) {
  var r = '';
  var cn = '';
  var sp, sm, st, tn, n, nm, nm2, v, w, s;
    
  if (document.getElementById && document.createElement) {
	var fm = document.getElementById(formName);
	var ri = document.getElementById('reqinfo');
	var fe = fm.elements;

    for (k = 0; k < fe.length; k++) {
      if(fe[k].className == 'required') {
		nm = fe[k].getAttribute('name');
        do {
		  nm2 = fe[k+1].getAttribute('name');
          if (nm == nm2) {
            k = k + 1;
          }
        } while (nm == nm2)
        sp = document.createElement('span'); 
        sp.className = 'req';
        st = ' *req'
        tn = document.createTextNode(st);
        sp.appendChild(tn);
        fe[k].parentNode.appendChild(sp);
        r = 'r';
      }
    }
    if (r!='') { 
      sp = document.createElement('span');
      sm = document.createElement('small');
      sp.className = 'req';
      st = '*req'
      tn = document.createTextNode(st);
      sp.appendChild(tn);
      st = ' = required information'
      tn = document.createTextNode(st);
      sm.appendChild(tn);      
      ri.appendChild(sp);      
      ri.appendChild(sm);
    }    
  }
}

function validateForm(theForm) {
  var errmsg = '';
  var errmsgfull = '';
  var str = '';
  var e = theForm.elements;
  var d, q, j, m, f, b, i, di, typ, y, z, nmv, nmv2, u, chkd, startcount;
  
  if (document.getElementById && document.createElement) {
    f = document.getElementById('formerrormessage');
    if (f.hasChildNodes()) {
      for (i = 0; i < f.childNodes.length; i++) {
        f.removeChild(f.firstChild);
      }
    }
    di = document.createElement('div');
    di.className = 'formerrormessage';
    for (j = 0; j < e.length; j++) {
      if(e[j].className == 'required') {
        e[j].style.backgroundColor='white';
        m = e[j].nodeName;
        errmsg = '';
        switch  (m) {
          case 'INPUT':
			typ = e[j].getAttribute('type');
            if ((typ == 'radio') || (typ == 'checkbox')) {
              chkd = 'no';
              u = 0;
              startcount = j;
              nmv = e[j].getAttribute('name');
              nmv2 = e[j+1].getAttribute('name');               
              while (nmv == nmv2) {
                u = u + 1;
                nmv = e[j].getAttribute('name');
                nmv2 = e[j+1].getAttribute('name');              
                if (e[j].checked) {
                  chkd = 'yes';
                } 
                if (nmv == nmv2) {
                  j = j + 1;
                }
              }  
              if (u > 0) {
                for (y = 0; y < u; y++) {
                  if (chkd == 'no') {
                    e[startcount].style.backgroundColor='#ffff66';
                  }
                  else {
                    e[startcount].style.backgroundColor='transparent';
                  }
                  startcount = startcount + 1;
                }
                if (chkd == 'no') {
                  errmsg += 'Please select an option from the ' + nmv + ' ' + typ + ' buttons.';
                  errmsgfull += 'i,';              
                }                
              }
            }
            else {
              if (e[j].value == '') {
                errmsg = 'Please enter text in the ' + e[j].getAttribute('name') + ' field.';
                e[j].style.backgroundColor='#ffff66';
                errmsgfull += 'i,';
              }
              else {
                if (e[j].getAttribute('name') == 'Email') {
                  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e[j].value)) { }
                  else {
                    errmsg += 'Please enter a valid email address in the Email field.';
                    e[j].style.backgroundColor='#ffff66';
                    errmsgfull += 'i,';
                  }
                }
                else {
                  if (/^[a-zA-Z0-9_\-\.\,\'\"\@\(\)\?\*\!\/\s]+$/.test(e[j].value)) { }
                  else {
                    errmsg += 'Please enter valid characters in the ' + e[j].getAttribute('name') + ' field.';
                    e[j].style.backgroundColor='#ffff66';
                    errmsgfull += 'i,';
                  }
                }
              }            
            }
            break;
          case 'TEXTAREA':
            if (e[j].value == '') {
              errmsg = 'Please enter text in the ' + e[j].getAttribute('name') + ' textfield.';
              e[j].style.backgroundColor='#ffff66';
              errmsgfull += 't,';
            }
            else {
              if (/^[a-zA-Z0-9_\-\.\,\'\"\@\(\)\?\*\!\/\s\n\r\t]+$/.test(e[j].value)) { }
              else {
                errmsg += 'Please enter valid characters in the ' + e[j].getAttribute('name') + ' field.';
                e[j].style.backgroundColor='#ffff66';
                errmsgfull += 'i,';
              }            
            }
            break;
          case 'SELECT':
            if (e[j].options[e[j].selectedIndex].value == '') {
              errmsg = 'Please select an option from the ' + e[j].getAttribute('name') + ' drop down list.';
              e[j].style.backgroundColor='#ffff66';
              errmsgfull += 's,';
            }
            break;
          default:
            break;
        }
        if (errmsg!='') { 
          str = document.createTextNode(errmsg);
          b = document.createElement('br');
          di.appendChild(str);
          di.appendChild(b);       
        }       
      }
    }
    if (errmsgfull!='') { 
      f.appendChild(di);
      return false;
    }
  }  
  else {
    //alert('old browser');
  }
}  