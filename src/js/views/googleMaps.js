

export function initMap(address) {
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: { lat: -34.397, lng: 150.644 },
    fullscreenControl : false, 
    streetViewControl: false,
    mapTypeControl: false



  });
  let geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, map, address);
}

function geocodeAddress(geocoder, resultsMap, address) {
  geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        const show = document.querySelector('#map');
        show.style.display = 'block';
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        
      }
    });
}
