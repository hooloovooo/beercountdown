(function( undefined ) {

	var Counter = function( options ) {
		if (!options) options = {};


		this.target_day    = options.target_day    || 5;
		this.target_hour   = options.target_hour   || 16;
		this.target_minute = options.target_minute || 00;
		this.target_second = options.target_second || 00;
		
		this.target_time = options.target_time || this.calculate_target_time();
		this.events      = options.events      || [];

		this.day_el    = options.day_el    || "#countdown .days";
		this.hour_el   = options.hour_el   || "#countdown .hours";
		this.minute_el = options.minute_el || "#countdown .minutes";
		this.second_el = options.second_el || "#countdown .seconds";
		this.ms_el     = options.ms_el     || "#countdown .milliseconds";

		this.events = options.events || [];

		this.last_time = 0;

		this.init();


		this.debug_time = new Date();
	};

	Counter.prototype.init = function() {
		var self = this;

		window.onload = function() {
			self.day_el    = document.querySelector( self.day_el );
			self.hour_el   = document.querySelector( self.hour_el );
			self.minute_el = document.querySelector( self.minute_el );
			self.second_el = document.querySelector( self.second_el );
			self.ms_el     = document.querySelector( self.ms_el );

			self.render_loop();
		}
	};

	Counter.prototype.render = function() {
		var now = new Date()

		for ( var i = 0, il = this.events.length; i < il; i++ ) {
			var ev = this.events[i];

			var time = ev.time;

			if ( typeof time === "function" )
				time = time(this.debug_time);

			if ( time < now.getTime() && time > this.last_time.getTime() ) {
				ev.callback.call(this);
			}
		}		
		
		var diff = this.target_time - now;
	
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
		
		this.day_el.innerHTML    = days;
		this.hour_el.innerHTML   = hours;
		this.minute_el.innerHTML = minutes;
		this.second_el.innerHTML = seconds;
		this.ms_el.innerHTML     = ms;

		this.last_time = now;
	};

	Counter.prototype.calculate_target_time = function() {
		var date = new Date();
		
		for ( var i = 0; i < 8; i++ ) {
			if ( date.getDay() === this.target_day ) {
				date.setHours(this.target_hour);
				date.setMinutes(this.target_minute);
				date.setSeconds(this.target_second);
				date.setMilliseconds(00);

				return date;
				
			}

			else date.setDate(date.getDate()+1);
		}
	};

	Counter.prototype.render_loop = function() {
		var self = this;
		self.render();
		setTimeout(function() { self.render_loop.call(self) }, 16);
	};


	var party_countdown = new Counter({
		events: [
			{
				time: function( time ) { return new Date( time.getTime() + 1000 ) },
				callback: function( goal ) {
					document.querySelector(".labels").style.display = "none";
					document.querySelector(".counters").style.display = "none";

					document.querySelector(".dance").style.display = "block";
				}
			}, {
				time: function( time ) { return new Date( time.getTime() + 2000 ) },
				callback: function( goal ) {
					document.querySelector(".labels").style.display = "block";
					document.querySelector(".counters").style.display = "block";

					document.querySelector(".dance").style.display = "none";
				}
			}
		]
	});

}) ();
