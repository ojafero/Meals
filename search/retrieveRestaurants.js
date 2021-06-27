
let userCurrentLatitude = 0;
let userCurrentLongitude = 0;
let searchbar = document.querySelector('.searchbar');
const restaurantSearchResultsDiv = document.querySelector('.search-results');
let listOfMarkers = [];
let FirebaseRepo = null;

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
            let address = (results[0].formatted_address);
            searchbar.value = address;
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



function createRestaurantDiv(){
    const restaurantResult= document.createElement('div');
    restaurantResult.classList.add("result-restaurant");

    const restaurantTitle = document.createElement('div');
    restaurantTitle.classList.add("restaurant-title");

    const restaurantDistance = document.createElement('div');
    restaurantDistance.classList.add("restaurant-distance");

    const restaurantImageContainer = document.createElement('span');
    restaurantImageContainer.classList.add("restaurant-image");

    const img = document.createElement('img');
    img.setAttribute('src',"https://images.unsplash.com/photo-1609428079875-ae186c562aff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1");

    restaurantImageContainer.appendChild(img);
    restaurantResult.appendChild(restaurantTitle);
    restaurantResult.appendChild(restaurantDistance);
    restaurantResult.appendChild(restaurantImageContainer);

    restaurantSearchResultsDiv.appendChild(restaurantResult);


    restaurantTitle.innerHTML += "Restaurant Name";
    restaurantDistance.innerHTML += "Miles";
}

function wrapperFunction(){
    getRestaurants();
}


async function getRestaurants() {
    if(FirebaseRepo == null){
        FirebaseRepo = new FirebaseRepository();
    }
   let restaurantList = await FirebaseRepo.retrieveRestaurants(12,12);
   console.log(restaurantList);
   //console.log(restaurantList[0].Location._lat);
   //console.log(restaurantList[0].Location._long);
}