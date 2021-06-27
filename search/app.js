const distanceInMiles = 50;

class FirebaseRepository{
    
    constructor(){
        this.app = firebase.app();
        this.db = firebase.firestore();
        this.restaurants = this.db.collection('restaurants');
        console.log("Run constructor for firebase");
    }
    retrieveRestaurants(lat,long){
        let restaurantsList = [];
        let promise = this.restaurants.get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
              let restaurant = doc.data();
              let distanceBetween = this.getDistance(restaurant.Location._long,restaurant.Location._lat);
              restaurant['distance']= distanceBetween;
              if(distanceBetween<distanceInMiles){
                  console.log("meets distance criteria");
              }
              restaurantsList.push(restaurant);
        });
            return restaurantsList;
        });

        return promise;


    }
    getDistance(destinationLongitude, destinationLatitude){
        var myLocation = turf.point([userCurrentLongitude, userCurrentLatitude]);
        var destination = turf.point([destinationLongitude, destinationLatitude]);
        var metaData = {units: 'miles'};
        var distance = turf.distance(myLocation, destination,metaData);
        return distance;
    }

    updatePost(e) {
        const db = firebase.firestore();
        const myPost = db.collection('restaurants').doc('McDonalds');
        myPost.update({ title: e.target.value});
    }
    
}

        

    

