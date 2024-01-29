import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import finImage from './assets/fin.png'; // Import the image file

const Map = () => {
  const mapRef = useRef(null);
  const path = [2,3,4];

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13,
    });
    mapRef.current.setView([10,10], 5.5);
    addImageOverlay();
    connectBuildingNodes('science');
    return () => {
      mapRef.current.remove();
    };
  }, []);

  const addImageOverlay = () => {
    const imageUrl = finImage; 
    const imageBounds =  [[0, 0], [20, 25]] ; 
    L.imageOverlay(imageUrl, imageBounds).addTo(mapRef.current);
  };

  const connectBuildingNodes = (building) => {
    clearMapMarkers();
    clearMapPolylines();
    loadBuildingNodes(building);
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

    const marker = L.marker([node.lat, node.lon]).addTo(map);
    
    marker.bindPopup(`Node ${node.id}`);
    
    if (node.label === 'leaveButton') {
        marker.setIcon(L.icon({
            iconUrl: 'exit.png',
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
        
    }
    
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
        addImageOverlay();
        
        nodes = [
            { id: 1, lat: 1, lon: 2,building: `science` },
            { id: 2, lat: 2, lon: 0,building: `science` },
            { id: 3, lat: 3, lon: 1,building: `science`  },
            { id: 4, lat: 4, lon: 0,building: `science`  },
            { id: 6, lat: 5, lon: 1,building: `science`  },
            { id: 5, lat: 6, lon: 1,building: `science` , label: 'leaveButton', cat: 'exit', desti: 'science2' }
        ];
    } else if (buildingName == "science2") {
        addImageOverlay();
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




























  return (
    <div id="map" style={{ width: '100%', height: '750px' }}></div>
  );
};

export default Map;
