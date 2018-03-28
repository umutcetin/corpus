$.getJSON("http://127.0.0.1:8080/test.json", function (data) {
	var items = [];
	for (var i = 0; i < data.length; i++) {
		items.push("<li id='" + data[i].sentence + "'>" + data[i].sentence + "</li>");
	}


	$("<ul/>", {
		"class": "my-new-list",
		html: items.join("")
	}).appendTo("body");
});
