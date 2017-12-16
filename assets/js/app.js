var bandTitle = ['Paul McCartney', 'Led Zeppelin', 'John Lennon', 'Pink Floyd', 'George Harrison', 'David Bowie', 'The Kinks', 'Tame Impala', 'Talking Heads', 'Alabama Shakes', 'Eric Clapton', 'Jerry Garcia', 'Mac Demarco', 'Neil Young', 'Jim James', 'Leon Bridges', 'Bob Dylan'];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;

//creates buttons
function createButtons(){
	$('#MusicButtons').empty();
	for(var i = 0; i < bandTitle.length; i++){
		var bandBtn = $('<button>').text(bandTitle[i]).addClass('bandBtn').attr({'data-name': bandTitle[i]});
		$('#MusicButtons').append(bandBtn);
	}

	//displays gifs on click
	$('.bandBtn').on('click', function(){
		$('.display').empty();

		var thisBand = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=music+" + thisBand + "&limit=10&api_key=dc6zaTOxFJmzC";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

//sets a button from input
$('#addBand').on('click', function(){
	var newBand = $('#newBandInput').val().trim();
	bandTitle.push(newBand);
	createButtons();
	return false;
});

createButtons()
;