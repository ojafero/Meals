
import {googleMapsKey} from '../keys.js'; 

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&callback=initMap`;
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {

  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
      