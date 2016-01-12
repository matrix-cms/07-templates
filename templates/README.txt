INTRO
-----

This directory contains dreamweaver templates for variations of the new University of Melbourne Templates.

To use these templates you will also need the directory templates-stuff. The templates-stuff directory contains the images, javascript and stylesheets that make up the actual templates. It also contains a html directory which contains plain HTML versions of the templates and also sample header and footer files that could be used for web applications or SSI's.

/templates-stuff
|-- html
|-- images
|-- includes
|-- js
`-- styles

The templates-stuff directory should be installed in the webserver document root for the templates to function correctly.

The file templates.zip contains both the Dreamweaver templates and the images, styles and html that make up the templates.
This is simply the contents of the directories /templates and /templates-stuff.

DREAMWEAVER TEMPLATES
---------------------

There are 2 dreamweaver templates available:

/templates/menu.dwt - A page containing blocks of menu links (e.g. http://www.webcentre.unimelb.edu.au/templates-stuff/html/index1.html)
/templates/content.dwt - A page designed to contain actual content (e.g. http://www.webcentre.unimelb.edu.au/templates-stuff/html/index2.html)

The configuration of these templates can be changed using Modify->Template Properties in Dreamweaver:

	menu.dwt - You can choose between having 2/3 columns of menu blocks
	content.dwt - The right hand side image can be disabled

PLAIN HTML TEMPLATES
--------------------

These files are designed for people using the templates in custom web applications such as a CMS or scripting application. 

/templates-stuff/html/
|-- content.html
|-- footer.html
|-- header.html
|-- index1.html
|-- index2.html
|-- index3.html
`-- menu.html

content.html & menu.html are plain html versions of the Dreamweaver templates with the same name.
header.html & footer.html are header and footer files suitable for use as Server Side Includes.
index1.html, index2.html & index3.html are examples of the templates in use.

Any queries should be directed to: templates@webcentre.unimelb.edu.au
