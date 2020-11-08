// Initialize and add the map
var geocoder;
var map;

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};


function initMap() {

    geocoder = new google.maps.Geocoder();
    const troy_kitchen = { lat: 42.728802, lng: -73.690267};
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: troy_kitchen
    });
    
    fetch('https://traffic.ls.hereapi.com/traffic/6.2/flow.xml?apiKey=VVjp8IvlTyyyS8tk038Dm0NYoDaI_dlcSxlMNpbhKUE&prox=42.728412,-73.691785,5000&responseattributes=sh')
    .then(response => response.text())
    .then(xmlString => $.parseXML(xmlString))
    .then((out) => {
        console.log('Output: ', out);
        const RW = out.getElementsByTagName("RW");
        console.log(RW.length);
    }).catch(err => console.error(err));
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
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        fetch('https://traffic.ls.hereapi.com/traffic/6.2/flow.xml?apiKey=VVjp8IvlTyyyS8tk038Dm0NYoDaI_dlcSxlMNpbhKUE&prox=' + lat + ','+lng +',5000&responseattributes=sh')
        .then(response => response.text())
        .then(xmlString => $.parseXML(xmlString))
        .then((out) => {
            console.log('Output: ', out);
            const RW = out.getElementsByTagName("RW");
            console.log(RW.length);
        }).catch(err => console.error(err));
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