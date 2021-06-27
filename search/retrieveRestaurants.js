
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
    let latlng = new google.maps.LatLng(lat,long);
    var map = new google.maps.Map(document.getElementById("map"));
    
    const marker = new google.maps.Marker({
        position: latlng,
        title: "Hello World"
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



function createRestaurantDiv(title,distance,imageUrl){
    const restaurantResult= document.createElement('div');
    restaurantResult.classList.add("result-restaurant");

    const restaurantTitle = document.createElement('div');
    restaurantTitle.classList.add("restaurant-title");

    const restaurantDistance = document.createElement('div');
    restaurantDistance.classList.add("restaurant-distance");

    const restaurantImageContainer = document.createElement('span');
    restaurantImageContainer.classList.add("restaurant-image");

    const img = document.createElement('img');
    img.setAttribute('src',imageUrl);

    restaurantImageContainer.appendChild(img);
    restaurantResult.appendChild(restaurantTitle);
    restaurantResult.appendChild(restaurantDistance);
    restaurantResult.appendChild(restaurantImageContainer);

    restaurantSearchResultsDiv.appendChild(restaurantResult);

    restaurantTitle.innerHTML += title;
    restaurantDistance.innerHTML += distance + " Miles";
}

function wrapperFunction(){
    getRestaurants();
}


async function getRestaurants() {
    if(FirebaseRepo == null){
        FirebaseRepo = new FirebaseRepository();
    }
   let restaurantList = await FirebaseRepo.retrieveRestaurants(12,12);
   createDivs(restaurantList);
   addMarkersFromRestaurant(restaurantList);
   console.log(restaurantList);
   //console.log(restaurantList[0].Location._lat);
   //console.log(restaurantList[0].Location._long);
}

function createDivs(restaurantList){
    for (let i=0; i<restaurantList.length; i++){
        let name = restaurantList[i].Name;
        let distance = restaurantList[i].distance.toFixed(2);
        let imageUrl = restaurantList[i].RestaurantImage;
        createRestaurantDiv(name,distance,imageUrl);
    }
}

function addMarkersFromRestaurant(restaurantList){
    for (let i=0; i<restaurantList.length; i++){
        addMarker(restaurantList[i].Location._lat,restaurantList[i].Location._long);
    }
}