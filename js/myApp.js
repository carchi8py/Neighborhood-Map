console.log('hii');
var Location = function(title, latitude, longitude, icon) {
	//To remeber the parent context
	var self = this;

	self.title = ko.observable(title);
	self.content = '<h2 class="info-title">' + title + '</h2>'
	self.latitude = ko.observable(latitude);
	self.longitude = ko.observable(longitude);
	self.icon = ko.observable(icon)

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

	self.locations = ko.observableArray(
		[
			new Location('Gordon Ramsay Burgr', 36.1108308, -115.1722186, 'img/lib/restaurant.png'),
			new Location('Gordon Ramsay Pub and Grill', 36.1174613, -115.175927, 'img/lib/restaurant.png'),
			new Location('Picasso', 36.1133574, -115.1750467, 'img/lib/restaurant.png'),
			new Location('Holsteins', 36.1098873, -115.1745552, 'img/lib/restaurant.png'),
			new Location('Nine Fine Irishmen', 36.1021012, -115.1737873, 'img/lib/bar.png'),
			//Shows
			new Location('Cirque du Soleil: Zarkana', 36.1060481, -115.1773626, 'img/lib/theater.png'),
			new Location('Cirque du Soleil: Zumanity', 36.102895, -115.1748606, 'img/lib/stripclub2.png'),
			new Location('Cirque du Soleil: O', 36.113911, -115.1773742, 'img/lib/theater.png'),
			new Location('Cirque du Soleil: Beatles Love', 36.1202598, -115.1748707, 'img/lib/music_live.png'),
			new Location('Cirque du Soleil: Mystere', 36.1244956, -115.1725308, 'img/lib/theater.png'),
			new Location('Cirque du Soleil: Ka', 36.10324, -115.1702839, 'img/lib/theater.png'),
			new Location('Cirque du Soleil: Criss Angel Believe', 36.0946657, -115.1774926, 'img/lib/music_live.png')
		]
	);

	self.openInfoWindow = function(obj) {
		obj.infoWindow();
	};
};

var map, infowindow;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 36.115, lng: -115.172},
		zoom: 16
	});
	infowindow = new google.maps.InfoWindow();
	ko.applyBindings(new ViewModel());
}