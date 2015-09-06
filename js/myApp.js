var Location = function(title, latitude, longitude, icon, type) {
	//To remeber the parent context
	var self = this;

	self.title = ko.observable(title);
	self.content = '<h2 class="info-title">' + title + '</h2>'
	self.latitude = ko.observable(latitude);
	self.longitude = ko.observable(longitude);
	self.icon = ko.observable(icon)
	self.type = ko.observable(type)

	self.marker = new google.maps.Marker({
		position: new google.maps.LatLng(self.latitude(), self.longitude()),
		map: map,
		icon: self.icon()
	});

	self.infoWindow = function() {
		infowindow.setContent(self.content);
		infowindow.open(map, self.marker);
	}

	google.maps.event.addListener(self.marker, 'click', self.infoWindow);
};

var ViewModel = function() {
	//To remeber the parent context
	var self = this;
	self.query = ko.observable('');

	myLocations = 		
		[
			new Location('Gordon Ramsay Burgr', 36.1108308, -115.1722186, 'img/lib/restaurant.png', 'Casual'),
			new Location('Gordon Ramsay Pub and Grill', 36.1174613, -115.175927, 'img/lib/restaurant.png', 'Casual'),
			new Location('Holsteins', 36.1098873, -115.1745552, 'img/lib/restaurant.png', 'Casual'),
			new Location('Nine Fine Irishmen', 36.1021012, -115.1737873, 'img/lib/bar.png', 'Casual'),
			new Location('Fat Tuesday', 36.1206347,-115.172078, 'img/lib/bar_coktail.png', 'Casual'),
			new Location("Dick's Last Resort", 36.0994759,-115.1756075, 'img/lib/restaurant.png', 'Casual'),
			//Shows
			new Location('Cirque du Soleil: Zarkana', 36.1060481, -115.1773626, 'img/lib/theater.png', 'Shows'),
			new Location('Cirque du Soleil: Zumanity', 36.102895, -115.1748606, 'img/lib/stripclub2.png', 'Shows'),
			new Location('Cirque du Soleil: O', 36.113911, -115.1773742, 'img/lib/theater.png', 'Shows'),
			new Location('Cirque du Soleil: Beatles Love', 36.1202598, -115.1748707, 'img/lib/music_live.png', 'Shows'),
			new Location('Cirque du Soleil: Mystere', 36.1244956, -115.1725308, 'img/lib/theater.png', 'Shows'),
			new Location('Cirque du Soleil: Ka', 36.10324, -115.1702839, 'img/lib/theater.png', 'Shows'),
			new Location('Cirque du Soleil: Criss Angel Believe', 36.0946657, -115.1774926, 'img/lib/music_live.png', 'Shows'),
			new Location('David Copperfield', 36.1014952, -115.1698515, 'img/lib/magicshow.png', 'Shows'),
			new Location('Absinthe', 36.1152939,-115.174143, 'img/lib/theater.png', 'Shows'),
			new Location('Thunder from Down Under', 36.0993095,-115.1759191, 'img/lib/stripclub2.png', 'Shows'),
			new Location('Tournament of Kings', 36.0990753,-115.1755671, 'img/lib/theater.png', 'Shows'),
			new Location('Laugh Factory', 36.0993853,-115.1712763, 'img/lib/comedyclub.png', 'Shows'),
			//Fine Dinning
			new Location('Picasso', 36.1133574, -115.1750467, 'img/lib/restaurant.png', 'Dinning'),
			//Shops
			new Location('Coca Cola Store', 36.1037712, -115.172412, 'img/lib/mural.png', 'Shop'),
			new Location("M&M's World", 36.1033984, -115.172469, 'img/lib/mural.png', 'Shop'),
			new Location("Hershey's Chocolate World", 36.1017125,-115.1736885, 'img/lib/mural.png', 'Shop'),
			//Attractions
			new Location('CSI: The Experience', 36.1038639, -115.1680313, 'img/lib/theater.png','Attractions'),
			new Location('Big Apple Coaster', 36.1023669,-115.1745465, 'img/lib/themepark.png','Attractions'),
			new Location('Fountains of Bellaio', 36.1127918,-115.1740086, 'img/lib/waterpark.png','Attractions'),
			new Location('Conservatory of Bellaio', 36.1120479,-115.1766143, 'img/lib/publicart.png','Attractions'),
			new Location('Volcano at Mirage', 36.1215249,-115.1726073, 'img/lib/publicart.png','Attractions'),
			new Location('Secret Garden', 36.1204735,-115.1781435, 'img/lib/zoo.png','Attractions'),
			new Location('Bare', 36.1206111,-115.1774072, 'img/lib/stripclub2.png','Attractions'),
			new Location('Madame Tussauds', 36.1212493,-115.171161, 'img/lib/anthropo.png','Attractions'),
			new Location('Outdoor Gondola', 36.1226034,-115.1706848, 'img/lib/cruiseship.png','Attractions'),
			new Location('Indoor Gondola', 36.1231648,-115.1689538, 'img/lib/cruiseship.png','Attractions'),
			new Location('High Roller', 36.1176507,-115.1681208, 'img/lib/ferriswheel.png','Attractions'),
			new Location('Brooklyn Bowl', 36.1175012,-115.169673, 'img/lib/bowling.png','Attractions'),
			new Location('Eiffel Tower', 36.1127861,-115.1718286, 'img/lib/wifi.png','Attractions'),
			new Location('Shark Reef Aquarium', 36.0912725,-115.1743524, 'img/lib/aquarium.png','Attractions'),
		];

	self.locations = ko.observableArray(myLocations.slice());

	self.openInfoWindow = function(obj) {
		obj.infoWindow();
	};

	self.showLocationByType = function(type) {
		self.searchType(type);
	}

	self.showAllLocations = function() {
		self.showLocationByType('All');
	};

	self.showCasualLocations = function() {
		self.showLocationByType('Casual');
	};

	self.showShowsLocations = function() {
		self.showLocationByType('Shows');
	};

	self.showDinningLocations = function() {
		self.showLocationByType('Dinning');
	};

	self.showShopLocations = function() {
		self.showLocationByType('Shop');
	};

	self.showAttractionsLocations = function() {
		self.showLocationByType('Attractions');
	};

	self.searchType = function(value) {
		//First hide everything
		self.hideAllMarkers();
		self.locations.removeAll();
		var locs = [];
		for(var x in parent.myLocations){
			var curentLoc = parent.myLocations[x];
			if(value == 'All') {
				locs.push(curentLoc);
				self.showMarker(curentLoc);
			} else if(value == curentLoc.type()) {
				locs.push(curentLoc);
				self.showMarker(curentLoc);
			}
		}
		self.locations(locs)
	};

	self.search = function(value) {
		console.log('W00t')
		self.hideAllMarkers();
		self.locations.removeAll();
		var locs = [];
		for(var x in parent.myLocations){
			var curentLoc = parent.myLocations[x];
			if(valueMatches(value, curentLoc.title())) {
				self.showMarker(curentLoc);
				locs.push(curentLoc);
			}
		}
		self.locations(locs);
	};

	self.searched = function() {
		if(self.locations().length) {
			console.log(self.locations().length)
			self.openInfoWindow(self.locations()[0]);
			self.searchType('All');
		}
		console.log('bye')
	}

	self.hideAllMarkers = function() {
		var markers = self.locations();
		for(var x in self.locations()) {
			markers[x].marker.setMap(null);
		}
	}

	self.showMarker = function(location) {
		location.marker.setMap(map);
	}
};

var map, infowindow;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 36.115, lng: -115.172},
		zoom: 16
	});
	infowindow = new google.maps.InfoWindow();
	viewModel = new ViewModel();
	ko.applyBindings(viewModel);
	viewModel.query.subscribe(viewModel.search);
};

regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

valueMatches = function (inputItem, testItem) {
	var CASE_INSENSITIVE_MATCHING = 'i';
	return RegExp(regExpEscape(inputItem.trim()), CASE_INSENSITIVE_MATCHING).test(testItem);
};
