

let userCurrentLatitude = 0;
let userCurrentLongitude = 0;
let searchbar = document.querySelector('.searchbar');
const restaurantSearchResultsDiv = document.querySelector('.search-results');
let listOfMarkers = [];
let listOfRestaurants = [];
let FirebaseRepo = null;
let backButton = document.querySelector('.go-back-button');
const googleMapsKey = "AIzaSyB9Wh5s8bhLl3YtTbWN1ElG0YxT3kg831U";

//import {googleMapsKey} from '../keys.js'; 

// Create the script tag, set the appropriate attributes
let map = null;
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&callback=initMap`;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {

  // The location of Uluru
  const losAngeles = { lat: 34.05, lng: -118.2437};
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: losAngeles,
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

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
            addOriginalPositionMarker(userCurrentLatitude,userCurrentLongitude);
            map.setCenter(new google.maps.LatLng(userCurrentLatitude,userCurrentLongitude));
        }
    });
}

function addOriginalPositionMarker(lat,long){
    let latlng = new google.maps.LatLng(lat,long);
    var marker = new google.maps.Marker({
        position: latlng,
        title:"Your Here",
        animation: google.maps.Animation.DROP,
        icon: 'homeIcon.png'
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);

}


function addMarker(lat,long){
    console.log("in add marker");
    console.log(lat)
    console.log(long);
    let latlng = new google.maps.LatLng(lat,long);
    var marker = new google.maps.Marker({
        position: latlng,
        title:"Hello World!",
        animation: google.maps.Animation.DROP,
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);

}

function removeMarkers(){
    for(let i=0; i<listOfMarkers.length; i++){
        listOfMarkers[i].setMap(null);
    }
    listOfMarkers = [];
}

function getAvailableMealsFromRestaurant(index){
    if(index < listOfRestaurants.length){
        resetSearchResultsDiv();
        displayListOfMeals(listOfRestaurants,index);
    }
}

function resetSearchResultsDiv(){
    restaurantSearchResultsDiv.innerHTML = '';
}

function displayListOfMeals(restaurantList,index){
    let mealMap = restaurantList[index].Meals;
    let mealIndex = 0;
        Object.keys(mealMap).forEach(function (key){
            createMealDiv(key,mealMap[key],restaurantList[index].MealImages[mealIndex]);
            mealIndex++;
    });
}



function createRestaurantDiv(title,distance,imageUrl,index){
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

    restaurantResult.setAttribute('onclick',`getAvailableMealsFromRestaurant(${index})`);

    restaurantImageContainer.appendChild(img);
    restaurantResult.appendChild(restaurantTitle);
    restaurantResult.appendChild(restaurantDistance);
    restaurantResult.appendChild(restaurantImageContainer);

    restaurantSearchResultsDiv.appendChild(restaurantResult);

    restaurantTitle.innerHTML += title;
    restaurantDistance.innerHTML += distance + " Miles";
}

function createMealDiv(title,distance,imageUrl){
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
    restaurantDistance.innerHTML += distance + "x Available";
}

function wrapperFunction(){
    getRestaurants();
}




async function getRestaurants() {
    if(FirebaseRepo == null){
        FirebaseRepo = new FirebaseRepository();
    }
   listOfRestaurants = await FirebaseRepo.retrieveRestaurants(12,12);
   console.log("list of restaurants");
   console.log(listOfRestaurants);
   resetSearchResultsDiv();
   removeMarkers();
   createDivs(listOfRestaurants);
   addMarkersFromRestaurant(listOfRestaurants);
}

function createDivs(restaurantList){
    for (let i=0; i<restaurantList.length; i++){
        let name = restaurantList[i].Name;
        let distance = restaurantList[i].distance.toFixed(2);
        let imageUrl = restaurantList[i].RestaurantImage;
        createRestaurantDiv(name,distance,imageUrl,i);
    }
}

function addMarkersFromRestaurant(restaurantList){
    for (let i=0; i<restaurantList.length; i++){
        addMarker(restaurantList[i].Location._lat,restaurantList[i].Location._long);
    }
    map.setCenter(new google.maps.LatLng(restaurantList[0].Location._lat,restaurantList[0].Location._long));
}

backButton.addEventListener('click',()=>{
    resetSearchResultsDiv();
    createDivs(listOfRestaurants);
}); 