(function( undefined ) {
	var find_next_friday = function() {
		var date = new Date();
		
		for ( var i = 0; i < 8; i++ ) {
			if ( date.getDay() === 5 )
				return date;

			else date.setDate(date.getDate()+1);
		}
	};
	
	var render_loop = function() {
		now = new Date()
		
		if ( next_friday.getDate() === now.getDate() && now.getHours() >= 16 ) {
			document.querySelector(".dance").innerHTML = "PARTY!";
			return;
		}
		
		var diff = next_friday - now;
	
		var years   = Math.floor(diff/31536000000),
			months  = Math.floor((diff % 31536000000)/2628000000),
			days    = Math.floor(((diff % 31536000000) % 2628000000)/86400000),
			hours   = Math.floor((((diff % 31536000000) % 2628000000) % 86400000) / 3600000),
			minutes = Math.floor(((((diff % 31536000000) % 2628000000) % 86400000) % 3600000) / 60000),
			seconds = Math.floor((((((diff % 31536000000) % 2628000000) % 86400000) % 3600000) % 60000) / 1000),
			ms      = Math.floor((((((diff % 31536000000) % 2628000000) % 86400000) % 3600000) % 60000) % 1000);
		
		if ( days < 10 ) days = "0" + days;
		if ( hours < 10 ) hours = "0" + hours;
		if ( minutes < 10 ) minutes = "0" + minutes;
		if ( seconds < 10 ) seconds = "0" + seconds;
		if ( ms < 10 ) ms = "00" + ms;
		else if ( ms < 100 ) ms = "0" + ms;
		
		day_el.innerHTML    = days;
		hour_el.innerHTML   = hours;
		minute_el.innerHTML = minutes;
		second_el.innerHTML = seconds;
		ms_el.innerHTML     = ms;
	};


	var now = new Date(),
		next_friday = find_next_friday();

	next_friday.setHours(16);
	next_friday.setMinutes(00);
	next_friday.setSeconds(00);
	next_friday.setMilliseconds(00);
	
	var day_el,
		hour_el,
		minute_el,
		second_el,
		ms_el;
		
		
	window.onload = function() {
		day_el    = document.querySelector("#countdown .days");
		hour_el   = document.querySelector("#countdown .hours");
		minute_el = document.querySelector("#countdown .minutes");
		second_el = document.querySelector("#countdown .seconds");
		ms_el     = document.querySelector("#countdown .milliseconds");
	
		
		
		(function anim_loop() {
			render_loop();
			setTimeout(anim_loop, 16);
		})();
	}

}) ();
