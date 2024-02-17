import{ useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import elevatorLogo from './assets/elevatorLogo.png';
import emergencyExit from './assets/emergencyExit.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import arrow from './assets/arrow.png';
import  {computeDestPath,findFloorInfo} from "./dijktrasAlgo";
import { Html5QrcodeScanner } from 'html5-qrcode';
import classroomLogo from './assets/classroomLogo.png'; 
import science2ndFloorPlan from './assets/science2ndFloor.png'; 
import leaveButtonLogo from './assets/leaveButton.png'; 
import BRS2ndFloor from './assets/BRS2ndFloorPlan.png'; 


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
        loadBuildingNodes(building);//
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

        if (Object.prototype.hasOwnProperty.call(node, "title")) {
            var coords = L.latLng(node.lat, node.lon);
            L.marker(coords, {
                icon: L.divIcon({
                    html: node.title, // Center the text, set color to white, and add right margin
                    className: 'text-below-marker',
                    
                })
            }).addTo(map);
        }
        
        
        
        
        zoomToNode(path[0]);
        
        
    };
   
    
    
    const findNodeById = (nodeId) => nodes.find((node) => node.id === nodeId);
    
    const zoomToNode = (nodeId) => {
        const node = findNodeById(nodeId);
    
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
    
    
    
    
    
    function buildingNodes(buildingName) {
        let nodes = [];
        if (buildingName == "science2ndFloor") {
            setCurrentFloor("Science Building 2nd Floor, PE Building 2nd Floor");
            
            nodes = [
                { id: 0, lat: 6.53, lon: 0.55,building: `science2ndFloor`, label: 'classroom' }, 
                { id: 1, lat: 6.15, lon: 0.55,building: `science2ndFloor` , label: 'classroom' },
                { id: 2, lat: 6.8, lon: 1.08,building: `science2ndFloor`, label: 'classroom', roomID: 's213' }, { id: 2.0, lat: 7.4, lon: 0.9,building: `science2ndFloor`, title: 'S213: CpECompLab' }, 
                { id: 3, lat: 6.53, lon: 1.08,building: `science2ndFloor`},
                { id: 6, lat: 6.53, lon: 1.9,building: `science2ndFloor`},
                { id: 5, lat: 6.3, lon: 1.9,building: `science2ndFloor`, label: 'classroom' },
                { id: 4, lat: 6.8, lon: 1.9,building: `science2ndFloor`, label: 'classroom' },
                { id: 7, lat: 6.53, lon: 2.35,building: `science2ndFloor`},
                { id: 8, lat: 6.53, lon: 2.48,building: `science2ndFloor`},
                { id: 9, lat: 6.3, lon: 2.48,building: `science2ndFloor`, label: 'classroom' },
                { id: 10, lat: 6.53, lon: 2.63,building: `science2ndFloor`},
                { id: 14, lat: 7.15, lon: 2.63,building: `science2ndFloor`, label: 'classroom' },
                { id: 11, lat: 7.65, lon: 2.35,building: `science2ndFloor`, label: 'classroom' },
                { id: 12, lat: 7.65, lon: 2.63,building: `science2ndFloor`},
                { id: 13, lat: 7.49, lon: 2.63,building: `science2ndFloor`, label: 'classroom' },
                { id: 15, lat: 6.8, lon: 2.88,building: `science2ndFloor`, label: 'classroom' },
                { id: 16, lat: 6.53, lon: 2.88,building: `science2ndFloor`},
                { id: 19, lat: 6.53, lon: 3.4,building: `science2ndFloor`},
                { id: 18, lat: 6.8, lon: 3.4,building: `science2ndFloor`, label: 'classroom' },
                { id: 20, lat: 6.3, lon: 3.4,building: `science2ndFloor`, label: 'classroom' },
                { id: 22, lat: 6.53, lon: 4.2,building: `science2ndFloor`},
                { id: 23, lat: 6.3, lon: 4.2,building: `science2ndFloor`, label: 'classroom' },
                { id: 21, lat: 6.8, lon: 4.2,building: `science2ndFloor`, label: 'classroom' },
                { id: 24, lat: 6.53, lon: 4.73,building: `science2ndFloor`},
                { id: 25, lat: 7.82, lon: 4.73,building: `science2ndFloor`},
                { id: 26, lat: 7.82, lon: 4.825,building: `science2ndFloor`, label: 'classroom' },
                { id: 27, lat: 7.82, lon: 4.6,building: `science2ndFloor`, label: 'classroom' },
                { id: 28, lat: 6.53, lon: 5.4,building: `science2ndFloor`},
                { id: 29, lat: 6.8, lon: 5.4,building: `science2ndFloor`, label: 'classroom' },
                { id: 30, lat: 6.3, lon: 5.4,building: `science2ndFloor`, label: 'classroom' },
                { id: 31, lat: 6.53, lon: 6.02,building: `science2ndFloor`},
                { id: 33, lat: 6.53, lon: 6.4,building: `science2ndFloor`},
                { id: 34, lat: 6.53, lon: 6.57,building: `science2ndFloor`},
                { id: 32, lat: 6.8, lon: 6.4,building: `science2ndFloor`, label: 'classroom' },
                { id: 35, lat: 6.3, lon: 6.57,building: `science2ndFloor`, label: 'classroom' },
                { id: 37, lat: 6.53, lon: 6.9,building: `science2ndFloor`},
                { id: 36, lat: 6.8, lon: 6.9,building: `science2ndFloor`, label: 'classroom' },
                { id: 38, lat: 6.53, lon: 7.22,building: `science2ndFloor`},
                { id: 39, lat: 6.53, lon: 7.5,building: `science2ndFloor`},
                { id: 48, lat: 5.1, lon: 7.22,building: `science2ndFloor`, label: 'classroom' },
                { id: 47, lat: 5.6, lon: 7.31,building: `science2ndFloor`, label: 'classroom' },
                { id: 46, lat: 6.05, lon: 7.4,building: `science2ndFloor`, label: 'classroom' },
                { id: 40, lat: 6.8, lon: 7.5,building: `science2ndFloor`, label: 'classroom' },
                { id: 41, lat: 6.53, lon: 7.75,building: `science2ndFloor`},
                { id: 42, lat: 6.67, lon: 7.75,building: `science2ndFloor`, label: 'classroom' },
                { id: 45, lat: 6.4, lon: 7.795,building: `science2ndFloor`, label: 'classroom' },
                { id: 43, lat: 6.67, lon: 8.04,building: `science2ndFloor`, label: 'classroom' },
                { id: 44, lat: 6.8, lon: 8.04,building: `science2ndFloor`, label: 'classroom' },
                { id: 49, lat: 4.95, lon: 6.02,building: `science2ndFloor`},
                { id: 50, lat: 4.95, lon: 6.09,building: `science2ndFloor`, label: 'classroom' },
                { id: 51, lat: 4.2, lon: 6.02,building: `science2ndFloor`},
                { id: 52, lat: 4.2, lon: 6.09,building: `science2ndFloor`, label: 'classroom' },
                { id: 53, lat: 3.6, lon: 6.02,building: `science2ndFloor`},
                { id: 54, lat: 3.35, lon: 6.02,building: `science2ndFloor`, label: 'classroom' },
                { id: 55, lat: 3.6, lon: 6.4,building: `science2ndFloor`},
                { id: 56, lat: 3.13, lon: 6.4,building: `science2ndFloor`, label: 'classroom' },
                { id: 57, lat: 3.73, lon: 6.4,building: `science2ndFloor`},
                { id: 58, lat: 3.71, lon: 7.2,building: `science2ndFloor`},
                { id: 59, lat: 3.42, lon: 7.2,building: `science2ndFloor`, label: 'classroom' },
                { id: 60, lat: 3.6, lon: 5.65,building: `science2ndFloor`, label: 'classroom' },
                { id: 61, lat: 3.84, lon: 5.65,building: `science2ndFloor`, label: 'classroom' },
                { id: 62, lat: 3.35, lon:  5.35,building: `science2ndFloor`, label: 'classroom' },
                { id: 63, lat: 3.6, lon: 5.65,building: `science2ndFloor`},
                { id: 17, lat: 3.6, lon: 5.15,building: `science2ndFloor`},
                { id: 64, lat: 3.84, lon: 5.15,building: `science2ndFloor`, label: 'classroom' },
                { id: 66, lat: 3.35, lon: 4.75,building: `science2ndFloor`, label: 'classroom' },
                { id: 82, lat: 3.6, lon: 5.35,building: `science2ndFloor`},
                { id: 68, lat: 3.84, lon: 4.6,building: `science2ndFloor`, label: 'classroom' },
                { id: 67, lat: 3.6, lon: 4.6,building: `science2ndFloor`},
                { id: 65, lat: 3.6, lon: 4.75,building: `science2ndFloor`},
                { id: 71, lat: 3.35, lon: 4,building: `science2ndFloor`, label: 'classroom' },
                { id: 69, lat: 3.6, lon: 4,building: `science2ndFloor`},
                { id: 70, lat: 3.84, lon: 4,building: `science2ndFloor`, label: 'classroom' },
                { id: 73, lat: 3.27, lon: 3.43,building: `science2ndFloor`, label: 'classroom' },
                { id: 75, lat: 3.27, lon: 3.145,building: `science2ndFloor`, label: 'classroom' },
                { id: 74, lat: 3.6, lon: 3.145,building: `science2ndFloor`},
                { id: 72, lat: 3.6, lon: 3.43,building: `science2ndFloor`},
                { id: 76, lat: 3.6, lon: 2.88,building: `science2ndFloor`},
                { id: 77, lat: 3.15, lon: 2.6,building: `science2ndFloor`, label: 'leaveButton', destination: 'BRS2ndFloor' },
                { id: 78, lat: 4.2, lon: 2.88,building: `science2ndFloor`},
                { id: 79, lat: 4.2, lon: 2.94,building: `science2ndFloor`, label: 'classroom' },
                { id: 80, lat: 4.95, lon: 2.88,building: `science2ndFloor`},
                { id: 81, lat: 4.95, lon: 2.94,building: `science2ndFloor`, label: 'classroom' },
            ];
        } else if (buildingName == "BRS2ndFloor") {
            setCurrentFloor("BRS Building 2nd Floor");
            nodes = [
                { id: 7, lat: 1, lon: 0,building: `science2`  },
                { id: 8, lat: 2, lon: 0,building: `science2`  },
                { id: 9, lat: 3, lon: 1,building: `science2`  },
                { id: 10, lat: 4, lon: 0,building: `science2`,  label: 'leaveButton', cat: 'exit',destination: 'science2ndFloor'},
                { id: 11, lat: 5, lon: 1,building: `science2`  },
            ];
        }
    
        return nodes;
    }

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