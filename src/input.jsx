import{ useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import elevatorLogo from './assets/elevatorLogo.png';
import emergencyExit from './assets/emergencyExit.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import  {computeDestPath,findFloorInfo} from "./dijktrasAlgo";
import { Html5QrcodeScanner } from 'html5-qrcode';
import classroomLogo from './assets/classroomLogo.png';
import scienceGroundFloorPlan from './assets/ScienceGroundFloorPlan.png';  
import science1stFloorPlan from './assets/Science1stFloorPlan.png';  
import science2ndFloorPlan from './assets/Science2ndFloorPlan.png';
import science3rdFloorPlan from './assets/Science3rdFloorPlan.png';
import science4thFloorPlan from './assets/Science4thFloorPlan.png';
import science5thFloorPlan from './assets/Science5thFloorPlan.png';
import science6thFloorPlan from './assets/Science6thFloorPlan.png';
import main4thFloorPlan from './assets/Main4thFloorPlan.png';
import main5thFloorPlan from './assets/Main5thFloorPlan.png';
import main3rdFloorPlan from './assets/Main3rdFloorPlan.png';
import main2ndFloorPlan from './assets/Main2ndFloorPlan.png';
import leaveButtonLogo from './assets/leaveButton.png'; 
import BRS1stFloor from './assets/BRS1stFloorPlan.png';
import BRS2ndFloor from './assets/BRS2ndFloorPlan.png'; 
import BRS3rdFloor from './assets/BRS3rdFloorPlan.png';
import BRS4thFloor from './assets/BRS4thFloorPlan.png';
import BRS5thFloor from './assets/BRS5thFloorPlan.png';
import BRS6thFloor from './assets/BRS6thFloorPlan.png';
import BRS7thFloor from './assets/BRS7thFloorPlan.png';
import BRS8thFloor from './assets/BRS8thFloorPlan.png';
import BRS9thFloor from './assets/BRS9thFloorPlan.png';
import buildingNodes from './buildingNodes';
//import getInfo from './firebaseIni';

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

function TextInput({ style }) {
    
    const [currentInputValue, setCurrentInputValue] = useState('');
    const [destinationInputValue, setDestinationInputValue] = useState('');
    const [showCurrentSuggestions, setShowCurrentSuggestions] = useState(false);
    const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
    const inputRef = useRef(null);

    const [isUseElevatorChecked, setIsUseElevatorChecked] = useState(false);
    const [isElevatorClicked, setIsElevatorClicked] = useState(false);

    const [isUseEmergencyExitChecked, setIsUseEmergencyExitChecked] = useState(false);
    const [isEmergencyExitClicked, setIsEmergencyExitClicked] = useState(false);
    
    const [isChoiceEnterDest, setIsChoiceEnterDest] = useState(false);
    const [isChoiceEnterFac, setIsChoiceEnterFac] = useState(false);

    const [selectedFacility, setSelectedFacility] = useState('');

    const [qrCodeScanner, setQRCodeScanner]= useState(false);

    
    
    
    const getData = () => {
        
    }
    

    const handleQRbuttonClick = () => {
        console.log("tangaga");
        event.preventDefault();
        
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {

                width: 300,
                height: 300,
            },
            fps: 20,
        });
        
        const success = (result) => {
            console.log('QR Code Value Detected:', result);
            setCurrentInputValue(result);
            setQRCodeScanner(false);
            scanner.clear();

        }

        const error = (err) => {
            console.error(err);
        }
        

        if(!qrCodeScanner){
            setQRCodeScanner(true);
            
            scanner.render(success, error);
        }
        
        
        
        else{
            scanner.clear();
            setQRCodeScanner(false);
            
        }
    }



    const handleChangeFacility = (event) =>{
        const {value} = event.target;
        setSelectedFacility(value);

    }

    const handleCheckboxElevatorClick = () => {
        setIsUseElevatorChecked(!isUseElevatorChecked);
        setIsElevatorClicked(!isUseElevatorChecked); // Toggle isClicked when the checkbox is clicked
    };

    const handleCheckboxEmergencyExitClick = () => {
        setIsUseEmergencyExitChecked(!isUseEmergencyExitChecked);
        setIsEmergencyExitClicked(!isUseEmergencyExitChecked); // Toggle isClicked when the checkbox is clicked
    };

    
    
    let path = [];
    let floor;
    const mapRef = useRef(null);
    useEffect(() => {
        mapRef.current = L.map('map', {
            center: [0, -0.09],
            zoom: 13,
            zoomControl: false,
            crs: L.CRS.EPSG3395
          });
          mapRef.current.setView([10,10], 3);
          
        
          const handleOutsideClick = () => {
                setShowCurrentSuggestions(false);
                setShowDestinationSuggestions(false);
        };

        document.body.addEventListener('click', handleOutsideClick);
        

        return () => {
            mapRef.current.remove();
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    

    const addImageOverlay = (imageURL) => {
        
        let images = [
            { url: imageURL, bounds: imageURL === 'main2ndFloorPlan' || imageURL === 'main5thFloorPlan'  ? [[0,0], [12, 15]] :  [[0,0], [10, 10]] },  
            
        ];
        mapRef.current.eachLayer(function (layer) {
            if (layer instanceof L.ImageOverlay) {
                mapRef.current.removeLayer(layer);
            }
        });
        images.forEach(function (image) {
            L.imageOverlay(image.url, image.bounds).addTo(mapRef.current);
        });
      };
    
      function loadBuildingFloor (floorName) {
        if(floorName === 'science2ndFloor'){
            addImageOverlay(science2ndFloorPlan);
        }
        else if(floorName === 'science3rdFloor'){
            addImageOverlay(science3rdFloorPlan);
        }
        else if(floorName === 'main4thFloor'){
            addImageOverlay(main4thFloorPlan);
        }
        else if(floorName === 'main5thFloor'){
            addImageOverlay(main5thFloorPlan);
        }
        else if(floorName === 'main3rdFloor'){
            addImageOverlay(main3rdFloorPlan);
        }
        else if(floorName === 'main2ndFloor'){
            addImageOverlay(main2ndFloorPlan);
        }
        else if(floorName === 'science4thFloor'){
            addImageOverlay(science4thFloorPlan);
        }
        else if(floorName === 'science5thFloor'){
            addImageOverlay(science5thFloorPlan);
        }
        else if(floorName === 'science6thFloor'){
            addImageOverlay(science6thFloorPlan);
        }
        else if(floorName === 'science1stFloor'){
            addImageOverlay(science1stFloorPlan);
        }
        else if(floorName === 'scienceGroundFloor'){
            addImageOverlay(scienceGroundFloorPlan);
        }
        else if(floorName === "BRS1stFloor"){
            addImageOverlay(BRS1stFloor);
        }
        else if(floorName === "BRS2ndFloor"){
            addImageOverlay(BRS2ndFloor);
        }
        else if(floorName === "BRS3rdFloor"){
            addImageOverlay(BRS3rdFloor);
        }
        else if(floorName === "BRS4thFloor"){
            addImageOverlay(BRS4thFloor);
        }
        else if(floorName === "BRS5thFloor"){
            addImageOverlay(BRS5thFloor);
        }
        else if(floorName === "BRS6thFloor"){
            addImageOverlay(BRS6thFloor);
        }
        else if(floorName === "BRS7thFloor"){
            addImageOverlay(BRS7thFloor);
        }
        else if(floorName === "BRS8thFloor"){
            addImageOverlay(BRS8thFloor);
        }
        else if(floorName === "BRS9thFloor"){
            addImageOverlay(BRS9thFloor);
        }
        
      }
      
      
    
      const connectBuildingNodes = (building) => {
        clearMapMarkers();
        clearMapPolylines();
        loadBuildingNodes(building);
        showCurrentFloor(building);
        loadBuildingFloor(building);
        const nodesToConnect = path;
        connectNodes(nodesToConnect);
    };
    
      const clearMapMarkers = () => {
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
            }
        });
    };
    
    const clearMapPolylines = () => {
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Polyline) {
                mapRef.current.removeLayer(layer);
            }
        });
    };
    
    let nodes = [];
    const loadBuildingNodes = (building) => {
        nodes = buildingNodes(building);
        drawNodes(mapRef.current, nodes);
    };
    
    const drawNodes = (map, nodes) => {
        nodes.forEach((node) => {
            drawNodeOnMap(node, map);
        });
    };
    
    
    const drawNodeOnMap = (node, map) => {
        let leaveButton1Clicked = false;
        if (!map) {
            console.error("Map not defined. Cannot add marker.");
            return;
        }

        function handleButtonClick(choice,building) {
            
            if(building === 'BRS'){
                switch (choice) {
                    case 1:
                        connectBuildingNodes('BRS1stFloor');
                        break;
                    case 2:
                        connectBuildingNodes('BRS2ndFloor');
                        break;
                    case 3:
                        connectBuildingNodes('BRS3rdFloor');
                        break;
                    case 4:
                        connectBuildingNodes('BRS4thFloor');
                        break;
                    case 5:
                        connectBuildingNodes('BRS5thFloor');
                        break;
                    case 6:
                        connectBuildingNodes('BRS6thFloor');
                        break;
                    case 7:
                        connectBuildingNodes('BRS7thFloor');
                        break;
                    case 8:
                    connectBuildingNodes('BRS8thFloor');
                    break;
                    case 9:
                    connectBuildingNodes('BRS9thFloor');
                    break;
                    default:
                        break;
                }
            }
            
        
           
            
        }
        
        if(Object.prototype.hasOwnProperty.call(node, "label")){
            const marker = L.marker([node.lat, node.lon]).addTo(map);
            
            if (node.label === 'leaveButton') {
                marker.bindPopup(`Node ${node.id}`);
                marker.setIcon(L.icon({
                    iconUrl: leaveButtonLogo,
                    iconSize: [20, 20],
                    iconAnchor: [16, 16],
                    popupAnchor: [0, -16]
                }));
        
                marker.on('click', () => {
                    // Set the flag indicating leaveButton1 is clicked
                    leaveButton1Clicked = true;
                    clearMapMarkers();
                    // Connect to "science2" and handle other logic if needed
                    connectBuildingNodes(node.destination);

                    const findNodeById2 = (nodeId) => nodes.find((node) => node.id === nodeId);

                    
                        let des = findNodeById2(node.desti)
                        mapRef.current.flyTo([des.lat,  des.lon], 8, {
                            duration: 1,  // Adjust the duration of the animation in seconds
                            easeLinearity: 0.5  // Adjust the easing factor for the animation
                        });
                    
                    
                    
                    
                    
        
                });
            }
            if (node.label === 'classroomLogo') {
                marker.bindPopup(`Node ${node.id}`);
                marker.setIcon(L.icon({
                    iconUrl: classroomLogo,
                    iconSize: [20, 20],
                    iconAnchor: [16, 16],
                    popupAnchor: [0, -16]
                }));
        
                
            }  
            
            if (node.label === 'elevator') {
                marker.bindPopup(`Node ${node.id}`);
                marker.setIcon(L.icon({
                    iconUrl: elevatorLogo,
                    iconSize: [20, 20],
                    iconAnchor: [16, 16],
                    popupAnchor: [0, -16]
                }));
                let elevatorNodes;
                if(node.elevatorBuilding==='BRS'){
                    elevatorNodes = [{id: 1, node: 143},{id: 2, node: 113},{id: 3, node: 166},{id: 4, node: 195},{id: 5, node: 224},{id: 6, node: 239},{id: 7, node: 264}
                        ,{id: 8, node: 289},{id: 9, node: 314}]
                }
                marker.on('click', () => {

                    let ElevatorTargetFloor;
                    for(let i = 0; i<path.length; i++){
                        for(let j = 0; j<elevatorNodes.length; j++){
                            if(path[i]===elevatorNodes[j].node){
                                ElevatorTargetFloor = elevatorNodes[j].id;
                            }
                        }
                    }
                    // Create a div element to contain the buttons
                    let buttonDiv = document.createElement('div');
            
                    // Create buttons for choices 1 to 5
                    for (let i = 1; i <= elevatorNodes.length; i++) {
                        let button = document.createElement('button');
                        button.textContent = i;
                        button.addEventListener('click', () => {
                            handleButtonClick(i,node.elevatorBuilding);
                        });

                        if(i === ElevatorTargetFloor){
                            button.style.backgroundColor = 'red';
                        }
                        
                        buttonDiv.appendChild(button);
                    }
            
                    // Append the button div to the popup
                    marker.getPopup().setContent(buttonDiv);
                    marker.openPopup();
                });
            } 



            
            
            leaveButton1Clicked;    
            let popupName = 'Your Current Location: ';
            let targetLoc = 'Your Destination: '
            let currentLocation = path[0];
            let destination = path[path.length -1];
        
            if(node.id === currentLocation){
                marker.bindPopup(`<strong>${popupName}</strong> Room: ${node.roomID}`);
                
            }
            if(node.id === destination){
                marker.bindPopup(`<strong>${targetLoc}</strong> Room: ${node.roomID}`);
                marker.openPopup();
            }
            
            

            
        }    

        const nodeInfo = (building, floor, type, node) => { //4
            return new Promise((resolve, reject) => {
                    if (type === 'roomID') {
                        const userRef = ref(database, building);
                        onValue(userRef, (snapshot) => {
                            const data = snapshot.val();
                            for(let i=1; i<=50; i++){
                                if (data && data[floor] && data[floor].length > 0) {
                                    if(data[floor][i].node === node){
                                        const name = data[floor][i].roomID;
                                        
                                        resolve(name);
                                    }
                                    
                                    
                                }
                            }

                            
                        });
                    } else {
                        reject("Type is not 'roomID'");
                    }
            });
        }
        const nodeTitleInfo = (building, floor, type, node) => { //4
            return new Promise((resolve, reject) => {
                    if (type === 'roomID') {
                        const userRef = ref(database, building);
                        onValue(userRef, (snapshot) => {
                            const data = snapshot.val();
                            for(let i=1; i<=50; i++){
                                if (data && data[floor] && data[floor].length > 0) {
                                    if(data[floor][i].node === node){
                                        const cathegory = data[floor][i].cat;
                                        
                                        resolve(cathegory);
                                    }
                                    
                                    
                                }
                            }

                            
                        });
                    } else {
                        reject("Type is not 'roomID'");
                    }
            });
        }

        if (Object.prototype.hasOwnProperty.call(node, "title")) {
            var coords = L.latLng(node.lat, node.lon);
            nodeTitleInfo(node.building,node.floor,'roomID',node.node)
            .then(roomCat => {
                nodeInfo(node.building,node.floor,'roomID',node.node)
                .then(roomID => {
                    if(roomCat ===''){
                        L.marker(coords, {
                            icon: L.divIcon({
                                
                                html: `<strong> ${roomCat} </strong> ${roomID}`,
                                className: 'text-below-marker',
                                
                            })
                        }).addTo(map);
                    }
                    else{
                        L.marker(coords, {
                            icon: L.divIcon({
                                
                                html: `<strong> ${roomCat}: </strong> ${roomID}`,
                                className: 'text-below-marker',
                                
                            })
                        }).addTo(map);
                    }
                    

                }).catch(error => {
                    console.error("Error:", error);
                }); 

            })
            .catch(error => {
            console.error("Error:", error);
            }); 
                    
                  
        }
        
        zoomToNode(path,nodes);

    };
   
    const findFirstNode = (path,nodes) =>{
        for(let i = 0; i<path.length; i++){
            for (let j = 0; j<nodes.length; j++){
              if(path[i]===nodes[j].id){
                console.log("ehe:" ,path[i]);
                return nodes[j].id;
              }
            }
          }
    }
    
    
    const findNodeById = (nodeId) => nodes.find((node) => node.id === nodeId);


    
    const zoomToNode = (path,nodes) => {


        const node = findNodeById(findFirstNode(path,nodes));
    
        if (node) {
            
            mapRef.current.flyTo([node.lat, node.lon], 8, {
                duration: 1,  // Adjust the duration of the animation in seconds
                easeLinearity: 0.5  // Adjust the easing factor for the animation
            });
        }
    };
    
    const connectNodes = (nodeIdsToConnect) => {
        
        for (let i = 0; i < nodeIdsToConnect.length - 1; i++) {
            const node1 = findNodeById(nodeIdsToConnect[i]);
            const node2 = findNodeById(nodeIdsToConnect[i + 1]);
    
            if (node1 && node2) {
                drawPolyline(mapRef.current, node1, node2);
            }
        }
    };
    
    const drawPolyline = (map, node1, node2) => {
        const latlngs = [
            [node1.lat, node1.lon],
            [node2.lat, node2.lon]
        ];
    
        const polyline = L.polyline(latlngs, { weight:'4', color: 'red' });
        polyline.addTo(map);
    };
    
    const suggestions = ["S123", "S214", "S215", "S216", "S217", "S218", "S219", "S220"];

    const handleCurrentInputChange = (event) => {
        const { value } = event.target;
        setCurrentInputValue(value);
        setShowCurrentSuggestions(value.trim().length > 0);
    };

    const handleDestinationInputChange = (event) => {
        const { value } = event.target;
        setDestinationInputValue(value);
        setShowDestinationSuggestions(value.trim().length > 0);
    };

    const handleSuggestionClick = (suggestion, isCurrent) => {
        if (isCurrent) {
            setCurrentInputValue(suggestion);
            setShowCurrentSuggestions(false);
        } else {
            setDestinationInputValue(suggestion);
            setShowDestinationSuggestions(false);
        }
    };

    const clickHandle = (event) => {

        event.preventDefault();
        const getNodeValue = (building,input) => {
            return new Promise((resolve, reject) => {
                const floors = ['Ground Floor','1st Floor', '2nd Floor','3rd Floor','4th Floor','5th Floor','6th Floor','7th Floor',
                                '8th Floor','9th Floor'];
                const userRef = ref(database, building);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    
                    for (let i = 0; i < floors.length; i++) {
                        for (let j = 1; j <= 50; j++) { // Adjusted loop condition
                            if (data && data[floors[i]] && data[floors[i]][j]) {
                                if (data[floors[i]][j].roomID === input.toLowerCase() || data[floors[i]][j].roomID === input.toUpperCase()) {
                                    let nodeID = data[floors[i]][j].node;
                                    console.log(nodeID);
                                    resolve(nodeID); // Resolve the promise if 'S213' found
                                    return; // Exit function after resolving the promise
                                }
                                else{
                                    console.log('wala data');
                                }
                            }
                            else{
                                console.log('wala data2');
                            }
                        }
                    }
                    // Resolve with a message if 'S213' not found
                    resolve("Room not found");
                }, (error) => {
                    reject(error); // Reject promise in case of error
                });
            });
        };
        
        const getBuilding = (roomName) =>{
            if(roomName[0].toLowerCase() === 's'){
                return 'Science';
            }else if(roomName[0].toLowerCase() === 'u'){
                return 'BRS';
            }
            else if(roomName[0].toLowerCase() === 'g'){
                return 'PE';
            }
            else if(roomName[0].toLowerCase() === 'm'){
                return 'Main';
            }
            else if(roomName[0].toLowerCase() === 'n'){
                return 'EDS';
            }
        };
        if(isChoiceEnterDest){
            console.log("fac:",isChoiceEnterFac);
                getNodeValue(getBuilding(currentInputValue),currentInputValue)
                .then(currentRoomNode =>{
                    getNodeValue(getBuilding(destinationInputValue),destinationInputValue)
                    .then(DestiRoomNode =>{ 
                        console.log(DestiRoomNode);
                        path = computeDestPath(
                            "enterDestination",
                            String(currentRoomNode),
                            String(DestiRoomNode),
                            isUseElevatorChecked,
                            isEmergencyExitClicked
                        );
                        floor = findFloorInfo(
                            "enterDestination",
                            String(currentRoomNode),
                            String(DestiRoomNode),
                            isUseElevatorChecked,
                            isEmergencyExitClicked
                        );                   
                        connectBuildingNodes(floor);
                        getData();
                    })
                    
                })
        
        }
        if(isChoiceEnterFac){
            console.log("dest:",isChoiceEnterDest);
            getNodeValue(getBuilding(currentInputValue),currentInputValue)
                .then(currentRoomNode =>{
                    path = computeDestPath(
                        "enterFindFacility",
                        currentRoomNode,
                        selectedFacility,
                        isUseElevatorChecked,
                        isEmergencyExitClicked
                    );
                    floor = findFloorInfo(
                        "enterFindFacility",
                        currentRoomNode,
                        selectedFacility,
                        isUseElevatorChecked,
                        isEmergencyExitClicked
                    );                   
                    connectBuildingNodes(floor);
                    getData();

                })
    
            


        }
        
    }

    const filteredCurrentSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().indexOf(currentInputValue.toLowerCase()) !== -1
    );

    const filteredDestinationSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().indexOf(destinationInputValue.toLowerCase()) !== -1
    );


    const [selectedDestination, setSelectedDestination] = useState('');
    
    
    const handlePickButtonChange = (event) => {
        const { value } = event.target;
        setSelectedDestination(value);
        if(value === 'Enter Destination'){
            setIsChoiceEnterDest(true);
            setIsChoiceEnterFac(false);
        }else{
            setIsChoiceEnterDest(false);
            setIsChoiceEnterFac(true);
        }
        
    };
    
    

    
   


    const [currentFloor, setCurrentFloor] = useState('');
    const showCurrentFloor = (buildingName)=>{
        if(buildingName == "science2ndFloor") {
        setCurrentFloor("Science Building 2nd Floor, PE Building 1st Floor");
        }
        else if(buildingName == "science3rdFloor") {
            setCurrentFloor("Science Building 3rd Floor, PE Building 3rd Floor");
        }
        else if(buildingName == "science4thFloor") {
            setCurrentFloor("Science Building 4th Floor, PE Building 4th Floor");
        }
        else if(buildingName == "science5thFloor") {
            setCurrentFloor("Science Building 5th Floor, PE Building 5th Floor");
        }
        else if(buildingName == "science6thFloor") {
            setCurrentFloor("Science Building 6th Floor, PE Building 6th Floor");
        }
        else if(buildingName == "main4thFloor") {
            setCurrentFloor("Main Building 4th Floor");
        }
        else if(buildingName == "main5thFloor") {
            setCurrentFloor("Main Building 5th Floor");
        }
        else if(buildingName == "main3rdFloor") {
            setCurrentFloor("Main Building 3rd Floor");
        }
        else if(buildingName == "main2ndFloor") {
            setCurrentFloor("Main Building 2nd Floor, EDS Building 2nd Floor");
        }
        else if(buildingName == "science1stFloor") {
            setCurrentFloor("Science Building 1st Floor, PE Building Ground Floor");
        }
        else if(buildingName == "scienceGroundFloor") {
            setCurrentFloor("Science Building Ground Floor");
        }
        else if (buildingName == "BRS1stFloor") {
            setCurrentFloor("BRS Building 1st Floor");
        }
        else if (buildingName == "BRS2ndFloor") {
            setCurrentFloor("BRS Building 2nd Floor");
        }
        else if (buildingName == "BRS3rdFloor") {
            setCurrentFloor("BRS Building 3rd Floor");
        }
        else if (buildingName == "BRS4thFloor") {
            setCurrentFloor("BRS Building 4th Floor");
        }
        else if (buildingName == "BRS5thFloor") {
            setCurrentFloor("BRS Building 5th Floor");
        }
        else if (buildingName == "BRS6thFloor") {
            setCurrentFloor("BRS Building 6th Floor");
        }
        else if (buildingName == "BRS7thFloor") {
            setCurrentFloor("BRS Building 7th Floor");
        }
        else if (buildingName == "BRS8thFloor") {
            setCurrentFloor("BRS Building 8th Floor");
        }
        else if (buildingName == "BRS9thFloor") {
            setCurrentFloor("BRS Building 9th Floor");
        }
        
    }

    





    return (
        
        <div style={style} ref={inputRef}>
            <div id='reader' style={{display: qrCodeScanner? 'block':'none'}}></div>
            <div id='result'></div>
            <div className="sticky-div">
                <div >
                    <select 
                            value={selectedDestination}
                            onChange={handlePickButtonChange}
                            className='pickButton'>
                        
                        <option defaultValue={""} >
                        Choose Destination
                        </option>
                        <option value="Enter Destination">
                            Enter Destination
                        </option>
                        <option value="Find Closest Facility">
                            Find Facility/Office
                        </option>
                    </select>
                    
                </div>

                <div style={{ display: isChoiceEnterDest || isChoiceEnterFac ? 'block' : 'none' }}>
                    <form>
                        <div style={{display:'flex', borderBottom: '4px solid #0c380c'}}>
                            <span style={{flex:'70%', background:'#0c380c'}}>
                                <div style={{display:'flex'}}>
                                    <div style={{flex: '100%'}}>
                                        <label>
                                            <input
                                                className="InputBox"
                                                placeholder="Enter Your Current Location"
                                                type="text"
                                                name='currentPost'
                                                value={currentInputValue}
                                                onChange={handleCurrentInputChange}
                                                    
                                            />
                                        </label>
                                    </div>
                                        
                                    <div>
                                        <button
                                                className='qrButton'
                                                onClick={handleQRbuttonClick}
                                                >QR</button>
                                    </div>
                                    


                                    
                                </div>
                                
                                
                                {showCurrentSuggestions && (
                                    <ul className="Suggestions">
                                        {filteredCurrentSuggestions.map((suggestion, index) => (
                                            <li key={index} onClick={() => handleSuggestionClick(suggestion, true)}>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <label>
                                    <input
                                        className="InputBox"
                                        placeholder="Enter Your Destination"
                                        type="text"
                                        name="destination"
                                        value={destinationInputValue}
                                        onChange={handleDestinationInputChange}
                                        style={{ display: isChoiceEnterDest ? 'block' : 'none' }}
                                    />
                                </label>
                                {showDestinationSuggestions && (
                                    <ul className="Suggestions">
                                        {filteredDestinationSuggestions.map((suggestion, index) => (
                                            <li key={index} onClick={() => handleSuggestionClick(suggestion, false)}>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                    
                                <select style={{ display: !isChoiceEnterDest ? 'block' : 'none' }}
                                        className="InputBox" id="selectFac" value={selectedFacility} onChange={handleChangeFacility}>
                                    <option>Select Facility</option>
                                    <option>CR(WOMEN)</option>
                                    <option>CR(MEN)</option>
                                    <option>CEA: Faculty Office</option>
                                    <option>Gymnasium</option>
                                </select>
                            </span>

                            <span style={{flex:'30%', background:'#0c380c', borderLeft: '2px solid #0c380c',borderRight: '2px solid #0c380c',borderTop: '1px solid #0c380c'}}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div className={`CheckboxDiv ${isElevatorClicked ? 'clicked' : ''}`} onClick={handleCheckboxElevatorClick}>
                                            <input
                                                type="checkbox"
                                                className='checkbox'
                                                id="elev"
                                                checked={isUseElevatorChecked}
                                                onChange={() => {}}
                                            />
                                            <img src={elevatorLogo} className="checkbox-image" alt="Elevator Logo" />
                                        </div> 

                                        

                                        <div className={`CheckboxDiv ${isEmergencyExitClicked ? 'clicked' : ''}`} onClick={handleCheckboxEmergencyExitClick}>
                                            <input
                                                type="checkbox"
                                                className='checkbox'
                                                id="emer"
                                                checked={isUseEmergencyExitChecked}
                                                onChange={() => {}}
                                            />
                                            <img src={emergencyExit} className="checkbox-image" alt="Elevator Logo" />
                                        </div>
                                    </div>            
                                        
                                    <div >
                                        <button title="Locate"
                                                className="Locatebuttons"
                                                onClick={clickHandle}> Locate 
                                        </button>
                                    </div>
                                </div>
                            </span>

                        </div>
                            
                    </form>
                </div>
                <div className='currentPosition' style={{}}>
                    <h4 style={{
                        textAlign:'center', margin: '5px', opacity:'0.6',borderRadius:'60px'
                    }}
                    > {currentFloor}</h4>
                </div>
            </div>
            
            
            <div id="map" style={{ width: '100%', height: '1000px' }}></div>
        </div>
    );
}

TextInput.propTypes = {
    style: PropTypes.object // Validate style prop as an object
};

export default TextInput;
