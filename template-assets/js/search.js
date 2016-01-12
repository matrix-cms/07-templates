window.name = "thiswindow";

function redirectSearch () {
  var search_type = "web";
  var search_term;
  
  if (document.searchform.qt.value) { 
    search_term = document.searchform.qt.value;
    if (search_term == "Enter+Keyword+or+Name") {
      search_term = "";
    }
  }  
  if(document.searchform.search_type.options[document.searchform.search_type.selectedIndex].value) {
    search_type = document.searchform.search_type.options[document.searchform.search_type.selectedIndex].value
  }
  if(search_type == "phone") {
    url = "http://www.unimelb.edu.au/cgi-bin/phone/phone.pl";
    query_string = "pattern="+escape(search_term);
    window.open(url+"?"+query_string, "thiswindow");
  } 
  else if(search_type == "email") {
    url = "http://www.unimelb.edu.au/cgi-bin/email.pl";
    query_string = "name="+escape(search_term);
    window.open(url+"?"+query_string, "thiswindow");
  }   
  else {
    url = "http://websearch.its.unimelb.edu.au/query.html";
    query_string = "qt="+escape(search_term)+'&qp=&col=unimelb&ht=0&qs=&qc=&pw=100%&ws=0&qm=0&st=1&nh=25&lk=1&rf=0&rq=0&si=1';
    window.open(url+"?"+query_string, "thiswindow");
  }
  return(false);
}
