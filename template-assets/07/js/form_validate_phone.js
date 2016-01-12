// for full documentataion: http://wiki.webcentre.unimelb.edu.au/doku.php/templates/javascript/forms
// uses uM.getElementsByTagAndAttributes
// uses uM.hasClass, uM.addClass, uM.removeClass
// uses uM.attachEventListener and uM.addLoadListener
var uM_form = {
	validationSet : {
	// regexes for different types of validation
	'email' : {
		'regexp': /^[-^!#$%&'*+\/=?`{|}~.\w]+@[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+$/,
		'error': "An email address is required, eg: someone@example.com"
		},
	'number' : {
		'regexp': /^[-+]?[0-9]+(\.[0-9]+)?$/,
		'error' : "This field should contain only numbers."
		}
	'phone' : {
		'regexp': /^[+]? *(\([0-9]+\))?[0-9 ]+$/,
		'error' : "This field should contain a phone number."
		}
	},
	validationText : {
	// messages for valid/invalid
	'valid_text' : "OK",
	'invalid_text' : "(required)",
	'disabled_button_text' : "Please fill out the required fields before submitting."
	},
	id_counter : 0,
	form_required_list : [],
	prepare : function() {
		var stem_attributes = [];
		stem_attributes["class"] = "validate";
		var all_forms = uM.getElementsByTagAndAttributes(document, 'form', stem_attributes);
		for (var i = 0; i < all_forms.length; i++)
		{
			if (!all_forms[i].id)
			{
				all_forms[i].id = uM_form.generateId(all_forms[i].nodeName);
			}
			uM_form.addButtonLabel(all_forms[i]);
			uM_form.changeButtonState(all_forms[i],false);
			var form_id = all_forms[i].id
			var form_required = [];
			var old_parent_required = "";
			var form_fields = [];
			form_fields.push(all_forms[i].getElementsByTagName("input"));
			form_fields.push(all_forms[i].getElementsByTagName("textarea"));
			form_fields.push(all_forms[i].getElementsByTagName("select"));
			while (form_fields.length > 0)
			{
				var fields =  form_fields.pop();
				for (var j=0; j<fields.length; j++)
				{
					var parent_required = uM_form.findParentRequired(fields[j]);
					if (uM.hasClass(parent_required,"required"))
					{
						//add required field to the list
						if (!(parent_required == old_parent_required))
						{
							// give it an id if it hasn't one
							if (!parent_required.id)
							{
								var identifier = parent_required.nodeName;
								parent_required.id = uM_form.generateId(identifier);
							}
							form_required.push(parent_required);
						}
						old_parent_required = parent_required;
						// determine whether to check for keyup or click
						var event_type;
						if (fields[j].nodeName.toLowerCase() == "select")
						{
							event_type = "change";
							uM.attachEventListener(fields[j], "keyup", uM_form.checkFieldValidity, false);
						}
						else if (fields[j].getAttribute("type")=="radio" || fields[j].getAttribute("type")=="checkbox")
						{
							event_type = "click";
						}
						else
						{
							event_type = "keyup";
							uM.attachEventListener(fields[j], "blur", uM_form.checkFieldValidity, false);
						}
						uM.attachEventListener(fields[j], event_type, uM_form.checkFieldValidity, false);
					}
				}
			}
			uM_form.form_required_list[form_id] = form_required;
		}
	},
	addButtonLabel : function(form_validate)
	{
		var submit_buttons = uM_form.getFormButtons(form_validate);
		for (var i=0; i< submit_buttons.length; i++)
		{
			var button_parent = submit_buttons[i].parentNode;
			//var warning_span = document.createElement('span');
			var warning_link = document.createElement('a');
			uM.addClass(warning_link,"disabled-button");
			var form_link = '#'+form_validate.id;
			warning_link.setAttribute('href',form_link);
			var warning_text = document.createTextNode(uM_form.validationText.disabled_button_text);
			warning_link.appendChild(warning_text);
			// allocate id if none already
			var button_id;
			if (!submit_buttons[i].id)
			{
				var identifier = submit_buttons[i].nodeName;
				submit_buttons[i].id = uM_form.generateId(identifier);
				button_id = submit_buttons[i].id;
			}
			else
			{
				button_id = submit_buttons[i].id;
			}
			var leaf_attributes = [];
			leaf_attributes["for"] = button_id;
			var existing_label = uM.getElementsByTagAndAttributes(form_validate,"label",leaf_attributes);
			if (existing_label[0])
			{
				existing_label[0].appendChild(warning_link);
			}
			else
			{
				var new_label = document.createElement('label');
				new_label.htmlFor = button_id; // HTMLDOM for IE compatibility
				new_label.appendChild(warning_link);
				button_parent.insertBefore(new_label, submit_buttons[i]); 
			}
		}
	},
	checkValidForm : function(form_validate) {
		/*var stem_attributes = [];
		stem_attributes["class"] = "required";
		var required_elements = uM.getElementsByTagAndAttributes(form_validate, '*', stem_attributes);*/
		var form_id = form_validate.id
		var required_elements = uM_form.form_required_list[form_id];
		var validity = true;
		for (var i=0; i< required_elements.length; i++)
		{
			if (!uM.hasClass(required_elements[i], "valid"))
			{
				validity = false;
			}
		}
		uM_form.changeButtonState(form_validate, validity);
		uM_form.removeDisabledWarning(form_validate, validity)
		return validity;
	},
	getFormButtons : function (form_validate) {
		var buttons = {
			'input_button' : {
				'element': "input",
				'attributes': {
					'type': "button"
				}
			},
			'input_submit': {
				'element': "input",
				'attributes': {
					'type': "submit"
				}
			},
			'button_button' : {
				'element': "button",
				'attributes': {
					'type': "button"
				}
			},
			'button_submit' : {
				'element': "button",
				'attributes': {
					'type': "submit"
				}
			}
		}
		var submit_buttons = [];
		for (var i in buttons)
		{
			var elems = uM.getElementsByTagAndAttributes(form_validate,buttons[i]['element'], buttons[i]['attributes']);
			if (elems.length > 0)
			{
				submit_buttons = submit_buttons.concat(elems);
			}
		}
		return submit_buttons;
	},
	changeButtonState : function(form_validate, enable) {
		if (enable != true)
		{
			enable = false;
		}
		var submit_buttons = uM_form.getFormButtons(form_validate);
		if (enable == true)
		{
			for (var i = 0; i < submit_buttons.length; i++)
			{
				submit_buttons[i].removeAttribute("disabled");
			}
		}
		else
		{
			for (var i = 0; i < submit_buttons.length; i++)
			{
				submit_buttons[i].setAttribute("disabled","disabled");
			}
		}
		return enable;
	},
	removeDisabledWarning : function(form_validate, enable) {
		if (enable != true)
		{
			enable = false;
		}
		var disabled_attributes = [];
		disabled_attributes["class"] = "disabled-button";
		disabled_links = uM.getElementsByTagAndAttributes(form_validate,'a',disabled_attributes);
		if (enable == false)
		{
			for (var i=0; i<disabled_links.length;i++)
			{
				disabled_links[i].firstChild.nodeValue = uM_form.validationText.disabled_button_text;
				var required_href;
				if (uM_form.findFirstInvalid(form_validate))
				{
					var first_invalid = uM_form.findFirstInvalid(form_validate);
					required_href = first_invalid.id;
				}
				else
				{
					required_href = form_validate.id;
				}
				disabled_links[i].setAttribute('href',"#"+required_href);
			}
		}
		else
		{
			for (var i=0; i<disabled_links.length;i++)
			{
				disabled_links[i].removeAttribute("href")
				disabled_links[i].firstChild.nodeValue = "";
			}
		}
	},
	checkRequiredValidity : function(required_element) {
		var input_array = [required_element.getElementsByTagName('input')];
		input_array.push(required_element.getElementsByTagName('textarea'));
		input_array.push(required_element.getElementsByTagName('select'));
		var existent_inputs = [];
		for (var i = 0; i < input_array.length; i++)
		{
			// check for empty arrays and discard
			for (var j = 0; j < input_array[i].length; j++)
			{
				existent_inputs.push(input_array[i][j]);
			}
		}
		var stem_attributes = [];
		stem_attributes["class"] = "required-flag";
		var required_span = uM.getElementsByTagAndAttributes(required_element, 'span', stem_attributes);
		var validity = true;
		var error_text = "";
		for (var i=0; i < existent_inputs.length; i++)
		{
			if (!uM.hasClass(existent_inputs[i], "valid"))
			{
				validity = false;
				
				
			}
			if (uM.hasClass(existent_inputs[i], "no-parse"))
			{
				for (var j in uM_form.validationSet)
				{
					if (uM.hasClass(existent_inputs[i],j))
					{
						error_text = uM_form.validationSet[j]['error'];
					}
				}
			}
		}
		// add messages to required span
		if (validity == true)
		{
			uM.addClass(required_element, "valid");
			required_span[0].firstChild.nodeValue = uM_form.validationText.valid_text;
		}
		else 
		{
			if (error_text.length > 0)
			{
				required_span[0].firstChild.nodeValue = error_text;
			}
			else
			{
				required_span[0].firstChild.nodeValue = uM_form.validationText.invalid_text
			}
			uM.removeClass(required_element, "valid");
		}
		var parent_form = uM_form.findParentForm(required_element);
		uM_form.checkValidForm(parent_form);
		// no required span - no validity checking
		if (required_span.length == 0)
		{
			validity = true;
		}
		return validity;
	},
	findFirstInvalid : function (form_validate)
	{
		var required_elements = uM_form.form_required_list[form_validate.id];
		var result = false;
		for (var i = 0; i<required_elements.length; i++)
		{
			if(!uM.hasClass(required_elements[i],"valid"))
			{
				result = required_elements[i];
				break;
			}
		}
		return result;
	},
	findParentForm : function(current_node) {
		// returns parent form of a given node
		var parent_form = current_node;
		while (parent_form.nodeName != "form" && !uM.hasClass(parent_form,"validate") && !parent_form.nodeName != "body")
		{
			parent_form = parent_form.parentNode;
		}
		return parent_form;
	},
	findParentRequired : function(current_node) {
		// returns parent element with "required" class of a given node
		var parent_required = current_node;
		while (!(uM.hasClass(parent_required,"required") || parent_required.nodeName.toLowerCase() == "body"))
		{
			parent_required = parent_required.parentNode;
		}
		return parent_required;
	},
	generateId : function(identifier_string)
	{
		var id_string = "uM_form_" + identifier_string + "_" + uM_form.id_counter;
		uM_form.id_counter ++;
		return id_string;
	},
	checkFieldValidity : function(e) {
		var validity = true;
		var field;
		// IE event compatibility
		if (window.event && window.event.srcElement)
		{
			field = window.event.srcElement;
		}
		if (e && e.target)
		{
			field = e.target;
		}
		if (!field)
		{
			return;
		}
		if (field.getAttribute("type"))
		{
			validity = uM_form.checkInputValidity(field);
		}
		else if (field.tagName.toLowerCase() == "textarea")
		{
			var area_text = field.value;
			if (area_text.length == 0)
			{
				validity = false;
			}
			else
			{
				validity = uM_form.parseValidity(field);
			}
		}
		else if (field.tagName.toLowerCase() == "select")
		{
			var valid_option = false;
			if (field.value)
			{
				valid_option = true;
			}
			validity = valid_option;
		}
		var option_group ="";
		if (field.getAttribute("type")=="checkbox" || field.getAttribute("type")=="radio")
		{
			var options_name = field.getAttribute("name");
			option_group = uM_form.findParentForm(field)[options_name];
		}
		if (validity == true)
		{
			if (option_group.length > 0)
			{
				for (var i = 0; i < option_group.length; i++)
				{
					uM.addClass(option_group[i],"valid");
				}
			}
			else
			{
				uM.addClass(field,"valid");
			}
		}
		else
		{
			if (option_group.length > 0)
			{
				for (var i = 0; i < option_group.length; i++)
				{
					uM.removeClass(option_group[i],"valid");
				}
			}
			else
			{
				uM.removeClass(field,"valid");
			}
		}
		var parent_required = uM_form.findParentRequired(field);
		uM_form.checkRequiredValidity(parent_required);
	},
	checkInputValidity : function(input_element) {
		var validity = true;
		//handle various input types
		switch(input_element.getAttribute("type"))
		{
			//buttons can't be validated
			case "hidden":
				break;
			case "button":
				break;
			case "reset":
				break;
			case "submit":
				break;
			case "radio":
				var radio_group_name = input_element.getAttribute("name");
				var radio_group = uM_form.findParentForm(input_element)[radio_group_name];
				var valid_radio = false;
				for (var i = 0; i < radio_group.length; i++)
				{
					if (radio_group[i].id == input_element.id)
					{
						radio_group[i].checked = true;
						valid_radio = true;
					}
				}
				validity = valid_radio;
				break;
			case "checkbox":
				var valid_check = false;
				var stem_attributes = [];
				stem_attributes["name"] = input_element.name;
				var parent_form = uM_form.findParentForm(input_element);
				var option_group = 
				uM.getElementsByTagAndAttributes(parent_form,"input",stem_attributes);
				if (input_element.checked)
				{
					valid_check = true;
				}
				else if (option_group.length >0)
				{
					for (var i=0; i<option_group.length; i++)
					{	
						if(option_group[i].checked)
						{
							valid_check = true;
						}
					}
				}
				else
				{
					valid_check = false;
				}
				validity = valid_check;
				break;
			default:
				if (input_element.value == null || input_element.value.length == 0)
				{
					validity = false;
				}
				else
				{
					validity = uM_form.parseValidity(input_element);
				}
		}
		return validity;
	},
	parseValidity : function (field) {
		var validity = true;
		var stem_attributes = [];
		stem_attributes["class"] = "required-flag";
		var required_parent = uM_form.findParentRequired(field);
		var required_span = uM.getElementsByTagAndAttributes(required_parent, 'span', stem_attributes);
		if (!field.value)
		{
			validity = false;
			
		}
		for (var i in uM_form.validationSet)
		{
			
			if (uM.hasClass(field,i))
			{
				var regex = uM_form.validationSet[i]['regexp'];
				if (!field.value.match(regex))
				{
					validity = false;
					uM.addClass(field, "no-parse");
				}
				else
				{
					uM.removeClass(field, "no-parse");
				}
			}
		}
		return validity;
	}
}
uM.addLoadListener(uM_form.prepare);
