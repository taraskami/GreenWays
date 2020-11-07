// Initialize and add the map
function initMap() {
 
const troy_kitchen = { lat: 42.728802, lng: -73.690267};
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: troy_kitchen,
});
}