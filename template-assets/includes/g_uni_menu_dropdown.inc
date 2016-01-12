    <!-- start g_uni_menu_dropdown include -->
    <form method="get" action="http://www.unimelb.edu.au/cgi-bin/nph-redirect.pl" name="linksform" id="linksform">
    <table cellpadding="0" cellspacing="2" border="0" align="left" summary="This table contains the dropdown box for University links.">
     <tr>
      <td class="topnavcell" nowrap="nowrap"><label for="url"><span class="topnavlabel">Uni Links: </span></label></td>
      <td class="topnavcell" nowrap="nowrap">
       <select class="dropdown" name="url" onchange="linksform.action=url[url.selectedIndex].value;linksform.submit();">
       <option selected="selected" value="http://www.unimelb.edu.au/">University Homepage</option>
       <option value="http://www.unimelb.edu.au/about/">About the University</option>
       <option value="http://www.unimelb.edu.au/student/">Students</option>
       <option value="http://www.unimelb.edu.au/ExtRels/research/">Research</option>
       <option value="http://www.unimelb.edu.au/community/">Community</option>
       <option value="http://uninews.unimelb.edu.au/">News</option>
       <option value="http://events.unimelb.edu.au/">Events</option>
       <option value="http://www.unimelb.edu.au/az/faculties.html">Faculties</option>
       <option value="http://www.unimelb.edu.au/az/index.html">A-Z Directory</option>
       <option value="http://www.lib.unimelb.edu.au/">Library</option>
       </select>       
      </td>
      <td>
       <input type="image" class="linksbtn" name="Go" value="Go!" src="/template-assets/images/btn_go_top.gif" style="display:block;" accesskey="g" alt="Go" />
      </td>
     </tr>
    </table>
   </form>
   <!-- end g_uni_menu_dropdown include -->
