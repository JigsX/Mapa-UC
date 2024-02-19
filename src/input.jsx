import{ useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import elevatorLogo from './assets/elevatorLogo.png';
import emergencyExit from './assets/emergencyExit.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import  {computeDestPath,findFloorInfo} from "./dijktrasAlgo";
import { Html5QrcodeScanner } from 'html5-qrcode';
import classroomLogo from './assets/classroomLogo.png'; 
import science2ndFloorPlan from './assets/science2ndFloor.png'; 
import leaveButtonLogo from './assets/leaveButton.png'; 
import BRS2ndFloor from './assets/BRS2ndFloorPlan.png'; 
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
            { url: imageURL,    bounds: [[0,0], [10, 10]] },
           
            
            
            
            
            
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
        else if(floorName === "BRS2ndFloor"){
            addImageOverlay(BRS2ndFloor);
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

        function handleButtonClick(choice) {
            // Perform actions based on the user's choice
            switch (choice) {
                case 1:
                    // Set the flag indicating leaveButton1 is clicked
                    connectBuildingNodes('science');
                    break;
                case 2:
                    connectBuildingNodes('science2');
                    break;
                // Add cases for choices 3, 4, and 5 as needed
                default:
                    break;
            }
        
            // Clear map markers and connect to "science2"
            
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
                    zoomToNode(path,nodes);
        
                });
            }
            if (node.label === 'classroom') {
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
        
                marker.on('click', () => {
                    // Create a div element to contain the buttons
                    let buttonDiv = document.createElement('div');
            
                    // Create buttons for choices 1 to 5
                    for (let i = 1; i <= 5; i++) {
                        let button = document.createElement('button');
                        button.textContent = i;
                        button.addEventListener('click', () => {
                            handleButtonClick(i);
                        });
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

        if (Object.prototype.hasOwnProperty.call(node, "title")) {
            var coords = L.latLng(node.lat, node.lon);
            nodeInfo('science','2nd Floor','roomID',2)
            .then(roomID => {
                L.marker(coords, {
                    icon: L.divIcon({
                        html: roomID, // Center the text, set color to white, and add right margin
                        className: 'text-below-marker',
                        
                    })
                }).addTo(map);
                
            })
            .catch(error => {
                console.error("Error:", error);
            });

            
        }
        
        
        
        
        zoomToNode(path,nodes);
        
        
    };
   
    const findFirstNode = (path,nodes) =>{
        let first;
        for(let i = 0; i<path.length; i++){
            for (let j = 0; j<nodes.length; j++){
              if(path[i]===nodes[j].id){
                console.log("ehe:" ,path[i]);
                return nodes[j].id;
              }
            }
          }
        console.log("ehe:" ,first);
        
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
        if(isChoiceEnterDest){
            

            path = computeDestPath(
                "enterDestination",
                currentInputValue,
                destinationInputValue,
                isUseElevatorChecked,
                isEmergencyExitClicked
            );
            floor = findFloorInfo(
                "enterDestination",
                currentInputValue,
                destinationInputValue,
                isUseElevatorChecked,
                isEmergencyExitClicked
            );
            
            connectBuildingNodes(floor);
            
            
            getData();
        }
        else if(isChoiceEnterFac){
            path = computeDestPath(
                "enterFindFacility",
                currentInputValue,
                selectedFacility,
                isUseElevatorChecked,
                isEmergencyExitClicked
            );
            
            
            connectBuildingNodes('science');
            
            
           
           
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
        setCurrentFloor("Science Building 2nd Floor, PE Building 2nd Floor");
        }
        else if (buildingName == "BRS2ndFloor") {
            setCurrentFloor("BRS Building 2nd Floor");
        }
    }

    





    return (
        
        <div style={style} ref={inputRef}>
            <div>tanga</div>
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
                            Find Closest Facility
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
                                    <option>cr</option>
                                    <option>Gymnasium</option>
                                    <option>test</option>
                                    <option>test</option>
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
``