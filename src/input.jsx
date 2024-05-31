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
import CHTMEDS4thFloorPlan from './assets/CHTMEDS4thFloorPlan.png';
import CHTMEDS5thFloorPlan from './assets/CHTMEDS5thFloorPlan.png';
import CHTMEDS6thFloorPlan from './assets/CHTMEDS6thFloorPlan.png';
import CHTMEDS7thFloorPlan from './assets/CHTMEDS7thFloorPlan.png';
import CHTMEDS8thFloorPlan from './assets/CHTMEDS8thFloorPlan.png';
import CHTMEDS9thFloorPlan from './assets/CHTMEDS9thFloorPlan.png';
import EDS3rdFloorPlan from './assets/EDS3rdFloorPlan.png';
import CHTM10thFloorPlan from './assets/CHTM10thFloorPlan.png';
import main4thFloorPlan from './assets/Main4thFloorPlan.png';
import main5thFloorPlan from './assets/Main5thFloorPlan.png';
import main6thFloorPlan from './assets/Main6thFloorPlan.png';
import main3rdFloorPlan from './assets/Main3rdFloorPlan.png';
import main2ndFloorPlan from './assets/Main2ndFloorPlan.png';
import mainGroundFloorPlan from './assets/MainGroundFloorPlan.png';
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
import BRS10thFloor from './assets/BRS10thFloorPlan.png';
import buildingNodes from './buildingNodes';
import { suggestionArray } from './SuggestBoxs';
import upArrowLogo from './assets/UpArrow.png';
import downArrowLogo from './assets/DownArrow.png';
import instructions from './assets/instructions.png'
import CEALOGO from './assets/CEALOGO.png'
import instructionsF from './assets/instructionsF.png';  
import legends from './assets/legends.png';  
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
    
    const [isInfoDivOpen, setIsInfoDivOpen] = useState(false);
    
    const [inputSuggestions, setInputSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    const collegesLogoUrl = (inputText) => {
        let searchSuggest = [];
        const buildings = ['BRS','Science','EDS','Main','PE','CHTM'];
        const floors = ['Ground Floor','1st Floor', '2nd Floor','3rd Floor','4th Floor','5th Floor','6th Floor','7th Floor',
                        '8th Floor','9th Floor', '10th Floor'];
    
        return new Promise((resolve, reject) => {
          let promises = [];
          let blockSuggestArray = ["<strong> ELEVATOR </strong>",
                                      "Facility","Drafting Room","Classroom","CR(Women)","CR(Men)",
                                      "Computer Room","Store","ComputerLab","ComputerRoom","Property Storage Room","StockRoom","Room"];
          buildings.forEach(building => {
            const userRef = ref(database, building);
            promises.push(new Promise((resolve, reject) => {
              onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                floors.forEach(floor => {
                  for (let j = 1; j <= 35; j++) {
                    if (data && data[floor] && data[floor][j]) {
                      if ((data[floor][j].cat != null) && (data[floor][j].cat != "") && !(blockSuggestArray.includes(data[floor][j].cat)) ) {
                        if (data[floor][j].cat.toLowerCase().includes(inputText.toLowerCase())) {
                          searchSuggest.push(data[floor][j].cat);
                        }
                      }
                      if ((data[floor][j].roomID != null) && (data[floor][j].roomID != "") && !(blockSuggestArray.includes(data[floor][j].roomID))){
                        if (data[floor][j].roomID.toLowerCase().includes(inputText.toLowerCase())) {
                          searchSuggest.push(data[floor][j].roomID);
                        }
                      }
                    }
                  }
                });
                resolve();
              }, (error) => {
                reject(error);
              });
            }));
          });
    
          Promise.all(promises).then(() => {
            console.log(searchSuggest);
            resolve(searchSuggest);
          }).catch(error => {
            reject(error);
          });
        });
    };

    const updateInputSuggestions = async () => {
        try {
          const fetchedSuggestions = await collegesLogoUrl(currentInputValue);
          setInputSuggestions(fetchedSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setInputSuggestions([]);
        }
    };
    const updateDestiinationSuggestions = async () => {
        try {
          const fetchedSuggestions = await collegesLogoUrl(destinationInputValue);
          setDestinationSuggestions(fetchedSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setDestinationSuggestions([]);
        }
    };

    

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

    const displayInt = ()=>{
        
    }
    
    
    let path = [];
    let floor;
    const mapRef = useRef(null);
    useEffect(() => {
        displayInt();
        updateDestiinationSuggestions();
        updateInputSuggestions();
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
        addImageOverlay(instructionsF);
        mapRef.current.flyTo([10,0], 6, {
            duration: 1,  // Adjust the duration of the animation in seconds
            easeLinearity: 0.5  // Adjust the easing factor for the animation
        });

        document.body.addEventListener('click', handleOutsideClick);
        

        return () => {
            mapRef.current.remove();
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    

    const addImageOverlay = (imageURL) => {     
        let images = [
            { url: imageURL, bounds: imageURL === 'main2ndFloorPlan' || imageURL === 'main5thFloorPlan'  ? [[0,0], [12, 15]] :  
            imageURL === '/Mapa-UC/src/assets/instructionsF.png?t=1717162026489'  ? [[0,0], [15, 30]] : [[0,0], [10, 10]] },  
            
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
        else if(floorName === 'main6thFloor'){
            addImageOverlay(main6thFloorPlan);
        }
        else if(floorName === 'main3rdFloor'){
            addImageOverlay(main3rdFloorPlan);
        }
        else if(floorName === 'main2ndFloor'){
            addImageOverlay(main2ndFloorPlan);
        }
        else if(floorName === 'mainGroundFloor'){
            addImageOverlay(mainGroundFloorPlan);
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
        else if(floorName === 'CHTMEDS4thFloor'){
            addImageOverlay(CHTMEDS4thFloorPlan);
        }
        else if(floorName === 'CHTMEDS5thFloor'){
            addImageOverlay(CHTMEDS5thFloorPlan);
        }
        else if(floorName === 'CHTMEDS6thFloor'){
            addImageOverlay(CHTMEDS6thFloorPlan);
        }
        else if(floorName === 'CHTMEDS7thFloor'){
            addImageOverlay(CHTMEDS7thFloorPlan);
        }
        else if(floorName === 'CHTMEDS8thFloor'){
            addImageOverlay(CHTMEDS8thFloorPlan);
        }
        else if(floorName === 'CHTMEDS9thFloor'){
            addImageOverlay(CHTMEDS9thFloorPlan);
        }
        else if(floorName === 'EDS3rdFloor'){
            addImageOverlay(EDS3rdFloorPlan);
        }
        else if(floorName === 'CHTM10thFloor'){
            addImageOverlay(CHTM10thFloorPlan);
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
        else if(floorName === "BRS10thFloor"){
            addImageOverlay(BRS10thFloor);
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
                    case 10:
                    connectBuildingNodes('BRS10thFloor');
                    break;
                    default:
                        break;
                }
            }else if(building === 'EDS' ||building === 'CHTM' ){
                switch (choice) {
                    case 2:
                        connectBuildingNodes('main2ndFloor');
                        break;
                    case 3:
                        connectBuildingNodes('EDS3rdFloor');
                        break;
                    case 4:
                        connectBuildingNodes('CHTMEDS4thFloor');
                        break;
                    case 5:
                        connectBuildingNodes('CHTMEDS5thFloor');
                        break;
                    case 6:
                        connectBuildingNodes('CHTMEDS6thFloor');
                        break;
                    case 7:
                        connectBuildingNodes('CHTMEDS7thFloor');
                        break;
                    case 8:
                        connectBuildingNodes('CHTMEDS8thFloor');
                        break;
                    case 9:
                        connectBuildingNodes('CHTMEDS9thFloor');
                        break;
                    case 10:
                        connectBuildingNodes('CHTM10thFloor');
                        break;
                    default:
                        break;
                }
            }
            
        
           
            
        }
       
        

        if(Object.prototype.hasOwnProperty.call(node, "label")){
            const marker = L.marker([node.lat, node.lon]).addTo(map);
            let leaveButton;
            if (node.label === 'leaveButton') {
                if(node.direction==='up'){
                    leaveButton = upArrowLogo;
                }
                else if(node.direction==='down'){
                    leaveButton = downArrowLogo;
                }
                else{
                    leaveButton = leaveButtonLogo;
                }
                marker.bindPopup(`Node ${node.id}`);
                marker.setIcon(L.icon({
                    iconUrl: leaveButton,
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
                const cea = 'https://www.uc-bcf.edu.ph/college/of/engineering-and-architecture';
                const cte = 'https://www.uc-bcf.edu.ph/college/of/teacher-education';
                const chtm = 'https://www.uc-bcf.edu.ph/college/of/hospitality-and-tourism-management';
                const col = 'https://www.uc-bcf.edu.ph/college/of/law';
                const citcs = 'https://www.uc-bcf.edu.ph/college/of/information-technology-and-computer-science';
                const coa = 'https://www.uc-bcf.edu.ph/college/of/accountancy';
                const cba = 'https://www.uc-bcf.edu.ph/college/of/business-administration';
                const cas = 'https://www.uc-bcf.edu.ph/college/of/arts-and-sciences';
                const con = 'https://www.uc-bcf.edu.ph/college/of/nursing';
                // Set the width as a percentage of the popup's maximum width
                let url = '';
                if(node.node === 1){
                    url = cea;
                }else if(node.node === 5 ){
                    url = cte;
                }else if(node.node === 1445){
                    url = chtm;
                }else if(node.node === 245){
                    url = col;
                }else if(node.node === 758){
                    url = citcs;
                }else if(node.node === 804){
                    url = coa;
                }else if(node.node === 1448){
                    url = cba;
                }else if(node.node === 1109){
                    url = cas;
                }else if(node.node === 1170){
                    url = con;
                }
                

                let iframe = `<iframe src="${url}" width="250" height="300" style="overflow-x: auto; overflow-y: hidden; zoom: 1; margin: 100;"></iframe>`;
                
                // Bind the popup with the iframe content
                
                if(url!=''){
                    marker.bindPopup(iframe, {
                        maxWidth: 300, // Set maximum width for the popup
                        maxHeight: 200 // Set maximum height for the popup
                    });
                }


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
                        ,{id: 8, node: 289},{id: 9, node: 314}, {id: 10, node: 1046}];
                }
                else if(node.elevatorBuilding==='EDS'){
                    elevatorNodes = [{id: 2, node: 864},{id:3,node:1234},{id:4, node: 1116},{id:5, node: 1165},{id:6, node:1276}, {id: 7, node: 1346}
                                    , {id:8,node:1419}, {id:9, node: 1506}
                    ];
                }
                else if(node.elevatorBuilding==='CHTM'){
                    elevatorNodes = [{id: 4, node: 1142}, {id:5, node:1198}, {id:6, node: 1290}, {id:7, node: 1370}, {id:8, node:1446},
                                    {id:9,node:1521},{id:10,node: 1604}
                    ];
                }
                marker.on('click', () => {

                    let ElevatorTargetFloor;
                    let ElevatorCurrentFloor;
                    for(let i = 0; i<path.length; i++){
                        for(let j = 0; j<elevatorNodes.length; j++){
                            if(path[i]===elevatorNodes[j].node){
                                ElevatorTargetFloor = elevatorNodes[j].id;
                            }
                        }
                    }
                    console.log(path)
                    let findCurrentFloor = false;
                    for(let i = 0; i<path.length; i++){
                        for(let j = 0; j<elevatorNodes.length; j++){

                            
                            if(path[i]===elevatorNodes[j].node){
                                findCurrentFloor = true;
                                ElevatorCurrentFloor = elevatorNodes[j].id;
                                break;
                            }
                            
                        }
                        if(findCurrentFloor){
                            break;
                        }
                        
                        
                    }
                    // Create a div element to contain the buttons
                    let buttonDiv = document.createElement('div');
            
                    // Create buttons for choices 1 to 5
                    for (let i = elevatorNodes[0].id; i <= elevatorNodes[elevatorNodes.length-1].id; i++) {
                        let button = document.createElement('button');
                        button.textContent = i;
                        button.addEventListener('click', () => {
                            handleButtonClick(i,node.elevatorBuilding);
                        });

                        if(i === ElevatorCurrentFloor){
                            button.style.border = 'none';
                        }
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
                            for(let i=1; i<=35; i++){
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
                            for(let i=1; i<=35; i++){
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
                    
                }); 

            })
            .catch(error => {
            
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
        const getNodeValue = (input) => {
            return new Promise((resolve, reject) => {
                const buildings = ['BRS','Science','EDS','Main','PE','CHTM'];
                for(let k=0; k<buildings.length; k++){
                    const floors = ['Ground Floor','1st Floor', '2nd Floor','3rd Floor','4th Floor','5th Floor','6th Floor','7th Floor',
                                '8th Floor','9th Floor', '10th Floor'];
                    const userRef = ref(database, buildings[k]);
                    onValue(userRef, (snapshot) => {
                        const data = snapshot.val();
                        
                        for (let i = 0; i < floors.length; i++) {
                            for (let j = 1; j <= 35; j++) { // Adjusted loop condition
                                if (data && data[floors[i]] && data[floors[i]][j]) {
                                    if (data[floors[i]][j].roomID.toLowerCase() === input.toLowerCase() || data[floors[i]][j].roomID.toUpperCase() === input.toUpperCase()
                                        || data[floors[i]][j].cat.toLowerCase() === input.toLowerCase() || data[floors[i]][j].cat.toUpperCase() === input.toUpperCase()) {
                                        let nodeID = data[floors[i]][j].node;
                                        console.log("Node: ",data[floors[i]][j].node,"Cat: ",data[floors[i]][j].cat);
                                        resolve(nodeID); // Resolve the promise if 'S213' found
                                        return; // Exit function after resolving the promise
                                    }
                                    else{
                                        console.log('wala data');
                                    }
                                }
                                else{
                                    console.log('sa ',data[floors[i]][j] ,'wala');
                                }
                            }
                        }
                        // Resolve with a message if 'S213' not found
                        
                    }, (error) => {
                       
                    });
                }
                
            });
        };
        
        
        
        if(isChoiceEnterDest){
            console.log("fac:",isChoiceEnterFac);
                getNodeValue(currentInputValue)
                .then(currentRoomNode =>{
                    getNodeValue(destinationInputValue)
                    .then(DestiRoomNode =>{ 
                        console.log('tagmga',DestiRoomNode);
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
                console.log("HAHAHAHA");
                getNodeValue(currentInputValue)
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
            

    const filteredCurrentSuggestions = (



        inputSuggestions.filter(suggestion => suggestion.toLowerCase().indexOf(currentInputValue.toLowerCase()) !== -1)

    );
    
    

    const filteredDestinationSuggestions = destinationSuggestions.filter(suggestion =>
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
        else if(buildingName == "CHTMEDS4thFloor") {
            setCurrentFloor("EDS Building 4th Floor, CHTM Building 4th Floor");
        }
        else if(buildingName == "CHTMEDS5thFloor") {
            setCurrentFloor("EDS Building 5th Floor, CHTM Building 5th Floor");
        }
        else if(buildingName == "CHTMEDS6thFloor") {
            setCurrentFloor("EDS Building 6th Floor, CHTM Building 6th Floor");
        }
        else if(buildingName == "CHTMEDS7thFloor") {
            setCurrentFloor("EDS Building 7th Floor, CHTM Building 7th Floor");
        }
        else if(buildingName == "CHTMEDS8thFloor") {
            setCurrentFloor("EDS Building 8th Floor, CHTM Building 8th Floor");
        }
        else if(buildingName == "CHTMEDS9thFloor") {
            setCurrentFloor("EDS Building 9th Floor, CHTM Building 9th Floor");
        }
        else if(buildingName == "EDS3rdFloor") {
            setCurrentFloor("EDS Building 3rd Floor");
        }
        else if(buildingName == "CHTM10thFloor") {
            setCurrentFloor("CHTM Building 10th Floor");
        }
        
        else if(buildingName == "main4thFloor") {
            setCurrentFloor("Main Building 4th Floor");
        }
        else if(buildingName == "main5thFloor") {
            setCurrentFloor("Main Building 5th Floor");
        }
        else if(buildingName == "main6thFloor") {
            setCurrentFloor("Main Building 6th Floor");
        }
        else if(buildingName == "main3rdFloor") {
            setCurrentFloor("Main Building 3rd Floor");
        }
        else if(buildingName == "mainGroundFloor") {
            setCurrentFloor("Main Building Ground Floor");
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
        else if (buildingName == "BRS10thFloor") {
            setCurrentFloor("BRS Building 10th Floor");
        }
        
    }

    

    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the popup
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };



    return (

        
        <div style={style} ref={inputRef}>
            
                
            
            <div>
                
                {isOpen && (
                    <div className="popup-container">
                    {/* Popup content */}
                    <div className="popup-content">
                        <span className="exit-button" onClick={togglePopup}>X</span>
                        <img src={instructionsF} className="ins" style={{}}alt="Placeholder Image" />
                        <img src={legends} className="ins" style={{}}alt="Placeholder Image" />
                    </div>
                    </div>
                )}
            </div>
        
            
            <div id='reader' style={{display: qrCodeScanner? 'block':'none'}}></div>
            <div id='result'></div>
            <div className="sticky-div">
                <div>
                    <button onClick={togglePopup} className="direction">Instructions/Legends</button>
                </div>
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
                                    <option>Gymnasium</option>
                                    <option>Student Lounge</option>
                                    <option>Sanctuary</option>
                                    <option>Auditorium</option>
                                    <option>Canao Hall</option>

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
                    > {currentFloor}
                    
                    </h4>
                </div>
            </div>
            
            
            <div id="map" style={{ width: '100%', height: '1000px' }}>
                
            </div>
        </div>
    );
}

TextInput.propTypes = {
    style: PropTypes.object // Validate style prop as an object
};

export default TextInput;
