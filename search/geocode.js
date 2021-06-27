import { googleMapsKey } from "../keys.js";


const KEY = `${googleMapsKey}`;

function reverseGeocode(address) {
    address = address.replaceAll(" ", "%20");

    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
    address + '&key=' + KEY;
    
    console.log(url);

    fetch(url)
        .then(response => response.json() )
            .then(data => {
                console.log(data);
            })
            .catch(err => console.warn(err.message));
}
reverseGeocode("13802 Acoro St Cerritos");