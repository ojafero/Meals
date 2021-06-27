class FirebaseRepository{
    
    constructor(){
        this.app = firebase.app();
        this.db = firebase.firestore();
        this.restaurants = this.db.collection('restaurants');
        console.log("Run constructor for firebase");
    }
    retrieveRestaurants(lat,long){
        this.restaurants.get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
        });
    }

    updatePost(e) {
        const db = firebase.firestore();
        const myPost = db.collection('restaurants').doc('McDonalds');
        myPost.update({ title: e.target.value});
    }
    
}



document.addEventListener("DOMContentLoaded", event =>{
    new FirebaseRepository();
    });
    
        

    

