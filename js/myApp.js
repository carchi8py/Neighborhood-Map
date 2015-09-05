console.log('hii');
var Location = function(title, latitude, longitude) {
	//To remeber the parent context
	var self = this;

	self.title = ko.observable(title);
	self.content = '<h2 class="info-title">' + title + '</h2>'
	self.latitude = ko.observable(latitude);
	self.longitude = ko.observable(longitude);

	self.marker = new google.maps.Marker({
		position: new google.maps.LatLng(self.latitude(), self.longitude()),
		map: map
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
			new Location('Gordon Ramsay Burgr', 36.1108308, -115.1722186)
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