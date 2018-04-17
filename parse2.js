//this.fetchData();

function fetchData(user) {
	jQuery(document).ready(function () {
		$("#ol_sentences").empty();
		$("#sl_sentence").empty();
		$previous_user_val = $('#sl_user option:selected').val();

		var jsonData = {};
		
		$.getJSON(user+".json", function (data) {
			"use strict";

			jsonData = data;
			var sentences = [];
			var words = [];
			var options = [];

			var ol_sentences = $("#ol_sentences");
			for (var i = 0; i < data.length; i++) {

				ol_sentences.append('<li id="sentence_' + i + '" class="container"><a href="#wordlist_' + i + '" data-toggle="collapse"> ' +
					data[i].sentence +
					'</a><ul id="wordlist_' + i + '" class="collapse"></li>');

				for (var w = 0; w < data[i].words.length; w++) {
					var word = data[i].words[w].word;
					if (is_alphaNumeric(word)) {
						var str = "<li id='li_s" + i + "_w" + w + "'>" + data[i].words[w].word +
							":<ul class='list-unstyled' id='ul_s" + i + "_w" + w + "'>";
						for (var o = 0; o < data[i].words[w].options.length; o++) {
							str += "<li id='li_s" + i + "_w" + w + "_o" + o + "'><button id='btn_s" + i + "_w" + w + "_o" + o + "' type='button' class='btn btn-outline-secondary m-1'>" + data[i].words[w].options[o] + "</button>";
						}
						str += "</li></ul></li>"
						$("#wordlist_" + i).append(str);

					}

				}

			}
			$('.btn').click(function () {
				var self = $(this);
				self.removeClass("btn-outline-secondary");
				self.addClass("btn-primary");
				var sl_sentence = $("#sl_sentence");

				var parent = self.parent().parent().parent();
				var word = parent.text().split(":")[0];

				//create option 
				var oid = parent[0].id.replace("li_", "");
				var op_word = $("#" + oid);
				if (op_word.length === 0) {
					sl_sentence.append($("<option></option>")
						.attr("id", oid)
						.text(word));
					op_word = $("#" + oid);
				} else {
					op_word.text(word);
				}

				//add selected option
				op_word.text(op_word.text() + " " +
					self.text());

				//add other options
				var siblings = self.parent().siblings();

				siblings.each(function (sibling) {
					$($(this).children()[0]).removeClass("btn-primary");
					$($(this).children()[0]).addClass("btn-outline-secondary");
					op_word.text(op_word.text() + " " +
						$(this).text());
				});
			});
		});
	});
}



function userChanged() {
	var user = $("#sl_user option:selected");

	if ($("#sl_sentence").children().length > 0) {
		var r = confirm("All output will be lost. Are you sure?");
		if (r === true) {
			this.fetchData(user.val());
		} else {
			$("#sl_user").val($previous_user_val);
		}
	} else {
		this.fetchData(user.val());
	}

}

function deleteOption() {
	var opt = $("#sl_sentence option:selected");
	var buttons = $("#li_" + opt[0].id).children().children();

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].children[0].classList.remove("btn-primary");
		buttons[i].children[0].classList.remove("btn-primary");
		buttons[i].children[0].classList.add("btn-outline-secondary");
	}
	opt.text("");
}

function copy() {
	var opt = $("#sl_sentence");

	var val = [];
	$("#sl_sentence option").each(function () {
		val.push(this.text);
	});
	var text = val.join('\n');

	var textArea = document.createElement("textarea");
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;
	textArea.style.width = '2em';
	textArea.style.height = '2em';
	textArea.style.padding = 0;
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';
	textArea.style.background = 'transparent';
	textArea.value = text;

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successfully.' : 'unsuccessful';
		alert('Copied ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	}

	document.body.removeChild(textArea);

}

function is_alphaNumeric(str) {
	regexp = /[a-zA-Z0-9şŞıİçÇöÖüÜĞğ\- ]/;

	if (regexp.test(str)) {
		return true;
	} else {
		return false;
	}
}
