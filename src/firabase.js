const firebaseConfig = {
    apiKey: "AIzaSyBwM78rh1iYKCnJlW1-oYwB4dZbrRFdz-c",
    authDomain: "roomorientationdata.firebaseapp.com",
    databaseURL: "https://roomorientationdata-default-rtdb.firebaseio.com",
    projectId: "roomorientationdata",
    storageBucket: "roomorientationdata.appspot.com",
    messagingSenderId: "99942721154",
    appId: "1:99942721154:web:18939bfc42074d9316769b"
  };

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let room = database.ref(
    'RoomInfoNodes')
    room.on('value', function(snapshot){
        let data = snapshot.val();
        console.log(data);
    })