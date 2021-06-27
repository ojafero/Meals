    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyCwok_kqTXKCMmVZYcCqjj0sK6xre59zX0",
        authDomain: "mealss.firebaseapp.com",
        databaseURL: "https://mealss-default-rtdb.firebaseio.com/",
        projectId: "mealss",
        storageBucket: "mealss.appspot.com",
        messagingSenderId: "803716264066",
        appId: "1:803716264066:web:c66e3e3e3ad34af641849b",
        measurementId: "G-ZZCVMYNP37"
        };
    
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        console.log('Firebase initialized!');
    