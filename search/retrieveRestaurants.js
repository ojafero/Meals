
let userCurrentLatitude = 0;
let userCurrentLongitude = 0;
let searchbar = document.getElementsByClassName('searchbar');
let listOfMarkers = [];

function fetchUserCurrentLocation(){
    if(navigator.geolocation) navigator.geolocation.getCurrentPosition(function(result){
        userCurrentLatitude  = result.coords.latitude;
        userCurrentLongitude = result.coords.longitude;
        getReverseGeocodingData(userCurrentLatitude, userCurrentLongitude);
    });
}

document.querySelector('.search-icon').addEventListener('click',function(){
    fetchUserCurrentLocation();

})


function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("SUCCESFULL!");
            console.log(results);
            var address = (results[0].formatted_address);
        }
    });
}


function addMarker(lat,long){
    let myLatlng = new google.maps.LatLng(lat,long);
    var map = new google.maps.Map(document.getElementById("map"));

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });


    listOfMarkers.push(marker);

    // To add the marker to the map, call setMap();
    marker.setMap(map);

}

function removeMarkers(){
    for(let i=0; i<listOfMarkers.size(); i++){
        listOfMarkers[i].setMap(null);
    }
    listOfMarkers = [];
}