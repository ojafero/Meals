document.addEventListener("DOMContentLoaded", event =>{
    

    console.log('Starting Event Listener...');

    const app = firebase.app();
    console.log(app);

    const db = firebase.firestore();

    const myPost = db.collection('restaurants');

    myPost.get()
        .then(querySnapshot => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.Name, " => ", doc.data());
        });

            
    });

});

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('restaurants').doc('McDonalds');
    myPost.update({ title: e.target.value});
}
