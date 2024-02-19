import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBwM78rh1iYKCnJlW1-oYwB4dZbrRFdz-c",
    authDomain: "roomorientationdata.firebaseapp.com",
    databaseURL: "https://roomorientationdata-default-rtdb.firebaseio.com",
    projectId: "roomorientationdata",
    storageBucket: "roomorientationdata.appspot.com",
    messagingSenderId: "99942721154",
    appId: "1:99942721154:web:18939bfc42074d9316769b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

const nodeInfo = (building, floor, type, node) => {
    return new Promise((resolve, reject) => {
        if (building === 'science') {
            if (type === 'roomID') {
                const userRef = ref(database, 'Science');
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data && data[floor] && data[floor].length > 0 && data[floor][node]) {
                        const name = String(data[floor][node].roomID);
                        resolve(name);
                    } else {
                        reject("No data for the specified floor or node");
                    }
                });
            } else {
                reject("Type is not 'roomID'");
            }
        } else {
            reject("Building is not 'science'");
        }
    });
}


const getInfo = () =>{
    nodeInfo('science', '2nd Floor', 'roomID', 2)
    .then(roomID => {
        console.log("Room ID:", roomID);
        
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

export default getInfo;
