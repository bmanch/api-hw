var topics = [
	"Kate McKinnon",
	"Dan Aykroyd",
	"Will Ferrell",
	"Ellen Degeneres",
	"Amy Poehler",
	"Trevor Noah",
	"Amy Schumer",
	"Dave Chappelle",
	"Aziz Ansari",
	"Tina Fey"
];

$(document).ready(function() {

	function buttonMaker() {
		$('.gifButton').remove();

		for (var i = 0; i < topics.length; i++) {
			var button = $('<button>');
			button.addClass('gifButton');
			button.text(topics[i]);
			$('#buttonContainer').append(button);
		}
	

		$('.gifButton').on('click', function() {
			$('.gifDiv').remove();

			var searchCommedian = "";
			var arrayCommedian = $(this).text().trim().toLowerCase().split(" ");

			arrayCommedian.splice(1, 0, "+");

			//in case the commedian has 3 parts to her/his name.
			if (arrayCommedian.length === 4) {
				arrayCommedian.splice(3, 0, "+");
			}

			console.log(arrayCommedian);
			var searchCommedian = arrayCommedian.join("");
			console.log(searchCommedian);

			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchCommedian + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {
				console.log(response);

				var results = response.data;

				for (var i = 0; i < results.length; i++) {
					var commedianDiv = $('<div>');
					commedianDiv.addClass('gifDiv');

					var paragraph = $('<p>').text("Rating: " + results[i].rating);
					paragraph.addClass('rating');

					var commedianImage = $('<img>');
					commedianImage.addClass('gifBox');

					commedianImage.attr('src', results[i].images.fixed_height_still.url);
					commedianImage.attr('data-still', results[i].images.fixed_height_still.url);
					commedianImage.attr('data-animate', results[i].images.fixed_height.url);
					commedianImage.attr('data-state', 'still');

					commedianDiv.append(paragraph);
					commedianDiv.append(commedianImage);

					$('#giphyContainer').append(commedianDiv);

				}

				$('.gifBox').on('click', function() {
					var state = $(this).attr('data-state');

					if (state === "still") {
						$(this).attr('src', $(this).attr('data-animate'));
						$(this).attr('data-state', 'animate');
					}

					else {
						$(this).attr('src', $(this).attr('data-still'));
						$(this).attr('data-state', 'still');
					}
				});
			});
		});

		$('#user-submit').on('click', function(event) {
			
			event.preventDefault();

			var userCommedian = $('#user-input').val().trim();

			console.log(userCommedian);

			//I used a conditional to prevent blank buttons

			if (userCommedian !== "") {

				topics.push(userCommedian);

				$('#user-input').val("");

				console.log(topics);

				buttonMaker();
			}
		});

	}

	buttonMaker();

});