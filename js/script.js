var table_div = document.getElementById("refreshPortfolioTable");
if (table_div != null) {
	var tables = table_div.getElementsByTagName("table");
	new Tablesort(tables[0]);

	var td_all = table_div.getElementsByTagName("td");

	for(var i=0; i<td_all.length; i++) {
		td_all[i] = signed_percent_style(td_all[i]);
		td_all[i] = dividend_style(td_all[i]);
		td_all[i] = debt_ratio_style(td_all[i]);
	}
}

function debt_ratio_style(element) {
	var text = element.innerText;
	if (text.match(/^0\.([0-9]{1,})倍/)) {
		var percent = parseInt(RegExp.$1);
		var color;
		var bgcolor;

		color = gradation_desc(percent, 100);
		bgcolor = "#" + "FF" + color + color;
		td_all[i].setAttribute("bgcolor", bgcolor);
	}
}

function signed_percent_style(element) {
	var text = element.innerText
	if (text.match(/^([\+\-])([0-9]{1,}\.[0-9]{1,})%/)) {
		var sign = RegExp.$1;
		var percent = parseFloat(RegExp.$2);
		var color = gradation(percent, 30);
		var bgcolor;

		if (sign == "+") {
			bgcolor = "#" + color + color + "FF";
		}

		if (sign == "-") {
			bgcolor = "#" + "FF" + color + color;
		}
		
		element.setAttribute("bgcolor", bgcolor);
	}
	return element;
}


function dividend_style(element) {
	var text = element.innerText;

	if (text.match(/^([0-9]{1,}\.[0-9]{1,})%/)) {
		var percent = parseFloat(RegExp.$1);
		var color = gradation(percent, 10);

		element.setAttribute("bgcolor", "#" + color + color + "FF");
	}
	return element;
}


function gradation(value, max) {
	if (value > max) {
		value = max;
	}

	var scale = 100.0 / max * 2
	var color = parseInt((255 - value * scale)).toString(16);
	return color;
}

function gradation_desc(value, max) {
	return gradation(max - value, max);
}