var table_div = document.getElementById("refreshPortfolioTable");
//var td_all = document.getElementsByTagName("td");
var td_all = table_div.getElementsByTagName("td");

var tables = table_div.getElementsByTagName("table");
new Tablesort(tables[0]);

for(var i=0; i<td_all.length; i++) {
	
	//テキストを取得
	var text = td_all[i].innerText;
	
	//パーセント表記のマッチ
	if (text.match(/([\+\-])([0-9]{1,})\.[0-9]{1,}%/)) {
		var posinega = RegExp.$1;
		var percent = parseInt(RegExp.$2);
		var color;
		var bgcolor;

		if (percent < 1) {
			color = "FF";
		}

		if (percent >= 1) {
			color = "EE";
		}
		
		if (percent > 3) {
			color = "CC";
		}

		if (percent > 5) {
			color = "AA";
		}

		if (percent > 10) {
			color = "88";
		}

		if (percent > 15) {
			color = "66";
		}

		if (percent > 20) {
			color = "44";
		}


		if (posinega == "+") {
			bgcolor = "#" + color + color + "FF";
		}

		if (posinega == "-") {
			bgcolor = "#" + "FF" + color + color;
		}
		
		td_all[i].setAttribute("bgcolor", bgcolor);
	}

	//倍率表記のマッチ（貸借倍率用）
	if (text.match(/^0\.([0-9]{1,})倍/)) {
		var percent = parseInt(RegExp.$1);
		var color;
		var bgcolor;

		if (percent > 99) {
			color = "FF";
		}

		if (percent <=99) {
			color = "EE";
		}
		
		if (percent < 80) {
			color = "CC";
		}

		if (percent < 60) {
			color = "AA";
		}

		if (percent < 45) {
			color = "88";
		}

		if (percent < 30) {
			color = "66";
		}

		if (percent < 15) {
			color = "44";
		}
		bgcolor = "#" + "FF" + color + color;
		td_all[i].setAttribute("bgcolor", bgcolor);
	}

}
