import{ useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import elevatorLogo from './assets/elevatorLogo.png';
import emergencyExit from './assets/emergencyExit.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import finImage from './assets/SB1F.png'; // Import the image file
import arrow from './assets/arrow.png';
import  {computeDestPath,findFloorInfo} from "./dijktrasAlgo";
import { Html5QrcodeScanner } from 'html5-qrcode';


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

    

    const addImageOverlay = (ImageUrl) => {
        let images = [
            { url: ImageUrl, bounds: [[0,10], [20, 30]] },
            { url: ImageUrl, bounds: [[-45, -25], [20, 40]] },
            
            // Add more images as needed
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
        if(floorName === 'science'){
            addImageOverlay(finImage);
        }
        else if(floorName === 'science2'){
            addImageOverlay(arrow);
        }
      }
      
      
    
      const connectBuildingNodes = (building) => {
        clearMapMarkers();
        clearMapPolylines();
        loadBuildingNodes(building);
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
                    iconUrl: arrow,
                    iconSize: [20, 20],
                    iconAnchor: [16, 16],
                    popupAnchor: [0, -16]
                }));
        
                marker.on('click', () => {
                    // Set the flag indicating leaveButton1 is clicked
                    leaveButton1Clicked = true;
                    clearMapMarkers();
                    // Connect to "science2" and handle other logic if needed
                    connectBuildingNodes(node.desti);
        
                });
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
        
            if (node.id === currentLocation) {
                marker.bindPopup(`<strong>${popupName}</strong> Room: ${node.id}`);
                marker.openPopup();
            }
            else if(node.id === destination){
                marker.bindPopup(`<strong>${targetLoc}</strong> Room: ${node.id}`);
                marker.openPopup();
            }
            
            let popupContent = `<strong>Node ${node.id}</strong><br>`;
        
            // Add buttons if it's not a leaveButton
            
            
            marker.bindPopup(popupContent);

            zoomToNode(path[0]);
            
        }
        
        
    };
   
    
    
    const findNodeById = (nodeId) => nodes.find((node) => node.id === nodeId);
    
    const zoomToNode = (nodeId) => {
        const node = findNodeById(nodeId);
    
        if (node) {
            
            mapRef.current.flyTo([node.lat, node.lon], 7, {
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
    
        const polyline = L.polyline(latlngs, { weight:'4', color: '#4a80f5' });
        polyline.addTo(map);
    };
    
    
    
    
    
    function buildingNodes(buildingName) {
        let nodes = [];
        if (buildingName == "science") {
            setCurrentFloor("Science Building: 1st Floor");
            
            nodes = [
                { id: 1, lat: 1, lon: 2,building: `science` },
                { id: 2, lat: 2, lon: 0,building: `science` },
                { id: 3, lat: 3, lon: 1,building: `science`  },
                { id: 4, lat: 4, lon: 0,building: `science`  },
                { id: 6, lat: 5, lon: 1,building: `science`, label:'elevator'  },
                { id: 5, lat: 6, lon: 1,building: `science` , label: 'leaveButton', cat: 'exit', desti: 'science2' }
            ];
        } else if (buildingName == "science2") {
            setCurrentFloor("Science Building: 2nd Floor");
            nodes = [
                { id: 7, lat: 1, lon: 0,building: `science2`  },
                { id: 8, lat: 2, lon: 0,building: `science2`  },
                { id: 9, lat: 3, lon: 1,building: `science2`  },
                { id: 10, lat: 4, lon: 0,building: `science2`,  label: 'leaveButton', cat: 'exit',desti: 'science'},
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
