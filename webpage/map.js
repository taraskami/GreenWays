// Initialize and add the map
var geocoder;
var map;

function initMap() {
    geocoder = new google.maps.Geocoder();
    const troy_kitchen = { lat: 42.728802, lng: -73.690267};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: troy_kitchen,
    });
}

function changeLoc() {
    var address = document.getElementById("location").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }