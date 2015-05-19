$(document).ready(function() {

	var piano = Synth.createInstrument('piano');

	//map keyboard to notes on piano
	var keyMappings = {
		"a": 'C',
		"s": 'D',
		"d": 'E',
		"f": "F",
		"g": "G",
		"h": "A",
		"j": "B",
		"_": "_"
	};

	//sampling song --> beginning of twinkle little star
	$(document).keypress(function(e){
		var key = keyMappings[String.fromCharCode(e.charCode)];
		//Arg1: note, arg2: octave, arg3: time
		piano.play(key , 4, 3);
	});

	//////////////////////////////////////
	//Jimmy's awesome super amazing code//
	//////////////////////////////////////
	//==========================================================
	//Add '_' as first element to skip bug.
	var noteSheet = [[{key:'_'}],[{key:'E'},{key:'C',oct:3}],[{key:'E'}],[{key:'F'}],
	[{key:'G'}],[{key:'G'},{key:'G',oct:3}],[{key:'F'}],[{key:'E'}],[{key:'D'}],
	[{key:'C'},{key:'C',oct:3}],[{key:'C'}],[{key:'D'}],[{key:'E'}],
	[{key:'E'},{key:'G',oct:3}],[{key:'D'}],[{key:'D'}],[{key:'E'},{key:'C',oct:3}],
	[{key:'E'}],[{key:'F'}],[{key:'G'}],[{key:'G'},{key:'G',oct:3}],[{key:'F'}],
	[{key:'E'}],[{key:'D'}],[{key:'C'},{key:'C',oct:3}],[{key:'C'}],[{key:'D'}],
	[{key:'E'}],[{key:'D'},{key:'G',oct:3}],[{key:'C'}],[{key:'C'},{key:'C',oct:3}],
	[{key:'D'},{key:'G',oct:3}],[{key:'D'}],[{key:'E'}],[{key:'C'}],
	[{key:'D'},{key:'G',oct:3}],[{key:'E'}],[{key:'F'}],[{key:'E'}],[{key:'C'}],
	[{key:'D'},{key:'G',oct:3}],[{key:'E'}],[{key:'F'}],
	[{key:'E'}],[{key:'D'}],[{key:'C'},{key:'G',oct:3}],[{key:'D'}],[{key:'G',oct:3}]
								 ];
	//Add '1000' as first element. 
	var tempoSheet = [1000, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,
											500, 500, 750, 250, 1000,
											500, 500, 500, 500, 500, 500, 500, 500, 500, 500,
											500, 500, 750, 250, 1000,
											500, 500, 500, 500, 500, 250, 250, 500, 500,
											500,250,250,500,500,500,500
										];


	var autoStop = false;

	var autoPlay = function (music, baseTempo, start, tempo){
		if(start>=music.length){
			return;
		}

		if(!start){
			start = 0;
		}else{
			// console.log('Key: ',music[start]);
			if(music[start][0].key!== '_'){
				for(var i=0; i<music[start].length; i++){
					if(!music[start][i].oct){
						piano.play(music[start][i].key, 4, 3);
					}else{
						piano.play(music[start][i].key, music[start][i].oct, 3);
					}
				}
			}
		}
		
		if(!autoStop){
			if(!tempo){
				// console.log('Base Tempo');
				setTimeout(function(){
					autoPlay(music, baseTempo, start+1);
				}, baseTempo);
			}else{
				if(tempo[start]){
					// console.log('Tempo: ', tempo[start]);
					setTimeout(function(){
						autoPlay(music, baseTempo, start+1, tempo);
					}, tempo[start]);
				}else{
					// console.log('Base Tempo');
					setTimeout(function(){
						autoPlay(music, baseTempo, start+1);
					}, baseTempo);
				}
			}
		}			

	};

	autoPlay(noteSheet, 500, 0, tempoSheet);
//==========================================================


	Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
            if( this[ prop ] === value )
              return prop;
        }
    }
	};

	var convertToQWERTY = function(string) {
		string = string.split("");
		var result = [];
		for(var i = 0; i<string.length; i++) {

			result[i] = keyMappings.getKeyByValue(string[i].toUpperCase());
		}
		console.log(result);
		return result.join("");
	};

	//wrap each note in a span tag
	var wrapInPTag = function(score) {
		var scoreTextArray = score.split("");

		$.each(scoreTextArray, function (index, value) {
		$('.score').append($('<span>').text(value));

 		});
	};

	wrapInPTag(convertToQWERTY(twinkle));

	$('.ui.dropdown').dropdown();

	$( ".ui.teal.submit.button" ).click(function() {
  	startPlaying();
	});

});

var speed = 800;

var startPlaying = function() {
	var letter = $(".score").children()[0];
		console.log(letter);
		$(letter).toggleClass("current");

	setInterval(function(){
		$(letter).toggleClass("current");
		letter = $(letter).next();
		$(letter).toggleClass("current");

	}, speed);
};








