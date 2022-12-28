const table = document.getElementById("list");
const thead = table.getElementsByTagName("thead")[0];
const tbody = table.getElementsByTagName("tbody")[0];

const head_tr_list = thead.getElementsByTagName("tr")
const body_tr_list = tbody.getElementsByTagName("tr")

const body_span_list = tbody.getElementsByTagName("span")



const body_td_list = tbody.getElementsByTagName("td")
Array.prototype.forEach.call(body_td_list, function(target) {
	target.style = "padding: 0px; height: 0px;"
	// "---"の項目は、下段の小さい文字を削除する
	if (target.textContent.match(/^---.*$/)) {
		target.textContent = '---'
		return
	}
	// 前日比の項目について、パーセント表示を削除する
	const match = target.textContent.match(/^(.+)([+-].+%)$/)
	if (match) {
		target.textContent = match[2]
	}
})



// 特定の書式文字列を持つspanを削除
Array.prototype.forEach.call(body_span_list, function(target) {
	// 時刻（"--:--"のパターンを含む）を削除
	if (target.textContent.match(/^[0-9-][0-9-]:[0-9-][0-9-]$/)) {
		target.remove()
		return
	}
	// 年月日を削除（年初来安値など）
	if (target.textContent.match(/^[1-9][0-9]\/[0-1][0-9]\/[0-3][0-9]$/)) {
		target.remove()
		return
	}
	// 年月を削除
	if (target.textContent.match(/^20[1-9][0-9]\/[0-1][0-9]$/)) {
		target.remove()
		return
	}
	// 月日を削除（誤って処理されるパターンあり。現在の実装方式の限界）
	if (target.textContent.match(/^([1-9]|1[0-2])\/[1-3]?[0-9]$/)) {
		target.remove()
		return
	}
	// ---を削除
	if (target.textContent.match(/^---$/)) {
		target.remove()
		return
	}
})


const body_dl_list = tbody.getElementsByTagName("dl")
// 銘柄名の欄をできるだけ一行にまとめる
Array.prototype.forEach.call(body_dl_list, function(target) {
	const a = target.getElementsByTagName("a")[0]
	target.getElementsByTagName("dd")[1].remove()
	target.append(a)
})

/*
var table_div = document.getElementById("refreshPortfolioTable");
if (table_div != null) {
	var tables = table_div.getElementsByTagName("table");
	new Tablesort(tables[0]);
*/



Array.prototype.forEach.call(body_td_list, function(target) {
	signed_percent_style(target);
	dividend_style(target);
	debt_ratio_style(target);
	capital_percent_style(target);
})

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

// ±30%以内のパーセント表示の背景をグラデーション表示する。
// 配当利回り、前日比などの書き換えを想定。
// 制限事項：自己資本比率の項目を一部巻き込んでしまう
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

// 自己資本比率の背景をグラデーション表示する。
// 0〜100%の想定だが、一部"(連)"や"(単)"のつかない銘柄が存在し、それらはsigned_percent_styleが適用されてしまう。
function capital_percent_style(element) {
	var text = element.textContent
	if (text.match(/^(\(連\)|\(単\))([0-9]{1,}\.[0-9]{1,})%/)) {
		var dummy = RegExp.$1;
		var percent = parseFloat(RegExp.$2);
		var color = gradation(percent, 100);
		var bgcolor;

		bgcolor = "#" + color + color + "FF";
		
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