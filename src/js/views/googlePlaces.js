var map;
var infowindow ;
export function initPlaces(location, searchType) {
  // Create the map.
  var pyrmont = {lat: location[0], lng: location[1]};
  map = new google.maps.Map(document.getElementById('places__map'), {
    center: pyrmont,
    zoom: 13,
    fullscreenControl : false, 
    streetViewControl: false,
    mapTypeControl: false
  });

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;
  var moreButton = document.querySelector('.mapInfo__more');
  moreButton.onclick = function() {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  // Perform a nearby search.
  service.nearbySearch(
      {location: pyrmont, radius: 15000, type: [`${searchType}`]},
      function(results, status, pagination) {
        if (status !== 'OK') return;

        createMarkers(results);
        moreButton.disabled = !pagination.hasNextPage;
        getNextPage = pagination.hasNextPage && function() {
          pagination.nextPage();
        };
      });
      infowindow = new google.maps.InfoWindow();
}


function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.querySelector('.mapInfo__places');
  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
      
    });
    
    marker.addListener('click', function() {
      infowindow.setContent('<div><strong>' + this.title+ '</strong></div>');
        console.log(this);
        infowindow.open(map, this);
    });
		
    var li = document.createElement('li');
    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}