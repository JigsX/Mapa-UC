// Importing only what's needed from 'react-leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const position = [51.505, -0.09]; // Initial map center coordinates

    return (
        <Map center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    A sample marker with a popup.
                </Popup>
            </Marker>
        </Map>
    );
};

export default MapComponent;
