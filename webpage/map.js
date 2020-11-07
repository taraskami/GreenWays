// Initialize and add the map
function initMap() {
// The location of Uluru
const uluru = { lat: 42.7345, lng: -73.675};
// The map, centered at Uluru
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
});
}