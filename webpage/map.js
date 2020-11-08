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

function searchBar() {
    input = document.getElementById("location");
    input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("goto").click();
        }
    });
}

function f() {
    if(document.getElementById("location").value == "Enter Location Here...") {
        document.getElementById("location").value = "";
    }
}

function b() {
    if(document.getElementById("location").value == "") {
        document.getElementById("location").value = "Enter Location Here...";
    }
}