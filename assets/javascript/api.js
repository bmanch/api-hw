var topics = [
	"Kate McKinnon",
	"Dan Aykroyd",
	"Will Ferrell",
	"Ellen Degeneres",
	"Amy Poehler",
	"Trevor Noah",
	"Amy Schumer",
	"Sinbad",
	"Aziz Ansari",
	"Tina Fey"
];

$(document).ready(function() {

	for (var i = 0; i < topics.length; i++) {
		var button = $('<button>');
		button.addClass('gifButton');
		button.text(topics[i]);
		$('#buttonContainer').append(button);
	}


});