import{ useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import elevatorLogo from './assets/elevatorLogo.png';
import emergencyExit from './assets/emergencyExit.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import finImage from './assets/fin.png'; // Import the image file
import arrow from './assets/arrow.png';
import  {computeDestPath,findFloorInfo} from "./dijktrasAlgo";



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
            center: [51.505, -0.09],
            zoom: 13,
            zoomControl: false
          });
          mapRef.current.setView([10,10], 5.5);
          
        
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
            { url: ImageUrl, bounds: [[0, 0], [20, 25]] },
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
    
        
        
        if (node.label === 'leaveButton') {
            const marker = L.marker([node.lat, node.lon]).addTo(map);
        
            marker.bindPopup(`Node ${node.id}`);
            marker.setIcon(L.icon({
                iconUrl: arrow,
                iconSize: [32, 32],
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
        zoomToNode(path[0]);
        }
        
    };
    
    const findNodeById = (nodeId) => nodes.find((node) => node.id === nodeId);
    
    const zoomToNode = (nodeId) => {
        const node = findNodeById(nodeId);
    
        if (node) {
            
            mapRef.current.flyTo([node.lat, node.lon], 6, {
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
    
        const polyline = L.polyline(latlngs, { color: 'red' });
        polyline.addTo(map);
    };
    
    
    
    
    
    function buildingNodes(buildingName) {
        let nodes = [];
        if (buildingName == "science") {
            
            
            nodes = [
                { id: 1, lat: 1, lon: 2,building: `science` },
                { id: 2, lat: 2, lon: 0,building: `science` },
                { id: 3, lat: 3, lon: 1,building: `science`  },
                { id: 4, lat: 4, lon: 0,building: `science`  },
                { id: 6, lat: 5, lon: 1,building: `science`  },
                { id: 5, lat: 6, lon: 1,building: `science` , label: 'leaveButton', cat: 'exit', desti: 'science2' }
            ];
        } else if (buildingName == "science2") {
            
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
    
    
    
    
    return (
        <div style={style} ref={inputRef}>

            <div>
                <select 
                        value={selectedDestination}
                        onChange={handlePickButtonChange}
                        className='pickButton'>
                    
                    <option disabled defaultValue={""} >
                       
                    </option>
                    <option value="Enter Destination">
                        Enter Destination
                    </option>
                    <option value="Find Closest Facility">
                        Find Closest Facility
                    </option>
                </select>
                
            </div>



            <form>
                <div style={{display:'flex'}}>
                    <span style={{flex:'70%', background:'#0c380c'}}>
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

                    <span style={{flex:'30%', background:'#0c380c'}}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className={`CheckboxDiv ${isElevatorClicked ? 'clicked' : ''}`} onClick={handleCheckboxElevatorClick}>
                                    <input
                                        type="checkbox"
                                        className='checkbox'
                                        checked={isUseElevatorChecked}
                                        onChange={() => {}}
                                    />
                                    <img src={elevatorLogo} className="checkbox-image" alt="Elevator Logo" />
                                </div> 

                                

                                <div className={`CheckboxDiv ${isEmergencyExitClicked ? 'clicked' : ''}`} onClick={handleCheckboxEmergencyExitClick}>
                                    <input
                                        type="checkbox"
                                        className='checkbox'
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
            <div id="map" style={{ width: '100%', height: '750px' }}></div>
        </div>
    );
}

TextInput.propTypes = {
    style: PropTypes.object // Validate style prop as an object
};

export default TextInput;
