// Initialize and add the map
var geocoder;
var map;
var cityCircle;
var cityCircle2;
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
        const FI = out.getElementsByTagName("FI");
        var max = 0;
        var max2 = 0;
        var coordinate;
        var coordinate2;
        for (var i=0;i<FI.length; i++){
            newJF = FI[i].childNodes[(FI[i].childNodes.length)-1].getAttribute("JF");
            if(newJF>max&&newJF!=10){
                max = newJF;
                coordinate=  FI[i].childNodes[1].childNodes[0].nodeValue;
                console.log(typeof coordinate)
                var cdnate=coordinate.split(" ");
            }else if(newJF>max2&&newJF!=10){
                max2 = newJF;
                coordinate2=  FI[i].childNodes[1].childNodes[0].nodeValue;
                console.log(typeof coordinate2)
                var cdnate2=coordinate2.split(" ");
            }
            //console.log(FI[i].childNodes[(FI[i].childNodes.length)-1].getAttribute("JF"))
        }
        console.log(FI.length);
        console.log(max);
        console.log(cdnate[0])
        var latlng=cdnate[0].split(",");
        var latit = parseFloat(latlng[0]);
        var lngit = parseFloat(latlng[1]);
        var latlng2=cdnate2[0].split(",");
        var latit2 = parseFloat(latlng2[0]);
        var lngit2 = parseFloat(latlng2[1]);
        cityCircle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: {lat : latit, lng: lngit},
            radius: 300,
          });
          cityCircle2 = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: {lat : latit2, lng: lngit2},
            radius: 300,
          });
    }).catch(err => console.error(err));
}



function changeLoc() {
    var address = document.getElementById("location").value;
    cityCircle.setMap(null);
    cityCircle2.setMap(null);
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
            const FI = out.getElementsByTagName("FI");
            var max = 0;
            var max2 = 0;
            var coordinate;
            var coordinate2;
            for (var i=0;i<FI.length; i++){
                newJF = FI[i].childNodes[(FI[i].childNodes.length)-1].getAttribute("JF");
                if(newJF>max&&newJF!=10){
                    max = newJF;
                    coordinate=  FI[i].childNodes[1].childNodes[0].nodeValue;
                    console.log(typeof coordinate)
                    var cdnate=coordinate.split(" ");
                }else if(newJF>max2&&newJF!=10){
                    max2 = newJF;
                    coordinate2=  FI[i].childNodes[1].childNodes[0].nodeValue;
                    console.log(typeof coordinate2)
                    var cdnate2=coordinate2.split(" ");
                }
                //console.log(FI[i].childNodes[(FI[i].childNodes.length)-1].getAttribute("JF"))
            }
            console.log(FI.length);
            console.log(max);
            console.log(cdnate[0])
            var latlng=cdnate[0].split(",");
            var latit = parseFloat(latlng[0]);
            var lngit = parseFloat(latlng[1]);
            var latlng2=cdnate2[0].split(",");
            var latit2 = parseFloat(latlng2[0]);
            var lngit2 = parseFloat(latlng2[1]);
            cityCircle = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: {lat : latit, lng: lngit},
                radius: 300,
              });
              cityCircle2 = new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: {lat : latit2, lng: lngit2},
                radius: 300,
              });
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